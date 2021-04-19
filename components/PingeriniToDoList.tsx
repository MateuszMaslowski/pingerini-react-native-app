import React, {FunctionComponent} from 'react';
import {Text} from 'react-native-elements';
import {View} from 'react-native';
import {PingeriniToDoListDayTasks} from './PingeriniToDoListDayTasks';

export const PingeriniToDoList: FunctionComponent = _props => {
    const mainWrapperStyle = {
        //minHeight: '100%',
        height: '90%',
        backgroundColor: '#fff',
        padding: 15,
        paddingBottom: 0,
        marginBottom: 0,
        flex: 1,
    };

    //const buttons = ['<', '>'];

    return (
        <View style={mainWrapperStyle}>
            <Text
                h2
                style={{
                    textAlign: 'center',
                    flexDirection: 'row',
                }}>
                TODO list
            </Text>
            <PingeriniToDoListDayTasks date={new Date()} />
        </View>
    );
};
