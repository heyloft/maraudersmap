/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { ItemType } from "./ItemType";

export type Item = {
  title: string;
  item_type: ItemType;
  description?: string;
  icon: string;
  id: string;
};
