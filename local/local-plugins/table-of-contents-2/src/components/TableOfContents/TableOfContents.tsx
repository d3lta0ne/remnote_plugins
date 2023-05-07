/** @format */
import {
	usePlugin,
	useTracker,
	RemId,
	RNPlugin,
	LoadingSpinner,
} from '@remnote/plugin-sdk';
import React, { Suspense } from 'react';
import TableOfContentsItems from './TableOfContentsItems';
import { ITableOfContentsItems } from '../../types/ITableOfContentsItems';
import TableOfContentsHeader from './TableOfContentsHeader';
import History from '../History/History';

export default function TableOfContents() {
    const plugin = usePlugin();
	
	async function findAndProcessHeaders(
		reactivePlugin: RNPlugin,
		parentId: RemId | undefined,
		currentLevel: number = 1,
		numberingPrefix: string = '',
	  ) : Promise<ITableOfContentsItems[]> {
		const focusedRem = await reactivePlugin.rem.findOne(parentId);
		const descendants = await focusedRem?.getDescendants();
		const tempHeaders: ITableOfContentsItems[] = [];
	  
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
	
	const focusedRem = useTracker(async (reactivePlugin) => await reactivePlugin.focus.getFocusedRem());

	const headers = useTracker(async (reactivePlugin) => await findAndProcessHeaders(reactivePlugin, focusedRem?._id), [focusedRem]);
	  
	const openRem = async (remId: RemId) => {
		const rem = await plugin.rem.findOne(remId);
		if (rem) {
			plugin.window.openRem(rem);
		}
	};

	// const deferredQuery = useDeferredValue(query);
	// const [query, setQuery] = useState('');

	// use memo b/c it ill go stale
	return (
		<Suspense 
			fallback={<History/>}>
			{headers ? 
				(	
					// If headers is 0 use the last computed table of contents from history until you can't find one
						//if nothing is there then say there are not headers
					<nav className='flex-col px-4 py-2'
						onMouseDown={(e) => e.stopPropagation()}>
						{/* Table of Contents Header */}
						<TableOfContentsHeader focusRem={focusedRem}/>
						
						{/* Table of Content Items Container */}
						<section className='flex-1 overflow-y-auto'>
							<TableOfContentsItems items={headers} />
						</section>
					</nav>
				) : 
				(
					<div className='flex items-center justify-center w-full min-h-screen'>
						<LoadingSpinner/>
					</div>
				)
			}
		</Suspense>
	  );	  
}