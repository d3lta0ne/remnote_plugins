/** @format */

import React from 'react';
import { ITableOfContentsItems } from '../../types/ITableOfContentsItems';
import NumberIcon from "../../assets/svg/icon-hashtag.svg";

function TableOfContentsHeader(props) {
	return (
        <header className='flex justify-between pb-3 pl-3 font-medium leading-6 rn-clr-content-secondary dark:rn-clr-content-primary'>
            {/* Table of Contents Header */}
            <div className='flex rn-clr-content-primary'>
                {/* Number Sign */}
                <NumberIcon/>
                {/* Table of Content Column */}
                <span>
                    Table of contents
                </span>
                {/* Copy Button */}
                <button className='box-border inline-flex flex-row items-center self-end justify-center h-6 px-2 py-1 text-center border border-solid rounded-md cursor-pointer select-none rn-button button rn-button--Secondary rn-text-label-small rn-button--secondary rn-clr-background-primary rn-clr-content-secondary rn-clr-border-opaque rn-clr-shadow-default active:shadow-none focus:ring-2 ring-primary-60 focus:border-transparent"'>
                    {/* Copy Icon */}
                    {/* <div style={{`display: flex; align-items: center; padding-right: 4px`}}></div> */}
                    {/* Copy Text */}
                    <span className='w-max'>Copy</span>
                </button>
            </div>
        </header>
		);
}

export default TableOfContentsHeader;
