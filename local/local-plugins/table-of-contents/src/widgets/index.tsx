/** @format */

import { RemId, AppEvents, declareIndexPlugin, ReactRNPlugin, WidgetLocation, BuiltInPowerupCodes } from '@remnote/plugin-sdk'
import '../style.css'
import '../App.css'

export const TOC_POWERUP_CODE = "table_of_contents_powerup";
export const TOC_POWERUP_KB_SHORTCUT = "toc";
export const TOC_POWERUP_SLOT_LEVEL_CODE = "_level";

async function onActivate(plugin: ReactRNPlugin) {
	
	// Register Additional Table of Contents Headings

	// Table of Contents Powerup
	await plugin.app.registerPowerup(
		"Table of Contents",
		TOC_POWERUP_CODE,
		"Tag this Rem to have it added to your Table of Contents",
		{
			slots: [
				{
				// slot code used to uniquely identify the powerup slot
				code: TOC_POWERUP_SLOT_LEVEL_CODE,
				// human readable slot code name
				name: 'Level {h1, h2, ...}',
				// (optional: false by default)
				// only allow the slot to be modified programatically
				onlyProgrammaticModifying: false,
				// (optional: false by default)
				// hide the slot - don't show it in the editor
				hidden: true,
				},
			],
		}
	);

	const TOC_POWERUP_REM = await plugin.powerup.getPowerupByCode(
		TOC_POWERUP_CODE,
	  );

	// Table of Contents Command
	await plugin.app.registerCommand({
		id: "table_of_contents",
		name: TOC_POWERUP_CODE,
		description: TOC_POWERUP_CODE,
		// keyboardShortcut: TOC_POWERUP_KB_SHORTCUT,
		// quickCode: TOC_POWERUP_CODE,
		keywords: TOC_POWERUP_CODE,
		action: async () => {
		  const rem = await plugin.focus.getFocusedRem();
		  await rem?.addPowerup(TOC_POWERUP_CODE);
		  await rem?.setPowerupProperty(
			TOC_POWERUP_CODE, // powerup code
			TOC_POWERUP_SLOT_LEVEL_CODE, // slot code
			['1'], // value (RichTextInterface)
		  );
		}
	  });

	//   Table of Content Settings
	// TODO: Remove if source/built-in code is changed for Headings
	// Create a header powerup w/ slots of levels and then just work like that until they add full function
		// maybe call table_of_contents b/c you migght not necccesiarily want to chcange text size to be listed in the table of contents
			// be able to create toc in settings by strick level heircarhy or keep parent child relationships
			// 	if using parent child relationship it will automatially include the h1-h3 headers + custom powerup, else it will exlude them
	
	// Synced Storage
	plugin.event.addListener(
		AppEvents.GlobalOpenRem,
		undefined,
		async (message) => {
		  const currentRemId = message.remId as RemId;
		  const currentRemData = (await plugin.storage.getSynced("remData")) || [];

		//   Fix this issue later on type conversions
		  if (currentRemData[0]?.remId != currentRemId) {
			await plugin.storage.setSynced("remData", [
			  {
				key: Math.random(),
				remId: currentRemId,
				open: false,
				time: new Date().getTime(),
			  },
			  ...currentRemData,
			]);
		  }
		}
	  );
	
	// Register the Table Of Contents Widget in the DocumentUnderTitle Widget location
	await plugin.app.registerWidget('table_of_contents', WidgetLocation.RightSidebar, {
		dimensions: { height: "auto", width: "100%" },
		// TODO: Edit with appropriate TOC PNG Icon
		widgetTabIcon:  "https://i.imgur.com/MLaBDJw.png",
		widgetTabTitle: "Table of Contents"
	})
}

async function onDeactivate(_: ReactRNPlugin) {}

declareIndexPlugin(onActivate, onDeactivate)
