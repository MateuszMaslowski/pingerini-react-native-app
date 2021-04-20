import React, {FunctionComponent} from 'react';
import {TextInput} from 'react-native-paper';
import {View, StyleSheet, Text} from 'react-native';

export const Name: FunctionComponent = _props => {
    return (
        <View>
            <View style={styles.topText}>
                <Text style={styles.titleText}>
                    Register to Pingerini
                </Text>
                <Text style={styles.subText}>
                    {'What\'s your \nname?'}
                </Text>
                <TextInput style={styles.input1}
                           theme={{colors: {primary: "#007ED5"}}}
                           placeholder='first name'
                           underlineColor="transparent"
                           mode="outlined"
                />
                <TextInput style={styles.input2}
                           theme={{colors: {primary: "#007ED5"}}}
                           placeholder='last name'
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
    input1: {
        width: "35%",
        marginLeft: "auto",
        marginRight: "auto",
        position: "absolute",
        top: 280,
        left: "10%"
    },
    input2: {
        width: "35%",
        marginLeft: "auto",
        marginRight: "auto",
        position: "absolute",
        top: 280,
        left: "55%"
    }
});