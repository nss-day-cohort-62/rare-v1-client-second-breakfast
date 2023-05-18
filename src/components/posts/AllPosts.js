import { useEffect, useState } from "react"
import "./Posts.css"
import { getPosts } from "../../managers/PostManager"
import { Link, useNavigate } from "react-router-dom"

export const AllPosts = () => {
    const [ posts, setPosts ] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        getPosts().then(postData => setPosts(postData))
    }, [])

    useEffect(() => {
        getPosts().then(postData => {
        const sortedData = postData.sort((a, b) => new Date(b.publication_date) - new Date(a.publication_date))
        setPosts(sortedData)
        })
    }, [])

    return <>
    <article className="add__posts">
        <button className="add__posts_button" onClick={() => {
            navigate({ pathname: "/posts/publish" })
            }}>+</button>
    </article>
    <section className="posts__grid">
        <div className="grid__header">Title</div>
        <div className="grid__header">Author</div>
        <div className="grid__header">Date</div>
        <div className="grid__header">Category</div>
        <div className="grid__header">Tags</div>
    </section>
    {
        posts.map(post => {
            return <>
            <section className="grid__items" key={`post--${post.id}`}>
                <Link className="post__titles" to={`/posts/${post.id}`}>{post.title}</Link>
                <div className="post__authors" onClick={() => navigate(`/users/${post.user.user.id}`)}>{post.user.user.username}</div>
                <div className="post__dates">{post.publication_date}</div>
                <div className="post__categories">{post.category.label}</div>
                <div className="post__tags">{post.tag.label}</div>
            </section>
            </>
        })
    }
    </>
}