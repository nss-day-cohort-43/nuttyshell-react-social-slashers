import React from "react"
import { TaskList } from "./task/TaskList.js"
import { MessageForm } from "./message/MessageForm.js"
import "./Home.css"

export const Home = () => (
    <>
        <div className="container margin">
            <TaskList />

            <MessageForm /> 
        </div>

    </>
)