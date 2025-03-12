import {loadPosts} from "./loadPosts.js";

const posts = await loadPosts();
const searchParams = new URLSearchParams(window.location.search);

if (searchParams.size === 0) {
	const module = await import("./loadBlog.js");

	module.loadBlog(posts);
}
else {
	const postKey = searchParams.get("post");

	console.log(postKey, posts);

	if (!postKey || !(postKey in posts)) {
		const module = await import("./loadNotFound.js");

		module.loadNotFound();
	}
	else {
		const module = await import("./loadPost.js");
		const post = posts[postKey];

		await module.loadPost(postKey, post);
	}
}