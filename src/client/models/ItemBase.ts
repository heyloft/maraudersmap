/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { ItemType } from "./ItemType";

export type ItemBase = {
  title: string;
  item_type: ItemType;
  description?: string;
  icon: string;
  location?: Array<any>;
};
