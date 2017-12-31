import * as React from "react";
import { Action, AnyAction } from "redux";
import * as _ from "underscore";
import * as appActions from "../actions/types";
import { AppState } from "./../models/AppState";
export function MainReducer(state: AppState = {login: { isLoggedIn: false, displayName: "", uid: ""}}, action: AnyAction) {
    switch (action.type) {
        case appActions.LOGGED_IN:
            return _.extend({}, state, {login: { isLoggedIn: true, displayName: action.payload.displayName, uid: action.payload.uid}});
        case appActions.LOGGED_OUT:
            return _.extend({}, state, {login: { isLoggedIn: false, displayName: "", uid: ""}});
        default:
            return state;
    }
}
