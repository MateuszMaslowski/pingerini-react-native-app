import React, {FunctionComponent} from 'react';
import {TextInput as Input} from 'react-native-paper';
import {View, StyleSheet, Text} from 'react-native';
import { Actions } from 'react-native-router-flux';

export const PingeriniRegistration: FunctionComponent = _props => {

    return (
        <View>
            <View style={styles.topText}>
                <Text style={styles.titleText}>
                    Tu będzie...
                </Text>
                <Text style={styles.subText}>
                    pierwsza strona rejestracji
                </Text>
            </View>
            <Input style={styles.input}
                   placeholder='Login'
                   underlineColor="transparent"
                   mode="outlined"
            />
            <Input style={styles.input}
                   placeholder='Password'
                   underlineColor="transparent"
                   mode="outlined"
                   secureTextEntry={true}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    topText: {
        height: "50%"
    },
    titleText: {
        textAlign: "center",
        fontSize: 30,
        // fontWeight: "bold"
        marginTop: 80
    },
    subText: {
        textAlign: "center",
        fontSize: 25,
        marginTop: 30
    },
    input: {
        width: "60%",
        marginLeft: "auto",
        marginRight: "auto",
        marginBottom: 10
    },
    buttonToRegistration: {
        color: "#000000FF",
        textAlign: "center",
        fontSize: 17
    }
});