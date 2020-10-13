import React, { useState, createContext } from "react"
export const MessageContext = createContext()

// This provides all of the functions related to message CRUD
export const MessageProvider = (props) => {
    const [messages, setMessages] = useState([])

    // Retrieve all of the MESSAGES and embed the information of the user who created the article
    const getMessages = () => {
        return fetch("http://localhost:8088/messages?_expand=user")
            .then(res => res.json())
            .then(setMessages)
    }

    // Post a new article to the database
    const addMessage = message => {
        return fetch("http://localhost:8088/messages", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(message)
        })
    }

    // Delete a message using the message ID as a recerence
    const deleteMessage = messageID => {
        return fetch(`http://localhost:8088/messages/${messageID}`, {
            method: "DELETE"
        })
        .then(getMessages)
    }

    // Update an existing article using the article ID as a reference
    const updateMessage = message => {
        return fetch(`http://localhost:8088/messages/${message.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(message)
        })
        .then(getMessages)
    }

    // Below will provide the listed functions via MessageContext
    return (
        <MessageContext.Provider value={{
            messages, getMessages, addMessage, deleteMessage, updateMessage
        }}>
            {props.children}
        </MessageContext.Provider>
    )
}