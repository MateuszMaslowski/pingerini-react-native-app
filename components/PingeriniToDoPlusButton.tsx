import React, {FunctionComponent, useContext} from 'react';
import {Button} from 'react-native-elements';
import {gql} from '@apollo/client/core';
import {useMutation} from '@apollo/client';
import {UserContext} from './UserProvider';
import {Alert} from 'react-native';

type PingeriniToDoPlusButtonProps = {
    onTaskAdded: (taskId: number) => void;
    addForId: string;
    addDate: string;
};
const mutationTryAddTask = gql`
    mutation AddTask($sessionKey: String!, $date: Date!, $users: [Int!]!) {
        addTask(
            sessionKey: $sessionKey
            deadline: $date
            description: "New description"
            executionDate: $date
            name: "New task"
            fruits: "New fruits"
            usersId: $users
        ) {
            ok
            errorInfo
            task {
                id
            }
        }
    }
`;

export const PingeriniToDoPlusButton: FunctionComponent<PingeriniToDoPlusButtonProps> = _props => {
    const containerStyle = {
        borderRadius: 100,
        width: 40,
        height: 40,
        marginBottom: 75,
        marginLeft: '42%',
    };

    const user = useContext(UserContext);
    const [mTryAddTask, {}] = useMutation(mutationTryAddTask);

    const tryAddTask = () => {
        console.log(`TryAdd task ${_props.addDate}`);
        mTryAddTask({
            variables: {
                sessionKey: user.sessionKey,
                users: user?.id === _props.addForId ? [] : [_props.addForId],
                date: _props.addDate,
            },
        })
            .then(res => {
                if (res.data.addTask.ok) {
                    _props.onTaskAdded(res.data.addTask.task.id);
                } else {
                    Alert.alert(res.data.addTask.errorInfo);
                }
            })
            .catch(err => {
                Alert.alert(JSON.stringify(err));
                console.log(JSON.stringify(err));
            });
    };

    return (
        <Button
            containerStyle={containerStyle}
            title={'+'}
            onPress={tryAddTask}
        />
    );
};
