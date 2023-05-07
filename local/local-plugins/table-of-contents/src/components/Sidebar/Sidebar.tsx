/** @format */

import React, { Suspense, useEffect, useState } from 'react';

import SidebarHeader from './SidebarHeader';
import TableOfContents from '../TableOfContents/TableOfContents';
import History from '../History/History';
import { LoadingSpinner, RemId, usePlugin, useSyncedStorageState } from '@remnote/plugin-sdk';
import { IHistory } from '../../types/IHistory';

function Sidebar() {
	const plugin = usePlugin();

	// Maintaining History Props
	const [history, setHistory] = useSyncedStorageState<IHistory[]>('history', []);

	// Remove a History Item from synced storage.
	const closeIndex = (index: number) => {
		history.splice(index, 1);
		setHistory(history);
	}; 

	// Clear History
	const clearHistory = () => {
		setHistory([]);
	}

	// Maintaining Sidebar Header Props
	const [selectedTab, setSelectedTab] = useState('History');
    const handleTabClick = (tabName) => {
		setSelectedTab(tabName);
	  };
	
	const openRem = async (remId: RemId) => {
		const rem = await plugin.rem.findOne(remId);
		if (rem) {
			plugin.window.openRem(rem);
			setSelectedTab("Table Of Contents");
		}
	};
	
	return (
        <aside className='container flex flex-col w-full h-full '>
            {/* Sidebar Header */}
			<SidebarHeader selectedTab={selectedTab} tabSelection={handleTabClick} openRem={openRem} />
			
			{/* Display Selected Sidebar Tab Content*/}
			<Suspense fallback={
				<div className='flex items-center justify-center min-h-screen'>
					<LoadingSpinner/>
				</div>
				}>
				{selectedTab === "History" ? 
					(	
						<>
							<History />
						</>
					):
					(
						<>
							<TableOfContents />
						</>
					)}
			</Suspense>
			
        </aside>
	);
}

export default Sidebar;
