/** @format */

import React from 'react';
import { memo} from 'react';
import { ITableOfContentsItems } from '../../types/ITableOfContentsItems';
import NumberIcon from "../../assets/svg/icon-hashtag.svg";
import CopyIcon from "../../assets/svg/icon-copy.svg"
import { Rem } from '@remnote/plugin-sdk';

const TableOfContentsHeader = memo(function TableOfContentsHeader({ focusRem } : { focusRem: Rem | undefined}) {
	return (
        <header className='flex items-center justify-between p-1 rn-leading-base align-center rn-fontsize-medium rn-clr-content-secondary dark:rn-clr-content-primary'>
            {/* Number Sign
            <NumberIcon/> */}
            {/* Table of Content Column */}
            <span>
                Table of Contents
            </span>
            {/* Copy Button */}
            {/* TODO: Fix button and hover events --- make button div represent a bigger space / give a border line too */}
            <button className='inline-flex items-center self-end justify-center h-full gap-1 align-middle rn-button--primary hover:rn-clr-background--hovered rn-text-label-small button rn-clr-border-accent'>
                {/* Copy Icon */}
                <CopyIcon/>
                {/* Copy Text */}
                <span className='w-max'>
                    Copy
                </span>
            </button>
        </header>
		);
});

export default TableOfContentsHeader;
