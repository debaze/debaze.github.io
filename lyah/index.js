export {};

/**
 * @typedef {Method[]} Data
 */

/**
 * @typedef {Object} Method
 * @property {String} signature Signature of the method.
 * @property {String} description Short description of the method.
 * @property {String} [sourceUrl] Link to the file containing the method's implementation.
 * @property {String} [sourceFileUrl] Link to the file containing the method's implementation. Deprecated and replaced by `sourceUrl`.
 * @property {String} [instructionSet] Name of the instruction set required to use this method.
 * @property {String} since First version in which this method was introduced, in the form "vMAJOR.MINOR.PATCH".
 */

/**
 * @typedef {Object} FilterScore
 * @property {Number} methodIndex
 * @property {Number} score
 */

let searchQuery = "";
let cppVersion = 0;

/**
 * @param {Method} method
 */
function getMethodScore(method) {
	if (searchQuery.length === 0) {
		return 1;
	}

	const expression = new RegExp(searchQuery, "gi");

	let score = 0;

	const formattedSignature = formatMethodSignature(method.signature);

	// Search for matches in the formatted signature.
	const signatureMatchArray = formattedSignature.match(expression);

	if (signatureMatchArray !== null) {
		score += signatureMatchArray.length;
	}

	// Search for matches in the description.
	const descriptionMatchArray = method.description.match(expression);

	if (descriptionMatchArray !== null) {
		score += descriptionMatchArray.length;
	}

	return score;
}

/**
 * @param {FilterScore} a
 * @param {FilterScore} b
 */
function compareMethodScores(a, b) {
	if (a.score < b.score) {
		return 1;
	}

	if (a.score > b.score) {
		return -1;
	}

	return 0;
}

function getFilteredMethods() {
	methodList.textContent = "";

	/**
	 * @type {FilterScore[]}
	 */
	const filterScores = [];

	for (let methodIndex = 0; methodIndex < dataJson.length; methodIndex += 1) {
		const method = dataJson[methodIndex];
		let score = 1;

		if (searchQuery.length !== 0) {
			score = getMethodScore(method);

			if (score === 0) {
				continue;
			}
		}

		/**
		 * @type {FilterScore}
		 */
		const filterScore = {
			methodIndex: methodIndex,
			score: score,
		};

		filterScores.push(filterScore);
	}

	const sortedFilterScores = filterScores.sort(compareMethodScores);

	if (sortedFilterScores.length === 1) {
		methodCount.textContent = "1 method found.";
	}
	else {
		methodCount.textContent = `${sortedFilterScores.length} methods found.`;
	}

	for (const score of sortedFilterScores) {
		const method = dataJson[score.methodIndex];

		/**
		 * @type {HTMLLIElement}
		 */
		// @ts-ignore
		const methodListItem = template.content.querySelector(".method-list-item").cloneNode(true);

		/**
		 * @type {HTMLSpanElement}
		 */
		const methodSignature = methodListItem.querySelector(".method-signature");

		/**
		 * @type {HTMLParagraphElement}
		 */
		const methodDescriptionContainer = methodListItem.querySelector(".method-description-container");

		/**
		 * @type {HTMLSpanElement}
		 */
		const methodDescription = methodDescriptionContainer.querySelector(".method-description");

		/**
		 * @type {HTMLLinkElement}
		 */
		const methodSourceLink = methodDescriptionContainer.querySelector(".method-source-link");

		/**
		 * @type {HTMLSpanElement}
		 */
		const methodInstructionSet = methodListItem.querySelector(".method-instruction-set");

		/**
		 * @type {HTMLSpanElement}
		 */
		const methodSince = methodListItem.querySelector(".method-since");

		methodSignature.innerHTML = highlightMethodSignature(formatMethodSignature(method.signature));
		methodDescription.innerHTML = formatMethodDescription(method.description);
		methodSourceLink.href = method.sourceUrl;

		if (!method.sourceUrl) {
			methodSourceLink.href = method.sourceFileUrl;
			methodSourceLink.textContent = "View source file";
		}

		if (method.instructionSet) {
			methodInstructionSet.textContent = method.instructionSet;
		}
		else {
			methodInstructionSet.parentElement.remove();
		}

		methodSince.textContent = method.since;

		methodList.appendChild(methodListItem);
	}
}

function onChangeForm() {
	getFilteredMethods();
}

/**
 * @param {Event} event
 */
function onSubmitForm(event) {
	event.preventDefault();
}

/**
 * @param {Event} event
 */
function onChangeSearch(event) {
	/**
	 * @type {HTMLInputElement}
	 */
	// @ts-ignore
	const target = event.target;

	searchQuery = target.value.replaceAll(/[\\^$.*+?()[\]{}|]/g, "");
}

/**
 * @param {Event} event
 */
function onChangeCppVersion(event) {
	/**
	 * @type {HTMLSelectElement}
	 */
	// @ts-ignore
	const target = event.target;

	cppVersion = Number(target.value);
}

/**
 * @param {KeyboardEvent} event
 */
function onKeyDown(event) {
	if (!event.ctrlKey || event.code !== "KeyK") {
		return;
	}

	event.preventDefault();

	searchInput.focus();
}

