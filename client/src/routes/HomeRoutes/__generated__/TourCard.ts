/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: TourCard
// ====================================================

export interface TourCard_purchaseTours_purchasedTours {
  __typename: "Tour";
  name: string;
  priceUSDCents: number;
  thumbnailURL: string | null;
  purchased: boolean;
}

export interface TourCard_purchaseTours_error {
  __typename: "Error";
  message: string;
}

export interface TourCard_purchaseTours {
  __typename: "PurchaseToursResponse";
  purchasedTours: TourCard_purchaseTours_purchasedTours[] | null;
  error: TourCard_purchaseTours_error | null;
}

export interface TourCard {
  purchaseTours: TourCard_purchaseTours;
}

export interface TourCardVariables {
  id: string;
}
