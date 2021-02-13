// import { debug, log, setDebugLevel, warn, i18n } from '../compendium-browser';

export const MODULE_NAME = 'compendium-browser';


export let SETTINGS:any;

export const registerSettings = function () {
 
	// let defaultSettings:any = {
	// 	loadedSpellCompendium: {},
	// 	loadedNpcCompendium: {},
	// };
	// game.packs.map(p => p.collection)
	// for (let compendium of game.packs) {
	// 	if (compendium['metadata']['entity'] == "Item") {
	// 		defaultSettings.loadedSpellCompendium[compendium.collection] = {
	// 			load: true,
	// 			name: `${compendium['metadata']['label']} (${compendium.collection})`
	// 		};
	// 	}
	// 	if (compendium['metadata']['entity'] == "Actor") {
	// 		defaultSettings.loadedNpcCompendium[compendium.collection] = {
	// 			load: true,
	// 			name: `${compendium['metadata']['label']} (${compendium.collection})`
	// 		};
	// 	}
	// }
	// // creating game setting container
	// game.settings.register(MODULE_NAME, "settings", {
	// 	name: "Compendium Browser Settings",
	// 	hint: "Settings to exclude packs from loading and visibility of the browser",
	// 	default: defaultSettings,
	// 	type: Object,
	// 	scope: 'world',
	// 	onChange: settings => {
	// 		SETTINGS = settings;
	// 	}
	// });

	// // load settings from container and apply to default settings (available compendie might have changed)
	// let settings = game.settings.get(MODULE_NAME, 'settings');
	// for (let compKey in defaultSettings.loadedSpellCompendium) {
	// 	if (settings.loadedSpellCompendium[compKey] !== undefined) {
	// 		defaultSettings.loadedSpellCompendium[compKey].load = settings.loadedSpellCompendium[compKey].load;
	// 	}
	// }
	// for (let compKey in defaultSettings.loadedNpcCompendium) {
	// 	if (settings.loadedNpcCompendium[compKey] !== undefined) {
	// 		defaultSettings.loadedNpcCompendium[compKey].load = settings.loadedNpcCompendium[compKey].load;
	// 	}
	// }
	// defaultSettings.allowSpellBrowser = settings.allowSpellBrowser ? true : false;
	// defaultSettings.allowFeatBrowser = settings.allowFeatBrowser ? true : false;
	// defaultSettings.allowItemBrowser = settings.allowItemBrowser ? true : false;
	// defaultSettings.allowNpcBrowser = settings.allowNpcBrowser ? true : false;

	// game.settings.register(MODULE_NAME, "allowSpellBrowser", {
	// 	name: "allowSpellBrowser",
	// 	hint: "allowSpellBrowser",
	// 	scope: "world",
	// 	config: true,
	// 	default: true,
	// 	type: Boolean
	// });
	// game.settings.register(MODULE_NAME, "allowFeatBrowser", {
	// 	name: "allowFeatBrowser",
	// 	hint: "allowFeatBrowser",
	// 	scope: "world",
	// 	config: true,
	// 	default: true,
	// 	type: Boolean
	// });
	// game.settings.register(MODULE_NAME, "allowItemBrowser", {
	// 	name: "allowItemBrowser",
	// 	hint: "allowItemBrowser",
	// 	scope: "world",
	// 	config: true,
	// 	default: true,
	// 	type: Boolean
	// });
	// game.settings.register(MODULE_NAME, "allowNpcBrowser", {
	// 	name: "allowNpcBrowser",
	// 	hint: "allowNpcBrowser",
	// 	scope: "world",
	// 	config: true,
	// 	default: true,
	// 	type: Boolean
	// });


	// if (game.user.isGM) {
	// 	game.settings.set(MODULE_NAME, 'settings', defaultSettings);
	// 	console.log("New default settings set");
	// 	console.log(defaultSettings);
	// }
	// SETTINGS = defaultSettings;

	// // SAVE SETTINGS

	// game.settings.set(MODULE_NAME, 'settings', SETTINGS);
}