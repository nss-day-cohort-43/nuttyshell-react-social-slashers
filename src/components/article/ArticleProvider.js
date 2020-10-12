import React, { useState, createContext } from "react"


export const ArticleContext = createContext()


export const ArticleProvider = (props) => {
    const [articles, setArticles] = useState([])

    const getArticles = () => {
        return fetch("http://localhost:8088/articles?_expand=user")
            .then(res => res.json())
            .then(setArticles)
    }

    const addArticle = article => {
        return fetch("http://localhost:8088/articles", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(article)
        })
    }

    const getArticleById = (id) => {
        return fetch(`http://localhost:8088/articles/${id}`)
            .then(res => res.json())
    }

    const deleteArticle = articleId => {
        return fetch(`http://localhost:8088/articles/${articleId}`, {
            method: "DELETE"
        })
            
    }
    
    return (
        <ArticleContext.Provider value={{
            articles, getArticles, addArticle, getArticleById, deleteArticle
        }}>
            {props.children}
        </ArticleContext.Provider>
    )
}