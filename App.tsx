/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {useState} from 'react';
import {Alert, Image, SafeAreaView, View} from 'react-native';
import {ThemeProvider} from 'styled-components';
import Chuj, {Cipa, MyCustomCenterComponent} from './components/Chuj';
import {LightTheme} from './style';
import {Text} from 'react-native-elements';
import {Avatar, Header, ListItem} from 'react-native-elements';
import {PingeriniHeader} from './components/PingeriniHeader';
import SideMenu from 'react-native-side-menu-updated';
import {PingeriniSideMenu} from './components/PingeriniSideMenu';
import {PingeriniToDoList} from './components/PingeriniToDoList';

const App = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <ThemeProvider theme={LightTheme}>
            <SideMenu menu={<PingeriniSideMenu />} isOpen={menuOpen}>
                <PingeriniHeader onToggleMenu={() => setMenuOpen(!menuOpen)} />
                <PingeriniToDoList />
            </SideMenu>
            {/*<Chuj length={15}>
            <Text>xdddddd</Text>
            <Text>dupa</Text>
          </Chuj>
            <Cipa users={[]} />*/}
        </ThemeProvider>
    );
};

export default App;
