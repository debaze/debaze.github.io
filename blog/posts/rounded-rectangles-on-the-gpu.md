For my new project I needed to render an UI composed of rectangles. After watching this [talk](https://www.youtube.com/watch?v=Z1qyvQsjK5Y) from Casey Muratori I decided to try writing an immediate-mode renderer.  
I had made a [retained-mode GUI library](https://github.com/debaze/raven) before, but I struggled to implement some of the features because of the complexity that comes with the retained fashion. In comparison, immediate-mode allowed me to spend more time getting the look of the components right. And so one day I decided to implement rounded corners.

Let's suppose we have a simple renderer which draws axis-aligned rectangles using instancing. Assuming that we're using the top-left corner of the screen as the origin, each rectangle is defined by the position of its top-left corner and its size, both in pixels.  
We also want our rectangles to have rounded corners. The radius is the same for all 4 corners of a rectangle, thus we can have a single value per instance.

With these details out of the way, let's get to work.

## A simpler problem

Let's start with a simple case. Imagine that we have a rounded square with a radius equal to half its dimension.
We'll define $C$ as the square's center, $d$ as its dimension and $r$ as the radius. What we want to draw is essentially a circle:

<img src="assets/images/blog/rounded-square-diagram.png" alt="A circle with radius r, diameter d and center point C. Created with GeoGebra." />

<figcaption>
	A circle with radius $r$, diameter $d$ and center point $C$. Created with [GeoGebra](https://www.geogebra.org/geometry).
</figcaption>

To check if a given fragment lies inside or outside of the circle, we calculate its distance to $C$. If it's greater than $r$, then the fragment is outside of the circle. This is easy to translate to GLSL:

```glsl
...

void main() {
	float d = distance(gl_FragCoord.xy, fragmentInput.center);

	if (d > fragmentInput.radius) {
		discard;
	}

	color = fragmentInput.color;
}
```

But how can we handle shapes of arbitrary size and/or radius, like this one?

<img src="assets/images/blog/rounded-rectangle-diagram.png" alt="A rounded rectangle of dimensions w x h, radius r and center point C. Created with GeoGebra." />

<figcaption>
	A rounded rectangle with dimensions $w \times h$, radius $r$ and center point $C$. Created with [GeoGebra](https://www.geogebra.org/geometry).
</figcaption>

## Thinking inside the box

The idea is to reduce the rounded rectangle problem to the circle problem.  
Each corner of a rectangle can be viewed as the quarter of a circle of radius $r$.
If we connect the centers of those circles, we'll get an smaller, non-rounded rectangle.

<img src="assets/images/blog/rounded-rectangle-diagram-2.png" alt="A rounded rectangle of dimensions w x h has an inner rectangle of width w - 2r and height h - 2r. Created with GeoGebra." />

<figcaption>
	A rounded rectangle with dimensions $w \times h$ has an inner rectangle of width $w - 2r$ and height $h - 2r$. Created with [GeoGebra](https://www.geogebra.org/geometry).
</figcaption>

If, for a given fragment, we manage to calculate its closest point $A$ inside or on the edge of the inner rectangle, we can treat it as the center of a circle of radius $r$, and we're now left with a simple circle problem to solve.  
Because we're only dealing with axis-aligned shapes, we can find $A$ by clamping the coordinates of the fragment to the bounds of the inner rectangle, so that

$$A \in [C - \frac{S}{2} + r, C + \frac{S}{2} - r]$$

<img src="assets/images/blog/rounded-rectangle-demo.png" alt="A rectangle with rounded corners." />

<figcaption>
	A rectangle with rounded corners.
</figcaption>

Here's how the method looks like in GLSL:

```glsl
...

void main() {
	// Screen space coordinate of the current fragment.
	vec2 p = gl_FragCoord.xy;

	// Closest point of p on the inner rectangle.
	vec2 a = clamp(p, fragmentInput.minBounds, fragmentInput.maxBounds);

	if (distance(p, a) > fragmentInput.radius) {
		discard;
	}

	color = fragmentInput.color;
}
```

## Cleaning up

While I was doing some testing, I noticed that the bottom corners were sharper than the top ones. I was assuming that `gl_FragCoord` was [located at the pixel's center](https://registry.khronos.org/OpenGL-Refpages/gl4/html/gl_FragCoord.xhtml), but the clamping was returning wrong values and so the radius was smaller at the bottom. Eventually I found out that flooring `gl_FragCoord`, then adding 0.5 in both axes resulted in correct results.

Since we're using the radius to calculate the inner rectangle bounds we must define a range for it. Any value for $r$ that's negative or larger than the half of the smallest dimension is incorrect. In other words,

$$r \in [0, \frac{min(w, h)}{2}]$$

To avoid the square root which comes with GLSL's `distance` function, we can use the squared length directly. Just don't forget to also square the radius:

```glsl
	...

	vec2 ap = p - a;

	if (dot(ap, ap) > fragmentInput.radius * fragmentInput.radius) {
		discard;
	}

	...
```

## Adding effects

What's cool with this technique is that you can customize the corners further by changing the point-inside-circle equation. For example, we can rewrite the condition to use a point-inside-rhombus equation:

```glsl
	...

	if (abs(ap.x) + abs(ap.y) > fragmentInput.radius) {
		discard;
	}

	...
```

And we now have beveled corners!

<img src="assets/images/blog/beveled-rectangle-demo.png" alt="A rectangle with beveled corners." />

<figcaption>
	A rectangle with beveled corners.
</figcaption>

It's really interesting to see that such a small change can totally change the way the corners look - in my opinion, definitely a flexible method. I even managed to get a vignette effect by accident while trying to find the equation for beveled corners.

## Conclusion

Thank you for reading. The full code for rounded and beveled corners can be found in Appendix 1. The effect is chosen via a preprocessor directive but a better way can be to pass the effect ID from the vertex shader and branch on it in the fragment shader to get the desired look.

## Sources

- <https://caseymuratori.com/blog_0001>

***

**Appendix 1**

<span class="post-filename">main.frag</span>

```glsl
#version 440

#define BORDER_EFFECT_BEVEL 0
#define BORDER_EFFECT_ROUND 1

#define BORDER_EFFECT BORDER_EFFECT_ROUND

#if BORDER_EFFECT == BORDER_EFFECT_BEVEL
	bool beveledCorner(vec2 delta, float radius) {
		return abs(delta.x) + abs(delta.y) > radius;
	}
#elif BORDER_EFFECT == BORDER_EFFECT_ROUND
	bool roundedCorner(vec2 delta, float radius) {
		return dot(delta, delta) > radius * radius;
	}
#endif

layout(origin_upper_left) in vec4 gl_FragCoord;

in FragmentInput {
	layout(location = 0) flat vec4 bounds;
	layout(location = 1) flat vec4 color;
	layout(location = 2) flat float radius;
} fragmentInput;

layout(location = 0) out vec4 color;

void main() {
	vec2 minBounds = fragmentInput.bounds.xy;
	vec2 maxBounds = fragmentInput.bounds.zw;

	// Screen space coordinates of the current fragment.
	vec2 p = floor(gl_FragCoord.xy) + 0.5;

	// Closest point of p on the inner rectangle.
	vec2 a = clamp(p, minBounds, maxBounds);

	vec2 ap = p - a;

	#if BORDER_EFFECT == BORDER_EFFECT_BEVEL
		bool condition = beveledCorner(ap, fragmentInput.radius);
	#elif BORDER_EFFECT == BORDER_EFFECT_ROUND
		bool condition = roundedCorner(ap, fragmentInput.radius);
	#endif

	if (condition) {
		discard;
	}

	color = fragmentInput.color;
}
```