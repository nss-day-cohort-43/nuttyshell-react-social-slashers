import React, {useContext} from "react"
import { ArticleContext } from "./ArticleProvider"
import { Link, useHistory } from 'react-router-dom';

// Used to render users articles. Will also enable deleting and editing of these articles.
export const MyArticleCard = ({article}) => {
    // We need this so that we can can direct user to edit their articles
    const history = useHistory()
    // Bring these functions from context
    const { getArticles, deleteArticle} = useContext(ArticleContext)
    return (
    <section className="article">
        <a className="article__title" href={article.url} target="_blank">{article.title}</a>
        <div className="article_synopsis">{article.synopsis}</div>
        <div className="article_date">{new Date(article.dateAdded).toLocaleDateString('en-US')}</div>
        <button onClick={
    			() => {
                    deleteArticle(article.id)
                    .then(() => {
                        history.push("/articles")
                        getArticles()
        		    })
    			}}>Delete
			</button>
            <button onClick={() => {
				history.push(`/articles/edit/${article.id}`)
				}}>Edit
			</button>
    </section>
    )
}

// Used to render friend Articles. Omits the ability to edit / delete the article
export const FriendArticleCard = ({article}) => {
    return (
    <section className="article">
        <a className="article__title" href={article.url} target="_blank">{article.title}</a>
        <div className="article_synopsis">{article.synopsis}</div>
        <div className="article_author">By: {article.user.name}</div>
        <div className="article_date">{new Date(article.dateAdded).toLocaleDateString('en-US')}</div>
    </section>
    )
}