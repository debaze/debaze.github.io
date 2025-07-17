export {};

/**
 * @typedef {Object} Data
 * @property {Technology[]} technologies
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
 * @typedef {Object} Experience
 * @property {String} name
 * @property {String} [description]
 * @property {String} [link]
 * @property {Project[]} projects
 */

/**
 * @typedef {Object} Project
 * @property {String} name
 * @property {String} [siteUrl]
 * @property {String} [repositoryUrl]
 * @property {String} description
 * @property {String[]} [missions]
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
const professionalExperiencePlaceholder = document.body.querySelector("#professional-experience-placeholder");

/**
 * @type {HTMLDivElement}
 */
const personalExperiencePlaceholder = document.body.querySelector("#personal-experience-placeholder");

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
	 * @type {HTMLLinkElement}
	 */
	const experienceLinkElement = experienceContainerElement.querySelector(".experience-link");

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

	if (experience.link) {
		experienceLinkElement.href = experience.link;
	}
	else {
		experienceLinkElement.remove();
	}

	for (const project of experience.projects) {
		/**
		 * @type {HTMLLIElement}
		 */
		// @ts-ignore
		const projectListItemElement = template.content.querySelector(".project-list-item").cloneNode(true);

		/**
		 * @type {HTMLDivElement}
		 */
		const projectHeaderElement = projectListItemElement.querySelector(".project-header");

		/**
		 * @type {HTMLLinkElement}
		 */
		const projectNameElement = projectHeaderElement.querySelector(".project-name");

		/**
		 * @type {HTMLUListElement}
		 */
		const projectLinkListElement = projectListItemElement.querySelector(".project-link-list");

		/**
		 * @type {HTMLSpanElement}
		 */
		const projectDescriptionElement = projectListItemElement.querySelector(".project-description");

		/**
		 * @type {HTMLUListElement}
		 */
		const projectMissionListElement = projectListItemElement.querySelector(".project-mission-list");

		if (project.missions) {
			for (const mission of project.missions) {
				const missionListItemElement = document.createElement("li");

				missionListItemElement.textContent = mission;

				projectMissionListElement.appendChild(missionListItemElement);
			}
		}
		else {
			projectMissionListElement.remove();
		}

		/**
		 * @type {HTMLUListElement}
		 */
		const projectTechnologyListElement = projectListItemElement.querySelector(".project-technology-list");

		projectNameElement.textContent = project.name;

		if (project.siteUrl) {
			/**
			 * @type {HTMLLinkElement}
			 */
			// @ts-ignore
			const projectLinkListItemElement = template.content.querySelector(".project-site-link-list-item").cloneNode(true);

			/**
			 * @type {HTMLAnchorElement}
			 */
			const projectLinkElement = projectLinkListItemElement.querySelector(".project-link");

			projectLinkElement.href = project.siteUrl;

			projectLinkListElement.appendChild(projectLinkListItemElement);
		}

		if (project.repositoryUrl) {
			/**
			 * @type {HTMLLinkElement}
			 */
			// @ts-ignore
			const projectLinkListItemElement = template.content.querySelector(".project-repository-link-list-item").cloneNode(true);

			/**
			 * @type {HTMLAnchorElement}
			 */
			const projectLinkElement = projectLinkListItemElement.querySelector(".project-link");

			projectLinkElement.href = project.repositoryUrl;

			projectLinkListElement.appendChild(projectLinkListItemElement);
		}

		projectDescriptionElement.textContent = project.description;

		for (const technologyId of project.technologyIds) {
			const technology = dataJson.technologies.find(technology => technology.id === technologyId);

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