export type TTask = {
    id: string;
    title: string;
    description: string;
    isFinished: boolean;
    subTasks: Omit<TTask, 'subTasks'>[]
}

export type TEditTask = {
    title: string,
    description: string
  }