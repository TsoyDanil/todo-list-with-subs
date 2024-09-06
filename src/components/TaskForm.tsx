import { FC } from "react"
import { useForm, SubmitHandler } from 'react-hook-form';
import { TTask } from "../types/TTask";

type Props = {
  onSubmit: (task: TTask) => void;
}

const TaskForm: FC<Props> = ({ onSubmit }) => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<Omit<TTask, 'id' | 'subTasks'>>({
    defaultValues: {
      title: '',
      description: '',
      isFinished: false,
    }
  });

  const submitForm: SubmitHandler<Omit<TTask, 'id' | 'subTasks'>> = (data) => {
    onSubmit({ ...data, id: new Date().toISOString(), subTasks: [] });
    reset({
      title: '',
      description: '',
      isFinished: false,
    })
  };

  const styles = {
    form: {

      margin: '0 auto 20px auto',
      padding: '20px',
      border: '1px solid #ccc',
      borderRadius: '8px',
      backgroundColor: '#f9f9f9',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    },
    inputGroup: {
      marginBottom: '15px',
    },
    label: {
      display: 'block',
      fontWeight: 'bold',
      marginBottom: '5px',
      fontSize: '16px',
    },
    input: {
      width: '100%',
      height: "20px",
      borderRadius: '4px',
      border: '1px solid #ccc',
      fontSize: '14px',
    },
    error: {
      color: 'red',
      fontSize: '12px',
      marginTop: '5px',
    },
    button: {
      display: 'inline-block',
      padding: '10px 20px',
      backgroundColor: '#4CAF50',
      color: '#fff',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
      fontSize: '16px',
      transition: 'background-color 0.3s ease',
    },
    buttonHover: {
      backgroundColor: '#45a049',
    }
  };


  return (
    <form style={styles.form} onSubmit={handleSubmit(submitForm)}>
      <div style={styles.inputGroup}>
        <label style={styles.label}>Название</label>
        <input
          style={styles.input}
          {...register("title", { 
            required: "Название обязательно", 
            minLength: { value: 10, message: "Минимум 10 символов" }
          })}
        />
        {errors.title && <p style={styles.error}>{errors.title.message?.toString()}</p>}
      </div>

      <div style={styles.inputGroup}>
        <label style={styles.label}>Описание</label>
        <input
          style={styles.input}
          {...register("description")}
        />
      </div>

      <button 
        type="submit" 
        style={styles.button}
        onMouseOver={(e) => e.currentTarget.style.backgroundColor = styles.buttonHover.backgroundColor}
        onMouseOut={(e) => e.currentTarget.style.backgroundColor = styles.button.backgroundColor}
      >
        Отправить
      </button>
    </form>
  );
}

export default TaskForm;