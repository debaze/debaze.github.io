import {Link} from "./Link.js";
import {Price} from "./Price.js";

export class Sell {
	/**
	 * @private
	 * @type {Price}
	 */
	#price;

	/**
	 * @private
	 * @type {Link}
	 */
	#link;

	/**
	 * @param {Price} price
	 * @param {Link} link
	 */
	constructor({price, link}) {
		this.#price = price;
		this.#link = link;
	}

	/** @returns {Price} */
	getPrice() {
		return this.#price;
	}

	/** @param {Price} price */
	setPrice(price) {
		this.#price = price;
	}

	/** @returns {Link} */
	getLink() {
		return this.#link;
	}

	/** @param {Link} link */
	setLink(link) {
		this.#link = link;
	}
}