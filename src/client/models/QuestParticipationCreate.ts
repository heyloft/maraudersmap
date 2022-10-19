/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { QuestStatus } from "./QuestStatus";

export type QuestParticipationCreate = {
  status: QuestStatus;
  quest_id: string;
  user_id: string;
};
