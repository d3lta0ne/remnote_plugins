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
  LoadingSpinner,
} from '@remnote/plugin-sdk';
import React from 'react';
import { timeSince } from "../lib/utils";

const NUM_TO_LOAD_IN_BATCH = 20;
interface HistoryData {
  key: number;
  remId: RemId;
  open: boolean;
  time: number;
}

// Incorporate w/ History and just make a TOC of the most recent history item, add a back button and forward button
interface TOCItem {
  id: string;
  remId: RemId;
  label: string;
  level: number;
  open: boolean;
  parentId?: RemId;
  numbering: string;
  prefix: string;
}

// TOCItem Component
// TODO: Display items of the same parent but different "heading levels"  differently (i.e. h1 vs h3 when they aren't nested and h3 is above the h1 but they are in the same document)
const TOCItemComponent = ({
  item,
  openRem,
  toggleOpen,
}: {
  item: TOCItem;
  openRem: (remId: RemId) => void;
  toggleOpen: (item: TOCItem) => void;
}) => {
  const marginLeft = (item.level > 1 ? item.level - 1 : 0) * 4; // Adjust the factor to create a more significant visual difference between levels

  return (
    <>
      <li
        key={item.remId}
        // add it here to change font-size based on heading level size or do it w/ weight
        className={`ml-${marginLeft} rn-fontsize-base  min-w-0 overflow-hidden`}
        onClick={() => {
          // openRem(item.remId);
          toggleOpen(item);
        }}
      >
        <div className="flex">
          <img
            className="hover:rn-clr-background--hovered"
            // onClick={()=>toggleOpen(item)}
            src={`${usePlugin().rootURL}chevron_down.svg`}
            style={{
              transform: `rotate(${item.open ? 0 : -90}deg)`,
              transitionProperty: 'transform',
              transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
              transitionDuration: '150ms',
            }}
          />
          <div className='flex gap-1'>
            <span>{item.numbering}.</span>
            <span>Open: {item.open.toString()}</span>
            <span className="rn-clr-content-accent">{item.label}</span>
          </div>
        </div>
      </li>
    </>
  );
};

const findAndProcessHeaders = async (
  reactivePlugin: RNPlugin,
  parentId: RemId | undefined,
  currentLevel: number = 1,
  numberingPrefix: string = ''
) => {
  const focusedRem = await reactivePlugin.rem.findOne(parentId);
  const descendants = await focusedRem?.getDescendants();
  let tempHeaders: TOCItem[] = [];

  if (descendants) {
    let currentNumber = 1;
    for (let i = 0; i < descendants.length; i++) {
      if (await descendants[i].hasPowerup('r')) {
        const parentRemId = await descendants[i].parent;
        if (parentRemId === parentId) {
          const temp_id = (await descendants[i].getFontSize()) || 'p';
          const numbering = numberingPrefix + currentNumber;
          tempHeaders.push({
            id: temp_id,
            remId: descendants[i]._id,
            level: currentLevel,
            open: true,
            parentId: parentRemId,
            numbering: numbering,
            prefix: numberingPrefix,
            label: await reactivePlugin.richText.toString(descendants[i].text),
          });
          currentNumber++;

          const childHeaders = await findAndProcessHeaders(
            reactivePlugin,
            descendants[i]._id,
            currentLevel + 1,
            numbering + '.'
          );
          tempHeaders.push(...childHeaders);
        }
      }
    }
  }

  return tempHeaders;
};

function TableOfContents() {
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

  // TODO: Need to fix this formula
  // const toggleOpen = useTracker(async (reactivePlugin) => {

  // });
  // const toggleAllOpen = (remId: RemId) => {
  //   headers?.forEach((header) => {
  //     if (header.remId === remId) {
  //       header.open = !header.open;
  //     }
  //   });
  // };

  return (
    <>
      {headers ? (
        headers.length > 0 ? (
          <nav className="container w-full h-full p-2 cursor-none" onMouseDown={(e) => e.stopPropagation()}>
            <header className="flex justify-center rn-sticky-header">
              <h1 className="flex rn-text-heading-medium">
                Contents{' '}
                <span className='self-center rn-fontsize-small'>
                  [<span className="rn-clr-content-accent">Hide</span>]
                </span>
              </h1>
            </header>
            <ul className="flex-col items-center list-none justify-evenly">
              {headers?.map((item) => (
                <TOCItemComponent
                  key={item.remId}
                  item={item}
                  openRem={openRem}
                  toggleOpen={toggleOpen}
                />
              ))}
            </ul>
          </nav>
        ) : (
          <div>No Headers Found</div>
        )
      ) : (
        <div className="flex items-center justify-center h-full">
          <LoadingSpinner />
        </div>
      )}
    </>
  );
}

renderWidget(TableOfContents);
