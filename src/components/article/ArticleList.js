import React, { useContext, useEffect } from "react"
import { ArticleContext } from "./ArticleProvider"
import { ArticleCard } from "./ArticleCard"
import { useHistory } from "react-router-dom"

export const ArticleList = () => {
  const history = useHistory()
   // This state changes when `getEmployees()` is invoked below
    const { articles, getArticles } = useContext(ArticleContext)

	//useEffect - reach out to the world for something
    useEffect(() => {
		console.log("LocationList: useEffect - getArticles")
		getArticles()
    }, [])



    return (
    <>
    <h2>Articles</h2>   
    <button onClick={() => {history.push("/articles/create")}}>
        Add Article
    </button>
		{console.log("ArticleList: Render")}
    <div className="articles">
      {
      articles.map(article => {
        return <ArticleCard key={article.id} 
                            synopsis={article.synopsis} 
                            title={article.title} 
                            author={article.user.name}
                            url={article.url}
                            date={article.dateAdded.toLocaleString()}/>
			})
      }
      </div>
    </>
    )
}