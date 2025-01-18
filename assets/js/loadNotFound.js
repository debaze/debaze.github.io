export function loadNotFound() {
	document.title = `404 ${document.title}`;

	/**
	 * @type {HTMLTemplateElement}
	 */
	const notFoundTemplate = document.querySelector(".not-found-template");

	/**
	 * @type {HTMLElement}
	 */
	const notFoundContainer = notFoundTemplate.content.querySelector(".not-found-container").cloneNode(true);

	/**
	 * @type {HTMLDivElement}
	 */
	const container = document.querySelector("article .container");

	container.appendChild(notFoundContainer);
}