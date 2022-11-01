/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { QuestItem } from "./QuestItem";
import type { UnlockMethod } from "./UnlockMethod";

export type Quest = {
  title: string;
  description: string;
  active_from: string;
  active_to?: string;
  unlock_method: UnlockMethod;
  location: Array<any>;
  event_id: string;
  id: string;
  items: Array<QuestItem>;
};
