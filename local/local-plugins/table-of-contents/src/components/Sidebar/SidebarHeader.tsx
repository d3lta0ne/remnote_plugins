import React, { useState } from 'react';
import SidebarIcon from '../../assets/svg/icon-sidebar.svg';


/**
 * Renders a single tab in the Sidebar header
 * @param {Object} props - Properties passed to the component
 * @param {string} props.tabName - The name of the tab
 * @param {string} props.selectedTab - The currently selected tab
 * @param {number} props.tabPosition - The position of the tab in the header
 * @param {Function} props.onTabClick - Function to handle clicking on a tab
 * @returns {JSX.Element} - Returns JSX to render a single tab
 */
function SidebarTab(props) {
    const isSelected = props.selectedTab === props.tabName;
  
    return (
      <button
        className={`z-10 flex items-center justify-center rounded-lg flex-1 rn-fontsize-medium text-center cursor-default rn-clr-content-primary dark:rn-clr-content-primary 
        ${isSelected ? 'dark:rn-clr-background-elevation-50' : '' } ${!isSelected ? 'hover:rn-clr-background--hovered' : '' }`}
        onClick={() => props.onTabClick(props.tabName)}
      >
        <span>{props.tabName}</span>
      </button>
    );
  }


/**
 * Renders the header section of the Sidebar
 * @param {Object} props - Properties passed to the component
 * @param {string} props.selectedTab - The currently selected tab
 * @param {Function} props.tabSelection - Function to handle selecting a tab
 * @returns {JSX.Element} - Returns JSX to render the header section of the Sidebar
 */
function SidebarHeader(props) {
    // TODO: Turn into a table to make dynamic
    const tabPositions = { 'Table of Contents': 0, History: 126 };
     
    return (
    <header className='flex items-center justify-between gap-2 px-4 py-2'>
        {/* Tab Header Container */}
        <nav className="relative flex items-center w-full max-w-lg rounded-lg min-w-0box-border rn-fontsize-medium bg-gray-5 dark:rn-clr-background-elevation-10 dark:border-none rn-clr-border-opaque justify-evenly min-w-fit h-9"
            
            >
            {/* Tab Header Selection Box */}
            <mark className='absolute h-full rounded-lg bg-gray-15 dark:rn-clr-background-elevation-5'
              style={{
                  transition: 'left 150ms ease 0s',
                  width: '50%',
                  // Adjust the left position based on selected tab
                  left: props.selectedTab === 'History' ? '50%' : '0%', 
              }}/>
            
            {/* Tab Headers */}
              <menu className='inline-flex w-full h-full list-none'>
                  <SidebarTab
                    tabName="Table of Contents"
                    selectedTab={props.selectedTab}
                    tabPosition={tabPositions['Table of Contents']}
                    onTabClick={props.tabSelection}
                  />
                  <SidebarTab
                    tabName="History"
                    selectedTab={props.selectedTab}
                    tabPosition={tabPositions['History']}
                    onTabClick={props.tabSelection}
                  />
              </menu>
        </nav>

        {/* Settings Button */}
        <aside className = "flex items-center justify-center object-contain h-full cursor-pointer hover:rn-clr-background--hovered max-w-fit">
            <SidebarIcon/>
        </aside>
    </header>
    );
}

export default SidebarHeader;


