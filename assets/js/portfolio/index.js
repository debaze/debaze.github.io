export {};

/**
 * @typedef {Object} Data
 * @property {Technology[]} technologies
 * @property {SkillCategory[]} skillCategories
 * @property {ProjectCategory[]} projectCategories
 * @property {Experience[]} professionalExperiences
 * @property {Experience[]} personalExperiences
 */

/**
 * @typedef {Object} Technology
 * @property {Number} id
 * @property {String} name
 * @property {String} iconSrc
 */

/**
 * @typedef {Object} SkillCategory
 * @property {String} name
 * @property {Skill[]} skills
 */

/**
 * @typedef {Object} Skill
 * @property {Number} technologyId
 * @property {Skill[]} [skills]
 */

/**
 * @typedef {Object} ProjectCategory
 * @property {Number} id
 * @property {String} name
 */

/**
 * @typedef {Object} Experience
 * @property {String} name
 * @property {String} [description]
 * @property {Project[]} projects
 */

/**
 * @typedef {Object} Project
 * @property {String} name
 * @property {String} [url]
 * @property {String} [sourceUrl]
 * @property {String} description
 * @property {Number[]} categoryIds
 * @property {Number[]} technologyIds
 */

const dataResponse = await fetch("portfolio/data.json", {
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
 * @type {HTMLDivElement}
 */
const skillCategoryListPlaceholder = document.body.querySelector("#skill-category-list-placeholder");

/**
 * @type {HTMLDivElement}
 */
const professionalExperiencePlaceholder = document.body.querySelector("#professional-experience-placeholder");

/**
 * @type {HTMLDivElement}
 */
const personalExperiencePlaceholder = document.body.querySelector("#personal-experience-placeholder");

// Skills
{
	const skillCategoryListFragment = document.createDocumentFragment();

	for (const skillCategory of dataJson.skillCategories) {
		const skillCategoryElement = getSkillCategoryElement(skillCategory);

		skillCategoryListFragment.appendChild(skillCategoryElement);
	}

	skillCategoryListPlaceholder.replaceWith(skillCategoryListFragment);
}

// Professional experiences
{
	const professionalExperienceFragment = document.createDocumentFragment();

	for (const experience of dataJson.professionalExperiences) {
		const experienceElement = getExperienceElement(experience);

		professionalExperienceFragment.appendChild(experienceElement);
	}

	professionalExperiencePlaceholder.replaceWith(professionalExperienceFragment);
}

// Personal experiences
{
	const personalExperienceFragment = document.createDocumentFragment();

	for (const experience of dataJson.personalExperiences) {
		const experienceElement = getExperienceElement(experience);

		personalExperienceFragment.appendChild(experienceElement);
	}

	personalExperiencePlaceholder.replaceWith(personalExperienceFragment);
}

/**
 * @param {SkillCategory} skillCategory
 */
function getSkillCategoryElement(skillCategory) {
	/**
	 * @type {HTMLElement}
	 */
	// @ts-ignore
	const skillCategoryContainerElement = template.content.querySelector(".skill-category-container").cloneNode(true);

	/**
	 * @type {HTMLHeadingElement}
	 */
	const skillCategoryNameElement = skillCategoryContainerElement.querySelector(".skill-category-name");

	/**
	 * @type {HTMLUListElement}
	 */
	const skillListElement = skillCategoryContainerElement.querySelector(".skill-list");

	skillCategoryNameElement.textContent = skillCategory.name;

	for (const skill of skillCategory.skills) {
		const skillListItemElement = getSkillListItemElement(skill);

		skillListElement.appendChild(skillListItemElement);
	}

	return skillCategoryContainerElement;
}

/**
 * @param {Skill} skill
 */
function getSkillListItemElement(skill) {
	const technology = dataJson.technologies[skill.technologyId];
	const skills = skill.skills;

	/**
	 * @type {HTMLLIElement}
	 */
	// @ts-ignore
	const skillListItemElement = template.content.querySelector(".skill-list-item").cloneNode(true);

	/**
	 * @type {HTMLDivElement}
	 */
	const skillTechnologyContainerElement = skillListItemElement.querySelector(".skill-technology-container");

	/**
	 * @type {HTMLImageElement}
	 */
	const technologyIconElement = skillTechnologyContainerElement.querySelector(".technology-icon");

	/**
	 * @type {HTMLSpanElement}
	 */
	const technologyNameElement = skillTechnologyContainerElement.querySelector(".technology-name");

	/**
	 * @type {HTMLUListElement}
	 */
	const skillListElement = skillListItemElement.querySelector(".skill-list");

	technologyIconElement.src = technology.iconSrc;
	technologyIconElement.alt = technology.name;

	technologyNameElement.textContent = technology.name;

	if (skills) {
		for (const skill of skills) {
			const skillListItemElement = getSkillListItemElement(skill);

			skillListElement.appendChild(skillListItemElement);
		}
	}
	else {
		skillListElement.remove();
	}

	return skillListItemElement;
}

/**
 * @param {Experience} experience
 */
function getExperienceElement(experience) {
	/**
	 * @type {HTMLElement}
	 */
	// @ts-ignore
	const experienceContainerElement = template.content.querySelector(".experience-container").cloneNode(true);

	/**
	 * @type {HTMLHeadingElement}
	 */
	const experienceNameElement = experienceContainerElement.querySelector(".experience-name");

	/**
	 * @type {HTMLElement}
	 */
	const experienceDescriptionElement = experienceContainerElement.querySelector(".experience-description");

	/**
	 * @type {HTMLUListElement}
	 */
	const experienceProjectListElement = experienceContainerElement.querySelector(".experience-project-list");

	experienceNameElement.textContent = experience.name;

	if (experience.description) {
		experienceDescriptionElement.innerHTML = experience.description;
	}
	else {
		experienceDescriptionElement.remove();
	}

	for (const project of experience.projects) {
		/**
		 * @type {HTMLLIElement}
		 */
		// @ts-ignore
		const projectListItemElement = template.content.querySelector(".project-list-item").cloneNode(true);

		/**
		 * @type {HTMLUListElement}
		 */
		const projectCategoryListItemElement = projectListItemElement.querySelector(".project-category-list");

		/**
		 * @type {HTMLDivElement}
		 */
		const projectUrlContainerElement = projectListItemElement.querySelector(".project-url-container");

		/**
		 * @type {HTMLLinkElement}
		 */
		const projectUrlElement = projectUrlContainerElement.querySelector(".project-url");

		/**
		 * @type {HTMLSpanElement}
		 */
		const projectDescriptionElement = projectListItemElement.querySelector(".project-description");

		/**
		 * @type {HTMLUListElement}
		 */
		const projectTechnologyListElement = projectListItemElement.querySelector(".project-technology-list");

		for (const categoryId of project.categoryIds) {
			const projectCategory = dataJson.projectCategories[categoryId];

			/**
			 * @type {HTMLLIElement}
			 */
			// @ts-ignore
			const projectCategoryListItem = template.content.querySelector(".project-category-list-item").cloneNode(true);

			/**
			 * @type {HTMLSpanElement}
			 */
			const projectCategoryNameElement = projectCategoryListItem.querySelector(".project-category-name");

			projectCategoryNameElement.textContent = projectCategory.name;

			projectCategoryListItemElement.appendChild(projectCategoryListItem);
		}

		if (project.url) {
			projectUrlElement.href = project.url;
			projectUrlElement.textContent = project.name;
		}
		else {
			/**
			 * @type {HTMLSpanElement}
			 */
			// @ts-ignore
			const projectNameElement = template.content.querySelector(".project-name").cloneNode(true);

			projectNameElement.textContent = project.name;

			projectUrlElement.replaceWith(projectNameElement);
		}

		if (project.sourceUrl) {
			/**
			 * @type {HTMLLinkElement}
			 */
			// @ts-ignore
			const projectSourceUrlElement = template.content.querySelector(".project-source-url").cloneNode(true);

			projectSourceUrlElement.href = project.sourceUrl;

			projectUrlContainerElement.appendChild(projectSourceUrlElement);
		}

		projectDescriptionElement.textContent = project.description;

		for (const technologyId of project.technologyIds) {
			const technology = dataJson.technologies[technologyId];

			/**
			 * @type {HTMLLIElement}
			 */
			// @ts-ignore
			const technologyListItem = template.content.querySelector(".technology-list-item").cloneNode(true);

			/**
			 * @type {HTMLImageElement}
			 */
			const technologyIconElement = technologyListItem.querySelector(".technology-icon");

			technologyIconElement.src = technology.iconSrc;
			technologyIconElement.alt = technology.name;
			technologyIconElement.title = technology.name;

			projectTechnologyListElement.appendChild(technologyListItem);
		}

		experienceProjectListElement.appendChild(projectListItemElement);
	}

	return experienceContainerElement;
}