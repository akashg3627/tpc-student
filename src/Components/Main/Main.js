
//pkg
import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
// import { authContext } from '../../App';
import Login from '../Login/Login';
import Home from '../Home/Home';
import { useSelector } from 'react-redux';

//files
import Header from '../Header/Header';
import JobComponent from '../Jobs/JobComponent';
import NotificationsComponent from '../Notifications/NotificationsComponent';
import CalendarComponent from '../Calendar/CalendarComponent';
import Profile from '../Profile/Profile';

//extra comp


function PrivateRoute({ children, ...rest }) {
    let isAuth = useSelector(state => state.user.isAuth);
    return (
        <Route
            {...rest}
            render={({ location }) =>
                isAuth ? (
                    children
                ) : (
                    <Redirect
                        to={{
                            pathname: "/login",
                            state: { from: location },
                        }}
                    />
                )
            }
        />
    );
}


function Main(props) {
    let isAuth = useSelector(state => state.user.isAuth);
    return (
        <>
            {
                isAuth ? <Header /> : null
            }
            <Switch>
                <Route path="/login" component={Login} />
                <PrivateRoute exact path="/home"><Home /> </PrivateRoute>
                <PrivateRoute exact path="/notifications">
                    <NotificationsComponent />
                </PrivateRoute>
                <PrivateRoute exact path="/calendar">
                    <CalendarComponent />
                </PrivateRoute>
                <PrivateRoute exact path="/profile">
                    <Profile />
                </PrivateRoute>
                <PrivateRoute exact path="/jobs/:id">
                    <JobComponent />
                </PrivateRoute>
                <Redirect to="/home" />
            </Switch>
        </>
    );
}

export default Main;