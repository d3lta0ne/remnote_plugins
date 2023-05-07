/** @format */

import React, { StrictMode, useEffect } from 'react';
import {
	RemHierarchyEditorTree,
	RemId,
	RemViewer,
  RemViewerProps,
	renderWidget,
	usePlugin,
	useSyncedStorageState,
} from '@remnote/plugin-sdk';

import Sidebar from "../components/Sidebar/Sidebar";

function SidebarWidget() {
	return (
		<StrictMode>
			<Sidebar/>
		</StrictMode>
    );
}

renderWidget(SidebarWidget);
