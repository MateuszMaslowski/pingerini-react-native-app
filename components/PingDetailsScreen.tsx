import React, {useContext, useEffect, useState} from 'react';
import {Alert, Button, Text, View} from 'react-native';
import {gql} from '@apollo/client/core';
import {UserContext} from './UserProvider';
import {useMutation, useQuery} from '@apollo/client';
import {Actions} from 'react-native-router-flux';

type PingDetailsScreenProps = {
    pingId: string;
};

const pingsQuery = gql`
    query Pings($sessionKey: String!) {
        pingList(sessionKey: $sessionKey) {
            id
            pingType
            message
            task {
                id
                name
            }
            userFrom {
                id
                firstName
                lastName
            }
            date
        }
    }
`;

const dismissMutation = gql`
    mutation Dismiss($sessionKey: String!, $pingId: Int!) {
        setPingEnded(sessionKey: $sessionKey, pingId: $pingId) {
            ok
            errorInfo
        }
    }
`;

const PingDetailsScreen: React.FC<PingDetailsScreenProps> = props => {
    const user = useContext(UserContext);

    const pings = useQuery(pingsQuery, {
        variables: {sessionKey: user.sessionKey},
        pollInterval: 500,
    });

    const [ping, setPing] = useState<any>(undefined);

    useEffect(() => {
        setPing(pings?.data?.pingList?.filter(p => p.id == props.pingId)[0]);
    }, [pings?.data?.pingList]);

    const [mDismiss, {}] = useMutation(dismissMutation);

    return (
        <View>
            <Text>{`Type: ${ping?.pingType}`}</Text>
            <Text>{`From: ${ping?.userFrom?.firstName} ${ping?.userFrom?.lastName}`}</Text>
            <Text>{`Date: ${ping?.date}`}</Text>
            <Text>Message:</Text>
            {ping?.message?.split('\n').map(seg => (
                <Text>{seg}</Text>
            ))}
            <Button
                title={`Go to task: ${ping?.task?.name}`}
                onPress={() =>
                    Actions.push('taskInfo', {taskId: ping?.task?.id})
                }
            />
            <Button
                title={`Answer: ${ping?.task?.name}`}
                onPress={() =>
                    Actions.push('taskInfo', {taskId: ping?.task?.id})
                }
            />
            <Button
                title={'Remove'}
                color={'red'}
                onPress={() => {
                    mDismiss({
                        variables: {
                            sessionKey: user.sessionKey,
                            pingId: ping?.id,
                        },
                    })
                        .then(res => {
                            console.log(JSON.stringify(res));
                            if (res?.data?.setPingEnded?.ok) {
                                Actions.pop();
                            } else {
                                Alert.alert(res?.data?.setPingEnded?.errorInfo);
                            }
                        })
                        .catch(err => {
                            console.log(JSON.stringify(err));
                            Alert.alert(JSON.stringify(err));
                        });
                }}
            />
            <Button title={'Back'} onPress={() => Actions.pop()} />
            {ping?.userFrom?.id == user?.id ? (
                <></>
            ) : (
                <Button
                    title={'Respond'}
                    onPress={() =>
                        Actions.push('createPing', {
                            otherId: ping?.userFrom?.id,
                            taskId: ping?.task?.id,
                            pingType: ping?.pingType,
                            isResponse: true,
                        })
                    }
                />
            )}
        </View>
    );
};

export default PingDetailsScreen;
