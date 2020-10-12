import React, { useContext, useEffect } from "react"
import { MessageContext } from "./MessageProvider"
import { MessageCard } from "./MessageCard"
import { useHistory } from "react-router-dom"

export const ArticleList = () => {
  const history = useHistory()
   // This state changes when `getEmployees()` is invoked below
    const { messages, getMessages } = useContext(MessageContext)
    // This will let us refer to the logged in user
    const thisUser = localStorage.getItem("slasherUser")
    // Filter out the articles that arent the users


	//useEffect - reach out to the world for something
    useEffect(() => {
      // Get all of the articles upon page load
      getArticles()
    }, [])
    // Display the articles in the following manner:
    return (
    <>
    <h2>Messages</h2>   
    <div className="messages">
      {
        messages.map(article => {
          return <ArticleCard key={article.id} article={article}/>
			  })
      }
    </div>
    <button onClick={() => {history.push("/")}}>
      Send
    </button>
    </>
    )
}