/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { ItemBase } from "./ItemBase";
import type { UserBase } from "./UserBase";

export type ItemOwnership = {
  obtained_at: string;
  id: string;
  item: ItemBase;
  owner: UserBase;
};
