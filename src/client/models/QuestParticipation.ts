/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Quest } from "./Quest";
import type { User } from "./User";

export type QuestParticipation = {
  status: number;
  quest: Quest;
  user: User;
};
