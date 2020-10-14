import React from "react"
import { TaskList } from "./task/TaskList.js"
import { MessageForm } from "./message/MessageForm.js"

export const Home = () => (
    <>

        <TaskList />

        <MessageForm /> 

        <div>Put tasks and chat here</div>

    </>
)