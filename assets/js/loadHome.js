/**
 * @param {Record<String, import("./loadPosts.js").Post>} posts
 */
export function loadHome(posts) {
	document.title = `Home ${document.title}`;

	/**
	 * @type {HTMLTemplateElement}
	 */
	const homeTemplate = document.querySelector(".home-template");

	/**
	 * @type {HTMLElement}
	 */
	const home = homeTemplate.content.querySelector(".home").cloneNode(true);

	/**
	 * @type {HTMLUListElement}
	 */
	const postList = home.querySelector(".post-list");

	for (const [slug, post] of Object.entries(posts)) {
		/**
		 * @type {HTMLLIElement}
		 */
		const postListItem = homeTemplate.content.querySelector(".post-list-item").cloneNode(true);

		/**
		 * @type {HTMLElement}
		 */
		const postDate = postListItem.querySelector(".date");

		/**
		 * @type {HTMLAnchorElement}
		 */
		const postLink = postListItem.querySelector(".title");

		/**
		 * @type {HTMLSpanElement}
		 */
		const postDescription = postListItem.querySelector(".description");

		postDate.textContent = post.date;
		postLink.href = `?post=${slug}`;
		postLink.textContent = post.title;
		postDescription.textContent = post.description;

		postList.appendChild(postListItem);
	}

	/**
	 * @type {HTMLDivElement}
	 */
	const container = document.querySelector("article .container");

	for (const child of [...home.children]) {
		container.appendChild(child);
	}
}