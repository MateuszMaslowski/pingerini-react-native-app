import React, {FunctionComponent} from 'react';
import {Header} from 'react-native-elements';

type ToggleMenuProps = {
    onToggleMenu: () => void;
    onSearch: () => void;
};

export const PingeriniHeader: FunctionComponent<ToggleMenuProps> = props => {
    return (
        <Header
            leftComponent={{
                icon: 'menu',
                color: '#fff',
                onPress: props.onToggleMenu,
            }}
            centerComponent={{
                text: 'Pingerini',
                style: {color: '#fff', fontSize: 21, fontFamily: 'Arial'},
            }}
            rightComponent={{
                icon: 'search',
                color: '#fff',
                onPress: props.onSearch,
            }}
        />
    );
};
