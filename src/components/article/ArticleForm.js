import React, { useContext, useRef, useEffect, useState } from "react"
import { ArticleContext } from "../article/ArticleProvider"
import { useHistory, useParams } from 'react-router-dom';

export const ArticleForm = (props) => {
    // Bring these functions from context
    const { getArticles, addArticle, getArticleById, updateArticle} = useContext(ArticleContext)
    // Set selected article into state
    const [article, setArticle] = useState({})
    // Used for retrieving an article ID from the url
    const {articleId} = useParams();
    // Used to we can direct where the page goes after adding / updating an article
    const history = useHistory();

    // Handle the form inputs
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

    // Get article state on initialization
    useEffect(() => {
       getArticles()
       .then(() => {
           // This will check to see if an article has been selected using the article ID from the URL
           if (articleId) {
               // This will pull the entire article object using the article ID
               getArticleById(articleId)
               .then(article => {
                   // Set state with the selected article
                   setArticle(article)
               })
           }
       })
    }, [])




    // This will be used for to create the objects that will be saved / updated
    const constructNewArticle = () => {
        // Our user ID is stored in local storage with the "slasherUser" variable
        const userId = parseInt(sessionStorage.getItem("slasherUser"))



        // This will test if an article ID is present. If not, it will be saved as a new article
        if (articleId === undefined) {
            if (article.title && article.synopsis && article.url) {
                addArticle({
                    // userId is pulled from local storage
                    userId,
                    title: article.title,
                    url: article.url,
                    synopsis: article.synopsis,
                    dateAdded: Date.now(),
                })
                // And then you will be directed to /articles
                .then(() => history.push("/articles"))
            } else {
                window.alert("You must fill out the whole form!")
            }
        }    
        else {
            // If an article ID already exists, it knows to update the existing article
            if (articleId) {
                updateArticle({
                    // userId is pulled from local storage
                    userId,
                    title: article.title,
                    url: article.url,
                    synopsis: article.synopsis,
                    dateAdded: article.dateAdded,
                    id: article.id,
                })
                // And then you will be directed to /articles
                .then(() => history.push(`/articles/`))
            }
        }
    }





    return (
        <form className="articleForm margin">
            <h2 className="articleForm__title">Article Information:</h2>
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
                    constructNewArticle() // This will send the information off to be constructed into an object to be saved
                }}
                className="btn btn-primary">
                Save Article
            </button>
        </form>
    )
}