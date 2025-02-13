export class Price {
	/**
	 * @private
	 * @type {Number}
	 */
	#amount;

	/**
	 * @private
	 * @type {Number}
	 */
	#deliveryAmount;

	/**
	 * @param {Number} amount
	 * @param {Number} deliveryAmount
	 */
	constructor(amount, deliveryAmount) {
		this.#amount = amount;
		this.#deliveryAmount = deliveryAmount;
	}

	/** @returns {Number} */
	getAmount() {
		return this.#amount;
	}

	/** @param {Number} amount */
	setAmount(amount) {
		this.#amount = amount;
	}

	/** @returns {Number} */
	getDeliveryAmount() {
		return this.#deliveryAmount;
	}

	/** @param {Number} deliveryAmount */
	setDeliveryAmount(deliveryAmount) {
		this.#deliveryAmount = deliveryAmount;
	}

	/** @returns {Number} */
	getTotalAmount() {
		return this.#amount + this.#deliveryAmount;
	}
}