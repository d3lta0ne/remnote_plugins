/** @format */

import React from 'react';
import { ITableOfContentsItems } from '../../types/ITableOfContentsItems';
import NumberIcon from "../../assets/svg/icon-hashtag.svg";
import CopyIcon from "../../assets/svg/icon-copy.svg"

function TableOfContentsHeader(props) {
	return (
        <header className='flex items-center justify-between p-1 font-medium leading-6 rn-clr-content-secondary dark:rn-clr-content-primary'>
            {/* Number Sign */}
            <NumberIcon/>
            {/* Table of Content Column */}
            <span>
                Table of Contents
            </span>
            {/* Copy Button */}
            <button className='inline-flex items-center self-end justify-center gap-1 border-2 rounded-md rn-clr-border-accent rn-button--primary'>
                {/* Copy Icon */}
                <CopyIcon/>
                {/* <div style={{`display: flex; align-items: center; padding-right: 4px`}}></div> */}
                {/* Copy Text */}
                <span className='w-max'>
                    Copy
                </span>
            </button>
        </header>
		);
}

export default TableOfContentsHeader;
