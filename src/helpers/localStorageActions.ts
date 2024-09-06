import { TTask } from "../types/TTask";

export const loadTasksFromLocalStorage = (): Array<TTask> => {
    const tasks = localStorage.getItem('tasks');
    return tasks ? JSON.parse(tasks) : [];
};

export const saveTasksToLocalStorage = (tasks: Array<TTask>) => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
};