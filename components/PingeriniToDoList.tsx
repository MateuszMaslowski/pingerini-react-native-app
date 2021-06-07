import React, {FunctionComponent, useContext, useEffect, useState} from 'react';
import {Text} from 'react-native-elements';
import {Button, View} from 'react-native';
import {PingeriniToDoListDayTasks} from './PingeriniToDoListDayTasks';
import {gql} from '@apollo/client/core';
import {useQuery} from '@apollo/client';
import {BasicUser, UserContext} from './UserProvider';
import {Actions} from 'react-native-router-flux';
import {removeDuplicateTasks} from '../Utils';
import {PingeriniToDoPlusButton} from './PingeriniToDoPlusButton';
import {Picker} from '@react-native-picker/picker';

export type BaseTask = {
    id: number;
    name: string;
    executionDate: string;
    deadline: string;
    description: string;
    fruits: string;
    state: string;
};

type ToDoListProps = {
    userId?: string;
};

export const queryMyTasks = gql`
    query Tasks($sessionKey: String!, $userId: Int!) {
        commonUserTasks(sessionKey: $sessionKey, otherId: $userId) {
            id
            name
            executionDate
            deadline
            description
            fruits
            state
        }
    }
`;

export const queryUsers = gql`
    query Users($sessionKey: String!) {
        users(sessionKey: $sessionKey) {
            id
            firstName
            lastName
        }
    }
`;

export const PingeriniToDoList: FunctionComponent<ToDoListProps> = _props => {
    const mainWrapperStyle = {
        //minHeight: '100%',
        height: '90%',
        backgroundColor: '#fff',
        padding: 15,
        paddingBottom: 0,
        marginBottom: 0,
        flex: 1,
    };

    const user = useContext(UserContext);
    const usersQuery = useQuery(queryUsers, {
        variables: {sessionKey: user.sessionKey},
        pollInterval: 500,
    });

    const [tasks, setTasks] = useState([] as BaseTask[]);
    const [dayOffset, setDayOffset] = useState(0);
    const [showAll, setShowAll] = useState(false);

    const selectedId = _props?.userId ?? user?.id;
    console.log(_props);

    const [selectedUser, setSelectedUser] = useState<BasicUser>(
        undefined as any,
    );

    useEffect(() => {
        setSelectedUser(
            usersQuery?.data?.users?.filter(u => u.id == selectedId)[0],
        );
    }, [user, usersQuery.data, selectedId]);

    const todayDate = Date.now();
    const timestampToStr = (ts: number) => {
        const data = new Date(ts);
        return `${data.getUTCFullYear()}-${(data.getUTCMonth() + 1)
            .toString()
            .padStart(2, '0')}-${data
            .getUTCDate()
            .toString()
            .padStart(2, '0')}`;
    };
    const selectedDate = todayDate + dayOffset * (24 * 60 * 60 * 1000);

    const tasksQuery = useQuery(queryMyTasks, {
        variables: {sessionKey: user.sessionKey, userId: selectedId},
        pollInterval: 500,
    });

    useEffect(() => {
        setTasks(removeDuplicateTasks(tasksQuery?.data?.commonUserTasks ?? []));
    }, [tasksQuery, tasksQuery.data]);

    return (
        <>
            <View style={mainWrapperStyle}>
                <Text
                    h2
                    style={{
                        textAlign: 'center',
                        flexDirection: 'row',
                    }}>
                    {`${
                        selectedUser?.id == user.id
                            ? 'My'
                            : `${selectedUser?.firstName} ${selectedUser?.lastName}'s`
                    } TODO list`}
                </Text>
                <PingeriniToDoListDayTasks
                    onOpenTask={id =>
                        Actions.push('taskInfo', {
                            taskId: id,
                            userId: selectedId,
                        })
                    }
                    date={showAll ? undefined : timestampToStr(selectedDate)}
                    isToday={
                        timestampToStr(selectedDate) ==
                        timestampToStr(todayDate)
                    }
                    tasks={tasks}
                    onNext={() => {
                        setShowAll(false);
                        setDayOffset(dayOffset + 1);
                    }}
                    onPrev={() => {
                        setShowAll(false);
                        setDayOffset(dayOffset - 1);
                    }}
                    onAll={() => setShowAll(true)}
                />
            </View>
            <PingeriniToDoPlusButton
                onTaskAdded={id =>
                    Actions.push('taskInfo', {
                        taskId: id,
                        userId: selectedUser?.id,
                    })
                }
                addForId={selectedId}
                addDate={timestampToStr(selectedDate)}
            />
        </>
    );
};
