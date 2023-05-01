/** @format */

import React from 'react';
import { ITableOfContentsItems } from '../../types/ITableOfContentsItems';

// use hgrgoups tag

function TableOfContentsItems(props) {
	return (
        <nav className='flex-1 overflow-y-auto'>
			<div className='block cursor-pointer group'>
				{/* Display: When highlighted */}
				<div className='overflow-hidden rounded-md text-gray-60 dark:text-gray-100 hover:rn-clr-background--hovered'>
					<div className='box-border flex items-center gap-3 px-1 py-2'>
						{/* Numbering */}
						<span className='rn-clr-content-secondary truncate w-[25px] h-[20px] text-right'>
							1
						</span>
						{/* Table Content Container */}
						<div className='grow flex-1 overflow-hidden max-h-[var(--rn-sidebar-item-height,20px)] leading-[var(--rn-sidebar-item-height,20px)] select-none dont-break-rich-text-viewer text-gray-60 flex items-center dark:text-gray-100'>
							{/* Table Of Content Item Name */}
							<span className='truncate rn-clr-content-primary !font-medium'>
								Cover
							</span>
						</div>
					</div>
				</div>
			</div>
		</nav>
		);
}

export default TableOfContentsItems;

// Table Item Name Style
// font-family: Inter, -apple-system, BlinkMacSystemFont, Roboto, Helvetica, sans-serif; font-weight: 400; font-size: 16px; line-height: 24px; transition-duration: 200ms; transition-timing-function: cubic-bezier(0.2, 0.8, 0.4, 1); transition-property: color, background-color;