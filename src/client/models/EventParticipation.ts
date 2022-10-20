/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Event } from "./Event";
import type { User } from "./User";

export type EventParticipation = {
  status: number;
  event: Event;
  user: User;
};
