import React, {useContext, useEffect, useState} from 'react';
import {Alert, Button, Text, View} from 'react-native';
import {gql} from '@apollo/client/core';
import {useMutation, useQuery} from '@apollo/client';
import {BasicUser, UserContext} from './UserProvider';
import {Actions} from 'react-native-router-flux';
import styled from 'styled-components/native';

type PingCreatorScreenProps = {
    otherId: string;
    taskId: number;
    pingType: string;
    isResponse: boolean;
};

export const queryUsers = gql`
    query Users($sessionKey: String!) {
        users(sessionKey: $sessionKey) {
            id
            firstName
            lastName
        }
    }
`;

const createPingMutation = gql`
    mutation CreatePing(
        $sessionKey: String!
        $otherId: Int!
        $taskId: Int!
        $message: String!
        $pingType: String!
    ) {
        sendPing(
            sessionKey: $sessionKey
            otherId: $otherId
            taskId: $taskId
            message: $message
            pingType: $pingType
        ) {
            ok
            errorInfo
        }
    }
`;

const StyledInput = styled.TextInput`
    margin: 10px;
    color: black;
    border: 1px solid black;
    height: 300px;
`;

const PingCreatorScreen: React.FC<PingCreatorScreenProps> = props => {
    const user = useContext(UserContext);
    const [message, setMessage] = useState('');
    const [mCreatePing, {}] = useMutation(createPingMutation);

    const usersQuery = useQuery(queryUsers, {
        variables: {
            sessionKey: user.sessionKey,
        },
    });

    const [otherUser, setOtherUser] = useState((null as unknown) as BasicUser);

    useEffect(() => {
        setOtherUser(
            usersQuery?.data?.users?.filter(u => u.id == props.otherId)[0],
        );
    }, [usersQuery]);

    return (
        <View>
            <Text>{`${props?.isResponse ? 'Response to: ' : ''} "${
                props.pingType
            }" to ${otherUser?.firstName} ${otherUser?.lastName}`}</Text>
            <StyledInput
                value={message}
                multiline
                onChangeText={setMessage}
                placeholder={'Message'}
            />
            <Button
                title={'Send'}
                onPress={() =>
                    mCreatePing({
                        variables: {
                            sessionKey: user?.sessionKey,
                            otherId: props?.otherId,
                            taskId: props?.taskId,
                            message: message,
                            pingType: props?.pingType,
                        },
                    })
                        .then(res => {
                            if (res?.data?.sendPing?.ok) {
                                Alert.alert('Sent!');
                                Actions.pop();
                            } else {
                                console.log(
                                    JSON.stringify(
                                        res?.data?.sendPing?.errorInfo,
                                    ),
                                );
                                Alert.alert(
                                    JSON.stringify(
                                        res?.data?.sendPing?.errorInfo,
                                    ),
                                );
                                console?.log(props?.otherId);
                            }
                        })
                        .catch(err => {
                            console.log(JSON.stringify(err));
                            Alert.alert(JSON.stringify(err));
                        })
                }
            />
            <Button title={'Cancel'} onPress={() => Actions.pop()} />
        </View>
    );
};

export default PingCreatorScreen;
