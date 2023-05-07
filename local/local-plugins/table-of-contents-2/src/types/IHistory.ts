import { RemId } from "@remnote/plugin-sdk/dist/interfaces";
import { ITableOfContentsItems } from "./ITableOfContentsItems";

/**
 * Represents History Data.
 * @interface
 */

export interface IHistory {
	key: number;
	remId: RemId;
	time: number;
	// Issue is that this table of contents might not be updated correctly, how do I cache this infromation?
	table_of_contents?: ITableOfContentsItems;
}
