import React, {useContext, useState} from 'react';
import {ScrollView, TextInput, TouchableOpacity, View} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {useQuery} from '@apollo/client';
import {queryUsers} from './PingeriniToDoList';
import {UserContext} from './UserProvider';
import {Divider} from 'react-native-elements';
import styled from 'styled-components/native';
import {Actions} from 'react-native-router-flux';

type SearchScreenProps = {};

const UserLabel = styled.Text`
    color: black;
    height: 50px;
    font-size: 20px;
    line-height: 50px;
`;

const StyledInpud = styled.TextInput`
    border: 1px solid black;
    margin: 10px;
    color: black;
`;

const SearchScreen: React.FC<SearchScreenProps> = _props => {
    const user = useContext(UserContext);
    const [filter, setFilter] = useState('');

    const usersQuery = useQuery(queryUsers, {
        variables: {sessionKey: user.sessionKey},
        pollInterval: 500,
    });

    return (
        <View>
            <StyledInpud onChangeText={setFilter} value={filter} />
            <ScrollView>
                {usersQuery?.data?.users
                    ?.filter(u =>
                        `${u.firstName} ${u.lastNames}`.includes(filter),
                    )
                    ?.map(u => (
                        <TouchableOpacity
                            onPress={() =>
                                Actions.push('taskList', {userId: u.id})
                            }>
                            <View>
                                <UserLabel>{`${u?.firstName} ${u?.lastName}`}</UserLabel>
                                <Divider />
                            </View>
                        </TouchableOpacity>
                    ))}
            </ScrollView>
        </View>
    );
};

export default SearchScreen;
