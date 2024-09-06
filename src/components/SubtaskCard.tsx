import { FC, useState } from 'react';
import { TEditTask, TTask } from '../types/TTask';
import { useForm } from 'react-hook-form';

type Props = {
  subTask: Omit<TTask, 'subTasks'>;
  saveSubTask: (subTask: Omit<TTask, 'subTasks'>) => void;
  changeSubtaskStatus: (id: string) => void
  removeSubTask: (subTaskId: string) => void
};

const SubTaskCard: FC<Props> = ({ subTask, saveSubTask, changeSubtaskStatus, removeSubTask }) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const { register, handleSubmit, formState: { errors }, reset } = useForm<Omit<TTask, 'id' | 'subTasks'>>({
    defaultValues: {
      title: subTask.title,
      description: subTask.description,
      isFinished: subTask.isFinished,
    }
  });

  const handleSave = (editTask: TEditTask) => {
    saveSubTask({...subTask, title: editTask.title, description: editTask.description})
    reset({
        title: subTask.title,
        description: subTask.description,
        isFinished: subTask.isFinished,
    })
    setIsEditing(false)
  };

  const styles = {
    card: {
      border: '1px solid #ddd',
      borderRadius: '8px',
      padding: '15px',
      marginBottom: '10px',
      backgroundColor: '#f9f9f9',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
      position: 'relative' as const,
      marginLeft: '20px',
    },
    error: {
        color: 'red',
        fontSize: '17px',
        marginTop: '5px',
      },
    title: {
      fontSize: '20px',
      fontWeight: 'bold',
      marginBottom: '5px',
    },
    description: {
      fontSize: '14px',
      color: '#666',
      marginBottom: '10px',
    },
    checkbox: {
      transform: 'scale(1.3)',
      cursor: 'pointer',
      marginRight: '5px',
    },
    statusText: {
      fontSize: '12px',
      fontStyle: 'italic',
      color: subTask.isFinished ? '#28a745' : '#dc3545',
    },
    checkboxContainer: {
      display: 'flex',
      alignItems: 'center',
    },
    editButton: {
      padding: '5px 10px',
      backgroundColor: '#007bff',
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
      fontSize: '16px',
    },
    deleteButton: {
        padding: '5px 10px',
        marginRight: "10px",
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
  };

  return (
    <div style={styles.card}>
      {isEditing ? (
        <>
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
            <button>
            Отменить
          </button>
        </>
      ) : (
        <>
          <h2 style={styles.title}>{subTask.title}</h2>
          <p style={styles.description}>{subTask.description || ''}</p>
          <div style={styles.checkboxContainer}>
            <input
              type="checkbox"
              style={styles.checkbox}
              checked={subTask.isFinished}
              onChange={() => changeSubtaskStatus(subTask.id)}
            />
            <p style={styles.statusText}>
              {subTask.isFinished ? 'Задача завершена' : 'Задача не завершена'}
            </p>
          </div>
          <button
            style={styles.deleteButton}
            onClick={() => removeSubTask(subTask.id)}
            onMouseOver={(e) => (e.currentTarget.style.backgroundColor = styles.deleteButtonHover.backgroundColor)}
            onMouseOut={(e) => (e.currentTarget.style.backgroundColor = styles.deleteButton.backgroundColor)}
            >
            Удалить
        </button>
          <button
            style={styles.editButton}
            onClick={() => setIsEditing(true)}
            onMouseOver={(e) => (e.currentTarget.style.backgroundColor = styles.editButtonHover.backgroundColor)}
            onMouseOut={(e) => (e.currentTarget.style.backgroundColor = styles.editButton.backgroundColor)}
          >
            Редактировать
          </button>
        </>
      )}
    </div>
  );
};

export default SubTaskCard;
