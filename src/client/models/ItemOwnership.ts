/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { QuestItem } from "./QuestItem";
import type { User } from "./User";

export type ItemOwnership = {
  obtained_at: string;
  id: string;
  quest_item: QuestItem;
  owner: User;
};
