import { useState } from "react";

const tasksData = [
  {
    id: 1,
    title: "Learn React",
    completed: false,
  },
  {
    id: 2,
    title: "Practice TypeScript",
    completed: true,
  },
  {
    id: 3,
    title: "Build Project App",
    completed: false,
  },
];

interface Task {
    id: number;
    title: string;
    completed: boolean;
}

interface TaskProps {
    id: number;
    title: string;
    completed: boolean;
    onComplete: (id: number) => void
  }
  
interface TaskListProps {
    tasks: Task[];
}



export const TaskList = ({tasks}: TaskListProps) => {

    const [taskList, setTaskList] = useState<Task[]>(tasks);

    const onComplete = (id: number) => {

      setTaskList((prev) => (

        prev.map((task => (

          task.id === id ? {...task, completed: true} : task
        )))
      ))
    }

    return (
      <>
        {taskList.map((task) => (
          <Task 
            id={task.id} 
            title={task.title} 
            completed={task.completed}  
            onComplete={onComplete} 
          />
        ))}
      </>
    )
}

export const Task = ({id, title, completed, onComplete}: TaskProps) => {
  
  const handleComplete = (id: number) => {
    onComplete(id);
  }
  
  return (
      <div key={id}>
        <div>{title}</div>
        <div>{completed ? "Completed" : "Not Completed"}</div>
        <button onClick={() => handleComplete(id)}>Complete</button>       
      </div>
    )
}