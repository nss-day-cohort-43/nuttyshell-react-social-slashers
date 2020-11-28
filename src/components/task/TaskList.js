import React, { useContext, useEffect } from "react" // useContext is the context hook tha tis used to access context exposed by a parent object
import { TaskContext } from "./TaskProvider.js" // gives us Tasks, getTasks, addTasks
import { TaskCard } from "./TaskCard.js"
import { TaskForm } from "./TaskForm.js"
import { useHistory } from "react-router-dom"
import "./Tasks.css"

export const TaskList = () => {
   // This state changes when `getTasks()` is invoked below
    const { tasks, getTasks } = useContext(TaskContext)
    const history = useHistory()

    useEffect(() => {
        getTasks()
        
    }, []) 

    return (    
        <div className="tasks">
            <div className="titleAndActions--task">
                <h2 className="tasksTitle">Tasks</h2>
                <button className="newTask" onClick={() => {history.push("/createTask")}}>
                    New Task
                </button>
            </div>
            <article className="taskList">
                {
                    tasks.map(task => {
                        return <TaskCard key={task.id} taskObj={task} />
                    })
                }
            </article>
        </div>
    )
}
