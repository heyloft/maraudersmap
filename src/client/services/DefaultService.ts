/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Event } from "../models/Event";
import type { EventCreate } from "../models/EventCreate";
import type { EventParticipation } from "../models/EventParticipation";
import type { EventParticipationCreate } from "../models/EventParticipationCreate";
import type { EventParticipationUpdate } from "../models/EventParticipationUpdate";
import type { Item } from "../models/Item";
import type { ItemCreate } from "../models/ItemCreate";
import type { ItemOwnership } from "../models/ItemOwnership";
import type { ItemOwnershipCreate } from "../models/ItemOwnershipCreate";
import type { Quest } from "../models/Quest";
import type { QuestCreate } from "../models/QuestCreate";
import type { QuestDependencyBase } from "../models/QuestDependencyBase";
import type { QuestDependencyCreate } from "../models/QuestDependencyCreate";
import type { QuestItem } from "../models/QuestItem";
import type { QuestItemCreate } from "../models/QuestItemCreate";
import type { QuestParticipation } from "../models/QuestParticipation";
import type { QuestParticipationCreate } from "../models/QuestParticipationCreate";
import type { QuestParticipationUpdate } from "../models/QuestParticipationUpdate";
import type { QuestStatus } from "../models/QuestStatus";
import type { User } from "../models/User";
import type { UserCreate } from "../models/UserCreate";

import type { CancelablePromise } from "../core/CancelablePromise";
import { OpenAPI } from "../core/OpenAPI";
import { request as __request } from "../core/request";

