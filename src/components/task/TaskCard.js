import React from "react"

const checkTaskStatus = ({taskObj}) => {
    let output;
    if (taskObj.status === false){
        output = TaskStatusFalse(taskObj)
    }
    else{
        output = TaskStatusTrue(taskObj)
    }
    return output
}

const TaskStatusFalse = ({taskObj}) => (
    <section className="task">
        <input type="checkbox" id={`check--${taskObj.id}`} name={`task${taskObj.id}`} value={`${taskObj.task}`}/>
        <label for={`task${taskObj.id}`}>{`${taskObj.task}`}</label>
        <div className={`date-${taskObj.id}`}>{`${taskObj.expectedCompletionDate}`}</div>
        <button type="button" className="taskBtn-delete" id={`deleteTask--${taskObj.id}`}>Delete</button>
        <button type="button" className="taskBtn-edit" id={`editTask--${taskObj.id}`}>Edit</button>
    </section>
)

const TaskStatusTrue = ({taskObj}) => (
    <section className="task">
        <input type="checkbox" id={`check--${taskObj.id}`} name={`task${taskObj.id}`} value={`${taskObj.task}`} checked/>
        <label for={`task${taskObj.id}`}>{`${taskObj.task}`}</label>
        <div className={`date-${taskObj.id}`}>{`${taskObj.expectedCompletionDate}`}</div>
        <button type="button" className="taskBtn-delete" id={`deleteTask--${taskObj.id}`}>Delete</button>
        <button type="button" className="taskBtn-edit" id={`editTask--${taskObj.id}`}>Edit</button>
    </section>
)

export const TaskCard = ({taskObj}) => {
    checkTaskStatus(taskObj)
}
