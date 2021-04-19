import React, {FunctionComponent} from 'react';
import {TextInput as Input} from 'react-native-paper';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
// import {Button} from 'react-native-elements'
import {PingeriniRegistration} from './PingeriniRegistration';
import { Actions } from 'react-native-router-flux';

export const PingeriniLogin: FunctionComponent = _props => {

    const goToRegistration = () => {
        Actions.registration(/*{hideNavBar:true}*/)
    }

    return (
        <View>
            <View style={styles.topText}>
                <Text style={styles.titleText}>
                    Pingerini
                </Text>
                <Text style={styles.subText}>
                    Get their work done
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

            <TouchableOpacity
                // style={styles.button}
                // disabled={!this.state.isFormValid}
                onPress = {goToRegistration}
            >
                <Text style={styles.buttonToRegistration}>
                    Sign-up
                </Text>
            </TouchableOpacity>

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