/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Item } from "./Item";
import type { User } from "./User";

export type ItemOwnership = {
  obtained_at: string;
  id: string;
  item: Item;
  owner: User;
};
