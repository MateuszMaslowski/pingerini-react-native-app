import React, {FunctionComponent} from 'react';
import {TextInput} from 'react-native-paper';
import {View, StyleSheet, Text} from 'react-native';

export const Finish: FunctionComponent = _props => {
    return (
        <View>
            <View style={styles.topText}>
                <Text style={styles.titleText}>
                    Congratulations!
                </Text>
                <Text style={styles.subText}>
                    {'You have successfully\n' +
                    'registered to Pingerini\n\n' +
                    'Now your colleagues will\n' +
                    'give you desired output\n' +
                    'right when you need it.'}
                </Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    topText: {
        height: 350
    },
    titleText: {
        textAlign: "center",
        fontSize: 30,
        marginTop: 60
    },
    subText: {
        textAlign: "center",
        fontSize: 25,
        marginTop: 20,
        marginBottom: 40
    },
});