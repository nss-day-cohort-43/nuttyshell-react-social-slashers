import React, { useContext, useRef, useEffect, useState } from "react"
import { TaskContext } from "./TaskProvider.js"
import { useHistory, useParams } from 'react-router-dom';
import "./Tasks.css"

/** -------------------------------------------------------------- 
 * 
 * TaskForm should render when the user wants to create a new task
 * or when the user wants to edit an existing task. The task form
 * can be accessed by it's own parameters in the url:
 * - '/home/createNewTask'
 * - '/home/editTask/#taskId'
 * 
 * -------------------------------------------------------------- */



export const TaskForm = () => {
    // This state changes when `getTasks()` is invoked below
    const { saveTask, getTasks, editTask, getTaskById } = useContext(TaskContext)
    const history = useHistory()

    //const taskName = useRef(null);

    const [task, setTask] = useState({})

    const [isLoading, setIsLoading] = useState(true)

    const {taskId} = useParams(); // grab task id from url. 
    //The existence of this ^ parameter indicates the user wants to edit a specified task

    
    const handleControlledInputChange = (event) => {
        const newTask = { ...task } // spread operator, spreads an object into separate arguments

        // evaluate whatever is in the [], accesses .task dynamically
        newTask[event.target.name] = event.target.value // what is in the form, named exactly like it is in state
        //update state with each keystroke
        setTask(newTask) //  causes re-render
    }
    

    useEffect(() => {
        if (taskId) {
            getTaskById(taskId)
            .then(task => {
                setTask(task)
                setIsLoading(false)
                
            })
        }
        else{
            setIsLoading(false)
        }
        
    }, []) 

    const constructTaskObject = () => {
        // Grab task information from form and create a new task object 
        if (task.task && task.expectedCompletionDate){
            // Both input fields have data in them, proceed
            //setIsLoading(false); // still not sure what this does
            if(taskId){
                // PUT - edit task
                // editTask takes an object and an Id ? 
                editTask({
                    id: task.id,
                    userId: task.userId,
                    task: task.task,
                    expectedCompletionDate: task.expectedCompletionDate,
                    status: task.status
                },taskId)
                .then(() => history.push("/")) // want to return back to home page
            }
            else {
                // POST - add new task
                // saveTask takes an object
                saveTask({
                    userId: sessionStorage.getItem("slasherUser"),
                    task: task.task,
                    expectedCompletionDate: task.expectedCompletionDate,
                    status: false
                })
                .then(() => history.push("/")) // want to return back to home page
            }
        }
        else if(task.expectedCompletionDate === undefined && task.task){
            // completion date not entered, show warning
            window.alert("Select a date for when to complete the task");
        }
        else if(task.expectedCompletionDate && task.task === undefined){
            // task name not entered, show warning
            window.alert("Enter the name of the task you wish to create");
        }
        else{
            // none of the input fields are filled out, show warning
            window.alert("You must fill out the whole form.");
        }
    }

    return (
        <form className="taskForm margin">
            <h2 className="taskForm--title">
                {
                    // if taskId exists, change form title to 'Edit Task'
                    // Else, change title to 'New Task'
                    taskId ? "Edit Task" : "New Task"  
                } 
            </h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="task--name">Task Name: </label>
                    <input type="text" id="task--name" name="task" required autoFocus className="form-control"
                    placeholder="Task Name"
                    onChange={handleControlledInputChange}
                    value={task.task}/>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="task--expCompDate">Expected Completion Date: </label>
                    <input type="date" id="task--expCompDate" name="expectedCompletionDate" required className="form-control"
                    onChange={handleControlledInputChange}
                    value={task.expectedCompletionDate}/>
                </div>
            </fieldset>
            <button className="button saveTaskBtn" 
            disabled={isLoading}
            onClick={event => {
                event.preventDefault() // prevent browser from submitting the form 
                constructTaskObject()
            }}>
                Save Task
            </button>
        </form>
    )

}

