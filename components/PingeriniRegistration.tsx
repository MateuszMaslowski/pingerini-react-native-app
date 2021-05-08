import React, {FunctionComponent, useMemo, useState} from 'react';
import {Alert, View} from 'react-native';
import {Name} from './Registration/Name';
import {Birthdate} from './Registration/Birthdate';
import {Job} from './Registration/Job';
import {Company} from './Registration/Company';
import {Email} from './Registration/Email';
import {Password} from './Registration/Password';
import {Terms} from './Registration/Terms';
import {Finish} from './Registration/Finish';
import {NextButton} from './Registration/NextButton';
import {gql} from '@apollo/client/core';
import {useMutation} from '@apollo/client';

const registration = gql`
    mutation Registration(
        $birthdate: Date!
        $company: String!
        $email: String!
        $firstName: String!
        $jobTitle: String!
        $lastName: String!
        $password: String!
        $repeatedPassword: String!
    ) {
        registration(
            lastName: $lastName
            birthdate: $birthdate
            company: $company
            email: $email
            firstName: $firstName
            password: $password
            repeatedPassword: $repeatedPassword
            jobTitle: $jobTitle
        ) {
            errorInfo
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

type PingeriniRegistrationProps = {
    onRegister: (user: any) => void;
};

export const PingeriniRegistration: FunctionComponent<PingeriniRegistrationProps> = props => {
    const [step, setStep] = useState(1);
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [birth, setBirth] = useState(new Date());
    const [job, setJob] = useState('');
    const [company, setCompany] = useState('');
    const [email, setEmail] = useState('');

    const [vRegister, {}] = useMutation(registration);

    // Proceed to next step
    const nextStep = () => {
        setStep(step + 1);
    };

    const tryFinalize = () => {
        vRegister({
            variables: {
                password,
                firstName,
                lastName,
                birthdate: birth.toISOString().slice(0, 10),
                jobTitle: job,
                company,
                email,
                repeatedPassword: password,
            },
        })
            .then(res => {
                if (res.data.registration.ok) {
                    console.log(res.data);
                    props.onRegister(res.data.registration.user);
                } else {
                    console.log(res.data.registration.errorInfo);
                    Alert.alert(
                        'Register error',
                        JSON.stringify(res.data.registration.errorInfo),
                        [{onPress: () => setStep(1)}],
                    );
                }
            })
            .catch(err => {
                console.log(err);
                Alert.alert('Register error', JSON.stringify(err), [
                    {onPress: () => setStep(1)},
                ]);
            });
    };

    return (
        <View>
            {step === 1 ? (
                <View>
                    <Name
                        onGatherName={(fname, lname) => {
                            setFirstName(fname);
                            setLastName(lname);
                            nextStep();
                        }}
                    />
                </View>
            ) : step === 2 ? (
                <View>
                    <Birthdate
                        onGatherBirth={v => {
                            setBirth(v);
                            nextStep();
                        }}
                    />
                </View>
            ) : step === 3 ? (
                <View>
                    <Job
                        onGatherJob={job => {
                            setJob(job);
                            nextStep();
                        }}
                    />
                </View>
            ) : step === 4 ? (
                <View>
                    <Company
                        onGatherCompany={company => {
                            setCompany(company);
                            nextStep();
                        }}
                    />
                </View>
            ) : step === 5 ? (
                <View>
                    <Email
                        onGatherMail={mail => {
                            setEmail(mail);
                            nextStep();
                        }}
                    />
                </View>
            ) : step === 6 ? (
                <View>
                    <Password
                        onGatherPassword={p => {
                            setPassword(p);
                            nextStep();
                        }}
                    />
                </View>
            ) : step === 7 ? (
                <View>
                    <Terms onAcceptTerms={tryFinalize} />
                </View>
            ) : step === 8 ? (
                <View>
                    <Finish />
                    <NextButton
                        title={'Go to my TODO list'}
                        onPress={nextStep}
                    />
                </View>
            ) : (
                <></>
            )}
        </View>
    );
};

export default PingeriniRegistration;
