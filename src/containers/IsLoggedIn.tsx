import { AppState } from '../models/AppState';
import * as React from 'react';
import { connect } from 'react-redux';
export interface IsLoggedInReduxProps {appstate: AppState}
export interface IsLoggedInPassedProps {isTrue: JSX.Element, isFalse: JSX.Element}
export interface IsLoggedInProps extends IsLoggedInReduxProps,IsLoggedInPassedProps {}
const mapStateToProps = (state : AppState, ownProps : IsLoggedInPassedProps) : IsLoggedInProps  =>
{
    return {isTrue: ownProps.isTrue, isFalse: ownProps.isFalse, appstate: state};
}
class isLoggedIn extends React.Component<IsLoggedInProps,{}>{
    render(){
        if(this.props.appstate.login.isLoggedIn){
            return this.props.isTrue
        }
        else{
            return this.props.isFalse
        }
    }
}
 
export const IsLoggedIn = connect(mapStateToProps)(isLoggedIn)