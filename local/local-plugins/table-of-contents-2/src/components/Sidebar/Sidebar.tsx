/** @format */

import React, { useEffect, useState } from 'react';

import SidebarHeader from './SidebarHeader';
import TableOfContents from '../TableOfContents/TableOfContents';
import History from '../History/History';

function Sidebar() {
	const [selectedTab, setSelectedTab] = useState('Table of Contents');

    const handleTabClick = (tabName) => {
		setSelectedTab(tabName);
	  };
	
	return (
        <aside className='container flex flex-col w-full h-full'>
            {/* Sidebar Header */}
			<SidebarHeader selectedTab={selectedTab} tabSelection={handleTabClick} />
			{/* Display Sidebar Tab Content*/}
            <>
				<TableOfContents />
				{/* {selectedTab === 'Table of Contents' ? 
				(
					// <></>
					<TableOfContents />
				) : 
				(
					<></>
					// <History />
				)} */}
            </>
        </aside>
	);
}

export default Sidebar;
