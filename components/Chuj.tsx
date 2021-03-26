import {FunctionComponent, useState} from 'react';
import {Text, View} from 'react-native';
import styled from 'styled-components/native';
import {IStyled} from '../style';
import * as React from 'react';

import {Card, Button, Image} from 'react-native-elements';

export type ChujProps = {
    length: number;
};

type CipaProps = {
    users: {
        name: string;
        avatar: string;
    }[];
};

export const Cipa: FunctionComponent<CipaProps> = props => {
    return (
        <Card>
            <Card.Title>CARD WITH DIVIDER</Card.Title>
            <Card.Divider />
            {props.users.map((u, i) => {
                return (
                    <View key={i}>
                        <Image resizeMode="cover" source={{uri: u.avatar}} />
                        <Text>{u.name}</Text>
                    </View>
                );
            })}
        </Card>
    );
};

type ChujWrapperProps = IStyled & {
    //works in the same way as a tiny-size condom
    stoi: boolean;
};

const ChujWrapper = styled.View<ChujWrapperProps>`
    margin-top: 50px;
    color: red;
    background-color: ${p => (p.stoi ? p.theme.primary : p.theme.secondary)};
`;

const Chuj: FunctionComponent<ChujProps> = props => {
    const [stoi, setStoi] = useState(false);

    const desc = `Dlugosc penisa ${stoi ? props.length * 2 : props.length}`;

    return (
        <ChujWrapper stoi={stoi}>
            <Text>{desc}</Text>
            <Button title={'Zmien stan'} onPress={() => setStoi(!stoi)} />
            {React.Children.map(props.children, (c, i) => (
                <View>
                    <Text>{i}</Text>
                    {c}
                </View>
            ))}
        </ChujWrapper>
    );
};

export default Chuj;
