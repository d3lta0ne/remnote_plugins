/** @format */

import React, { useEffect } from 'react';
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
		<Sidebar/>
    );
}

renderWidget(SidebarWidget);
