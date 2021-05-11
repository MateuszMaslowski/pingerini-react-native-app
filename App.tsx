/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {FunctionComponent, useState} from 'react';
import {Text} from 'react-native';
import {View} from 'react-native';
import {ThemeProvider} from 'styled-components';
import {LightTheme} from './style';
import {PingeriniHeader} from './components/PingeriniHeader';
import SideMenu from 'react-native-side-menu-updated';
import {PingeriniSideMenu} from './components/PingeriniSideMenu';
import {PingeriniToDoList} from './components/PingeriniToDoList';
import {PingeriniToDoPlusButton} from './components/PingeriniToDoPlusButton';
import LoggedOutRoutes from './components/LoggedOutRoutes';
import {ApolloProvider} from '@apollo/client';
import {MainApolloClient} from './graphql/PingeriniApolloClient';
import {gql} from '@apollo/client/core';
import {BasicUser, UserContext} from './components/UserProvider';
import LoggedInRoutes from './components/LoggedInRoutes';
import Routes from './components/Routes';

const App = () => {
    const [user, setUser] = useState<BasicUser | null>(null);

    return (
        <ApolloProvider client={MainApolloClient}>
            <ThemeProvider theme={LightTheme}>
                {user ? (
                    <LoggedInRoutes
                        user={user}
                        onLogout={() => setUser(null)}
                    />
                ) : (
                    <LoggedOutRoutes onUserReady={setUser} />
                )}
            </ThemeProvider>
        </ApolloProvider>
    );
};

export default App;
