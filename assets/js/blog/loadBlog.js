/**
 * @param {Record<String, import("./loadPosts.js").Post>} posts
 */
export function loadBlog(posts) {
	const postEntries = Object.entries(posts);

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

	if (postEntries.length === 0) {
		/**
		 * @type {HTMLElement}
		 */
		const noPostsSection = homeTemplate.content.querySelector(".no-posts-section").cloneNode(true);

		postList.replaceWith(noPostsSection);
	}
	else {
		for (const [slug, post] of postEntries) {
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

			postDate.textContent = post.publishedAt;
			postLink.href = `blog?post=${slug}`;
			postLink.textContent = post.title;
			postDescription.textContent = post.description;

			postList.appendChild(postListItem);
		}
	}

	document.querySelector("article .container").appendChild(home);
}