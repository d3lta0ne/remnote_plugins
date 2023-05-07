/** @format */

import { declareIndexPlugin, ReactRNPlugin, WidgetLocation } from '@remnote/plugin-sdk'
import '../style.css'
import '../App.css'
import {cloze} from '../utilities/constants'

async function onActivate(plugin: ReactRNPlugin) {

	// Register settings
	await plugin.app.registerPowerup('Cloze Hint', cloze.clozePropsStorageKey, 'Add hints to clozes', {
		slots: [
		  {
			hidden: true,
			code: hintsSlotCode,
			name: 'Hints',
		  },
		],
	  });	



	// A command that inserts text into the editor if focused.
	await plugin.app.registerCommand({
		id: 'editor-command',
		name: 'Editor Command',
		action: async () => {
			plugin.editor.insertPlainText('Hello World!')
		},
	})

	// Show a toast notification to the user.
	await plugin.app.toast("I'm a toast!")

	// Register a sidebar widget.
	await plugin.app.registerWidget('widget', WidgetLocation.RightSidebar, {
		dimensions: { height: 'auto', width: '100%' },
	})
}

async function onDeactivate(_: ReactRNPlugin) {}

declareIndexPlugin(onActivate, onDeactivate)
