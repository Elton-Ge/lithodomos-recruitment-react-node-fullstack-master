/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: LITHODOMOS_TEST_Get_Tour_Detail
// ====================================================

export interface LITHODOMOS_TEST_Get_Tour_Detail_result {
  __typename: "Tour";
  id: string;
  name: string;
  priceUSDCents: number;
  thumbnailURL: string | null;
}

export interface LITHODOMOS_TEST_Get_Tour_Detail {
  result: LITHODOMOS_TEST_Get_Tour_Detail_result | null;
}

export interface LITHODOMOS_TEST_Get_Tour_DetailVariables {
  id: string;
}
