import React, {FunctionComponent} from 'react';
import {TextInput} from 'react-native-paper';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {Button} from 'react-native-elements';
import {PingeriniRegistration} from './PingeriniRegistration';
import {Actions} from 'react-native-router-flux';

export const PingeriniLogin: FunctionComponent = _props => {

    const goToRegistration = () => {
        Actions.registration()
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
                <TextInput style={styles.input}
                           theme={{colors: {primary: "#007ED5"}}}
                           placeholder='Login'
                           underlineColor="transparent"
                           mode="outlined"
                />
                <TextInput style={styles.input}
                           theme={{colors: {primary: "#007ED5"}}}
                           placeholder='Password'
                           underlineColor="transparent"
                           mode="outlined"
                           secureTextEntry={true}
                />
            </View>

            {/*<View style={styles.input}>*/}
                <Button title={"Login"} containerStyle={styles.buttonLogin}/>
                <TouchableOpacity onPress={goToRegistration}>
                    <Text style={styles.buttonToRegistration}>
                        Sign-up
                    </Text>
                </TouchableOpacity>
            {/*</View>*/}

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
        // fontWeight: "bold"
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
        marginTop: 10
    },
    buttonToRegistration: {
        color: "#007ED5",
        textAlign: "center",
        fontSize: 15
    },
    buttonLogin: {
        width: "60%",
        marginLeft: "auto",
        marginRight: "auto",
        marginBottom: 10,
        marginTop: 30,
        backgroundColor: "#007ED5",
    }
});