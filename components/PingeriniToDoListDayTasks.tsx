import React, {FunctionComponent, useCallback, useState} from 'react';
import {TouchableOpacity, View} from 'react-native';
import {Button, Icon, Text} from 'react-native-elements';
import DraggableFlatList, {
    RenderItemParams,
} from 'react-native-draggable-flatlist';

type PingeriniToDoListProps = {
    date: Date;
};

export const PingeriniToDoListDayTasks: FunctionComponent<PingeriniToDoListProps> = _props => {
    const mainWrapperStyle = {
        marginTop: 15,
        height: 550,
        marginBottom: 0,
        flex: 1,
    };

    const NUM_ITEMS = 10; //TODO: make it take data from back-end

    const exampleData: Item[] = [...Array(20)].map((d, index) => {
        return {
            label: 'Task number ' + String(index),
        };
    });

    type Item = {
        label: string;
    };

    const [data, setData] = useState(exampleData);

    const renderItem = useCallback(
        ({item, index, drag, isActive}: RenderItemParams<Item>) => {
            return (
                <TouchableOpacity
                    style={{
                        height: 40,
                        backgroundColor: isActive ? '#2089DC' : '#fff',
                        alignItems: 'center',
                        //justifyContent: 'center',
                        flexDirection: 'row',
                        borderBottomColor: 'silver',
                        borderBottomWidth: 1,
                    }}
                    onLongPress={drag}>
                    <Text
                        style={{
                            color: '#000',
                            flex: 1,
                            flexDirection: 'row',
                        }}>
                        {item.label}
                    </Text>
                    <Icon
                        name={'check'}
                        color={'green'}
                        style={{
                            justifyContent: 'space-evenly',
                            marginVertical: 10,
                        }}
                    />
                </TouchableOpacity>
            );
        },
        [],
    );
    return (
        <View style={mainWrapperStyle}>
            <View
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                }}>
                <Text h3 style={{flex: 1}}>
                    Today's tasks
                </Text>
                <Button
                    style={{
                        width: 30,
                        padding: 0,
                        margin: 0,
                        justifyContent: 'space-evenly',
                        marginVertical: 10,
                    }}
                    titleStyle={{
                        fontSize: 10,
                        padding: 0,
                        fontWeight: 'bold',
                        alignContent: 'center',
                    }}
                    buttonStyle={{
                        padding: 3,
                    }}
                    title="<"
                />
                <Button
                    style={{
                        width: 30,
                        padding: 0,
                        margin: 0,
                        justifyContent: 'space-evenly',
                        marginVertical: 10,
                    }}
                    titleStyle={{
                        fontSize: 10,
                        padding: 0,
                        fontWeight: 'bold',
                        alignContent: 'center',
                    }}
                    buttonStyle={{
                        padding: 3,
                    }}
                    title=">"
                />
            </View>
            <DraggableFlatList
                listKey={_props.listKey}
                data={data}
                renderItem={renderItem}
                keyExtractor={(item, index) => `draggable-item-${item.label}`}
                onDragEnd={({data}) => setData(data)}
            />
        </View>
    );
};
