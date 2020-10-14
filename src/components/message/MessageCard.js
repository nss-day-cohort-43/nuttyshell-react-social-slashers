import React, {useContext} from "react"
import { MessageContext } from "./MessageProvider"
import { useHistory } from 'react-router-dom';

export const MessageCard = ({message}) => {
    // We need this so that we can can direct user to edit their articles
    const history = useHistory()
    // Bring these functions from context
    const { getMessages, deleteMessage} = useContext(MessageContext)
    // Get Current User
    const userId = parseInt(sessionStorage.getItem("slasherUser"))
    if (message.userId === userId) {
        return (
            <section className="messageBox">
                <div className="message"><strong>{message.user.name}</strong> : {message.message}
                    <div className="msgDelete"
                        onClick={() => {deleteMessage(message.id); history.push("/")}}>❌</div>
                </div>
            </section>
            )
    } else {
        return (
            <section className="messageBox">
                <div className="message"><strong>{message.user.name}</strong> : {message.message}</div>
            </section>
            )


    }
}



