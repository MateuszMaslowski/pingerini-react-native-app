import React, {useContext, useEffect, useState} from 'react';
import {ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {gql} from '@apollo/client/core';
import {UserContext} from './UserProvider';
import {useQuery} from '@apollo/client';
import {Divider} from 'react-native-elements';
import {Actions} from 'react-native-router-flux';

const pingsQuery = gql`
    query Pings($sessionKey: String!) {
        pingList(sessionKey: $sessionKey) {
            id
            pingType
            task {
                name
            }
            userFrom {
                firstName
                lastName
            }
        }
    }
`;

const PingListScreen: React.FC = _props => {
    const user = useContext(UserContext);

    const [visiblePings, setVisiblePings] = useState<any[]>([]);

    const pings = useQuery(pingsQuery, {
        variables: {sessionKey: user.sessionKey},
        pollInterval: 500,
    });

    useEffect(
        () =>
            setVisiblePings(
                pings?.data?.pingList?.filter(p => p?.pingType != 'Ended') ??
                    [],
            ),
        [pings],
    );

    return (
        <View>
            <Text>My pings</Text>
            <Divider />
            <ScrollView>
                {visiblePings?.map(p => (
                    <TouchableOpacity
                        onPress={() =>
                            Actions.push('pingDetails', {pingId: p?.id})
                        }>
                        <Text>{`${p?.id} "${p?.pingType}"From ${p?.userFrom?.firstName} ${p?.userFrom?.lastName} on task ${p?.task?.name}`}</Text>
                        <Divider />
                    </TouchableOpacity>
                ))}
                <View style={{height: 200}} />
            </ScrollView>
        </View>
    );
};

export default PingListScreen;
