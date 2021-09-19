/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: LITHODOMOS_TEST_getCurrentUser
// ====================================================

export interface LITHODOMOS_TEST_getCurrentUser_result_purchasedTours {
  __typename: "Tour";
  id: string;
  name: string;
  priceUSDCents: number;
  thumbnailURL: string | null;
  purchased: boolean;
}

export interface LITHODOMOS_TEST_getCurrentUser_result {
  __typename: "User";
  name: string | null;
  purchasedTours: LITHODOMOS_TEST_getCurrentUser_result_purchasedTours[];
}

export interface LITHODOMOS_TEST_getCurrentUser {
  result: LITHODOMOS_TEST_getCurrentUser_result | null;
}
