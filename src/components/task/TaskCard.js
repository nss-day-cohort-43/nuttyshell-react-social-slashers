import React, { useContext} from "react"
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
    const { deleteTask } = useContext(TaskContext);

    const history = useHistory()
    console.log("taskObjParam: ", taskObj);
    //console.log("checkTaskStatus taskObj: ", taskObj);

    // rendering tasks that the user has not completed -- can edit or delete
    const TaskStatusFalse = () => (
        <section className="task">
            <input type="checkbox" id={`check--${taskObj.id}`} name={`task${taskObj.id}`} value={`${taskObj.task}`}/>
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
            <input type="checkbox" id={`check--${taskObj.id}`} name={`task${taskObj.id}`} value={`${taskObj.task}`} checked/>
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
        console.log("checkTaskStatus taskObj: ", taskObj);
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
