import React, {
    FunctionComponent,
    useCallback,
    useEffect,
    useState,
} from 'react';
import {TouchableOpacity, View} from 'react-native';
import {Button, Icon, Text} from 'react-native-elements';
import DraggableFlatList, {
    RenderItemParams,
} from 'react-native-draggable-flatlist';
import {BaseTask} from './PingeriniToDoList';

type PingeriniToDoListProps = {
    date: string | undefined;
    isToday: boolean;
    tasks: BaseTask[];
    onOpenTask: (id: number) => void;
    onNext: () => void;
    onPrev: () => void;
    onAll: () => void;
};

export const PingeriniToDoListDayTasks: FunctionComponent<PingeriniToDoListProps> = _props => {
    const mainWrapperStyle = {
        marginTop: 15,
        height: 550,
        marginBottom: 0,
        flex: 1,
    };

    const [data, setData] = useState(_props.tasks);

    useEffect(() => {
        setData(_props.tasks);
    }, [_props.tasks]);

    const renderItem = useCallback(
        ({item, _index, drag, isActive}: RenderItemParams<BaseTask>) => {
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
                    onPress={() => _props.onOpenTask(item.id)}
                    onLongPress={drag}>
                    <Text
                        style={{
                            color: '#000',
                            flex: 1,
                            flexDirection: 'row',
                        }}>
                        {`${item.name} (${item.id})`}
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
                    {`${
                        _props.date
                            ? _props.isToday
                                ? "Today's"
                                : _props.date
                            : 'All'
                    } tasks`}
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
                    title="    <    "
                    onPress={_props.onPrev}
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
                    title="Show All"
                    onPress={_props.onAll}
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
                    title="    >    "
                    onPress={_props.onNext}
                />
            </View>
            <DraggableFlatList
                listKey={'id'}
                data={
                    _props.date
                        ? data.filter(d => d.executionDate === _props.date)
                        : data
                }
                renderItem={renderItem}
                keyExtractor={(item, _index) => `draggable-item-${item.id}`}
                onDragEnd={({data}) => setData(data)}
            />
        </View>
    );
};
