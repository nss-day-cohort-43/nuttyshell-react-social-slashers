import React, { useContext, useRef, useEffect, useState } from "react"
import { ArticleContext } from "../article/ArticleProvider"
import { useHistory, useParams } from 'react-router-dom';

export const ArticleForm = (props) => {
    const { articles, getArticles, addArticle, getArticleById, deleteArticle} = useContext(ArticleContext)
    //for edit, hold on to state of article in this view
    const [article, setArticle] = useState({})
    const {articleId} = useParams();
    const history = useHistory();

    const handleControlledInputChange = (event) => {
        //When changing a state object or array, 
        //always create a copy make changes, and then set state.
        const newArticle = { ...article }
        //article is an object with properties. 
        //set the property to the new value
        newArticle[event.target.name] = event.target.value
        //update state
        setArticle(newArticle)
    }

    /* Get article state on initialization. */
    useEffect(() => {
       getArticles()
       .then(() => {
           if (articleId) {
               getArticleById(articleId)
               .then(article => {
                   setArticle(article)
               })
           }
       })
    }, [])

    const constructNewArticle = () => {
        const userId = parseInt(localStorage.getItem("slasherUser"))

        if (article.url === 0) {
            window.alert("Please select an article")
        } else {
            if (articleId === undefined) {
                addArticle({
                    userId,
                    title: article.title,
                    url: article.url,
                    synopsis: article.synopsis,
                    dateAdded: Date.now(),
                })
                .then(() => history.push("/articles"))
        }
    }}
    return (
        <form className="articleForm">
            <h2 className="articleForm__title">New Article</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="articleName">Article Title: </label>
                    <input type="text" id="articleName" name="title" required autoFocus className="form-control" 
                    placeholder="Article Title" 
                    onChange={handleControlledInputChange} 
                    defaultValue={article.title} />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="article">Article URL: </label>
                    <input type="text" id="articleURL" name="url" required className="form-control" 
                    placeholder="Article URL"
                    onChange={handleControlledInputChange}
                    defaultValue={article.url}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="article">Article Synopsis: </label>
                    <input type="text" id="articleSynopsis" name="synopsis" required className="form-control" 
                    placeholder="Article Synopsis"
                    onChange={handleControlledInputChange}
                    defaultValue={article.synopsis}
                    />
                </div>
            </fieldset>
            <button type="submit"
                onClick={evt => {
                    evt.preventDefault() // Prevent browser from submitting the form
                    constructNewArticle()
                }}
                className="btn btn-primary">
                Save Article
            </button>
        </form>
    )
}