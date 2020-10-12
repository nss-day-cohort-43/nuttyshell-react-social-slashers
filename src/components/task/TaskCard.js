import React, { useContext, useEffect, useState} from "react"
import { useHistory } from "react-router-dom"
import { TaskContext } from "./TaskProvider.js" 


// const checkTaskStatus = ({taskObj}) => {
//     console.log("checkTaskStatus taskObj: ", taskObj);
//     let output;
//     if (!taskObj.status){
//         console.log("checkTaskStatus taskObj--status should-be-false: ", taskObj.status);
//         output = TaskStatusFalse(taskObj)
//     }
//     else{
//         console.log("checkTaskStatus taskObj--status should-be-true: ", taskObj.status);
//         output = TaskStatusTrue(taskObj)
//     }
//     return output
// }
/*
const TaskStatusFalse = (taskObj, history) => (
    <section className="task">
        <input type="checkbox" id={`check--${taskObj.id}`} name={`task${taskObj.id}`} value={`${taskObj.task}`}/>
        <label htmlFor={`task${taskObj.id}`}>{`${taskObj.task}`}</label>
        <div className={`date-${taskObj.id}`}>{`${taskObj.expectedCompletionDate}`}</div>
        <button type="button" className="taskBtn-edit" id={`editTask--${taskObj.id}`}
        onClick={() => {
            history.push(`/editTask/${taskObj.id}`)
        }}>Edit</button>
        <button type="button" className="taskBtn-delete" id={`deleteTask--${taskObj.id}`} 
        onClick={() => {
            history.push(`/editTask/${taskObj.id}`)
        }}>Delete</button>
    </section>
)

const TaskStatusTrue = (taskObj, history) => (
    <section className="task">
        <input type="checkbox" id={`check--${taskObj.id}`} name={`task${taskObj.id}`} value={`${taskObj.task}`} checked/>
        <label htmlFor={`task${taskObj.id}`}>{`${taskObj.task}`}</label>
        <div className={`date-${taskObj.id}`}>{`${taskObj.expectedCompletionDate}`}</div>
        <button type="button" className="taskBtn-delete" id={`deleteTask--${taskObj.id}`}>Delete</button>
        <button type="button" className="taskBtn-edit" id={`editTask--${taskObj.id}`}>Edit</button>
    </section>
)
*/
export const TaskCard = ({taskObj}) => {
    const { deleteTask, editTask, getTasks } = useContext(TaskContext);

    const history = useHistory()

    //const [task, setTask] = useState({}) // grab a task from state?

    //console.log("taskObj: ", taskObj);
    //console.log("checkTaskStatus taskObj: ", taskObj);
/*
    const handleControlledInputChange = (event) => {
        // pass in event as parameter to a function and the function becomes an event listener
        //When changing a state object or array, 
        //always create a copy make changes, and then set state.
        const newTask = { ...task } // spread operator, spreads an object into separate arguments
        //animal is an object with properties. 
        //set the property to the new value

        // evaluate whatever is in the [], accesses .task dynamically
        newTask[event.target.name] = event.target.value // what is in the form, named exactly like it is in state
        //update state with each keystroke
        setTask(newTask) //  causes re-render
    }
    */

    useEffect(() => {
        getTasks()
    }, [])

    const setTaskStatus = (isCompleted, taskIdParam) => {
        console.log("Task id to set status of: ", taskIdParam);
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
        //console.log("checkTaskStatus taskObj: ", taskObj);
        let output;
        if (!taskObj.status){
            console.log("checkTaskStatus taskObj--status should-be-false: ", taskObj.status);
            output = TaskStatusFalse(taskObj)
        }
        else{
            console.log("checkTaskStatus taskObj--status should-be-true: ", taskObj.status);
            output = TaskStatusTrue(taskObj)
        }
        return output
    }


    return checkTaskStatus(taskObj)
}
