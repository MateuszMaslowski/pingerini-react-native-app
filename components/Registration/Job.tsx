import React, {FunctionComponent, useState} from 'react';
import {TextInput} from 'react-native-paper';
import {View, StyleSheet, Text} from 'react-native';
import {gql} from '@apollo/client/core';
import {useMutation} from '@apollo/client';
import {NextButton} from './NextButton';

const validateJob = gql`
    mutation ValidateJob($job: String!) {
        validateJobTitle(jobTitle: $job) {
            errorInfo
        }
    }
`;

type JobProps = {
    onGatherJob: (job: string) => void;
};

export const Job: FunctionComponent<JobProps> = props => {
    const [vJob, {}] = useMutation(validateJob);
    const [job, setJob] = useState('');
    const [error, setError] = useState('');

    return (
        <View>
            <View style={styles.topText}>
                <Text style={styles.titleText}>Register to Pingerini</Text>
                <Text style={styles.subText}>
                    {'Your most\nrelevant job title'}
                </Text>
                <TextInput
                    style={styles.input}
                    theme={{colors: {primary: '#007ED5'}}}
                    placeholder="your job title"
                    underlineColor="transparent"
                    mode="outlined"
                    onChangeText={setJob}
                />
            </View>
            <Text>{error}</Text>
            <NextButton
                onPress={() => {
                    vJob({
                        variables: {
                            job,
                        },
                    })
                        .then(res => {
                            if (res.data.validateJobTitle.errorInfo) {
                                setError(res.data.validateJobTitle.errorInfo);
                            } else {
                                props.onGatherJob(job);
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
