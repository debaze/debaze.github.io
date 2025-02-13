export class Type {
	/**
	 * @private
	 * @type {String}
	 */
	#type;

	/** @param {String} type */
	constructor(type) {
		this.#type = type;
	}

	/** @returns {String} */
	toString() {
		return this.#type;
	}

	/** @returns {String} */
	getType() {
		return this.#type;
	}

	/** @param {String} type */
	setType(type) {
		this.#type = type;
	}
}

Type.CASE = new Type("Case");
Type.CPU = new Type("CPU");
Type.GPU = new Type("GPU");
Type.HDD = new Type("HDD");
Type.KEYBOARD = new Type("Keyboard");
Type.MOTHERBOARD = new Type("Motherboard");
Type.PSU = new Type("PSU");
Type.RAM = new Type("RAM");
Type.SSD = new Type("SSD");
Type.WATERCOOLING = new Type("Watercooling");