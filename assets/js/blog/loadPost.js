import hljs from "../../../vendor/highlight/highlight.min.js";

/**
 * @param {String} slug
 * @param {import("./loadPosts.js").Post} post
 */
export async function loadPost(slug, post) {
	document.title = post.title;

	const postResponse = await fetch(`blog/posts/${slug}.md`, {
		cache: "no-store",
	});

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

	date.textContent = post.publishedAt;

	if (post.lastUpdatedAt) {
		date.textContent += ` (last updated ${post.lastUpdatedAt})`;
	}

	title.textContent = post.title;

	let postHtml = await postResponse.text();

	// Replace _ by ~
	postHtml = postHtml.replaceAll("_", "~");

	// @ts-ignore
	postHtml = new showdown.Converter().makeHtml(postHtml);

	// Replace ~ by _
	postHtml = postHtml.replaceAll("~", "_");

	// Tabs
	postHtml = postHtml.replaceAll("    ", "\t");

	// External link
	postHtml = postHtml.replaceAll(/<a href="(.*)">(.*)<\/a>/g, `<a href="$1" target="_blank" class="external">$2</a>`);

	/**
	 * @type {HTMLDivElement}
	 */
	const container = document.querySelector("article .container");

	container.appendChild(date);
	container.appendChild(title);
	container.innerHTML += postHtml;

	hljs.highlightAll();

	// @ts-ignore
	MathJax.Hub.Typeset();
}