export class DefaultService {
  /**
   * Index
   * @returns string Successful Response
   * @throws ApiError
   */
  public static index(): CancelablePromise<string> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/",
    });
  }

  /**
   * Read Events
   * @param skip
   * @param limit
   * @returns Event Successful Response
   * @throws ApiError
   */
  public static readEvents(
    skip?: number,
    limit: number = 100
  ): CancelablePromise<Array<Event>> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/events/",
      query: {
        skip: skip,
        limit: limit,
      },
      errors: {
        422: `Validation Error`,
      },
    });
  }

  /**
   * Create Event
   * @param requestBody
   * @returns Event Successful Response
   * @throws ApiError
   */
  public static createEvent(
    requestBody: EventCreate
  ): CancelablePromise<Event> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/events/",
      body: requestBody,
      mediaType: "application/json",
      errors: {
        422: `Validation Error`,
      },
    });
  }

  /**
   * Create Quest
   * @param requestBody
   * @returns Quest Successful Response
   * @throws ApiError
   */
  public static createQuest(
    requestBody: QuestCreate
  ): CancelablePromise<Quest> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/quests/",
      body: requestBody,
      mediaType: "application/json",
      errors: {
        422: `Validation Error`,
      },
    });
  }

  /**
   * Read Quest Items
   * @param questId
   * @param skip
   * @param limit
   * @returns QuestItem Successful Response
   * @throws ApiError
   */
  public static readQuestItems(
    questId: string,
    skip?: number,
    limit: number = 100
  ): CancelablePromise<Array<QuestItem>> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/quests/{quest_id}/items",
      path: {
        quest_id: questId,
      },
      query: {
        skip: skip,
        limit: limit,
      },
      errors: {
        422: `Validation Error`,
      },
    });
  }

  /**
   * Create Quest Item
   * @param questId
   * @param requestBody
   * @returns QuestItem Successful Response
   * @throws ApiError
   */
  public static createQuestItem(
    questId: string,
    requestBody: QuestItemCreate
  ): CancelablePromise<QuestItem> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/quests/{quest_id}/items/",
      path: {
        quest_id: questId,
      },
      body: requestBody,
      mediaType: "application/json",
      errors: {
        422: `Validation Error`,
      },
    });
  }

  /**
   * Create Quest Dependency
   * @param requestBody
   * @returns QuestDependencyBase Successful Response
   * @throws ApiError
   */
  public static createQuestDependency(
    requestBody: QuestDependencyCreate
  ): CancelablePromise<QuestDependencyBase> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/questDependencies/",
      body: requestBody,
      mediaType: "application/json",
      errors: {
        422: `Validation Error`,
      },
    });
  }

  /**
   * Read Items
   * @param skip
   * @param limit
   * @returns Item Successful Response
   * @throws ApiError
   */
  public static readItems(
    skip?: number,
    limit: number = 100
  ): CancelablePromise<Array<Item>> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/items/",
      query: {
        skip: skip,
        limit: limit,
      },
      errors: {
        422: `Validation Error`,
      },
    });
  }

  /**
   * Create Item
   * @param requestBody
   * @returns Item Successful Response
   * @throws ApiError
   */
  public static createItem(requestBody: ItemCreate): CancelablePromise<Item> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/items/",
      body: requestBody,
      mediaType: "application/json",
      errors: {
        422: `Validation Error`,
      },
    });
  }

  /**
   * Read Users
   * @param skip
   * @param limit
   * @returns User Successful Response
   * @throws ApiError
   */
  public static readUsers(
    skip?: number,
    limit: number = 100
  ): CancelablePromise<Array<User>> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/users/",
      query: {
        skip: skip,
        limit: limit,
      },
      errors: {
        422: `Validation Error`,
      },
    });
  }

  /**
   * Create User
   * @param requestBody
   * @returns User Successful Response
   * @throws ApiError
   */
  public static createUser(requestBody: UserCreate): CancelablePromise<User> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/users/",
      body: requestBody,
      mediaType: "application/json",
      errors: {
        422: `Validation Error`,
      },
    });
  }

  /**
   * Read User
   * @param userId
   * @returns User Successful Response
   * @throws ApiError
   */
  public static readUser(userId: string): CancelablePromise<User> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/users/{user_id}",
      path: {
        user_id: userId,
      },
      errors: {
        422: `Validation Error`,
      },
    });
  }

  /**
   * Read User By Username
   * @param username
   * @returns User Successful Response
   * @throws ApiError
   */
  public static readUserByUsername(username: string): CancelablePromise<User> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/users/by_username/{username}",
      path: {
        username: username,
      },
      errors: {
        422: `Validation Error`,
      },
    });
  }

  /**
   * Create Event Participation
   * @param userId
   * @param requestBody
   * @returns EventParticipationCreate Successful Response
   * @throws ApiError
   */
  public static createEventParticipation(
    userId: string,
    requestBody: EventParticipationCreate
  ): CancelablePromise<EventParticipationCreate> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/users/{user_id}/eventParticipations/",
      path: {
        user_id: userId,
      },
      body: requestBody,
      mediaType: "application/json",
      errors: {
        422: `Validation Error`,
      },
    });
  }

  /**
   * Read Event Participation
   * @param userId
   * @param eventId
   * @returns EventParticipation Successful Response
   * @throws ApiError
   */
  public static readEventParticipation(
    userId: string,
    eventId: string
  ): CancelablePromise<EventParticipation> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/users/{user_id}/eventParticipations/{event_id}/",
      path: {
        user_id: userId,
        event_id: eventId,
      },
      errors: {
        422: `Validation Error`,
      },
    });
  }

  /**
   * Update Event Participation
   * @param userId
   * @param eventId
   * @param requestBody
   * @returns EventParticipation Successful Response
   * @throws ApiError
   */
  public static updateEventParticipation(
    userId: string,
    eventId: string,
    requestBody: EventParticipationUpdate
  ): CancelablePromise<EventParticipation> {
    return __request(OpenAPI, {
      method: "PUT",
      url: "/users/{user_id}/eventParticipations/{event_id}/",
      path: {
        user_id: userId,
        event_id: eventId,
      },
      body: requestBody,
      mediaType: "application/json",
      errors: {
        422: `Validation Error`,
      },
    });
  }

  /**
   * Read User Quest Participations
   * @param userId
   * @param eventId
   * @param status
   * @param skip
   * @param limit
   * @returns QuestParticipation Successful Response
   * @throws ApiError
   */
  public static readUserQuestParticipations(
    userId: string,
    eventId?: string,
    status?: QuestStatus,
    skip?: number,
    limit: number = 100
  ): CancelablePromise<Array<QuestParticipation>> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/users/{user_id}/questParticipations/",
      path: {
        user_id: userId,
      },
      query: {
        event_id: eventId,
        status: status,
        skip: skip,
        limit: limit,
      },
      errors: {
        422: `Validation Error`,
      },
    });
  }

  /**
   * Create Quest Participation
   * @param userId
   * @param requestBody
   * @returns QuestParticipation Successful Response
   * @throws ApiError
   */
  public static createQuestParticipation(
    userId: string,
    requestBody: QuestParticipationCreate
  ): CancelablePromise<QuestParticipation> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/users/{user_id}/questParticipations",
      path: {
        user_id: userId,
      },
      body: requestBody,
      mediaType: "application/json",
      errors: {
        422: `Validation Error`,
      },
    });
  }

  /**
   * Update Quest Participation
   * @param userId
   * @param questId
   * @param requestBody
   * @returns QuestParticipation Successful Response
   * @throws ApiError
   */
  public static updateQuestParticipation(
    userId: string,
    questId: string,
    requestBody: QuestParticipationUpdate
  ): CancelablePromise<QuestParticipation> {
    return __request(OpenAPI, {
      method: "PUT",
      url: "/users/{user_id}/questParticipations/{quest_id}",
      path: {
        user_id: userId,
        quest_id: questId,
      },
      body: requestBody,
      mediaType: "application/json",
      errors: {
        422: `Validation Error`,
      },
    });
  }

  /**
   * Read Item Ownerships
   * @param userId
   * @param skip
   * @param limit
   * @returns ItemOwnership Successful Response
   * @throws ApiError
   */
  public static readItemOwnerships(
    userId: string,
    skip?: number,
    limit: number = 100
  ): CancelablePromise<Array<ItemOwnership>> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/users/{user_id}/itemOwnerships/",
      path: {
        user_id: userId,
      },
      query: {
        skip: skip,
        limit: limit,
      },
      errors: {
        422: `Validation Error`,
      },
    });
  }

  /**
   * Create Item Ownership
   * @param userId
   * @param requestBody
   * @returns ItemOwnership Successful Response
   * @throws ApiError
   */
  public static createItemOwnership(
    userId: string,
    requestBody: ItemOwnershipCreate
  ): CancelablePromise<ItemOwnership> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/users/{user_id}/itemOwnerships/",
      path: {
        user_id: userId,
      },
      body: requestBody,
      mediaType: "application/json",
      errors: {
        422: `Validation Error`,
      },
    });
  }
}
