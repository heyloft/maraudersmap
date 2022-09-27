/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Item } from "../models/Item";
import type { ItemCreate } from "../models/ItemCreate";
import type { POI } from "../models/POI";
import type { POICreate } from "../models/POICreate";

import type { CancelablePromise } from "../core/CancelablePromise";
import { OpenAPI } from "../core/OpenAPI";
import { request as __request } from "../core/request";

export class DefaultService {
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
   * Read Pois
   * @param skip
   * @param limit
   * @returns POI Successful Response
   * @throws ApiError
   */
  public static readPoisPoisGet(
    skip?: number,
    limit: number = 100
  ): CancelablePromise<Array<POI>> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/pois/",
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
   * Create Poi
   * @param requestBody
   * @returns POI Successful Response
   * @throws ApiError
   */
  public static createPoiPoisPost(
    requestBody: POICreate
  ): CancelablePromise<POI> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/pois/",
      body: requestBody,
      mediaType: "application/json",
      errors: {
        422: `Validation Error`,
      },
    });
  }
}
