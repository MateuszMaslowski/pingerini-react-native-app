import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import AnimatedFormView from 'react-native-multistep-forms'

/* Define the steps  */
//
// import Step1 from "./Registration/Step1";
//
// const allSteps = [
//     { name: "step 1", component: Step1 }
// ];

/* Define your class */
export default class PingeriniRegistrationNew extends Component {
    //
    // /* define the method to be called when you go on next step */
    //
    // onNext = () => {
    //     console.log("Next");
    // };
    //
    // /* define the method to be called when you go on back step */
    //
    // onBack = () => {
    //     console.log("Back");
    // };
    //
    // /* define the method to be called when the wizard is finished */
    //
    // finish = finalState => {
    //     console.log(finalState);
    // };

    /* render MultiStep */
    render() {
        return (
            <View style={{ flex: 1 }}>
                {/*<AnimatedFormView*/}
                {/*    steps={allSteps}*/}
                {/*    onFinish={this.finish}*/}
                {/*    onBack={this.onBack}*/}
                {/*    onNext={this.onNext}*/}
                {/*    comeInOnNext="bounceInUp"*/}
                {/*    OutOnNext="bounceOutDown"*/}
                {/*    comeInOnBack="bounceInDown"*/}
                {/*    OutOnBack="bounceOutUp"*/}
                {/*/>*/}
                <Text>Rejestracja</Text>
            </View>
        );
    }
}