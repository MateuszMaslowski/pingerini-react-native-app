import React, {FunctionComponent, useState} from 'react';
import {TextInput} from 'react-native-paper';
import {View, StyleSheet, Text, Alert} from 'react-native';
import {NextButton} from './NextButton';
import {gql} from '@apollo/client/core';
import {useMutation} from '@apollo/client';

const validateBirth = gql`
    mutation ValidateBirth($birth: Date!) {
        validateBirthdate(birthdate: $birth) {
            errorInfo
        }
    }
`;

type BirthdateProps = {
    onGatherBirth: (birth: Date) => void;
};

export const Birthdate: FunctionComponent<BirthdateProps> = props => {
    const [vBirth, {}] = useMutation(validateBirth);
    const [birth, setBirth] = useState('');
    const [error, setError] = useState('');
    return (
        <View>
            <View style={styles.topText}>
                <Text style={styles.titleText}>Register to Pingerini</Text>
                <Text style={styles.subText}>Your birthdate</Text>
                <TextInput
                    style={styles.input}
                    theme={{colors: {primary: '#007ED5'}}}
                    placeholder="01/01/2000"
                    underlineColor="transparent"
                    mode="outlined"
                    onChangeText={setBirth}
                />
            </View>
            <Text>{error}</Text>
            <NextButton
                onPress={() => {
                    const x = Date.parse(birth);
                    if (x !== x || x < 0) {
                        setError('Wrong date format');
                    } else {
                        const d = new Date(x);
                        setError(d.toISOString().slice(0, 10));
                        vBirth({
                            variables: {
                                birth: d.toISOString().slice(0, 10),
                            },
                        })
                            .then(res => {
                                if (res.data.validateBirthdate.errorInfo) {
                                    setError(
                                        res.data.validateBirthdate.errorInfo,
                                    );
                                } else {
                                    props.onGatherBirth(d);
                                }
                            })
                            .catch(err => {
                                setError(JSON.stringify(err));
                            });
                    }
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
