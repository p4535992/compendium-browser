import { MODULE_NAME } from './settings';

export const preloadTemplates = async function () {
	const templatePaths = [
		// Add paths to "module/XXX/templates"
		//`/modules/${MODULE_NAME}/templates/XXX.html`,
		`/modules/${MODULE_NAME}/template/spell-browser.html`,
		`/modules/${MODULE_NAME}/template/npc-browser.html`,
		`/modules/${MODULE_NAME}/template/feat-browser.html`,
		`/modules/${MODULE_NAME}/template/item-browser.html`,
		`/modules/${MODULE_NAME}/template/filter-container.html`,
		`/modules/${MODULE_NAME}/template/settings.html`
	];

	return loadTemplates(templatePaths);
}
