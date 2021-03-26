import React, {FunctionComponent} from 'react';
import {SafeAreaView, View} from 'react-native';

import {ListItem, Avatar, Icon} from 'react-native-elements';

export const PingeriniSideMenu: FunctionComponent = _props => {
    const user = {
        name: 'Jan Pawel II',
        avatar_url:
            'https://static.wikia.nocookie.net/nowa-przyszlosc/images/0/0f/Jan_Paweł.jpg/revision/latest/scale-to-width-down/620?cb=20190924132209&path-prefix=pl', //'https://i.vimeocdn.com/portrait/58832_300x300.jpg',
        subtitle: 'Papiez w Polak',
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
        </SafeAreaView>
    );
};
