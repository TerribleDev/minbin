import { LoginState } from "../models/LoginState";
import { MinAction } from "../models/MinAction";
import {LOGGED_IN, LOGGED_OUT} from "./types";

export function login(loginState: LoginState): MinAction<LoginState> {
    return {
        type: LOGGED_IN,
        payload: loginState,
    };
}

export function logout(): MinAction<LoginState> {
    return {
        type: LOGGED_OUT,
        payload: {isLoggedIn: false, displayName: "", uid: ""},
    };
}
