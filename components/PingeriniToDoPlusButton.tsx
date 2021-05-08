import React, {FunctionComponent, useContext} from 'react';
import {Button} from 'react-native-elements';
import {gql} from '@apollo/client/core';
import {useMutation} from '@apollo/client';
import {UserContext} from './UserProvider';
import {Alert} from 'react-native';

type PingeriniToDoPlusButtonProps = {
    onTaskAdded: (taskId: number) => void;
};
const mutationTryAddTask = gql`
    mutation AddTask($sessionKey: String!, $myId: Int!) {
        addTask(
            sessionKey: $sessionKey
            deadline: "2022-01-02"
            description: "New description"
            executionDate: "2022-01-02"
            name: "New task"
            fruits: "New fruits"
            usersId: [$myId]
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
        console.log('TryAdd task');
        mTryAddTask({
            variables: {
                sessionKey: user.sessionKey,
                myId: user.id,
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
