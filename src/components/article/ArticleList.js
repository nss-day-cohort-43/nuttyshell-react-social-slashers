import React, { useContext, useEffect } from "react"
import { ArticleContext } from "./ArticleProvider"
import { ArticleCard } from "./ArticleCard"
import { useHistory } from "react-router-dom"

export const ArticleList = () => {
  const history = useHistory()
   // This state changes when `getEmployees()` is invoked below
    const { articles, getArticles } = useContext(ArticleContext)
    const thisUser = localStorage.getItem("slasherUser")
    console.log(thisUser)

    const myArticles = articles.filter((article) => {
        return article.userId === parseInt(thisUser)
    })

	//useEffect - reach out to the world for something
    useEffect(() => {
		console.log("LocationList: useEffect - getArticles")
		getArticles()
    }, [])
    return (
    <>
    <h2>Articles</h2>   
    
		{console.log("ArticleList: Render")}
    <div className="articles">
      {
      myArticles.map(article => {
        return <ArticleCard key={article.id} 
                            article={article}/>
                            
			})
      }
      </div>
      <button onClick={() => {history.push("/articles/create")}}>
        Add Article
      </button>
    </>
    )
}