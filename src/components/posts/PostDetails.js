import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { getExactPosts } from "../../managers/PostManager"

export const PostDetails = () => {

    const [post, setExactPost] = useState({})
    const { postId } = useParams()

    useEffect(
        () => {
            getExactPosts(postId).then(postData => {
                setExactPost(postData)})
        }, [postId]
    )


    return (
        <>
            <article className="posts">

                <section className="post">
                    <div className="post__title">Title: {post.title}</div>
                    <div className="post__image">Author: {post.user?.user?.username}</div>
                    <div className="post__category">Category: {post.category?.label} </div>
                    <div className="post__publication_date">Published: {post.publication_date} </div>
                    <div className="post__content">Content: {post.content}</div>
                </section>


            </article>
        </>
    )
}