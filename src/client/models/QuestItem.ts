/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Item } from "./Item";
import type { Quest } from "./Quest";
import type { UnlockMethod } from "./UnlockMethod";

export type QuestItem = {
  location?: Array<any>;
  unlock_method: UnlockMethod;
  id: string;
  item: Item;
  quest_id: string;
  quest: Quest;
};
