It's been a few months now since I started working on my <s>upcoming</s> project, [Lyah](https://github.com/debaze/lyah) - a C++ maths library for graphics programming.  
While Lyah is exclusively written with SIMD, I tried to target fully supported instruction sets. Since the [Steam Hardware & Software Survey](https://store.steampowered.com/hwsurvey) reports 100% support for both SSE2 and SSE3, I've set them as my upper limit for 32-bit implementations.

Recently, I've been searching a method to do fast quaternion multiplication with SIMD.
However, unlike matrix multiplication, I did not found many examples. With some research, I managed to make my own implementation. Let's take a closer look at it.

## A quick reminder

A quaternion is typically represented as a scalar part $w$ and an vector part $(x, y, z)$. The vector part is composed of [*imaginary numbers*](https://en.wikipedia.org/wiki/Imaginary_number), that is, numbers whose square is $-1$.  
When a quaternion has a vector part of $0$, it behaves exactly like a real number. This quaternion is called an *identity quaternion*.

## The quaternion class

The class is just a wrapper around a SIMD data type. In our case we'll use a `__m128` for a 32-bit floating-point quaternion.

<span class="post-filename">quat.hpp</span>

```cpp
#pragma once

#include <immintrin.h>

// 32-bit floating-point quaternion
struct quat {
	__m128 m;

	quat(float w, float x, float y, float z);
}

quat operator *(quat a, quat b);
```

Usually, math libraries provide many more constructors such as identity and vector-scalar, but for the sake of the article I'll just define a component constructor.

<span class="post-filename">quat.cpp</span>

```cpp
#include "quat.hpp"

quat::quat(float w, float x, float y, float z) : m(_mm_set_ps(z, y, x, w)) {}
```

I found the multiplication to have less operations when storing $w$ in the lower part.

## Multiplication formula

The formula for multiplying two quaternions $a$ and $b$ is:

$$a * b = \left(\begin{matrix}
a_wb_w - a_xb_x - a_yb_y - a_zb_z \\\
a_wb_x + a_xb_w + a_yb_z - a_zb_y \\\
a_wb_y - a_xb_z + a_yb_w + a_zb_x \\\
a_wb_z + a_xb_y - a_yb_x + a_zb_w \\\
\end{matrix}\right)$$

Using this layout with SSE would require 4 multiplications. Unfortunately, there will also be many calls to shuffle the data. And even then, we need to pay attention to the signs. Can we do better?
 
We can rearrange the formula to align as most signs as possible:

$$a * b = \left(\begin{matrix}
a_wb_w - a_yb_y - a_xb_x - a_zb_z \\\
a_xb_w + a_yb_z + a_wb_x - a_zb_y \\\
a_yb_w + a_wb_y + a_zb_x - a_xb_z \\\
a_zb_w + a_wb_z + a_xb_y - a_yb_x \\\
\end{matrix}\right)$$

$$\\ \\ \\ \\ \\ \\ \\ = \left(\begin{matrix}
a_wb_w + -(a_yb_y + a_xb_x) - a_zb_z \\\
a_xb_w + a_yb_z + a_wb_x - a_zb_y \\\
a_yb_w + a_wb_y + a_zb_x - a_xb_z \\\
a_zb_w + a_wb_z + a_xb_y - a_yb_x \\\
\end{matrix}\right)$$

With this new layout, we just need to add the second and third columns, flip the sign of the lower part, add the first column and subtract the result from the fourth column. Here's how the implementation looks like:

<span class="post-filename">quat.cpp</span>

```cpp
quat operator *(quat a, quat b) {
	__m128 wmask = _mm_set_ss(-0.0f);

	__m128 m0 = ...
	__m128 m1 = ...
	__m128 m2 = ...
	__m128 m3 = ...

	a.m = _mm_add_ps(m1, m2);
	a.m = _mm_xor_ps(a.m, wmask); // flip w sign
	a.m = _mm_add_ps(a.m, m0);
	a.m = _mm_sub_ps(a.m, m3);

	return a;
}
```

Great! Now what's left is figuring out how to compute the columns.

## Arranging the data

For the first column, we simply use $a$ as the left side and broadcast $b_w$ to the right side:

<span class="post-filename">quat.cpp</span>

```cpp
__m128 m0l = a.m;
__m128 m0r = _mm_set1_ps(_mm_cvtss_f32(b.m));
__m128 m0 = _mm_mul_ps(m0l, m0r);
```

As we can see, the broadcast is easier when $w$ is in the lower part.  
However, the other columns require some shuffling.

<span class="post-filename">quat.cpp</span>

```cpp
__m128 m1l = _mm_shuffle_ps(a.m, a.m, _MM_SHUFFLE(0, 0, 2, 2));
__m128 m1r = _mm_shuffle_ps(b.m, b.m, _MM_SHUFFLE(3, 2, 3, 2));
__m128 m1 = _mm_mul_ps(m1l, m1r);

__m128 m2l = _mm_shuffle_ps(a.m, a.m, _MM_SHUFFLE(1, 3, 0, 1));
__m128 m2r = _mm_shuffle_ps(b.m, b.m, _MM_SHUFFLE(2, 1, 1, 1));
__m128 m2 = _mm_mul_ps(m2l, m2r);

__m128 m3l = _mm_shuffle_ps(a.m, a.m, _MM_SHUFFLE(2, 1, 3, 3));
__m128 m3r = _mm_shuffle_ps(b.m, b.m, _MM_SHUFFLE(1, 3, 2, 3));
__m128 m3 = _mm_mul_ps(m3l, m3r);
```

## One last trick

The right side of the second column (`m1r`) is computed with the control $3, 2, 3, 2$ - which is exactly what `movhlps` does. This instruction can be faster than `shufps` on some CPUs:

> *movhlps (Merom: 1uop) is significantly faster than shufps (Merom: 3uops). On Pentium-M, cheaper than movaps. Also, it runs in the FP domain on Core2, avoiding the bypass delays from other shuffles.* [Source](https://stackoverflow.com/a/35270026/17136841)

If you're targeting old CPUs, you may get a faster multiplication by replacing the shuffle with the [`_mm_movehl_ps`]((https://www.intel.com/content/www/us/en/docs/intrinsics-guide/index.html#text=_mm_movehl_ps&ig_expand=4591)) intrinsic. I chose to do it in this article.

## Benchmark

Here is the code for the benchmark function:

```cpp
#pragma once

#include <chrono>
#include <iostream>
#include <vector>

template<typename T>
void benchmark(const std::string& label, int iterations, int batchSize = 10) {
	std::vector<T> a(batchSize, T(1.0f, 4.0f, 6.0f, -1.0f));
	const T b(5.0f, 3.0f, 2.0f, 7.0f);

	const std::chrono::high_resolution_clock::time_point start = std::chrono::high_resolution_clock::now();

	for (int i = 0; i < iterations; i += batchSize) {
		for (int j = 0; j < batchSize; j++) {
			a[j] = a[j] * b;
		}
	}

	const std::chrono::high_resolution_clock::time_point end = std::chrono::high_resolution_clock::now();
	std::chrono::duration<double, std::milli> elapsed = end - start;

	std::cout << label << " time: " << elapsed.count() << " ms" << std::endl;
}
```

I also wrote the reference test below to compare with traditional scalar multiplication:

```cpp
struct quat_ref {
	float w, x, y, z;

	quat_ref(float w, float x, float y, float z) : w(w), x(x), y(y), z(z) {}
};

quat_ref operator *(quat_ref a, quat_ref b) {
	float a_w = a.w, a_x = a.x, a_y = a.y, a_z = a.z;
	float b_w = b.w, b_x = b.x, b_y = b.y, b_z = b.z;

	a.w = a_w * b_w - (a_x * b_x + a_y * b_y) - a_z * b_z;
	a.x = a_w * b_x +  a_x * b_w + a_y * b_z  - a_z * b_y;
	a.y = a_w * b_y +  a_y * b_w + a_z * b_x  - a_x * b_z;
	a.z = a_w * b_z +  a_z * b_w + a_x * b_y  - a_y * b_x;

	return a;
}
```

On MSVC with `/O2`, `/Ob2`, `/Oi`, `/Ot`, `/arch:SSE2`, `/fp:fast`, `/Gv`, 100 million iterations and a batch size of 10, the results were $\approx$ 70ms with the hardware [listed here](https://debaze.github.io/setup) and $\approx$ 103ms with an Intel Core i5-12450H on an HP Victus (laptop).  
The reference respectively took $\approx$ 197ms and $\approx$ 280ms on the same machines. That's nearly a 2.8x speedup over the scalar variant 🎉

## Conclusion

Thank you for reading. You can find the full code in Appendix 1 (along with the `quat` struct we made earlier). For other quaternion operations, you can check out [Lyah](https://github.com/debaze/lyah), which also provides vector and matrix implementations.

## Sources

- <https://store.steampowered.com/hwsurvey>
- <https://lisyarus.github.io/blog/posts/introduction-to-quaternions.html>
- <https://www.intel.com/content/www/us/en/docs/intrinsics-guide/index.html>
- <https://stackoverflow.com/questions/6996764/fastest-way-to-do-horizontal-sse-vector-sum-or-other-reduction>
- <http://www.codersnotes.com/notes/maths-lib-2016>

***

**Appendix 1**

<span class="post-filename">quat.hpp</span>

```cpp
#pragma once

#include <immintrin.h>

// 32-bit floating-point quaternion
struct quat {
	__m128 m;

	quat(float w, float x, float y, float z);
}

quat operator *(quat a, quat b);
```

<span class="post-filename">quat.cpp</span>

```cpp
#include "quat.hpp"

quat::quat(float w, float x, float y, float z) : m(_mm_set_ps(z, y, x, w)) {}

quat operator *(quat a, quat b) {
	__m128 wmask = _mm_set_ss(-0.0f);

	__m128 m0l = a.m;
	__m128 m0r = _mm_set1_ps(_mm_cvtss_f32(b.m));
	__m128 m0 = _mm_mul_ps(m0l, m0r);

	__m128 m1l = _mm_shuffle_ps(a.m, a.m, _MM_SHUFFLE(0, 0, 2, 2));
	__m128 m1r = _mm_movehl_ps(b.m, b.m);
	__m128 m1 = _mm_mul_ps(m1l, m1r);

	__m128 m2l = _mm_shuffle_ps(a.m, a.m, _MM_SHUFFLE(1, 3, 0, 1));
	__m128 m2r = _mm_shuffle_ps(b.m, b.m, _MM_SHUFFLE(2, 1, 1, 1));
	__m128 m2 = _mm_mul_ps(m2l, m2r);

	__m128 m3l = _mm_shuffle_ps(a.m, a.m, _MM_SHUFFLE(2, 1, 3, 3));
	__m128 m3r = _mm_shuffle_ps(b.m, b.m, _MM_SHUFFLE(1, 3, 2, 3));
	__m128 m3 = _mm_mul_ps(m3l, m3r);

	a.m = _mm_add_ps(m1, m2);
	a.m = _mm_xor_ps(a.m, wmask); // flip w sign
	a.m = _mm_add_ps(a.m, m0);
	a.m = _mm_sub_ps(a.m, m3);

	return a;
}
```