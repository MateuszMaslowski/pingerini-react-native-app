import React, {FunctionComponent, useState} from 'react';
import {TextInput} from 'react-native-paper';
import {View, StyleSheet, Text, Alert} from 'react-native';
import {gql} from '@apollo/client/core';
import {useMutation} from '@apollo/client';
import {NextButton} from './NextButton';

const validateName = gql`
    mutation ValidateName($first: String!, $last: String!) {
        validateName(firstName: $first, lastName: $last) {
            errorInfo
        }
    }
`;

type NameProps = {
    onGatherName: (first: string, last: string) => void;
};

export const Name: FunctionComponent<NameProps> = props => {
    const [vName, {}] = useMutation(validateName);
    const [first, setFirst] = useState('');
    const [last, setLast] = useState('');
    const [error, setError] = useState('');
    return (
        <View>
            <View style={styles.topText}>
                <Text style={styles.titleText}>Register to Pingerini</Text>
                <Text style={styles.subText}>{"What's your \nname?"}</Text>
                <TextInput
                    style={styles.input1}
                    theme={{colors: {primary: '#007ED5'}}}
                    placeholder="first name"
                    underlineColor="transparent"
                    mode="outlined"
                    onChangeText={setFirst}
                />
                <TextInput
                    style={styles.input2}
                    theme={{colors: {primary: '#007ED5'}}}
                    placeholder="last name"
                    underlineColor="transparent"
                    mode="outlined"
                    onChangeText={setLast}
                />
            </View>
            <Text>{error}</Text>
            <NextButton
                onPress={() => {
                    vName({
                        variables: {
                            first,
                            last,
                        },
                    })
                        .then(res => {
                            if (res.data.validateName.errorInfo) {
                                setError(res.data.validateName.errorInfo);
                            } else {
                                props.onGatherName(first, last);
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
