/**
 * @typedef {Object} Post
 * @property {String} date MM/YY/DDDD
 * @property {String} title
 * @property {String} description
 */

export async function loadPosts() {
	const postResponse = await fetch("posts/index.json");
	const posts = await postResponse.json();

	return posts;
}