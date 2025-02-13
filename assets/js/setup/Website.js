export class Website {
	/**
	 * @private
	 * @type {String}
	 */
	#name;

	/**
	 * @private;
	 * @type {String}
	 */
	#logo;

	/**
	 * @param {String} name
	 * @param {String} logo
	 */
	constructor(name, logo) {
		this.#name = name;
		this.#logo = logo;
	}

	/**
	 * @param {String} url
	 * @returns {?Website}
	 */
	static fromURL(url) {
		for (const website of Website.WEBSITES) {
			if (url.includes(website.getName())) return website;
		}

		return null;
	}

	/** @returns {String} */
	getName() {
		return this.#name;
	}

	/** @param {String} name */
	setName(name) {
		this.#name = name;
	}

	/** @returns {String} */
	getLogo() {
		return this.#logo;
	}

	/** @param {String} logo */
	setLogo(logo) {
		this.#logo = logo;
	}
}

Website.AMAZON_DE = new Website("amazon.de", "assets/images/amazon_de.png");
Website.AMAZON_ES = new Website("amazon.es", "assets/images/amazon_es.png");
Website.AMAZON_FR = new Website("amazon.fr", "assets/images/amazon_fr.png");
Website.AMD = new Website("amd.com", "assets/images/amd.png");
Website.TOPACHAT = new Website("topachat.com", "assets/images/topachat.png");
Website.WEBSITES = [Website.AMAZON_DE, Website.AMAZON_ES, Website.AMAZON_FR, Website.AMD, Website.TOPACHAT];