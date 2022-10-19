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
  public static indexGet(): CancelablePromise<string> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/",
    });
  }

  /**
   * Read Items
   * @param skip
   * @param limit
   * @returns Item Successful Response
   * @throws ApiError
   */
  public static readItemsItemsGet(
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
  public static createItemItemsPost(
    requestBody: ItemCreate
  ): CancelablePromise<Item> {
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
   * Read Events
   * @param skip
   * @param limit
   * @returns Event Successful Response
   * @throws ApiError
   */
  public static readEventsEventsGet(
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
  public static createEventEventsPost(
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
   * Create Quest Participation
   * @param requestBody
   * @returns QuestParticipation Successful Response
   * @throws ApiError
   */
  public static createQuestParticipationQuestParticipationsPost(
    requestBody: QuestParticipationCreate
  ): CancelablePromise<QuestParticipation> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/questParticipations/",
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
  public static updateQuestParticipationQuestParticipationsUserIdQuestIdPut(
    userId: string,
    questId: string,
    requestBody: QuestParticipationUpdate
  ): CancelablePromise<QuestParticipation> {
    return __request(OpenAPI, {
      method: "PUT",
      url: "/questParticipations/{user_id}/{quest_id}",
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
   * Read Active Quests
   * @param eventId
   * @param userId
   * @param skip
   * @param limit
   * @returns QuestParticipation Successful Response
   * @throws ApiError
   */
  public static readActiveQuestsEventsEventIdUserUserIdActiveQuestsGet(
    eventId: string,
    userId: string,
    skip?: number,
    limit: number = 100
  ): CancelablePromise<Array<QuestParticipation>> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/events/{event_id}/user/{user_id}/activeQuests",
      path: {
        event_id: eventId,
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
   * Read Unstarted Quests
   * @param eventId
   * @param userId
   * @returns QuestParticipation Successful Response
   * @throws ApiError
   */
  public static readUnstartedQuestsEventsEventIdUserUserIdUnstartedQuestsGet(
    eventId: string,
    userId: string
  ): CancelablePromise<Array<QuestParticipation>> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/events/{event_id}/user/{user_id}/unstartedQuests",
      path: {
        event_id: eventId,
        user_id: userId,
      },
      errors: {
        422: `Validation Error`,
      },
    });
  }

  /**
   * Read Item Ownerships
   * @param skip
   * @param limit
   * @returns ItemOwnership Successful Response
   * @throws ApiError
   */
  public static readItemOwnershipsItemOwnershipsGet(
    skip?: number,
    limit: number = 100
  ): CancelablePromise<Array<ItemOwnership>> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/itemOwnerships/",
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
   * @param requestBody
   * @returns ItemOwnership Successful Response
   * @throws ApiError
   */
  public static createItemOwnershipItemOwnershipsPost(
    requestBody: ItemOwnershipCreate
  ): CancelablePromise<ItemOwnership> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/itemOwnerships/",
      body: requestBody,
      mediaType: "application/json",
      errors: {
        422: `Validation Error`,
      },
    });
  }

  /**
   * Read Item Ownership
   * @param itemOwnershipId
   * @returns ItemOwnership Successful Response
   * @throws ApiError
   */
  public static readItemOwnershipItemOwnershipsItemOwnershipIdGet(
    itemOwnershipId: string
  ): CancelablePromise<ItemOwnership> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/itemOwnerships/{item_ownership_id}",
      path: {
        item_ownership_id: itemOwnershipId,
      },
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
  public static readUsersUsersGet(
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
  public static createUserUsersPost(
    requestBody: UserCreate
  ): CancelablePromise<User> {
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
  public static readUserUsersUserIdGet(
    userId: string
  ): CancelablePromise<User> {
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
  public static readUserByUsernameUsersByUsernameUsernameGet(
    username: string
  ): CancelablePromise<User> {
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
   * Read Quest Items
   * @param questId
   * @param skip
   * @param limit
   * @returns QuestItem Successful Response
   * @throws ApiError
   */
  public static readQuestItemsQuestsQuestIdItemsGet(
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
  public static createQuestItemQuestsQuestIdItemsPost(
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
   * Create Quest
   * @param requestBody
   * @returns Quest Successful Response
   * @throws ApiError
   */
  public static createQuestQuestsPost(
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
   * Create Quest Dependency
   * @param requestBody
   * @returns QuestDependencyBase Successful Response
   * @throws ApiError
   */
  public static createQuestDependencyQuestDependenciesPost(
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
   * Create Event Participation
   * @param requestBody
   * @returns EventParticipationCreate Successful Response
   * @throws ApiError
   */
  public static createEventParticipationEventParticipationsPost(
    requestBody: EventParticipationCreate
  ): CancelablePromise<EventParticipationCreate> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/eventParticipations/",
      body: requestBody,
      mediaType: "application/json",
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
  public static updateEventParticipationEventParticipationsUserIdEventIdPut(
    userId: string,
    eventId: string,
    requestBody: EventParticipationUpdate
  ): CancelablePromise<EventParticipation> {
    return __request(OpenAPI, {
      method: "PUT",
      url: "/eventParticipations/{user_id}/{event_id}",
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
}
