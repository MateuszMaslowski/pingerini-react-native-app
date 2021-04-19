import React, {FunctionComponent} from 'react';
import {Button} from 'react-native-elements';

type ToggleMenuProps = {
    onToggleMenu: () => void;
};
// name={'PingeriniToDoPlusButton'}

export const PingeriniToDoPlusButton: FunctionComponent = _props => {
    const containerStyle = {
        borderRadius: 100,
        width: 40,
        height: 40,
        marginBottom: 75,
        marginLeft: '42%',
    };

    return <Button containerStyle={containerStyle} title={'+'} />;
};
