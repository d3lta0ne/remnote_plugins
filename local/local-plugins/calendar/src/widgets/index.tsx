/** @format */

import { declareIndexPlugin, ReactRNPlugin, useRunAsync, WidgetLocation } from '@remnote/plugin-sdk'
import '../style.css'
import '../App.css'

async function onActivate(plugin: ReactRNPlugin) {
	// Show a toast notification to the user.
	await plugin.app.toast("I'm a toast!")

	// Create Calendar Rem
	const CalendarRem = useRunAsync(async () => await plugin.rem.createRem(), []);

	// Register a sidebar widget.
	await plugin.app.registerWidget('sidebar_widget', WidgetLocation.LeftSidebar, {
		dimensions: { height: 'auto', width: '100%' },
	})

	await plugin.window.openWidgetInPane;
}

async function onDeactivate(_: ReactRNPlugin) {}

declareIndexPlugin(onActivate, onDeactivate)
