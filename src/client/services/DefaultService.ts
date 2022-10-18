/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Item } from "../models/Item";
import type { ItemCreate } from "../models/ItemCreate";
import type { ItemOwnership } from "../models/ItemOwnership";
import type { ItemOwnershipCreate } from "../models/ItemOwnershipCreate";
import type { Quest } from "../models/Quest";
import type { QuestCreate } from "../models/QuestCreate";
import type { QuestDependencyBase } from "../models/QuestDependencyBase";
import type { QuestDependencyCreate } from "../models/QuestDependencyCreate";
import type { QuestParticipation } from "../models/QuestParticipation";
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
   * Read Active Quests
   * @param userId
   * @param skip
   * @param limit
   * @returns QuestParticipation Successful Response
   * @throws ApiError
   */
  public static readActiveQuestsActiveQuestsUserIdGet(
    userId: string,
    skip?: number,
    limit: number = 100
  ): CancelablePromise<Array<QuestParticipation>> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/activeQuests/{user_id}",
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
   * Create Item Ownership
   * @param requestBody
   * @returns ItemOwnership Successful Response
   * @throws ApiError
   */
  public static createItemOwnershipItemOwnershipPost(
    requestBody: ItemOwnershipCreate
  ): CancelablePromise<ItemOwnership> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/itemOwnership/",
      body: requestBody,
      mediaType: "application/json",
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
  public static createUserUserPost(
    requestBody: UserCreate
  ): CancelablePromise<User> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/user/",
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
   * Read User
   * @param userId
   * @returns User Successful Response
   * @throws ApiError
   */
  public static readUserUserUserIdGet(userId: string): CancelablePromise<User> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/user/{user_id}",
      path: {
        user_id: userId,
      },
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
  public static createQuestQuestPost(
    requestBody: QuestCreate
  ): CancelablePromise<Quest> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/quest/",
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
  public static createQuestDependencyQuestdependencyPost(
    requestBody: QuestDependencyCreate
  ): CancelablePromise<QuestDependencyBase> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/questdependency/",
      body: requestBody,
      mediaType: "application/json",
      errors: {
        422: `Validation Error`,
      },
    });
  }
}
