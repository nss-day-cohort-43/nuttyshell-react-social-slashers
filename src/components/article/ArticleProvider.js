import React, { useState, createContext } from "react"
export const ArticleContext = createContext()

// This provides all of the functions related to article CRUD
export const ArticleProvider = (props) => {
    const [articles, setArticles] = useState([])

    // Retrieve all of the articles and embed the information of the user who created the article
    const getArticles = () => {
        return fetch("http://localhost:8088/articles?_expand=user")
            .then(res => res.json())
            .then(setArticles)
    }

    // Post a new article to the database
    const addArticle = article => {
        return fetch("http://localhost:8088/articles", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(article)
        })
    }

    // Retrieve an article by the ID provided
    const getArticleById = (id) => {
        return fetch(`http://localhost:8088/articles/${id}`)
            .then(res => res.json())
    }

    // Delete an article using the article ID as a recerence
    const deleteArticle = articleId => {
        return fetch(`http://localhost:8088/articles/${articleId}`, {
            method: "DELETE"
        })
    }

    // Update an existing article using the article ID as a reference
    const updateArticle = article => {
        return fetch(`http://localhost:8088/articles/${article.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(article)
        })
    }
    // Below will provide the listed functions via ArticleContext
    return (
        <ArticleContext.Provider value={{
            articles, getArticles, addArticle, getArticleById, deleteArticle, updateArticle
        }}>
            {props.children}
        </ArticleContext.Provider>
    )
}