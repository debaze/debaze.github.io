/**
 * @typedef {Object} Post
 * @property {String} title
 * @property {String} [description]
 * @property {String} publishedAt YYYY/MM/DD
 * @property {String} [lastUpdatedAt] YYYY/MM/DD
 */

export async function loadPosts() {
	const postResponse = await fetch("blog/posts/index.json", {
		cache: "no-store",
	});
	const posts = await postResponse.json();

	return posts;
}