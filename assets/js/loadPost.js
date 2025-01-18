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

	// External link (1)
	postText = postText.replaceAll(/<(.*)>/g, `<a href="$1" target="_blank" class="external">$1</a>`);

	// External link (2)
	postText = postText.replaceAll(/\[(.*)\]\((.*)\)/g, `<a href="$2" target="_blank" class="external">$1</a>`);

	// H6
	postText = postText.replaceAll(/^###### (.*)$/gm, `<small class="date">$1</small>`);

	// H5
	postText = postText.replaceAll(/^##### (.*)$/gm, `<h5>$1</h5>`);

	// H4
	postText = postText.replaceAll(/^#### (.*)$/gm, `<h4>$1</h4>`);

	// H3
	postText = postText.replaceAll(/^### (.*)$/gm, `<h3>$1</h3>`);

	// H2
	postText = postText.replaceAll(/^## (.*)$/gm, `<h2>$1</h2>`);

	// H1
	postText = postText.replaceAll(/^# (.*)$/gm, `<h1 class="title">$1</h1>`);

	// Bold
	postText = postText.replaceAll(/\*\*(.*)\*\*/g, `<b>$1</b>`);

	// Italic
	postText = postText.replaceAll(/\*(.*)\*/g, `<i>$1</i>`);

	// Paragraph
	postText = postText.replaceAll(/^\n$^(.+)$^\n$/gm, `$1</br>`);

	// Line break
	postText = postText.replaceAll(/^(.+)$/gm, `$1</br>`);

	/**
	 * @type {HTMLDivElement}
	 */
	const container = document.querySelector("article .container");

	container.appendChild(date);
	container.appendChild(title);
	container.innerHTML += postText;

	// @ts-ignore
	MathJax.Hub.Typeset();
}