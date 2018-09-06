import React from 'react';
import {
    Route,
    Router
} from 'react-router-dom';
import Home from './components/home';
import Dashboard from './components/dashboard';
import Callback from './components/callback';
import AuthService from './AuthService';
import history from './history';

const auth = new AuthService();

const handleAuthentication = (nextState, replace) => {
    if (/access_token|id_token|error/.test(nextState.location.hash)) {
        auth.handleAuthentication();
    }
};

const Routes = () => {
    return(
    <Router history={history} component={Home}>
    <div>
       
        <Route extact path="/home" render={(props) => <Home auth={auth} {...props} /> }/>
        <Route extact path="/dashboard" render={(props) => <Dashboard auth={auth} {...props} /> }/>
        <Route extact path="/callback" render={(props) => {
            handleAuthentication(props);
            return <Callback {...props} />
        }}/>
    </div>

    </Router>
    )

}

export default Routes;