/**
 * @param {String} slug
 * @param {import("./loadPosts.js").Post} post
 */
export async function loadPost(slug, post) {
	document.title = `${post.title} ${document.title}`;

	const postUrl = `posts/${slug}.md`;
	const postResponse = await fetch(postUrl);

	/**
	 * @type {HTMLTemplateElement}
	 */
	const postTemplate = document.querySelector(".post-template");

	/**
	 * @type {HTMLElement}
	 */
	const date = postTemplate.content.querySelector(".date").cloneNode(true);

	/**
	 * @type {HTMLHeadingElement}
	 */
	const title = postTemplate.content.querySelector(".title").cloneNode(true);

	date.textContent = post.date;
	title.textContent = post.title;

	let postText = await postResponse.text();
	let postHtml = postText;

	// External link
	postHtml = postHtml.replaceAll(/<(.*)>/g, `<a href="$1" target="_blank" class="external">$1</a>`);
	postHtml = postHtml.replaceAll(/\[(.*)\]\((.*)\)/g, `<a href="$2" target="_blank" class="external">$1</a>`);

	// @ts-ignore
	postHtml = new showdown.Converter().makeHtml(postHtml);

	/**
	 * @type {HTMLDivElement}
	 */
	const container = document.querySelector("article .container");

	container.appendChild(date);
	container.appendChild(title);
	container.innerHTML += postHtml;

	// @ts-ignore
	MathJax.Hub.Typeset();
}