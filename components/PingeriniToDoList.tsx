import React, {FunctionComponent} from 'react';
import {Text} from 'react-native-elements';
import {FlatList, ListView, SafeAreaView, ScrollView, View} from 'react-native';
import {PingeriniToDoListDayTasks} from './PingeriniToDoListDayTasks';

export const PingeriniToDoList: FunctionComponent = _props => {
    const mainWrapperStyle = {
        minHeight: '100%',
        backgroundColor: '#fff',
        padding: 15,
    };

    const pingeriniToDoListDayTasksList = {};

    return (
        <SafeAreaView>
            <View style={mainWrapperStyle}>
                <Text h2 style={{textAlign: 'center'}}>
                    TODO list
                </Text>
                {
                    //TODO: add displaying days
                    //data={} renderItem={}
                }
                <FlatList
                    scrollEnabled={true}
                    data={['']}
                    renderItem={({}) => (
                        <View
                            style={{
                                paddingLeft: 100,
                            }}>
                            <PingeriniToDoListDayTasks listKey={'1'} />
                            <PingeriniToDoListDayTasks listKey={'chuj'} />
                        </View>
                    )}
                />
            </View>
        </SafeAreaView>
    );
};
