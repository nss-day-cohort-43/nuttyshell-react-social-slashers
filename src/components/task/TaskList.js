import React, { useContext, useEffect } from "react" // useContext is the context hook tha tis used to access context exposed by a parent object
import { TaskContext } from "./TaskProvider.js" // gives us Tasks, getTasks, addTasks
import { TaskCard } from "./TaskCard.js"
import { TaskForm } from "./TaskForm.js"
import { useHistory } from "react-router-dom"
//import "./Task.css"

export const TaskList = () => {
   // This state changes when `getTasks()` is invoked below
    const { tasks, getTasks } = useContext(TaskContext)
    const history = useHistory()

    useEffect(() => {
        //console.log("TaskList: useEffect - getTasks")
        getTasks()
        
    }, []) 

    return (    
        <div className="tasks">
            <div className="titleAndActions--task">
                <h1>Tasks</h1>
                <button onClick={() => {history.push("/createTask")}}>
                    New Task
                </button>
            </div>
            {console.log("taskList: Render")}
            <article className="taskList">
                {
                    tasks.map(task => {
                        //console.log("taskList  .map  task: ", task);
                        return <TaskCard key={task.id} taskObj={task} />
                    })
                }
            </article>
        </div>
    )
}
