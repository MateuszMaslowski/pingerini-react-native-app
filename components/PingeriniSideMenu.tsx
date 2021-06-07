import React, {FunctionComponent, useContext} from 'react';
import {Button, SafeAreaView, View} from 'react-native';

import {ListItem, Avatar, Icon} from 'react-native-elements';
import {BasicUser, UserContext} from './UserProvider';
import {Actions} from 'react-native-router-flux';

type SideMenuProps = {
    onLogout: () => void;
};

export const PingeriniSideMenu: FunctionComponent<SideMenuProps> = _props => {
    const myUser = useContext<BasicUser>(UserContext);

    const user = {
        name: `${myUser.firstName} ${myUser.lastName}`,
        avatar_url:
            'https://static.wikia.nocookie.net/nowa-przyszlosc/images/0/0f/Jan_Paweł.jpg/revision/latest/scale-to-width-down/620?cb=20190924132209&path-prefix=pl', //'https://i.vimeocdn.com/portrait/58832_300x300.jpg',
        subtitle: `${myUser.jobTitle} at ${myUser.company}`,
    };

    const list = [
        {
            title: 'Settings',
            icon: 'settings',
        },
    ];

    return (
        <SafeAreaView>
            <ListItem key={0} bottomDivider>
                <Avatar source={{uri: user.avatar_url}} />
                <ListItem.Content>
                    <ListItem.Title>{user.name}</ListItem.Title>
                    <ListItem.Subtitle>{user.subtitle}</ListItem.Subtitle>
                </ListItem.Content>
            </ListItem>
            {list.map((item, i) => (
                <ListItem key={i} bottomDivider>
                    <Icon name={item.icon} />
                    <ListItem.Content>
                        <ListItem.Title>{item.title}</ListItem.Title>
                    </ListItem.Content>
                    <ListItem.Chevron />
                </ListItem>
            ))}
            <ListItem key={'pingList'} bottomDivider>
                <Button
                    title={'My pings'}
                    onPress={() => Actions.push('pingList')}
                />
            </ListItem>
            <ListItem key={'xd'} bottomDivider>
                <Button title={'Logout'} onPress={_props.onLogout} />
            </ListItem>
        </SafeAreaView>
    );
};