/**
 * @param {String} signature
 */
function formatMethodSignature(signature) {
	let formattedSignature = signature;

	// Replace LYAH_INLINE.
	formattedSignature = formattedSignature.replace("LYAH_INLINE ", "");

	// Replace LYAH_CONSTEXPR_CPP26.
	if (cppVersion >= 2026) {
		formattedSignature = formattedSignature.replace("LYAH_CONSTEXPR_CPP26", "constexpr");
	}
	else {
		formattedSignature = formattedSignature.replace("LYAH_CONSTEXPR_CPP26", "");
	}

	// Replace LYAH_CONSTEXPR_CPP23.
	if (cppVersion >= 2023) {
		formattedSignature = formattedSignature.replace("LYAH_CONSTEXPR_CPP23", "constexpr");
	}
	else {
		formattedSignature = formattedSignature.replace("LYAH_CONSTEXPR_CPP23", "");
	}

	// Replace LYAH_CONSTEXPR.
	if (cppVersion >= 2011) {
		formattedSignature = formattedSignature.replace("LYAH_CONSTEXPR", "constexpr");
	}
	else {
		formattedSignature = formattedSignature.replace("LYAH_CONSTEXPR", "");
	}

	// Replace LYAH_NOEXCEPT.
	if (cppVersion >= 2011) {
		formattedSignature = formattedSignature.replace("LYAH_NOEXCEPT", "noexcept");
	}
	else {
		formattedSignature = formattedSignature.replace("LYAH_NOEXCEPT", "");
	}

	// Replace LYAH_NODISCARD.
	if (cppVersion >= 2017) {
		formattedSignature = formattedSignature.replace("LYAH_NODISCARD", "[[nodiscard]]");
	}
	else {
		formattedSignature = formattedSignature.replace("LYAH_NODISCARD", "");
	}

	// Replace LYAH_CALL.
	formattedSignature = formattedSignature.replace("LYAH_CALL", "__vectorcall");

	return formattedSignature;
}

/**
 * @param {String} signature
 */
function highlightMethodSignature(signature) {
	let highlightedSignature = signature;

	// Highlight function names.
	highlightedSignature = highlightedSignature.replace(/([A-Za-z]+)\(/, `<span class="function-name">$1</span>(`);

	// Highlight keywords.
	highlightedSignature = highlightedSignature.replace("__vectorcall", `<span class="keyword">__vectorcall</span>`);
	highlightedSignature = highlightedSignature.replace("constexpr", `<span class="keyword">constexpr</span>`);
	highlightedSignature = highlightedSignature.replace("const", `<span class="keyword">const</span>`);
	highlightedSignature = highlightedSignature.replace("explicit", `<span class="keyword">explicit</span>`);
	highlightedSignature = highlightedSignature.replace("noexcept", `<span class="keyword">noexcept</span>`);
	highlightedSignature = highlightedSignature.replace("operator", `<span class="keyword">operator</span>`);
	highlightedSignature = highlightedSignature.replace("static", `<span class="keyword">static</span>`);

	// Highlight namespaces.
	highlightedSignature = highlightedSignature.replaceAll("lyah", `<span class="namespace">lyah</span>`);
	highlightedSignature = highlightedSignature.replaceAll("std", `<span class="namespace">std</span>`);

	// Highlight strings.
	highlightedSignature = highlightedSignature.replace("[[nodiscard]]", `<span class="string">[[nodiscard]]</span>`);

	return highlightedSignature;
}

/**
 * @param {String} description
 */
function formatMethodDescription(description) {
	let formattedDescription = description;

	// Replace \n.
	formattedDescription = formattedDescription.replaceAll("\n", "<br />");

	// Replace *[...]*.
	formattedDescription = formattedDescription.replaceAll(/\*([^`]+)\*/g, `<i>$1</i>`);

	// Replace `[...]`.
	formattedDescription = formattedDescription.replaceAll(/`([^`]+)`/g, `<span class="monospace">$1</span>`);

	return formattedDescription;
}

const dataResponse = await fetch("lyah/lyah.json", {
	cache: "no-store",
});

/**
 * @type {Data}
 */
const dataJson = await dataResponse.json();

/**
 * @type {HTMLTemplateElement}
 */
const template = document.body.querySelector("#data-template");

/**
 * @type {HTMLParagraphElement}
 */
const methodCount = document.body.querySelector("#method-count");

/**
 * @type {HTMLUListElement}
 */
const methodList = document.body.querySelector("#method-list");

/**
 * @type {HTMLFormElement}
 */
const filterForm = document.forms["filter-form"];

filterForm.addEventListener("change", onChangeForm);
filterForm.addEventListener("submit", onSubmitForm);

/**
 * @type {HTMLInputElement}
 */
const searchInput = filterForm.elements["search"];

searchQuery = searchInput.value;

searchInput.addEventListener("change", onChangeSearch);

/**
 * @type {HTMLSelectElement}
 */
const cppVersionSelect = filterForm.elements["cpp-version"];

cppVersion = Number(cppVersionSelect.value);

cppVersionSelect.addEventListener("change", onChangeCppVersion);

document.addEventListener("keydown", onKeyDown);

getFilteredMethods();