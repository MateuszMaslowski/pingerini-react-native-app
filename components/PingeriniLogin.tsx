import React, {FunctionComponent, useState} from 'react';
import {TextInput} from 'react-native-paper';
import {View, StyleSheet, Text, TouchableOpacity, Alert} from 'react-native';
import {Button} from 'react-native-elements';
import {PingeriniRegistration} from './PingeriniRegistration';
import {Actions} from 'react-native-router-flux';
import {gql} from '@apollo/client/core';
import {useMutation} from '@apollo/client';

const loginMutation = gql`
    mutation Login($password: String!, $email: String!) {
        login(password: $password, email: $email) {
            ok
            user {
                id
                firstName
                lastName
                sessionKey
            }
        }
    }
`;

type PingeriniLoginProps = {
    onLogin: (user: any) => void;
};

export const PingeriniLogin: FunctionComponent<PingeriniLoginProps> = props => {
    const goToRegistration = () => {
        Actions.registration();
    };

    const DEFAULT_LOGIN = 'X@d.xd';
    const DEFAULT_PASSWORD = 'Kappakappa13';

    const [mail, setMail] = useState(DEFAULT_LOGIN);
    const [password, setPassword] = useState(DEFAULT_PASSWORD);
    const [mTryLogin, {}] = useMutation(loginMutation);

    const tryLogin = () => {
        mTryLogin({
            variables: {
                password,
                email: mail,
            },
        })
            .then(res => {
                if (res.data.login.ok) {
                    props.onLogin(res.data.login.user);
                } else {
                    Alert.alert('Try again');
                }
            })
            .catch(err => {
                Alert.alert(JSON.stringify(err));
            });
    };

    return (
        <View>
            <View style={styles.topText}>
                <Text style={styles.titleText}>Pingerini</Text>
                <Text style={styles.subText}>Get their work done</Text>
                <TextInput
                    style={styles.input}
                    theme={{colors: {primary: '#007ED5'}}}
                    placeholder="E-mail"
                    underlineColor="transparent"
                    mode="outlined"
                    onChangeText={setMail}
                />
                <TextInput
                    style={styles.input}
                    theme={{colors: {primary: '#007ED5'}}}
                    placeholder="Password"
                    underlineColor="transparent"
                    mode="outlined"
                    secureTextEntry={true}
                    onChangeText={setPassword}
                />
            </View>

            {/*<View style={styles.input}>*/}
            <Button
                title={'Login'}
                containerStyle={styles.buttonLogin}
                onPress={tryLogin}
            />
            <TouchableOpacity onPress={goToRegistration}>
                <Text style={styles.buttonToRegistration}>Sign-up</Text>
            </TouchableOpacity>
            {/*</View>*/}
        </View>
    );
};

const styles = StyleSheet.create({
    topText: {
        height: 350,
    },
    titleText: {
        textAlign: 'center',
        fontSize: 30,
        // fontWeight: "bold"
        marginTop: 60,
    },
    subText: {
        textAlign: 'center',
        fontSize: 25,
        marginTop: 20,
        marginBottom: 40,
    },
    input: {
        width: '60%',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: 10,
    },
    buttonToRegistration: {
        color: '#007ED5',
        textAlign: 'center',
        fontSize: 15,
    },
    buttonLogin: {
        width: '60%',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginBottom: 10,
        marginTop: 30,
        backgroundColor: '#007ED5',
    },
});
