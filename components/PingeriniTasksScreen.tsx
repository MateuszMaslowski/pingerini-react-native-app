import React, {FunctionComponent} from 'react';
import {PingeriniToDoList} from './PingeriniToDoList';
import {PingeriniToDoPlusButton} from './PingeriniToDoPlusButton';
import {View} from 'react-native';
import {Actions} from 'react-native-router-flux';

export const PingeriniTasksScreen: FunctionComponent = () => (
    <>
        <PingeriniToDoList />
        <PingeriniToDoPlusButton
            onTaskAdded={id => Actions.push('taskInfo', {taskId: id})}
        />
    </>
);
