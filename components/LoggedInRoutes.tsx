import {BasicUser, UserContext} from './UserProvider';
import React, {FunctionComponent, useState} from 'react';
import SideMenu from 'react-native-side-menu-updated';
import {PingeriniSideMenu} from './PingeriniSideMenu';
import {View} from 'react-native';
import {PingeriniHeader} from './PingeriniHeader';
import {PingeriniToDoList} from './PingeriniToDoList';
import {PingeriniToDoPlusButton} from './PingeriniToDoPlusButton';
import {Router, Scene, Stack} from 'react-native-router-flux';
import {PingeriniLogin} from './PingeriniLogin';
import {PingeriniRegistration} from './PingeriniRegistration';
import {PingeriniTasksScreen} from './PingeriniTasksScreen';
import {EditTaskScreen} from './EditTaskScreen';

type LoggedInProps = {
    user: BasicUser;
};

const LoggedInApp: FunctionComponent<LoggedInProps> = props => {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <UserContext.Provider value={props.user}>
            <SideMenu menu={<PingeriniSideMenu />} isOpen={menuOpen}>
                <View
                    style={{
                        display: 'flex',
                        flex: 1,
                    }}>
                    <PingeriniHeader
                        onToggleMenu={() => setMenuOpen(!menuOpen)}
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
