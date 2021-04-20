import React, {FunctionComponent} from 'react';
import {TextInput} from 'react-native-paper';
import {View, StyleSheet, Text} from 'react-native';

export const Job: FunctionComponent = _props => {
    return (
        <View>
            <View style={styles.topText}>
                <Text style={styles.titleText}>
                    Register to Pingerini
                </Text>
                <Text style={styles.subText}>
                    {'Your most\nrelevant job title'}
                </Text>
                <TextInput style={styles.input}
                           theme={{colors: {primary: "#007ED5"}}}
                           placeholder='your job title'
                           underlineColor="transparent"
                           mode="outlined"
                />
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
    input: {
        width: "60%",
        marginLeft: "auto",
        marginRight: "auto",
        position: "absolute",
        top: 280,
        left: "20%"
    }
});