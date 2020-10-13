import React, { useContext, useEffect, useState} from "react"
import { useHistory } from "react-router-dom"
import { TaskContext } from "./TaskProvider.js" 

export const TaskCard = ({taskObj}) => {
    const { deleteTask, editTask, getTasks } = useContext(TaskContext);

    const history = useHistory()

    
    useEffect(() => {
        getTasks()
    }, [])

    const setTaskStatus = (isCompleted, taskIdParam) => {
        if(isCompleted){ // if true is passed in -- if checkbox is 'checked'
            editTask({
                id: taskObj.id,
                userId: sessionStorage.getItem("slasherUser"),
                task: taskObj.task,
                expectedCompletionDate: taskObj.expectedCompletionDate,
                status: true // update status 
            },taskIdParam)
            .then(() => history.push("/"))
        }
        else if(!isCompleted){ // if false is passed in -- if checkbox is 'unchecked'
            editTask({
                id: taskObj.id,
                userId: sessionStorage.getItem("slasherUser"),
                task: taskObj.task,
                expectedCompletionDate: taskObj.expectedCompletionDate,
                status: false // update status 
            },taskIdParam)
            .then(() => history.push("/"))
        }
    }



    // rendering tasks that the user has not completed -- can edit or delete
    const TaskStatusFalse = () => (
        <section className="task">
            <input type="checkbox" id={`check--${taskObj.id}`} name={`task${taskObj.id}`} value={`${taskObj.status}`}
            onChange={() => {
                //handleControlledInputChange();
                
                let completed = true;
                setTaskStatus(completed, taskObj.id); // change task status to true
            }}/>
            <label htmlFor={`task${taskObj.id}`}>{`${taskObj.task}`}</label>
            <div className={`date-${taskObj.id}`}>{`${taskObj.expectedCompletionDate}`}</div>
            <button type="button" className="taskBtn-edit" id={`editTask--${taskObj.id}`}
            onClick={() => {
                history.push(`/editTask/${taskObj.id}`)
            }}>Edit</button>
            <button type="button" className="taskBtn-delete" id={`deleteTask--${taskObj.id}`} 
            onClick={
                () => {
                    deleteTask(taskObj.id)
            }}>Delete</button>
        </section>
    )

    
    // rendering tasks that the user has completed -- cannot edit, but can delete
    const TaskStatusTrue = () => (
        <section className="task">
            <input type="checkbox" id={`check--${taskObj.id}`} name={`task${taskObj.id}`} value={`${taskObj.status}`} checked
             onChange={() => {
                let completed = false;
                setTaskStatus(completed, taskObj.id); // change task status to false
            }}/>
            <label htmlFor={`task${taskObj.id}`}>{`${taskObj.task}`}</label>
            <div className={`date-${taskObj.id}`}>{`${taskObj.expectedCompletionDate}`}</div>
            <button type="button" className="taskBtn-delete" id={`deleteTask--${taskObj.id}`}
            onClick={
                () => {
                    deleteTask(taskObj.id)
            }}>Delete</button>
            
        </section>
    )
    
    const checkTaskStatus = () => {
        let output;
        if (!taskObj.status){
            output = TaskStatusFalse(taskObj)
        }
        else{
            output = TaskStatusTrue(taskObj)
        }
        return output
    }


    return checkTaskStatus(taskObj)
}
