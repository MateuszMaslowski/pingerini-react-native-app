import React, {FunctionComponent} from 'react';
import {TextInput} from 'react-native-paper';
import {View, StyleSheet, Text} from 'react-native';
import {NextButton} from './NextButton';

type TermsProps = {
    onAcceptTerms: () => void;
};

export const Terms: FunctionComponent<TermsProps> = props => {
    return (
        <View>
            <View style={styles.topText}>
                <Text style={styles.titleText}>Register to Pingerini</Text>
                <Text style={styles.subText}>
                    {
                        'By continuing\nyou agree and consent\nto the Terms of Service\n and Privacy Policy'
                    }
                </Text>
                <NextButton onPress={props.onAcceptTerms} />
            </View>
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
});
