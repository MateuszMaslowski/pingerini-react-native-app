import React from 'react'
import { Router, Scene } from 'react-native-router-flux'
import {PingeriniLogin} from './PingeriniLogin'
import {PingeriniRegistration} from './PingeriniRegistration'


const Routes = () => (
    <Router>
        <Scene key = "root">
            <Scene key = "login" component = {PingeriniLogin} title = "Login" initial = {true} hideNavBar={true} />
            <Scene key = "registration" component = {PingeriniRegistration} title = "Registration" hideNavBar={true} />
        </Scene>
    </Router>
)
export default Routes