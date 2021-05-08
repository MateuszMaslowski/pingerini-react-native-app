import React, {FunctionComponent, useState} from 'react';
import {TextInput} from 'react-native-paper';
import {View, StyleSheet, Text} from 'react-native';
import {gql} from '@apollo/client/core';
import {useMutation} from '@apollo/client';
import {NextButton} from './NextButton';

const validateCompany = gql`
    mutation ValidateCompany($company: String!) {
        validateCompany(company: $company) {
            errorInfo
        }
    }
`;

type CompanyProps = {
    onGatherCompany: (company: string) => void;
};

export const Company: FunctionComponent<CompanyProps> = props => {
    const [vCompany, {}] = useMutation(validateCompany);
    const [company, setCompany] = useState('');
    const [error, setError] = useState('');
    return (
        <View>
            <View style={styles.topText}>
                <Text style={styles.titleText}>Register to Pingerini</Text>
                <Text style={styles.subText}>{'Your most\nrelevant firm'}</Text>
                <TextInput
                    style={styles.input}
                    theme={{colors: {primary: '#007ED5'}}}
                    placeholder="company name"
                    underlineColor="transparent"
                    mode="outlined"
                    onChangeText={setCompany}
                />
            </View>
            <Text>{error}</Text>
            <NextButton
                onPress={() => {
                    vCompany({
                        variables: {
                            company,
                        },
                    })
                        .then(res => {
                            if (res.data.validateCompany.errorInfo) {
                                setError(res.data.validateCompany.errorInfo);
                            } else {
                                props.onGatherCompany(company);
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
