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
    completed: false,
  },
  {
    id: 3,
    title: "Build project",
    completed: false,
  },
  {
    id: 4,
    title: "Prepare for interview",
    completed: false,
  },
];

interface Task {
  id: number;
  title: string;
  completed: boolean;
}


const TaskOrganizer = () => {
  const [tasks, setTasks] = useState<Task[]>(tasksData);

  const handleCompleted = (id: number) => {

    setTasks((prev) =>
      prev.map((task) => {
        if (id === task.id) {
          return {
            ...task,
            completed: !task.completed
          };
        }
        return task;
      }),
    );
  };

  const totalCompletedTask = tasks.reduce((total, task ) => {

    if(task.completed) {
        return total + 1
    }

    return total;
  }, 0);

  return (
    <div>
      {tasks.map((task) => (
        <div key={task.id}>
          <div>{task.title}</div>
          <br></br>
          <div>
            <strong>{task.completed ? "Completed" : "In progress"}</strong>
          </div>
          <button onClick={() => handleCompleted(task.id)}>
            {task.completed ? "Start task" : "Complete"}
          </button>
          <hr></hr>
        </div>
      ))}

      <div>
        <strong>Total completed:</strong> {totalCompletedTask}
      </div>
    </div>
  );
};

export default TaskOrganizer;
