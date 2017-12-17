import { LoginState } from './LoginState';
import { Action } from 'redux';
// export class MinAction<T> implements Action{
//     constructor(public type: any, public payload : T){
        
//     }

export interface MinAction<T> extends Action {
    payload: T
}