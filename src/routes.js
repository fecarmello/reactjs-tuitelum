import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Home from './pages/Home';
import LoginPage from './pages/LoginPage';


const PrivateRoute = (props) =>{
    const isLogado = localStorage.getItem('TOKEN')

    if (isLogado){
        return (<Route path={props.path} component={props.component} exact></Route>)
    }

    return (<Redirect to="/login" />)
}


const Routes = () => {
    return (
        <Switch >
            <PrivateRoute path="/" component={Home} exact></PrivateRoute>
            <Route path="/login" component={LoginPage} exact></Route>
        </Switch>
    )
}

export default Routes