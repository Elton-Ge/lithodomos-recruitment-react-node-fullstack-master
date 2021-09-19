import {handleActions} from "redux-actions";
import {ACTION_TYPES, GetPurchasedToursSuccessAction, LoginWithEmailSuccessAction} from "./actions";
import {AppState, initialState} from "./types";

export const reducer = handleActions<AppState, any>(
    {
        [ACTION_TYPES.LOGOUT_SUCCESS]: (): AppState => {
            return {
                ...initialState
            }
        },

        [ACTION_TYPES.LOGIN_WITH_EMAIL_SUCCESS]: (
            state: AppState,
            action: LoginWithEmailSuccessAction
        ): AppState => {
            return {...state, jwt: action.payload}
        },

        [ACTION_TYPES.GET_PURCHASED_TOURS_SUCCESS]: (
            state: AppState,
            action: GetPurchasedToursSuccessAction
        ): AppState => {
            return {...state, purchasedToursIds: action.payload}
        }
    },
    initialState
);
