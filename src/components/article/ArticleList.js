import React, { useContext, useEffect } from "react"
import { ArticleContext } from "./ArticleProvider"
import { MyArticleCard, FriendArticleCard } from "./ArticleCard"
import { useHistory } from "react-router-dom"
import "./article.css"
import { FriendContext } from "../friends/FriendProvider"

export const ArticleList = () => {
  const history = useHistory()
   // This state changes when `getEmployees()` is invoked below
    const { articles, getArticles } = useContext(ArticleContext)
    const { friends, getFriends } = useContext(FriendContext)
    // This will let us refer to the logged in user
    const thisUser = sessionStorage.getItem("slasherUser")
    // Filter out the articles that arent the users
    const myArticles = articles.filter((article) => {
        return article.userId === parseInt(thisUser)
    })
    // This will filter all articles to find only articles with a user ID that match one of your friends user IDs
    const friendArticles = articles.filter((article) => {
      for (const friend of friends) {
        if (friend.userId === article.userId) {
          return article
        }
      }
    })
	//useEffect - reach out to the world for something
    useEffect(() => {
      // Get all of the articles upon page load
      getArticles()
      getFriends()
    }, [])
    // Display the articles. Use "MyArticleCard" for users articles and "FriendArticleCard" for friend articles
    return (
    <>
    <div className="articlesBox margin">
      <div className="myArticles">
        <div className="myArticleHeader">
        <h2>Your Articles</h2>
        <button className="addArticle" onClick={() => {history.push("/articles/create")}}>
          New Article
        </button>
        </div>   
        <div className="articles">
          {
          myArticles.map(article => {
            return <MyArticleCard key={article.id} article={article}/>
			    })
          }
        </div>
      </div>
      <div className="friendArticles">
        <h2 className="friendArticleHeader"> Friend Articles </h2>
        <div className="friendArticlesRender">
          {
          friendArticles.map(article => {
            return <FriendArticleCard key={article.id} article={article}/>
			    })
          }
        </div>
      </div>
    </div>
    </>
    )
}