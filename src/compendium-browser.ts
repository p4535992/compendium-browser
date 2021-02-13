/**
 * This is your TypeScript entry file for Foundry VTT.
 * Register custom settings, sheets, and constants using the Foundry API.
 * Change this heading to be more descriptive to your module, or remove it.
 * Author: [your name]
 * Content License: [copyright and-or license] If using an existing system
 * 					you may want to put a (link to a) license or copyright
 * 					notice here (e.g. the OGL).
 * Software License: [your license] Put your desired license here, which
 * 					 determines how others may use and modify your module
 */
// Import JavaScript modules

import { SpellBrowser } from './scripts/SpellBrowser';

// Import TypeScript modules
import { registerSettings } from './module/settings.js';
import { preloadTemplates } from './module/preloadTemplates.js';
import { MODULE_NAME } from './module/settings';

export let debugEnabled = 0;
// 0 = none, warnings = 1, debug = 2, all = 3
export let debug = (...args) => {if (debugEnabled > 1) console.log(`DEBUG:${MODULE_NAME} | `, ...args)};
export let log = (...args) => console.log(`${MODULE_NAME} | `, ...args);
export let warn = (...args) => {if (debugEnabled > 0) console.warn(`${MODULE_NAME} | `, ...args)};
export let error = (...args) => console.error(`${MODULE_NAME} | `, ...args)
export let i18n = key => {
  return game.i18n.localize(key);
};
export let setDebugLevel = (debugText:string) => {
  debugEnabled = {"none": 0, "warn": 1, "debug": 2, "all": 3}[debugText] || 0;
  // 0 = none, warnings = 1, debug = 2, all = 3
  CONFIG.debug.hooks = debugEnabled >= 3;
}

/* ------------------------------------ */
/* Initialize module					*/
/* ------------------------------------ */

Hooks.once('init', async function () {
	console.log(`${MODULE_NAME} | Initializing ${MODULE_NAME}`);

	// Assign custom classes and constants here

	// Register custom module settings
	registerSettings();
	//CONFIG.debug.hooks = true;
	// Preload Handlebars templates
	await preloadTemplates();

});

/* ------------------------------------ */
/* Setup module							*/
/* ------------------------------------ */
Hooks.once('setup', function () {
	// Do anything after initialization but before ready
	registerSettings();
});

