import { Action } from "redux";
import { LoginState } from "./LoginState";
// export class MinAction<T> implements Action{
//     constructor(public type: any, public payload : T){

//     }

export interface MinAction<T> extends Action {
    payload: T;
}
