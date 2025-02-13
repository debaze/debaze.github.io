import {Brand} from "./Brand.js";
import {Price} from "./Price.js";
import {Sell} from "./Sell.js";
import {Type} from "./Type.js";

export class Component {
	/**
	 * @private
	 * @type {Type}
	 */
	#type;

	/**
	 * @private
	 * @type {Brand}
	 */
	#brand;

	/**
	 * @private
	 * @type {String}
	 */
	#model;

	/**
	 * @private
	 * @type {?String}
	 */
	#description;

	/**
	 * @private
	 * @type {String}
	 */
	#image;

	/**
	 * @private
	 * @type {Sell[]}
	 */
	#sells;

	/**
	 * @private
	 * @type {?Price}
	 */
	#bestPrice;

	/**
	 * @private
	 * @type {?Number}
	 */
	#target;

	/**
	 * @private
	 * @type {Boolean}
	 */
	#certainty;

	/**
	 * @private
	 * @type {Boolean}
	 */
	#buyed;

	/**
	 * @param {Object} options
	 * @param {Type} options.type
	 * @param {Brand} options.brand
	 * @param {String} options.model
	 * @param {?String} [options.description]
	 * @param {String} options.image
	 * @param {Sell[]} options.sells
	 * @param {?Price} [options.bestPrice]
	 * @param {?Number} [options.targetPrice]
	 * @param {?Boolean} [options.certainty=false]
	 * @param {?Boolean} [options.buyed=false]
	 */
	constructor({type, brand, model, description = null, image, sells, bestPrice = null, target = null, certainty = false, buyed = false}) {
		this.#type = type;
		this.#brand = brand;
		this.#model = model;
		this.#description = description;
		this.#image = image;
		this.#sells = sells;
		this.#bestPrice = bestPrice;
		this.#target = target;
		this.#certainty = certainty;
		this.#buyed = buyed;
	}

	/** @returns {Type} */
	getType() {
		return this.#type;
	}

	/** @param {Type} type */
	setType(type) {
		this.#type = type;
	}

	/** @returns {Brand} */
	getBrand() {
		return this.#brand;
	}

	/** @param {Brand} brand */
	setBrand(brand) {
		this.#brand = brand;
	}

	/** @returns {String} */
	getModel() {
		return this.#model;
	}

	/** @param {String} model */
	setModel(model) {
		this.#model = model;
	}

	/** @returns {?String} */
	getDescription() {
		return this.#description;
	}

	/** @param {?String} description */
	setDescription(description) {
		this.#description = description;
	}

	/** @returns {String} */
	getImage() {
		return this.#image;
	}

	/** @param {String} image */
	setImage(image) {
		this.#image = image;
	}

	/** @returns {Sell[]} */
	getSells() {
		return this.#sells;
	}

	/** @param {Sell[]} sells */
	setSells(sells) {
		this.#sells = sells;
	}

	/** @returns {?Price} */
	getBestPrice() {
		return this.#bestPrice;
	}

	/** @param {?Price} bestPrice */
	setBestPrice(bestPrice) {
		this.#bestPrice = bestPrice;
	}

	/** @returns {?Number} */
	getTarget() {
		return this.#target;
	}

	/** @param {?Number} target */
	setTarget(target) {
		this.#target = target;
	}

	/** @returns {Boolean} */
	isCertain() {
		return this.#certainty;
	}

	/** @param {Boolean} certainty */
	setCertainty(certainty) {
		this.#certainty = certainty;
	}

	/** @returns {Boolean} */
	isBuyed() {
		return this.#buyed;
	}

	/** @param {Boolean} buyed */
	setBuyed(buyed) {
		this.#buyed = buyed;
	}

	/** @returns {?Sell} */
	getBestSell() {
		return this.#sells.reduce((a, b) => a.getPrice().getTotalAmount() < b.getPrice().getTotalAmount() ? a : b);
	}
}