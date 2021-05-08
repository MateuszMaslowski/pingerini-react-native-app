import React, {FunctionComponent, useContext, useEffect, useState} from 'react';
import {Text} from 'react-native-elements';
import {View} from 'react-native';
import {PingeriniToDoListDayTasks} from './PingeriniToDoListDayTasks';
import {gql} from '@apollo/client/core';
import {useQuery} from '@apollo/client';
import {UserContext} from './UserProvider';
import {Actions} from 'react-native-router-flux';
import {removeDuplicateTasks} from '../Utils';

export type BaseTask = {
    id: number;
    name: string;
    executionDate: string;
    deadline: string;
    description: string;
    fruits: string;
    state: string;
};

type ToDoListProps = {};

export const queryMyTasks = gql`
    query MyTasks($sessionKey: String!) {
        userTasks(sessionKey: $sessionKey) {
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

    const [tasks, setTasks] = useState([] as BaseTask[]);

    //const buttons = ['<', '>'];
    const tasksQuery = useQuery(queryMyTasks, {
        variables: {sessionKey: user.sessionKey},
        pollInterval: 500,
    });

    useEffect(() => {
        setTasks(removeDuplicateTasks(tasksQuery?.data?.userTasks ?? []));
    }, [tasksQuery, tasksQuery.data]);

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
            <PingeriniToDoListDayTasks
                onOpenTask={id => Actions.push('taskInfo', {taskId: id})}
                date={new Date()}
                tasks={tasks}
            />
        </View>
    );
};
