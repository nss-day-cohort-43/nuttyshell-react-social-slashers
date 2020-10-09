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
    
    return (
        <ArticleContext.Provider value={{
            articles, getArticles, addArticle
        }}>
            {props.children}
        </ArticleContext.Provider>
    )
}