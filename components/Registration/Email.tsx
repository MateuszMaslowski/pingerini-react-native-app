import React, {FunctionComponent, useState} from 'react';
import {TextInput} from 'react-native-paper';
import {View, StyleSheet, Text} from 'react-native';
import {NextButton} from './NextButton';
import {gql} from '@apollo/client/core';
import {useMutation} from '@apollo/client';

const validateMail = gql`
    mutation ValidateMail($mail: String!) {
        validateEmail(email: $mail) {
            errorInfo
        }
    }
`;

type EmailProps = {
    onGatherMail: (mail: string) => void;
};

export const Email: FunctionComponent<EmailProps> = props => {
    const [vMail, {}] = useMutation(validateMail);
    const [mail, setMail] = useState('');
    const [error, setError] = useState('');
    return (
        <View>
            <View style={styles.topText}>
                <Text style={styles.titleText}>Register to Pingerini</Text>
                <Text style={styles.subText}>{'Your email\nadress'}</Text>
                <TextInput
                    style={styles.input}
                    theme={{colors: {primary: '#007ED5'}}}
                    placeholder="email adress"
                    underlineColor="transparent"
                    mode="outlined"
                    onChangeText={setMail}
                />
            </View>
            <Text>{error}</Text>
            <NextButton
                onPress={() => {
                    vMail({
                        variables: {
                            mail,
                        },
                    })
                        .then(res => {
                            if (res.data.validateEmail.errorInfo) {
                                setError(res.data.validateEmail.errorInfo);
                            } else {
                                props.onGatherMail(mail);
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
    input: {
        width: '60%',
        marginLeft: 'auto',
        marginRight: 'auto',
        position: 'absolute',
        top: 280,
        left: '20%',
    },
});
