import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Button} from 'react-native-elements';
import {Name} from './Registration/Name'
import {Birthdate} from './Registration/Birthdate'
import {Job} from './Registration/Job'
import {Company} from './Registration/Company'
import {Email} from './Registration/Email'
import {Login} from './Registration/Login'
import {Password} from './Registration/Password'
import {Picture} from './Registration/Picture'
import {Terms} from './Registration/Terms'
import {Finish} from './Registration/Finish'

export class PingeriniRegistration extends Component {
    state = {
        step: 1
    };

    // Proceed to next step
    nextStep = () => {
        const {step} = this.state;
        this.setState({
            step: step + 1
        });
    };

    render() {
        const {step} = this.state;

        switch (step) {
            case 1:
                return (
                    <View>
                        <Name/>
                        <Button title={"Next"} containerStyle={styles.buttonNext} onPress={this.nextStep}/>
                    </View>
                );
            case 2:
                return (
                    <View>
                        <Birthdate/>
                        <Button title={"Next"} containerStyle={styles.buttonNext} onPress={this.nextStep}/>
                    </View>
                );
            case 3:
                return (
                    <View>
                        <Job/>
                        <Button title={"Next"} containerStyle={styles.buttonNext} onPress={this.nextStep}/>
                    </View>
                );
            case 4:
                return (
                    <View>
                        <Company/>
                        <Button title={"Next"} containerStyle={styles.buttonNext} onPress={this.nextStep}/>
                    </View>
                );
            case 5:
                return (
                    <View>
                        <Email/>
                        <Button title={"Next"} containerStyle={styles.buttonNext} onPress={this.nextStep}/>
                    </View>
                );
            case 6:
                return (
                    <View>
                        <Login/>
                        <Button title={"Next"} containerStyle={styles.buttonNext} onPress={this.nextStep}/>
                    </View>
                );
            case 7:
                return (
                    <View>
                        <Password/>
                        <Button title={"Next"} containerStyle={styles.buttonNext} onPress={this.nextStep}/>
                    </View>
                );
            case 8:
                return (
                    <View>
                        <Terms/>
                        <Button title={"Next"} containerStyle={styles.buttonNext} onPress={this.nextStep}/>
                    </View>
                );
            case 9:
                return (
                    <View>
                        <Finish />
                        <Button title={"Go to my TODO list"} containerStyle={styles.buttonNext} onPress={this.nextStep}/>
                    </View>
                );
        }
    }
}

const styles = StyleSheet.create({
    buttonNext: {
        width: "60%",
        marginLeft: "auto",
        marginRight: "auto",
        marginBottom: 10,
        marginTop: 30,
        backgroundColor: "#007ED5",
    }
});

export default PingeriniRegistration;