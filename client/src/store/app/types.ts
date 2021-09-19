export type AppState = {
  purchasedToursIds: string [] | null,
  jwt: string | null;
};

export const initialState: AppState = {
  purchasedToursIds: [],
  jwt: null
};