/* ------------------------------------ */
/* When ready							*/
/* ------------------------------------ */
Hooks.on('ready', async function() {
	// Do anything once the module is ready
	if (!game.modules.get("lib-wrapper")?.active && game.user.isGM){
    	ui.notifications.warn(`The '${MODULE_NAME}' module recommends to install and activate the 'libWrapper' module.`);
	}

    if (game.compendiumBrowser === undefined) {
        game.compendiumBrowser = new SpellBrowser();
        await game.compendiumBrowser.initializeContent();
    }

    // Spellfilters

    game.compendiumBrowser.addSpellFilter(game.i18n.localize("CMPBrowser.general"), game.i18n.localize("DND5E.Source"), 'data.source', 'text');
    game.compendiumBrowser.addSpellFilter(game.i18n.localize("CMPBrowser.general"), game.i18n.localize("CMPBrowser.lvl"), 'data.level', 'multiSelect', [game.i18n.localize("CMPBrowser.cantip"), 1, 2, 3, 4, 5, 6, 7, 8, 9]);
    game.compendiumBrowser.addSpellFilter(game.i18n.localize("CMPBrowser.general"), game.i18n.localize("CMPBrowser.school"), 'data.school', 'select', CONFIG.DND5E.spellSchools);
    game.compendiumBrowser.addSpellFilter(game.i18n.localize("CMPBrowser.general"), game.i18n.localize("CMPBrowser.castingTime"), 'data.activation.type', 'select',
        {
            action: game.i18n.localize("DND5E.Action"),
            bonus: game.i18n.localize("CMPBrowser.bonusAction"),
            reaction: game.i18n.localize("CMPBrowser.reaction"),
            minute: game.i18n.localize("DND5E.TimeMinute"),
            hour: game.i18n.localize("DND5E.TimeHour"),
            day: game.i18n.localize("DND5E.TimeDay")
        });
    game.compendiumBrowser.addSpellFilter(game.i18n.localize("CMPBrowser.general"), game.i18n.localize("CMPBrowser.spellType"), 'data.actionType', 'select', CONFIG.DND5E.itemActionTypes);
    game.compendiumBrowser.addSpellFilter(game.i18n.localize("CMPBrowser.general"), game.i18n.localize("CMPBrowser.damageType"), 'damageTypes', 'select', CONFIG.DND5E.damageTypes);
    game.compendiumBrowser.addSpellFilter(game.i18n.localize("CMPBrowser.general"), game.i18n.localize("CMPBrowser.class"), 'data.classes', 'select',
        {
            artificer: game.i18n.localize("CMPBrowser.artificer"),
            barbarian: game.i18n.localize("CMPBrowser.barbarian"),
            bard: game.i18n.localize("CMPBrowser.bard"),
            cleric: game.i18n.localize("CMPBrowser.cleric"),
            druid: game.i18n.localize("CMPBrowser.druid"),
            fighter: game.i18n.localize("CMPBrowser.fighter"),
            monk: game.i18n.localize("CMPBrowser.monk"),
            paladin: game.i18n.localize("CMPBrowser.paladin"),
            rogue: game.i18n.localize("CMPBrowser.rogue"),
            ranger: game.i18n.localize("CMPBrowser.ranger"),
            sorcerer: game.i18n.localize("CMPBrowser.sorcerer"),
            warlock: game.i18n.localize("CMPBrowser.warlock"),
            wizard: game.i18n.localize("CMPBrowser.wizard"),
        }, true);

    game.compendiumBrowser.addSpellFilter(game.i18n.localize("CMPBrowser.components"), game.i18n.localize("CMPBrowser.ritual"), 'data.components.ritual', 'bool');
    game.compendiumBrowser.addSpellFilter(game.i18n.localize("CMPBrowser.components"), game.i18n.localize("CMPBrowser.concentration"), 'data.components.concentration', 'bool');
    game.compendiumBrowser.addSpellFilter(game.i18n.localize("CMPBrowser.components"), game.i18n.localize("CMPBrowser.verbal"), 'data.components.vocal', 'bool');
    game.compendiumBrowser.addSpellFilter(game.i18n.localize("CMPBrowser.components"), game.i18n.localize("CMPBrowser.somatic"), 'data.components.somatic', 'bool');
    game.compendiumBrowser.addSpellFilter(game.i18n.localize("CMPBrowser.components"), game.i18n.localize("CMPBrowser.material"), 'data.components.material', 'bool');

    // Feature Filters

    game.compendiumBrowser.addFeatFilter(game.i18n.localize("CMPBrowser.general"), game.i18n.localize("DND5E.Source"), 'data.source', 'text');
    game.compendiumBrowser.addFeatFilter(game.i18n.localize("CMPBrowser.general"), game.i18n.localize("CMPBrowser.class"), 'classRequirement', 'select',
        {
            artificer: game.i18n.localize("CMPBrowser.artificer"),
            barbarian: game.i18n.localize("CMPBrowser.barbarian"),
            bard: game.i18n.localize("CMPBrowser.bard"),
            cleric: game.i18n.localize("CMPBrowser.cleric"),
            druid: game.i18n.localize("CMPBrowser.druid"),
            fighter: game.i18n.localize("CMPBrowser.fighter"),
            monk: game.i18n.localize("CMPBrowser.monk"),
            paladin: game.i18n.localize("CMPBrowser.paladin"),
            ranger: game.i18n.localize("CMPBrowser.ranger"),
            rogue: game.i18n.localize("CMPBrowser.rogue"),
            sorcerer: game.i18n.localize("CMPBrowser.sorcerer"),
            warlock: game.i18n.localize("CMPBrowser.warlock"),
            wizard: game.i18n.localize("CMPBrowser.wizard")
        }, true);

    game.compendiumBrowser.addFeatFilter("Game Mechanics", game.i18n.localize("DND5E.ItemActivationCost"), 'data.activation.type', 'select', CONFIG.DND5E.abilityActivationTypes);
    game.compendiumBrowser.addFeatFilter("Game Mechanics", game.i18n.localize("CMPBrowser.damageType"), 'damageTypes', 'select', CONFIG.DND5E.damageTypes);
    game.compendiumBrowser.addFeatFilter("Game Mechanics", "Uses Resources", 'usesRessources', 'bool');


    // Item Filters

    game.compendiumBrowser.addItemFilter(game.i18n.localize("CMPBrowser.general"), game.i18n.localize("DND5E.Source"), 'data.source', 'text');
    game.compendiumBrowser.addItemFilter(game.i18n.localize("CMPBrowser.general"), "Item Type", 'type', 'select', {
        consumable: game.i18n.localize("DND5E.ItemTypeConsumable"),
        backpack: game.i18n.localize("DND5E.ItemTypeContainer"),
        equipment: game.i18n.localize("DND5E.ItemTypeEquipment"),
        loot: game.i18n.localize("DND5E.ItemTypeLoot"),
        tool: game.i18n.localize("DND5E.ItemTypeTool"),
        weapon: game.i18n.localize("DND5E.ItemTypeWeapon")
    });
    game.compendiumBrowser.addItemFilter(game.i18n.localize("CMPBrowser.general"), "Packs", 'matchedPacks', 'select',
        {
            burglar: "Burglar's Pack",
            diplomat: "Diplomat's Pack",
            dungeoneer: "Dungeoneer's Pack",
            entertainer: "Entertainer's Pack",
            explorer: "Explorer's Pack",
            monsterhunter: "Monster Hunter's Pack",
            priest: "Priest's Pack",
            scholar: "Scholar's Pack",
        }, true);

    game.compendiumBrowser.addItemFilter("Game Mechanics", game.i18n.localize("DND5E.ItemActivationCost"), 'data.activation.type', 'select', CONFIG.DND5E.abilityActivationTypes);
    game.compendiumBrowser.addItemFilter("Game Mechanics", game.i18n.localize("CMPBrowser.damageType"), 'damageTypes', 'select', CONFIG.DND5E.damageTypes);
    game.compendiumBrowser.addItemFilter("Game Mechanics", "Uses Resources", 'usesRessources', 'bool');

    game.compendiumBrowser.addItemFilter("Item Subtype", "Weapon", 'data.weaponType', 'text', CONFIG.DND5E.weaponTypes);
    game.compendiumBrowser.addItemFilter("Item Subtype", "Equipment", 'data.armor.type', 'text', CONFIG.DND5E.equipmentTypes);
    game.compendiumBrowser.addItemFilter("Item Subtype", "Consumable", 'data.consumableType', 'text', CONFIG.DND5E.consumableTypes);

    game.compendiumBrowser.addItemFilter("Magic Items", "Rarity", 'data.rarity', 'select', {
        Common: "Common",
        Uncommon: "Uncommon",
        Rare: "Rare",
        "Very rare": "Very Rare",
        Legendary: "Legendary"
    });

    // NPC Filters

    game.compendiumBrowser.addNpcFilter(game.i18n.localize("CMPBrowser.general"), game.i18n.localize("DND5E.Source"), 'data.details.source', 'text');
    game.compendiumBrowser.addNpcFilter(game.i18n.localize("CMPBrowser.general"), game.i18n.localize("CMPBrowser.size"), 'data.traits.size', 'select', CONFIG.DND5E.actorSizes);
    game.compendiumBrowser.addNpcFilter(game.i18n.localize("CMPBrowser.general"), game.i18n.localize("CMPBrowser.hasSpells"), 'hasSpells', 'bool');
    game.compendiumBrowser.addNpcFilter(game.i18n.localize("CMPBrowser.general"), game.i18n.localize("CMPBrowser.hasLegAct"), 'data.resources.legact.max', 'bool');
    game.compendiumBrowser.addNpcFilter(game.i18n.localize("CMPBrowser.general"), game.i18n.localize("CMPBrowser.hasLegRes"), 'data.resources.legres.max', 'bool');
    game.compendiumBrowser.addNpcFilter(game.i18n.localize("CMPBrowser.general"), game.i18n.localize("CMPBrowser.cr"), 'data.details.cr', 'numberCompare');
    game.compendiumBrowser.addNpcFilter(game.i18n.localize("CMPBrowser.general"), game.i18n.localize("CMPBrowser.creatureType"), 'data.details.type', 'text', {
        aberration: game.i18n.localize("CMPBrowser.aberration"),
        beast: game.i18n.localize("CMPBrowser.beast"),
        celestial: game.i18n.localize("CMPBrowser.celestial"),
        construct: game.i18n.localize("CMPBrowser.construct"),
        dragon: game.i18n.localize("CMPBrowser.dragon"),
        elemental: game.i18n.localize("CMPBrowser.elemental"),
        fey: game.i18n.localize("CMPBrowser.fey"),
        fiend: game.i18n.localize("CMPBrowser.fiend"),
        giant: game.i18n.localize("CMPBrowser.giant"),
        humanoid: game.i18n.localize("CMPBrowser.humanoid"),
        monstrosity: game.i18n.localize("CMPBrowser.monstrosity"),
        ooze: game.i18n.localize("CMPBrowser.ooze"),
        plant: game.i18n.localize("CMPBrowser.plant"),
        undead: game.i18n.localize("CMPBrowser.undead")
    });

    game.compendiumBrowser.addNpcFilter(game.i18n.localize("CMPBrowser.abilities"), game.i18n.localize("DND5E.AbilityStr"), 'data.abilities.str.value', 'numberCompare');
    game.compendiumBrowser.addNpcFilter(game.i18n.localize("CMPBrowser.abilities"), game.i18n.localize("DND5E.AbilityDex"), 'data.abilities.dex.value', 'numberCompare');
    game.compendiumBrowser.addNpcFilter(game.i18n.localize("CMPBrowser.abilities"), game.i18n.localize("DND5E.AbilityCon"), 'data.abilities.con.value', 'numberCompare');
    game.compendiumBrowser.addNpcFilter(game.i18n.localize("CMPBrowser.abilities"), game.i18n.localize("DND5E.AbilityInt"), 'data.abilities.int.value', 'numberCompare');
    game.compendiumBrowser.addNpcFilter(game.i18n.localize("CMPBrowser.abilities"), game.i18n.localize("DND5E.AbilityWis"), 'data.abilities.wis.value', 'numberCompare');
    game.compendiumBrowser.addNpcFilter(game.i18n.localize("CMPBrowser.abilities"), game.i18n.localize("DND5E.AbilityCha"), 'data.abilities.cha.value', 'numberCompare');

    game.compendiumBrowser.addNpcFilter(game.i18n.localize("CMPBrowser.dmgInteraction"), game.i18n.localize("DND5E.DamImm"), 'data.traits.di.value', 'multiSelect', CONFIG.DND5E.damageTypes, true);
    game.compendiumBrowser.addNpcFilter(game.i18n.localize("CMPBrowser.dmgInteraction"), game.i18n.localize("DND5E.DamRes"), 'data.traits.dr.value', 'multiSelect', CONFIG.DND5E.damageTypes, true);
    game.compendiumBrowser.addNpcFilter(game.i18n.localize("CMPBrowser.dmgInteraction"), game.i18n.localize("DND5E.DamVuln"), 'data.traits.dv.value', 'multiSelect', CONFIG.DND5E.damageTypes, true);
    game.compendiumBrowser.addNpcFilter(game.i18n.localize("CMPBrowser.dmgInteraction"), game.i18n.localize("DND5E.ConImm"), 'data.traits.ci.value', 'multiSelect', CONFIG.DND5E.conditionTypes, true);
    game.compendiumBrowser.addNpcFilter(game.i18n.localize("CMPBrowser.dmgInteraction"), game.i18n.localize("CMPBrowser.dmgDealt"), 'damageDealt', 'multiSelect', CONFIG.DND5E.damageTypes, true);
});

// Add any additional hooks if necessary

// setup all the hooks


