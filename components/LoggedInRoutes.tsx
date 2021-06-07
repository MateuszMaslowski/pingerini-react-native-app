import {BasicUser, UserContext} from './UserProvider';
import React, {FunctionComponent, useState} from 'react';
import SideMenu from 'react-native-side-menu-updated';
import {PingeriniSideMenu} from './PingeriniSideMenu';
import {View} from 'react-native';
import {PingeriniHeader} from './PingeriniHeader';
import {PingeriniToDoList} from './PingeriniToDoList';
import {PingeriniToDoPlusButton} from './PingeriniToDoPlusButton';
import {Actions, Router, Scene, Stack} from 'react-native-router-flux';
import {PingeriniLogin} from './PingeriniLogin';
import {PingeriniRegistration} from './PingeriniRegistration';
import {PingeriniTasksScreen} from './PingeriniTasksScreen';
import {EditTaskScreen} from './EditTaskScreen';
import SearchScreen from './SearchScreen';
import PingCreatorScreen from './PingCreatorScreen';
import PingListScreen from './PingListScreen';
import PingDetailsScreen from './PingDetailsScreen';

type LoggedInProps = {
    user: BasicUser;
    onLogout: () => void;
};

const LoggedInApp: FunctionComponent<LoggedInProps> = props => {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <UserContext.Provider value={props.user}>
            <SideMenu
                menu={<PingeriniSideMenu onLogout={props.onLogout} />}
                isOpen={menuOpen}>
                <View
                    style={{
                        display: 'flex',
                        flex: 1,
                    }}>
                    <PingeriniHeader
                        onToggleMenu={() => setMenuOpen(!menuOpen)}
                        onSearch={() => Actions.push('search', {})}
                    />
                    <Router>
                        <Stack key="root">
                            <Scene
                                key="taskList"
                                component={PingeriniTasksScreen}
                                title="Main Screen"
                                initial={true}
                                hideNavBar={true}
                            />
                            <Scene
                                key="search"
                                component={SearchScreen}
                                title="Search Screen"
                                hideNavBar={true}
                            />
                            <Scene
                                key="createPing"
                                component={PingCreatorScreen}
                                title="Ping Creator Screen"
                                hideNavBar={true}
                            />
                            <Scene
                                key="pingList"
                                component={PingListScreen}
                                title="Ping List Screen"
                                hideNavBar={true}
                            />
                            <Scene
                                key="pingDetails"
                                component={PingDetailsScreen}
                                title="Ping Details Screen"
                                hideNavBar={true}
                            />
                            <Scene
                                key="taskInfo"
                                component={EditTaskScreen}
                                title={'Task Screen'}
                                hideNavBar={true}
                            />
                        </Stack>
                    </Router>
                </View>
            </SideMenu>
        </UserContext.Provider>
    );
};

export default LoggedInApp;
