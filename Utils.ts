import {BaseTask} from './components/PingeriniToDoList';

export const removeDuplicateTasks = (tasks: any): any => {
    const tasksById = tasks.reduce((acc, task) => {
        const x = {...acc};
        x[task.id] = task;
        return x;
    }, {});
    return Object.values(tasksById);
};
