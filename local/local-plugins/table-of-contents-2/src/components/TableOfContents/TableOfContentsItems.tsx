/** @format */

import React, { Suspense } from 'react';
import { ITableOfContentsItems } from '../../types/ITableOfContentsItems';
import { LoadingSpinner } from '@remnote/plugin-sdk';

// use hgrgoups tag
// use deefeerd query
// const deferredQuery = useDeferredValue(query);


function TableOfContentsItems({ items } : { items: ITableOfContentsItems[]}) {	
	return (
			 <nav className='flex-1 overflow-y-auto list-none'>
				{console.log("Posting TOC items: " + items.length)}
				<ol>
					{items.map((item) => 
							(
								<li 
									key={item.remId}
									className={`m-[${item.level * 4}] overflow-hidden rounded-md cursor-pointer hover:rn-clr-background--hovered`}>
									
									<div className='flex items-center justify-center gap-3 p-3'>
										{/* Numbering */}
										<span className='rn-clr-content-primary'>
											{item.numbering}
										</span>
										{/* Table Of Content Item Name */}
										<span className='flex items-center flex-1 overflow-hidden truncate rn-clr-content-accent'>
											{item.label}
										</span>
									</div>
									{item.children && item.children.length > 0 && item.open ? (
										<ol style={{ paddingLeft: '8px' }}>
											{/* Recursively render child items */}
												<TableOfContentsItems items={item.children}/>
										</ol>
									) : null}
								</li>
							)
						)
					}
				</ol>	
			</nav>
		);
}

export default TableOfContentsItems;
