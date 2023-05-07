import { RemId } from "@remnote/plugin-sdk/dist/interfaces";

/**
 * Represents a Table of Content Item.
 * @interface
 */

export interface ITableOfContentsItems {
	id: string;
	remId: RemId;
	label: string;
	level: number;
	open: boolean;
	parentId?: RemId;
	numbering: string;
	prefix: string;
	children?: ITableOfContentsItems[]; // new children property
}
  