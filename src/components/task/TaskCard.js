import React, { useContext, useEffect, useState} from "react"
import { useHistory } from "react-router-dom"
import { TaskContext } from "./TaskProvider.js" 

export const TaskCard = ({taskObj}) => {
    const { deleteTask, editTask, getTasks } = useContext(TaskContext);

    const [taskItem, setTaskItem] = useState(taskObj)

    const history = useHistory()
    

    // const handleControlledInputChange = (event) => {
    //     const newTask = { ...task } // spread operator, spreads an object into separate arguments

    //     // evaluate whatever is in the [], accesses .task dynamically
    //     newTask[event.target.name] = event.target.value // what is in the form, named exactly like it is in state
    //     //update state with each keystroke
    //     setTask(newTask) //  causes re-render
    // }
    
    // useEffect(() => {
    //     console.log("Grabbing all tasks -- useEffect in TaskCard.js ");
    //     getTasks()
    // }, [])

    /**
     * Update task status in database depending on the boolean sent by the onChange
     * function for the checkbox input on a task card. The id of the task is also 
     * passed in and used to target the specific task to update.
     *  */ 
    const setTaskStatus = (event) => {
        console.log("taskItem: ", taskItem);
        const newTask = { ...taskItem } // spread operator, spreads an object into separate arguments

        // evaluate whatever is in the [], accesses .task dynamically
        newTask[event.target.name] = taskItem.status ? false : true; // what is in the form, named exactly like it is in state
        //update state with each keystroke
        setTaskItem(newTask) //  causes re-render
        editTask(newTask, taskItem.id)

    }
    
    
    const renderEditBtn = () => {
        return <>
            <button 
                type="button" 
                className="taskBtn-edit" 
                id={`editTask--${taskItem.id}`}
                onClick={
                    () => {
                        history.push(`/editTask/${taskItem.id}`)
                }}>Edit</button>
        </>
    }
    
    // rendering tasks
    const renderTask = () => (
        <section className="task">
            <input 
                type="checkbox" 
                id={`check--${taskItem.id}`} 
                name="status" 
                value={`${taskItem.status}`}
                checked={taskItem.status}
                onChange={(e) => {
                    // pressing the check box here will set the 
                    // task status from 'uncompleted' (false) to 
                    // 'completed' (true)
                    setTaskStatus(e); // change task status
                }}/>
            <label htmlFor={`task${taskItem.id}`}>{`${taskItem.task}`}</label>
            <div className={`date-${taskItem.id}`}>{`${taskItem.expectedCompletionDate}`}</div>
            <div className="taskActions">
                {
                    taskItem.status ? <></> : renderEditBtn()
                }

                <button 
                    type="button" 
                    className="taskBtn-delete" 
                    id={`deleteTask--${taskItem.id}`} 
                    onClick={
                        () => {
                            deleteTask(taskItem.id)
                    }}>Delete</button>      
            </div>   
        </section>
    )

    return renderTask()
}
