import * as React from 'react';
import { AppState } from './../models/AppState'
import { Action, AnyAction } from 'redux';
import * as appActions from '../actions/types';
export function MainReducer(state:AppState = {user: { isLoggedIn: false, displayName: ''}}, action: AnyAction) {
    switch(action.type){
        case appActions.LOGGED_IN:
            return Object.assign({}, state, {user:{ isLoggedIn: true, displayName: action.displayName}})
        case appActions.LOGGED_OUT:
            return Object.assign({}, state, {user:{ isLoggedIn: false, displayName: ""}})
        default:
            return state
    }
}