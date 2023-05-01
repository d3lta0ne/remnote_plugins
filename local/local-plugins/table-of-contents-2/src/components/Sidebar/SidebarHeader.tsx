import React, { useState } from 'react';
import SidebarIcon from '../../assets/svg/icon-sidebar.svg';


function SidebarTab(props) {
    const isSelected = props.selectedTab === props.tabName;
  
    return (
      <button
        className={`z-10 flex items-center justify-center flex-1 font-medium leading-6 text-center rounded-lg cursor-default rn-clr-content-primary dark:rn-clr-content-primary ${
          isSelected ? 'dark:rn-clr-background-elevation-50' : ''
        }`}
        onClick={() => props.onTabClick(props.tabName)}
      >
        <span>{props.tabName}</span>
      </button>
    );
  }


function SidebarHeader(props) {
    // TODO: Turn into a table to make dynamic
    const tabPositions = { 'Table of Contents': 0, History: 126 };
     
    return (
    <header className='flex items-center justify-between gap-2 px-4 py-2'>
        {/* Tab Header Container */}
        <nav className="relative flex items-center w-full max-w-lg rounded-lg min-w-0box-border rn-fontsize-medium bg-gray-5 dark:rn-clr-background-elevation-10 dark:border-none rn-clr-border-opaque justify-evenly min-w-fit h-9"
            style={{
                boxShadow: 'rgba(65, 65, 85, 0.06) 0px 1px 4px, rgba(65, 65, 85, 0.1) 0px 0px 0px 0.5px inset'                }}
            >
            {/* Tab Header Selection Box */}
            <mark className='absolute rounded-lg h-7 bg-gray-15 dark:rn-clr-background-elevation-5'
              style={{
                  transition: 'left 150ms ease 0s',
                  width: '50%',
                  // Adjust the left position based on selected tab
                  left: props.selectedTab === 'History' ? '50%' : '0', 
              }}/>
            
            {/* Tab Headers */}
              <menu className='flex w-full list-none'>
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
        <aside className = "icon-button hover:rn-clr-background--hovered cursor-pointer rounded object-contain max-w-fit p-0.5">
            <SidebarIcon/>
        </aside>
    </header>
    );
}

export default SidebarHeader;


