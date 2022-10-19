/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Quest } from "./Quest";
import type { QuestStatus } from "./QuestStatus";
import type { User } from "./User";

export type QuestParticipation = {
  status: QuestStatus;
  quest: Quest;
  user: User;
};
