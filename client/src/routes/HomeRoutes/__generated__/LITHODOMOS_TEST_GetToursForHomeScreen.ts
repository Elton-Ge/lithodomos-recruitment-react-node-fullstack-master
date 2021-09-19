/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: LITHODOMOS_TEST_GetToursForHomeScreen
// ====================================================

export interface LITHODOMOS_TEST_GetToursForHomeScreen_result_tours {
  __typename: "Tour";
  id: string;
  name: string;
  priceUSDCents: number;
  thumbnailURL: string | null;
  purchased: boolean;
}

export interface LITHODOMOS_TEST_GetToursForHomeScreen_result {
  __typename: "GetToursResponse";
  tours: LITHODOMOS_TEST_GetToursForHomeScreen_result_tours[];
  totalPages: number;
  totalRecordsCount: number;
}

export interface LITHODOMOS_TEST_GetToursForHomeScreen {
  result: LITHODOMOS_TEST_GetToursForHomeScreen_result;
}

export interface LITHODOMOS_TEST_GetToursForHomeScreenVariables {
  pageNumber: number;
  recordsPerPage: number;
  ids?: (string | null)[] | null;
}
