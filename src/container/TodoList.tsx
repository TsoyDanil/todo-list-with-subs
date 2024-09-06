import { useEffect, useState } from "react"
import TaskForm from "../components/TaskForm"
import { TTask } from "../types/TTask"
import TaskCard from "../components/TaskCard"
import { loadTasksFromLocalStorage, saveTasksToLocalStorage } from "../helpers/localStorageActions"


const TodoList = () => {

    const [tasks, setTasks] = useState<Array<TTask>>([])

    const handleSubmit = (task: TTask) => {
        setTasks((prevState) => [...prevState, task])
    }

    const handleRemove = (id: string) => {
        const filteredArray = [...tasks].filter((task) => task.id !== id)
        setTasks(filteredArray)
    }

    const handleRemoveSubTask = (subTaskId: string) => {
        setTasks(tasks.map(task => ({
            ...task,
            subTasks: task.subTasks.filter(subTask => subTask.id !== subTaskId)
        })));
    };


    const handleChangeStatus = (id: string) => {
        setTasks(tasks.map(task => 
            task.id === id ? { ...task, isFinished: !task.isFinished } : task
          ));
    }

    const handleSaveEditTask = (updatedTask: TTask) => {
        setTasks(tasks.map(task => 
            task.id === updatedTask.id ? {...updatedTask} : task
          ));
    }

    const handleSaveSubTasks = (subTaskData: Omit<TTask, 'subTasks'>) => {
        setTasks(tasks.map(task => ({
            ...task,
            subTasks: task.subTasks.map(subTask => 
                subTask.id === subTaskData.id ? { ...subTaskData } : subTask
            )
        })));
    };

    const handleAddSubTask = (taskId: string, newSubTask: Omit<TTask, 'subTasks'>) => {
        setTasks(tasks.map((task) => {
            if (task.id !== taskId) return task;
    
            return {
                ...task,
                subTasks: [...task.subTasks, newSubTask]
            };
        }));
    };

    const handleChangeSubtaskStatus = (subTaskId: string) => {
        setTasks(tasks.map(task => ({
            ...task,
            subTasks: task.subTasks.map(subTask => 
                subTask.id === subTaskId ? { ...subTask, isFinished: !subTask.isFinished } : subTask
            )
        })));
    };

    useEffect(() => {
        const loadedTasks = loadTasksFromLocalStorage();
        setTasks(loadedTasks);
    }, []);

    useEffect(() => {
        saveTasksToLocalStorage(tasks);
    }, [tasks]);

    return (
        <div>

            <TaskForm onSubmit={handleSubmit}/>
            <div>
                {
                    tasks.map((task) => {
                        return <TaskCard 
                                    key={task.id} 
                                    task={task}
                                    removeTask={handleRemove}
                                    changeStatus={handleChangeStatus}
                                    saveEditTask={handleSaveEditTask}
                                    saveEditSubtask={handleSaveSubTasks}
                                    addSubTask={handleAddSubTask}
                                    changeSubtaskStatus={handleChangeSubtaskStatus}
                                    removeSubTask={handleRemoveSubTask}
                                />
                    })
                }
            </div>
        </div>
    )
}

export default TodoList