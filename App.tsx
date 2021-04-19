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
import {View} from 'react-native';
import {ThemeProvider} from 'styled-components';
import {LightTheme} from './style';
import {PingeriniHeader} from './components/PingeriniHeader';
import SideMenu from 'react-native-side-menu-updated';
import {PingeriniSideMenu} from './components/PingeriniSideMenu';
import {PingeriniToDoList} from './components/PingeriniToDoList';
import {PingeriniToDoPlusButton} from './components/PingeriniToDoPlusButton';
import Routes from './components/Routes'

const App = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    return (
        // <ThemeProvider theme={LightTheme}>
        //     <SideMenu menu={<PingeriniSideMenu />} isOpen={menuOpen}>
        //         <View
        //             style={{
        //                 // backgroundColor: 'magenta',
        //                 display: 'flex',
        //                 flex: 1,
        //             }}>
        //             <PingeriniHeader
        //                 onToggleMenu={() => setMenuOpen(!menuOpen)}
        //             />
        //             <PingeriniToDoList />
        //             <PingeriniToDoPlusButton />
        //         </View>
        //     </SideMenu>
        // </ThemeProvider>
        <Routes />
    );
};

export default App;
