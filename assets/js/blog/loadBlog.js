/**
 * @param {Record<String, import("./loadPosts.js").Post>} posts
 */
export function loadBlog(posts) {
	const postEntries = Object.entries(posts).reverse();

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
			 * @type {HTMLAnchorElement}
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

			if (!post.description) {
				postDescription.remove();
			}
			else {
				postDescription.textContent = post.description;
			}

			postDate.textContent = post.publishedAt;

			if (post.lastUpdatedAt) {
				postDate.textContent += ` (last updated ${post.lastUpdatedAt})`;
			}

			postListItem.href = `blog?post=${slug}`;

			postLink.textContent = post.title;

			postList.appendChild(postListItem);
		}
	}

	document.querySelector("article .container").appendChild(home);
}