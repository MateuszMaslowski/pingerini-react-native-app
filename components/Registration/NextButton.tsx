import {Button} from 'react-native-elements';
import React, {FunctionComponent} from 'react';
import {StyleSheet} from 'react-native';

export const NextButton: FunctionComponent<{
    onPress: () => void;
    title?: string;
}> = props => (
    <Button
        title={props.title ?? 'Next'}
        containerStyle={styles.buttonNext}
        onPress={props.onPress}
    />
);

const styles = StyleSheet.create({
    buttonNext: {
        width: '60%',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginBottom: 10,
        marginTop: 30,
        backgroundColor: '#007ED5',
    },
});
