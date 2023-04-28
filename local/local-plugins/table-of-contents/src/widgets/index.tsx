/** @format */

import { declareIndexPlugin, ReactRNPlugin, WidgetLocation } from '@remnote/plugin-sdk'
import '../style.css'
import '../App.css'

async function onActivate(plugin: ReactRNPlugin) {
	// Register Additional Table of Contents Headings

	// Register the Table Of Contents Widget in the DocumentUnderTitle Widget location
	await plugin.app.registerWidget('table_of_contents', WidgetLocation.RightSidebar, {
		dimensions: {
			height: 'auto',
			width: '100%',
		},
	})
}

async function onDeactivate(_: ReactRNPlugin) {}

declareIndexPlugin(onActivate, onDeactivate)
