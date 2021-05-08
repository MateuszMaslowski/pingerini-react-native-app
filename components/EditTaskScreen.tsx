import React, {FunctionComponent, useContext, useEffect, useState} from 'react';
import {Text, TextInput, View, Button, Alert} from 'react-native';
import SideMenu from 'react-native-side-menu-updated';
import {gql} from '@apollo/client/core';
import {useMutation, useQuery} from '@apollo/client';
import {UserContext} from './UserProvider';
import {BaseTask, queryMyTasks} from './PingeriniToDoList';
import styled from 'styled-components/native';
import {removeDuplicateTasks} from '../Utils';

type EditTaskScreenProps = {
    taskId: number;
};

const StyledTextInput = styled(TextInput)`
    color: black;
    border: 1px solid black;
    margin: 5px;
    padding: 2px;
`;

const mutationEditTask = gql`
    mutation EditTask(
        $sessionKey: String!
        $taskId: Int!
        $deadline: Date!
        $description: String!
        $executionDate: Date!
        $state: String!
        $name: String!
        $fruits: String!
    ) {
        updateTask(
            deadline: $deadline
            description: $description
            executionDate: $executionDate
            fruits: $fruits
            name: $name
            sessionKey: $sessionKey
            state: $state
            taskId: $taskId
        ) {
            ok
            errorInfo
            task {
                id
            }
        }
    }
`;

export const EditTaskScreen: FunctionComponent<EditTaskScreenProps> = props => {
    // eslint-disable-next-line react/jsx-no-undef

    const user = useContext(UserContext);
    const [task, setTask] = useState((null as unknown) as BaseTask);
    const tasksQuery = useQuery(queryMyTasks, {
        variables: {sessionKey: user.sessionKey},
    });

    useEffect(() => {
        const tasks = removeDuplicateTasks(tasksQuery.data?.userTasks ?? []);
        setTask(tasks.filter(t => t.id === props.taskId)[0]);
    }, [tasksQuery, tasksQuery.data]);

    const [mEditTask, {}] = useMutation(mutationEditTask);
    const [deadline, setDeadline] = useState('');
    const [executionDate, setExecutionDate] = useState('');
    const [fruits, setFruits] = useState('');
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [state, setState] = useState('');

    useEffect(() => {
        if (!task) {
            return;
        }
        setDeadline(task.deadline);
        setDescription(task.description);
        setExecutionDate(task.executionDate);
        setFruits(task.fruits);
        setName(task.name);
        setState(task.state);
    }, [task]);

    const trySave = () => {
        mEditTask({
            variables: {
                deadline,
                description,
                executionDate,
                fruits,
                name,
                sessionKey: user.sessionKey,
                state,
                taskId: props.taskId,
            },
        })
            .then(res => {
                if (res.data.updateTask.ok) {
                } else {
                    Alert.alert(res.data.updateTask.errorInfo);
                }
            })
            .catch(err => {
                console.log(JSON.stringify(err));
                Alert.alert(JSON.stringify(err));
            });
    };

    return (
        <View
            style={{
                display: 'flex',
                flex: 1,
            }}>
            <Text>Name</Text>
            <StyledTextInput value={name} onChangeText={setName} />
            <Text>Fruits</Text>
            <StyledTextInput value={fruits} onChangeText={setFruits} />
            <Text>State</Text>
            <StyledTextInput value={state} onChangeText={setState} />
            <Text>Execution Date</Text>
            <StyledTextInput
                value={executionDate}
                onChangeText={setExecutionDate}
            />
            <Text>Deadline</Text>
            <StyledTextInput value={deadline} onChangeText={setDeadline} />
            <Text>Description</Text>
            <StyledTextInput
                value={description}
                onChangeText={setDescription}
            />
            <Button title={'Save changes'} onPress={trySave} />
        </View>
    );
};
