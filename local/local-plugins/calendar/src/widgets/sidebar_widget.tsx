/** @format */

import { usePlugin, renderWidget, useTracker } from '@remnote/plugin-sdk'
import Calendar from './Calendar'

export const SampleWidget = () => {
	const plugin = usePlugin()


	return (
		<></>
		// <Calendar/>
	)
}

renderWidget(SampleWidget)
