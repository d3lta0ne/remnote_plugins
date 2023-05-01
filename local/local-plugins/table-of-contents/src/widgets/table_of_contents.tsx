/** @format */

import {
	usePlugin,
	renderWidget,
	useTracker,
	RemId,
	RNPlugin,
	LoadingSpinner,
} from '@remnote/plugin-sdk';
import React from 'react';

function renderTableOfContents() {
	const plugin = usePlugin();
	
	async function findAndProcessHeaders(
		reactivePlugin: RNPlugin,
		parentId: RemId | undefined,
		currentLevel: number = 1,
		numberingPrefix: string = '',
	  ): Promise<TOCItem[]> {
		const focusedRem = await reactivePlugin.rem.findOne(parentId);
		const descendants = await focusedRem?.getDescendants();
		const tempHeaders: TOCItem[] = [];
	  
		if (descendants) {
		  let currentNumber = 1;
		  let childHeaders: TOCItem[] = []; // new variable to store child headers
		  for (let i = 0; i < descendants.length; i++) {
			if (await descendants[i].hasPowerup('r')) {
			  const parentRemId = await descendants[i].parent;
			  if (parentRemId === parentId) {
				const temp_id = (await descendants[i].getFontSize()) || 'p';
				const numbering =
				  currentLevel > 1
					? `${numberingPrefix}.${currentNumber}`
					: `${currentNumber}`;
				const tocItem: TOCItem = {
				  id: temp_id,
				  remId: descendants[i]._id,
				  level: currentLevel,
				  open: currentLevel === 1,
				  parentId: parentRemId,
				  numbering,
				  prefix: numberingPrefix,
				  label: await reactivePlugin.richText.toString(descendants[i].text),
				};
	  
				currentNumber++;
	  
				childHeaders = await findAndProcessHeaders(
				  reactivePlugin,
				  descendants[i]._id,
				  currentLevel + 1,
				  numbering,
				);
	  
				// check if childHeaders array is not empty
				if (childHeaders.length) {
				// sets the children property of the parent TOCItem
				  tocItem.children = childHeaders;
				}
	  
				tempHeaders.push(tocItem);
			  }
			}
		  }
		}
	  
		return tempHeaders;
	  }
	  
	const headers = useTracker(async (reactivePlugin) => {
		const focusedRem = await reactivePlugin.focus.getFocusedRem();
		return await findAndProcessHeaders(reactivePlugin, focusedRem?._id);
	});

	// TODO: collapse and close corresponding rem on TOC click
		// change to focus rem
	const openRem = async (remId: RemId) => {
		const rem = await plugin.rem.findOne(remId);
		if (rem) {
			plugin.window.openRem(rem);
		}
	};

	return (
		<>
			{headers ? (
				headers.length > 0 ? (
					<nav
						className='container w-full h-full p-2 cursor-none'
						onMouseDown={(e) => e.stopPropagation()}>
						<header className='flex justify-center rn-sticky-header'>
							<h1 className='flex content-center gap-2 rn-text-heading-medium'>
								<span>Contents</span>
								<span className='rn-fontsize-small'>
									[<span className='rn-clr-content-accent'>Hide</span>]
								</span>
							</h1>
						</header>
						<ol className='flex-col items-center list-decimal justify-evenly'>
							<TableOfContents headers={headers} openRem={openRem} />
						</ol>
					</nav>
				) : (
					<div>No Headers Found</div>
				)
			) : (
				<div className='flex items-center justify-center h-full'>
					<LoadingSpinner />
				</div>
			)}
		</>
	);
}


// TOCItem Component
// TODO: Display items of the same parent but different "heading levels"  differently (i.e. h1 vs h3 when they aren't nested and h3 is above the h1 but they are in the same document)
function renderTableOfContentItems(item: TOCItem, openRem: (remId: RemId) => void) {
	// TODO: Fix this for headings that are more deeply nested.
	const marginLeft = (item.level > 1 ? item.level - 1 : 0) * 4; // Adjust the factor to create a more significant visual difference between levels
		
	return (
			<li
				key={item.remId}
				// add it here to change font-size based on heading level size or do it w/ weight
				className={`ml-${marginLeft} rn-fontsize-base flex-0 flex-shrink-0 flex-auto min-w-0`}
				onClick={(item) => {
					openRem(item.remId);
				}}>
				<div className='flex items-center gap-1'>
					<span className='rn-clr-content-accent'>{item.label}</span>
					{/* Conditionally render the chevron based on whether the item has children */}
					{item.children && item.children.length > 0 ? (
						<img
							className='hover:rn-clr-background--hovered'
							src={`${usePlugin().rootURL}chevron_down.svg`}
							style={{
								transform: `rotate(${item.open ? -90 : 0}deg)`,
								transitionProperty: 'transform',
								transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
								transitionDuration: '150ms',
							}}
						/>
					) : null}
				</div>
				{item.children && item.children.length > 0 && item.open ? (
					<ol style={{ paddingLeft: '8px' }}>
					{/* Recursively render child items */}
					{item.children.map((child) => (
						<React.Fragment key={child.remId}>
						{renderTableOfContentItems(child, openRem)}
						</React.Fragment>
					))}
					</ol>
				) : null}
			</li>		
	);
}

renderWidget(renderTableOfContents);
