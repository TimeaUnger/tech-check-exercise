import { useState } from "react";

const tasksData: Task[] = [
  {
    id: 1,
    title: "Fix login bug",
    priority: "High",
    completed: false,
  },
  {
    id: 2,
    title: "Create dashboard",
    priority: "Medium",
    completed: true,
  },
  {
    id: 3,
    title: "Write unit tests",
    priority: "High",
    completed: false,
  },
  {
    id: 4,
    title: "Update documentation",
    priority: "Low",
    completed: false,
  },
];

interface Task {
    id: number;
    title: string;
    priority: "Low" | "Medium" | "High";
    completed: boolean;
}

interface TaskListProps {
    tasksData: Task[];
}

interface TaskCardProps {
    task: Task;
    handleToggleComplete: (id: number) => void;
    handleDelete: (id: number) => void;
}

export const App = () => {
    return (<TaskList tasksData={tasksData} />)
}

export const TaskList = ({tasksData}: TaskListProps) => {

    const [tasks, setTasks] = useState<Task[]>(tasksData);

    const handleToggleComplete = (id: number) => {

        setTasks((prev) =>
            prev.map((task) =>
                task.id === id
                ? {...task, completed: !task.completed}
                : task
            )
        )

    }

    const handleDelete = (id: number) => {
        setTasks((prev) =>
            prev.filter((task) => 
                task.id !== id
            )
        )
    }

    return(
        <>
            {tasks.map((task) => (
                <TaskCard 
                    key={task.id}
                    task={task} 
                    handleToggleComplete={handleToggleComplete} 
                    handleDelete={handleDelete} 
                />
            ))}
        </>
    )
}

export const TaskCard = ({task, handleToggleComplete, handleDelete}: TaskCardProps) => {
    return(
        <>
            <div>{task.title}</div>
            <div>{task.priority}</div>
            <div>{task.completed ? "Completed" : "Not Complete"}</div>
            <button onClick={() => handleToggleComplete(task.id)}>Complete</button>
            <button onClick={() => handleDelete(task.id)}>Delete</button>
        </>
        )
}