/** @format */
import {
	usePlugin,
	useTracker,
	RemId,
	RNPlugin,
	LoadingSpinner,
} from '@remnote/plugin-sdk';
import React from 'react';
import TableOfContentsItems from './TableOfContentsItems';
import TableOfContentsHeader from './TableOfContentsHeader';

function TableOfContents() {
    const plugin = usePlugin();
	
	async function findAndProcessHeaders(
		reactivePlugin: RNPlugin,
		parentId: RemId | undefined,
		currentLevel: number = 1,
		numberingPrefix: string = '',
	  ){
		const focusedRem = await reactivePlugin.rem.findOne(parentId);
		const descendants = await focusedRem?.getDescendants();
		const tempHeaders: any[] = [];
	  
		if (descendants) {
		  let currentNumber = 1;
		  let childHeaders: any[] = []; // new variable to store child headers
		  for (let i = 0; i < descendants.length; i++) {
			if (await descendants[i].hasPowerup('r')) {
			  const parentRemId = await descendants[i].parent;
			  if (parentRemId === parentId) {
				const temp_id = (await descendants[i].getFontSize()) || 'p';
				const numbering =
				  currentLevel > 1
					? `${numberingPrefix}.${currentNumber}`
					: `${currentNumber}`;
				const tocItem: any = {
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

	return (
		<nav className='flex flex-col flex-1 px-4 py-2 overflow-hidden'>
			{/* Table of Contents Header */}
			<TableOfContentsHeader/>
			
			{/* Table of Content Items */}
			{/* <TableOfContentsItems/> */}


		</nav>
		// <main>
		//   {headers ? (
		// 	headers.length > 0 ? (
		// 	  <nav
		// 		className='container w-full h-full p-2 cursor-none'
		// 		onMouseDown={(e) => e.stopPropagation()}>
		// 		<header className='flex justify-center rn-sticky-header'>
		// 		  <h1 className='flex content-center gap-2 rn-text-heading-medium'>
		// 			<span>Contents</span>
		// 			<span className='rn-fontsize-small'>
		// 			  [<span className='rn-clr-content-accent'>Hide</span>]
		// 			</span>
		// 		  </h1>
		// 		</header>
		// 		<ol className='flex-col items-center list-decimal justify-evenly'>
		// 			<h1>hi</h1>
		// 		  {/* <TableOfContentsItems items={headers} openItem={openRem} /> */}
		// 		</ol>
		// 	  </nav>
		// 	) : (
		// 	  <div>No Headers Found</div>
		// 	)
		//   ) : (
		// 	headers !== null && <div className='flex items-center justify-center h-full'>
		// 	  <LoadingSpinner />
		// 	</div>
		//   )}
		// </main>
	  );
	  
}

export default TableOfContents;
