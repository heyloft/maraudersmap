/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { UnlockMethod } from "./UnlockMethod";

export type QuestItemCreate = {
  location?: Array<any>;
  unlock_method: UnlockMethod;
  item_id: string;
};
