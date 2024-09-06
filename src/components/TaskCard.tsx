import { FC, useState } from "react";
import { TEditTask, TTask } from "../types/TTask";
import { useForm } from "react-hook-form";
import SubTaskCard from "./SubtaskCard";

type Props = {
    task: TTask,
    removeTask: (id: string) => void
    changeStatus: (id: string) => void
    changeSubtaskStatus: (id: string) => void
    saveEditTask: (task: TTask) => void
    saveEditSubtask: (subTask: Omit<TTask, 'subTasks'>) => void
    addSubTask: (taskId: string, subTask: Omit<TTask, 'subTasks'>) => void
    removeSubTask: (subTaskId: string) => void
};

const TaskCard: FC<Props> = ({ 
  task, 
  removeTask,
  changeStatus,
  saveEditTask,
  saveEditSubtask,
  changeSubtaskStatus,
  removeSubTask,
  addSubTask
}) => {

const styles = {
  card: {
    border: '1px solid #ddd',
    borderRadius: '8px',
    padding: '20px',
    marginBottom: '15px',
    backgroundColor: '#fff',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    transition: 'box-shadow 0.3s ease',
    position: 'relative' as const,
  },
  cardHover: {
    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
  },
  title: {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '10px',
  },
  description: {
    fontSize: '16px',
    color: '#666',
    marginBottom: '15px',
  },
  checkbox: {
    transform: 'scale(1.5)',
    cursor: 'pointer',
    marginRight: "10px"
  },
  deleteButton: {
      padding: '5px 10px',
      backgroundColor: '#ff4d4d',
      color: '#fff',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
      fontSize: '14px',
      transition: 'background-color 0.3s ease',
  },
  deleteButtonHover: {
      backgroundColor: '#ff1a1a',
  },
  statusText: {
    fontSize: '14px',
    fontStyle: 'italic',
    color: task.isFinished ? '#28a745' : '#dc3545',
    marginBottom: '10px',
  },
  checkboxContainer: {
    display: "flex",
    alignItems: "center"
  },
  editButton: {
    padding: '5px 10px',
    backgroundColor: '#007bff',
    marginLeft: "10px",
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '14px',
    marginRight: '10px',
    transition: 'background-color 0.3s ease',
  },
  editButtonHover: {
    backgroundColor: '#0056b3',
  },
  input: {
    width: '100%',
    padding: '8px',
    borderRadius: '4px',
    border: '1px solid #ddd',
    marginBottom: '10px',
    fontSize: '16px',
  },
  textarea: {
    width: '100%',
    height: '80px',
    padding: '8px',
    borderRadius: '4px',
    border: '1px solid #ddd',
    marginBottom: '10px',
    fontSize: '16px'
  },
  error: {
    color: 'red',
    fontSize: '17px',
    marginTop: '5px',
  },
  subTaskCard: {
    border: '1px solid #ddd',
    borderRadius: '8px',
    padding: '15px',
    marginBottom: '10px',
    backgroundColor: '#f9f9f9',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    position: 'relative' as const,
    marginLeft: '20px',
  },
  toggleButton: {
    marginLeft: "10px",
    padding: '5px 10px',
    backgroundColor: '#17a2b8',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '14px',
    marginTop: '10px',
    transition: 'background-color 0.3s ease',
  },
  toggleButtonHover: {
    backgroundColor: '#138496',
  },
};

const { register, handleSubmit, formState: { errors }, reset } = useForm<Omit<TTask, 'id' | 'subTasks'>>({
  defaultValues: {
    title: task.title,
    description: task.description,
    isFinished: false,
  }
});


const [isEditing, setIsEditing] = useState<boolean>(false);
const [isAddingSubTask, setIsAddingSubTask] = useState<boolean>(false);
const [isSubTasksVisible, setIsSubTasksVisible] = useState<boolean>(true)
const handleSave = (editTask: TEditTask) => {
  saveEditTask({...task, title: editTask.title, description: editTask.description})
  setIsEditing(false)
};

const handleSaveSub = (subTask: TEditTask) => {
  addSubTask(task.id, {
    id: new Date().toISOString(),
    description: subTask.description,
    title: subTask.title,
    isFinished: false
  })
  setIsAddingSubTask(false)
}

const handleEditClick = () => {
  setIsEditing(!isEditing);
  reset({
    title: task.title,
    description: task.description
  });
};

return (
  <div
    style={styles.card}
    onMouseOver={(e) => (e.currentTarget.style.boxShadow = styles.cardHover.boxShadow)}
    onMouseOut={(e) => (e.currentTarget.style.boxShadow = styles.card.boxShadow)}
  >
    {isEditing ? (
      <>
        <form
          onSubmit={handleSubmit(handleSave)}
        >
          <input
            style={styles.input}
            {...register("title", { 
              required: "Название обязательно", 
              minLength: { value: 10, message: "Минимум 10 символов" }
            })}
          />
           {errors.title && <p style={styles.error}>{errors.title.message?.toString()}</p>}
          <textarea
            style={styles.textarea}
            {...register("description")}
          />
          <button
            style={styles.editButton}
            type="submit"
          >
            Сохранить
          </button>
        </form>
      </>
    ) : (
      <>
        <h1 style={styles.title}>{task.title}</h1>
        <p style={styles.description}>{task.description || ""}</p>
      </>
    )}
    <div
      style={styles.checkboxContainer}
    >
      <input
        type="checkbox"
        style={styles.checkbox}
        checked={task.isFinished}
        onChange={() => changeStatus(task.id)}
        readOnly
      />
      <p style={styles.statusText}>
        {task.isFinished ? "Задача завершена" : "Задача не завершена"}
      </p>
    </div>
    <button
      style={styles.editButton}
      onClick={handleEditClick}
      onMouseOver={(e) => (e.currentTarget.style.backgroundColor = styles.editButtonHover.backgroundColor)}
      onMouseOut={(e) => (e.currentTarget.style.backgroundColor = styles.editButton.backgroundColor)}
    >
      {isEditing ? "Отменить" : "Редактировать"}
    </button>
    <button
      style={styles.deleteButton}
      onClick={() => removeTask(task.id)}
      onMouseOver={(e) => (e.currentTarget.style.backgroundColor = styles.deleteButtonHover.backgroundColor)}
      onMouseOut={(e) => (e.currentTarget.style.backgroundColor = styles.deleteButton.backgroundColor)}
    >
      Удалить
    </button>

    <button
      style={styles.toggleButton}
      onClick={() => setIsSubTasksVisible(!isSubTasksVisible)}
    >
      Показать под задачи
    </button>

    {isAddingSubTask && (
      <form
        onSubmit={handleSubmit(handleSaveSub)}
      >
        <input
          style={styles.input}
          {...register("title", { required: "Название подзадачи обязательно" })}
        />
        {errors.title && <p style={styles.error}>{errors.title.message?.toString()}</p>}
        <textarea
          style={styles.textarea}
          {...register("description")}
        />
        <button
          style={styles.editButton}
          type="submit"
        >
          Добавить подзадачу
        </button>
      </form>
    )}

    {!isAddingSubTask && (
      <button
        style={styles.editButton}
        onClick={() => setIsAddingSubTask(true)}
      >
        Добавить подзадачу
      </button>
    )}

    <div style={{marginTop: "10px"}}>
    {
      isSubTasksVisible ?
      <>
      {
        task.subTasks.length > 0 &&
        task.subTasks.map((subTask) => (
          <SubTaskCard 
            saveSubTask={saveEditSubtask}
            changeSubtaskStatus={changeSubtaskStatus}
            removeSubTask={removeSubTask}
            subTask={subTask} 
            key={subTask.id}
          />
        ))
      } 
      </>: null
    }
    </div>

  </div>
);
};

export default TaskCard;
