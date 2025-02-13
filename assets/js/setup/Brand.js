export class Brand {
	/**
	 * @private
	 * @type {String}
	 */
	#name;

	/** @param {String} name */
	constructor(name) {
		this.#name = name;
	}

	/** @returns {String} */
	toString() {
		return this.#name;
	}

	/** @returns {String} */
	getName() {
		return this.#name;
	}

	/** @param {String} name */
	setName(name) {
		this.#name = name;
	}
}

Brand.AMD = new Brand("AMD");
Brand.ASUS = new Brand("Asus");
Brand.BE_QUIET = new Brand("be quiet!");
Brand.CORSAIR = new Brand("Corsair");
Brand.INTEL = new Brand("Intel");
Brand.LOGITECH = new Brand("Logitech");
Brand.SAMSUNG = new Brand("Samsung");
Brand.SEAGATE = new Brand("Seagate");