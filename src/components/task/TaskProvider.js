import React, { useState, createContext } from "react"

export const TaskContext = createContext();


export const TaskProvider = (props) => {
    const [tasks, setTasks] = useState([])
    const userId = sessionStorage.getItem("slasherUser")


    const getTasks = () => {
        return fetch(`http://localhost:8088/tasks?userId=${userId}`)
        .then(response => response.json())
        .then(setTasks)
    }

    const saveTask = taskObj => {
        return fetch("http://localhost:8088/tasks", {
            method: "POST",
            headers: {
                "Content-Type":"application/json"
            },
            body:JSON.stringify(taskObj)
        })
        .then(getTasks)
    }

    const deleteTask = taskId => {
        return fetch(`http://localhost:8088/tasks/${taskId}`, {
            method: "DELETE",
        })
        .then(getTasks)
    }

    const getTaskById = (taskId) => {
        return fetch(`http://localhost:8088/tasks/${ taskId }?_expand=${userId}`)
            .then(res => res.json())
    }

    const editTask = (taskObj, taskId) => {
        return fetch(`http://localhost:8088/tasks/${taskId}`, {
            method: "PUT",
            headers: {
            "Content-Type": "application/json"
            },
            body: JSON.stringify(taskObj)
        })
        .then(getTasks)
    }

    return (
        <TaskContext.Provider value={{
            tasks, getTasks, saveTask, deleteTask, editTask, getTaskById
        }}>
            {props.children}
        </TaskContext.Provider>
    )
}
