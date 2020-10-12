import React, { useContext, useEffect } from "react"
import { ArticleContext } from "./ArticleProvider"
import { ArticleCard } from "./ArticleCard"
import { useHistory } from "react-router-dom"

export const ArticleList = () => {
  const history = useHistory()
   // This state changes when `getEmployees()` is invoked below
    const { articles, getArticles } = useContext(ArticleContext)
    // This will let us refer to the logged in user
    const thisUser = localStorage.getItem("slasherUser")
    // Filter out the articles that arent the users
    const myArticles = articles.filter((article) => {
        return article.userId === parseInt(thisUser)
    })

	//useEffect - reach out to the world for something
    useEffect(() => {
      // Get all of the articles upon page load
      getArticles()
    }, [])
    // Display the articles in the following manner:
    return (
    <>
    <h2>Articles</h2>   
    <div className="articles">
      {
        myArticles.map(article => {
          return <ArticleCard key={article.id} article={article}/>
			  })
      }
    </div>
    <button onClick={() => {history.push("/articles/create")}}>
      Add Article
    </button>
    </>
    )
}