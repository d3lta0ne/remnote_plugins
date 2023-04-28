import {
    usePlugin,
    renderWidget,
    useTracker,
    SelectionType,
    WidgetLocation,
    useRunAsync,
    RemViewer,
    Rem,
    RemId,
    RichTextInterface,
    RNPlugin,
} from '@remnote/plugin-sdk';
import React from 'react';

const NUM_TO_LOAD_IN_BATCH = 20;

interface TOCItem {
  id: string;
  remId: RemId;
  label: string;
  level: number;
  open: boolean;
  parentId?: RemId;
  numbering: string;
}

// TOCItem Component
// TODO: Display items of the same parent but different "heading levels"  differently (i.e. h1 vs h3 when they aren't nested and h3 is above the h1 but they are in the same document)
const TOCItemComponent = ({ item, openRem, toggleOpen }: { item: TOCItem; openRem: (remId: RemId) => void; toggleOpen: (remId: RemId) => void }) => {
  const marginLeft = (item.level > 1 ? item.level - 1 : 0) * 4; // Adjust the factor to create a more significant visual difference between levels

  return (
    <li
      key={item.remId}
      className={`ml-${marginLeft} text-sm py-1 cursor-pointer hover:text-blue-600`}
      onClick={() => {
        openRem(item.remId);
        toggleOpen(item.remId);
      }}
    >
      {item.level}. {item.label}
    </li>
  );
};

// const processHeaders = async (descendants: Rem[] | undefined, parentId: RemId | undefined = undefined, currentLevel: number = 1, numberingPrefix: string = "") => {
//   let tempHeaders: TOCItem[] = [];

//   if (descendants) {
//     let currentNumber = 1;
//     for (let i = 0; i < descendants.length; i++) {
//       if (await descendants[i].hasPowerup("r")) {
//         const parentRemId = await descendants[i].getParent();
//         if (parentRemId === parentId) {
//           const temp_id = await descendants[i].getFontSize() || "p";
//           const numbering = numberingPrefix + currentNumber;
//           tempHeaders.push({
//             id: temp_id,
//             remId: descendants[i]._id,
//             level: currentLevel,
//             open: false,
//             parentId,
//             numbering
//           });
//           currentNumber++;

//           const childDescendants = await descendants[i].getDescendants();
//           const childHeaders = await processHeaders(childDescendants, descendants[i]._id, currentLevel + 1, numbering + ".");
//           tempHeaders.push(...childHeaders);
//         }
//       }
//     }
//   }

//   return tempHeaders;
// };

const findAndProcessHeaders = async (reactivePlugin: RNPlugin, parentId: RemId | undefined, currentLevel: number = 1, numberingPrefix: string = "") => {
  const focusedRem = await reactivePlugin.rem.findOne(parentId);
  const descendants = await focusedRem?.getDescendants();
  let tempHeaders: TOCItem[] = [];

  if (descendants)
  {
    let currentNumber = 1;
    for (let i = 0; i < descendants.length; i++)
    {
      if (await descendants[i].hasPowerup("r"))
      {
        const parentRemId = await descendants[i].parent;
        if (parentRemId === parentId)
        {
          // console.log("hi");
          const temp_id = await descendants[i].getFontSize() || "p";
          const numbering = numberingPrefix + currentNumber;
          tempHeaders.push(
            {
              id: temp_id,
              remId: descendants[i]._id,
              level: currentLevel,
              open: true,
              parentId: parentRemId,
              numbering: numbering,
              label: await reactivePlugin.richText.toString(descendants[i].text)
            });
          currentNumber++;

          const childHeaders = await findAndProcessHeaders(reactivePlugin, descendants[i]._id, currentLevel + 1, numbering + ".");
          tempHeaders.push(...childHeaders);
        }
      }
    }
  }

  return tempHeaders;
};



function TableOfContents(){
  const plugin = usePlugin();

  const headers = useTracker(async (reactivePlugin) => {
    const focusedRem = await reactivePlugin.focus.getFocusedRem();
    return await findAndProcessHeaders(reactivePlugin, focusedRem?._id);
  });
  
  // TODO: collapse and close corresponding rem on TOC click
  const openRem = async (remId: RemId) => {
    const rem = await plugin.rem.findOne(remId);
    if (rem) {
      plugin.window.openRem(rem);
    }
  };
// 
  const toggleOpen = (remId: RemId) => {
    headers?.forEach((header) => {
      if (header.remId === remId) {
        header.open = !header.open;
      }
    });
  };
  
  return (
    <>
    {headers ? (
        headers.length > 0 ? (
          <div className="h-full p-4 overflow-y-auto text-gray-700 bg-white rounded-lg shadow-md rn-clr-background-primary" onMouseDown={(e) => e.stopPropagation()}>
            <div>
              <h1 className="mb-4 text-xl font-bold">Table of Contents</h1>
                <ul className="pl-0 list-none">
                  {headers?.map((item)=>(
                    <TOCItemComponent key={item.remId} item={item} openRem={openRem} toggleOpen={toggleOpen} />
                  ))}
                </ul>
            </div>
          </div>
        ) : (
          <div>No headers .found</div>
        )
      ) : (
        <div>Loading headers...</div>
      )}
  </>
  );

}

renderWidget(TableOfContents);

