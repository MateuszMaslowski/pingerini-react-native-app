import React, {FunctionComponent} from 'react';
import {Router, Scene} from 'react-native-router-flux';
import {PingeriniLogin} from './PingeriniLogin';
import {PingeriniRegistration} from './PingeriniRegistration';

type LoggedOutRoutesProps = {
    onUserReady: (user: any) => void;
};

const LoggedOutRoutes: FunctionComponent<LoggedOutRoutesProps> = props => (
    <Router>
        <Scene key="root">
            <Scene
                key="login"
                component={() => <PingeriniLogin onLogin={props.onUserReady} />}
                title="Login"
                initial={true}
                hideNavBar={true}
            />

            <Scene
                key="registration"
                component={() => (
                    <PingeriniRegistration onRegister={props.onUserReady} />
                )}
                title="Registration"
                hideNavBar={true}
            />
        </Scene>
    </Router>
);
export default LoggedOutRoutes;