/*


//renders form for adding new tasks
const renderTaskForm = () => {
    //defines content target for form
    const taskTarget = document.querySelector(".task-form")
    //defines inner HTML for the form
    taskTarget.innerHTML = `<div>New Task</div>
        <textarea id="task-text" placeholder="Enter task info..."></textarea><br>
        <label for="completionDate">Expected Completion Date:</label><br>
        <input type="date" id="completionDate" name="completionDate"><br>
        <button id="saveTask">Save New Task</button>
    `
}

//renders a button that when clicked will display creating new task form
const renderTaskAddButton = () => {
    const taskTarget = document.querySelector(".task-add")
    taskTarget.innerHTML +=`<button id="newTask">Create New Task</button><div class="task-form"></div>`
}

//adds and eventListener to eventHub for specific events
eventHub.addEventListener("click", e => {
    //specifies click on saveTask button
    if(e.target.id === "saveTask"){
        //defines content and date that will be saved
        const taskContent = document.querySelector("#task-text")
        const taskDate = document.querySelector("#completionDate")
        //verifies that neither of the fields are empty
        if(taskContent.value !== "0" && taskDate.value !== "0"){
            //defines object that will be saved into api
            const newTask = {
                userId: parseInt(sessionStorage.getItem("activeUser")),
                task: taskContent.value,
                expectedCompletionDate: taskDate.value,
                status: false
            }
            //runs saveTask and re-renders the task list
            saveTask(newTask)
            .then(()=>{
                const tasks = useTasks()
                render(tasks)
            })
        //gives user warning message if task text or date is not filled out
        } else{
            window.alert("Input New Task & Date")
        }
    //specifies what will happen on deleteTask button click
    } else if(e.target.id.startsWith("deleteTask--")){
        const [prefix, id] = e.target.id.split("--")
        //defines what task to delete
        const taskId = id
        //deletes task from API and re-renders task list
        deleteTask(id)
        .then(getTasks)
        .then(()=>{
            const tasks = useTasks()
            render(tasks)
        })
    //when create new task button is clicked, it will render or hide task addition form
    } else if(e.target.id === "newTask" && e.target.textContent === "Create New Task"){
        renderTaskForm()
        e.target.textContent = "Hide Task Form"
    } else if(e.target.id === "newTask" && e.target.textContent === "Hide Task Form"){
        e.target.textContent = "Create New Task"
        const contentHide = document.querySelector(".task-form")
        contentHide.innerHTML = ""
    //brings up editing boxes when edit is clicked on a task
    } else if(e.target.id.startsWith("editTask--")){
        const [prefix, id] = e.target.id.split("--")
        editPrep(id)
    }
    //saves and re-renders edited task, removes edit box
    else if (e.target.id.startsWith("editTaskSave")){
        const [prefix, id] = e.target.id.split("--")
        editBuilder(id)
        const tasks = useTasks()
        render(tasks)
        const hideTarget = document.querySelector(".composeTask-edit")
        hideTarget.innerHTML = ""
    }
})

// Render the area of the form where the task will be edited
const editPrep = (taskId) => {
    // Get an array of tasks for comparison
    const tasks = useTasks()
    // Find the correct task based of the ID
    const matchingTask = tasks.find((task) => {
        return task.id === parseInt(taskId)
    })
    // Declare where our HTML will be injected
    const contentTarget = document.querySelector(".composeTask-edit")
    // Ensure only one task is edited at a time by checking to see if a task is currently being edited
    if (contentTarget) {
        // If a task is being edited, clear that so the new one can be edited instead
        contentTarget.innerHTML = ""
    }
    // Create the HTML area
    contentTarget.innerHTML += `
        <div class="composeTask-space">
            Edit:<input id="edit-task-input" type="text" value="${matchingTask.task}"><br>
            <label for="completionDate">Expected Completion Date:</label><br>
            <input type="date" id="edit-completionDate" name="completionDate" value="${matchingTask.expectedCompletionDate}"><br>
            <button class="editTaskSave" id="editTaskSave--${taskId}">Save</button>
        </div>
        `
}


// Edit object that will be updated with new information
const editBuilder = (taskId) => {
    // Get an array of tasks for comparison
    const tasks = useTasks()
    // Find the correct tasks based of the ID
    const matchingTask = tasks.find((task) => {
        return task.id === parseInt(taskId)
    })
    const taskContent = document.querySelector("#edit-task-input")
    const taskDate = document.querySelector("#edit-completionDate")
    // Retrieve the updated task the user has input
    const newTaskRetrieve = {
        task: taskContent.value,
        expectedCompletionDate: taskDate.value
    }
    // Update the task object with the updated task
    matchingTask.task = newTaskRetrieve.task
    matchingTask.expectedCompletionDate = newTaskRetrieve.expectedCompletionDate

    // send the updated object to be pushed to the api
    editTask(matchingTask, taskId)
}


*/