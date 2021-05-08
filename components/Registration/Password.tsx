import React, {FunctionComponent, useEffect, useState} from 'react';
import {TextInput} from 'react-native-paper';
import {View, StyleSheet, Text} from 'react-native';
import {gql} from '@apollo/client/core';
import {useMutation} from '@apollo/client';
import {NextButton} from './NextButton';

const validatePassword = gql`
    mutation ValidatePassword($password: String!, $repeated: String!) {
        validatePassword(password: $password, repeatedPassword: $repeated) {
            errorInfo
        }
    }
`;

type PasswordProps = {
    onGatherPassword: (password: string) => void;
};

export const Password: FunctionComponent<PasswordProps> = props => {
    const [vPassword, {}] = useMutation(validatePassword);
    const [password, setPassword] = useState('');
    const [rPassword, setRPassword] = useState('');
    const [error, setError] = useState('');

    return (
        <View>
            <View style={styles.topText}>
                <Text style={styles.titleText}>Register to Pingerini</Text>
                <Text style={styles.subText}>Your password</Text>
                <TextInput
                    style={styles.input1}
                    theme={{colors: {primary: '#007ED5'}}}
                    placeholder="password"
                    underlineColor="transparent"
                    mode="outlined"
                    secureTextEntry={true}
                    onChangeText={setPassword}
                />
                <TextInput
                    style={styles.input2}
                    theme={{colors: {primary: '#007ED5'}}}
                    placeholder="repeat password"
                    underlineColor="transparent"
                    mode="outlined"
                    secureTextEntry={true}
                    onChangeText={setRPassword}
                />
            </View>
            <Text>{error}</Text>
            <NextButton
                onPress={() => {
                    vPassword({
                        variables: {
                            password: password,
                            repeated: rPassword,
                        },
                    })
                        .then(res => {
                            if (res.data.validatePassword.errorInfo) {
                                setError(res.data.validatePassword.errorInfo);
                            } else {
                                props.onGatherPassword(password);
                            }
                        })
                        .catch(err => {
                            setError(JSON.stringify(err));
                        });
                }}
            />
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
        marginTop: 60,
    },
    subText: {
        textAlign: 'center',
        fontSize: 25,
        marginTop: 20,
        marginBottom: 40,
    },
    input1: {
        width: '35%',
        marginLeft: 'auto',
        marginRight: 'auto',
        position: 'absolute',
        top: 280,
        left: '10%',
    },
    input2: {
        width: '35%',
        marginLeft: 'auto',
        marginRight: 'auto',
        position: 'absolute',
        top: 280,
        left: '55%',
    },
});
