/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { UnlockMethod } from "./UnlockMethod";

export type QuestCreate = {
  title: string;
  description: string;
  active_from: string;
  active_to?: string;
  unlock_method: UnlockMethod;
};
