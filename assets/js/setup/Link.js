import {Website} from "./Website.js";

export class Link {
	/**
	 * @private
	 * @type {String}
	 */
	#url;

	/**
	 * @private
	 * @type {?Website}
	 */
	#website;

	/** @param {String} url */
	constructor(url) {
		this.#url = url;
		this.#website = Website.fromURL(url);
	}

	/** @returns {String} */
	getURL() {
		return this.#url;
	}

	/** @param {String} url */
	setURL(url) {
		this.#url = url;
	}

	/** @returns {?Website} */
	getWebsite() {
		return this.#website;
	}

	/** @param {?Website} website */
	setWebsite(website) {
		this.#website = website;
	}
}