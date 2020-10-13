import React, {useContext, useState} from "react"
import { MessageContext } from "./MessageProvider"
import { useHistory } from 'react-router-dom';

export const MessageCard = ({message}) => {
    const [setMessage] = useState({})
    
    // We need this so that we can can direct user to edit their articles
    const history = useHistory()
    // Bring these functions from context
    const { getMessages, deleteMessage, updateMessage} = useContext(MessageContext)
    // Get Current User
    const userId = parseInt(sessionStorage.getItem("slasherUser"))
    if (message.userId === userId) {
        return (
            <section className="messageBox">
                <div className="message">{message.user.name} : {message.message}
                    <div className="msgDelete"
                        onClick={() => {deleteMessage(message.id); history.push("/")}}>❌</div>
                    <div className="msgEdit"
                        onClick={() => {
                            message.message = document.querySelector("#messageMessage").value
                            updateMessage(message)
                            document.querySelector("#messageMessage").value = ""
                            }}>✏️</div>
                </div>
                
            </section>
            )
    } else {
        return (
            <section className="messageBox">
                <div className="message">{message.user.name} : {message.message}</div>
            </section>
            )


    }
}



