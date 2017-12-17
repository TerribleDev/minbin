import * as React from 'react';
import { AppState } from './../models/AppState'
import { Action, AnyAction } from 'redux';
import * as appActions from '../actions/types';
export function MainReducer(state:AppState = {login: { isLoggedIn: false, displayName: '', uid: ''}}, action: AnyAction) {
    switch(action.type){
        case appActions.LOGGED_IN:
            return Object.assign({}, state, {login:{ isLoggedIn: true, displayName: action.payload.displayName, uid: action.payload.displayName}})
        case appActions.LOGGED_OUT:
            return Object.assign({}, state, {login:{ isLoggedIn: false, displayName: ""}})
        default:
            return state
    }
}