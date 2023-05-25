import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { deletePost, getMyPosts } from "../../managers/PostManager"

export const MyPost = () => {
    const [posts, setPosts] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        getMyPosts().then(myPostData => {
            const sortedData = myPostData.sort((a, b) => new Date(b.publication_date) - new Date(a.publication_date))
            setPosts(sortedData)
        })
    }, [])

    const handleDeletePost = (postId) => {
        if (window.confirm("Are you sure you want to delete this post?")) {
            deletePost(postId)
                .then(() => {
                    getMyPosts().then((myPostData) => setPosts(myPostData))
                })
        }
    }

    return <>
        <article className="add__home_posts">
            <button className="add__posts_button" onClick={() => {
                navigate({ pathname: "/posts/publish" })
            }}>+</button>
        </article>
        <article className="posts">
            {
                posts.map(post => {
                    return <section key={`post--${post.id}`} className="post">
                        <section className="post__header">
                            <div className="post__title" onClick={() => navigate(`/posts/${post.id}`)}>{post.title}</div>
                            <div className="post__publication_date"> {post.publication_date}</div>
                        </section>
                        <img className="post__image" src={post.image_url} onClick={() => navigate(`/posts/${post.id}`)}></img>
                        <section className="post__footer">
                            <div className="post__author" onClick={() => navigate(`/users/${post.user.user.id}`)}>Author: <b>{post.user.user.username}</b></div>
                            <section className="reaction__buttons">
                                <div className="post__reaction_count">Reaction count: 0</div>
                            </section>
                        </section>
                        <section className="action__buttons_container">
                            <img className="action__button" src="../gear.png" onClick={() => navigate(`/posts/${post.id}/edit`)}></img>
                            <img className="action__button" src="../trashcan.png" onClick={() => { handleDeletePost(post.id) }}></img>
                        </section>
                    </section>
                })
            }
        </article>
    </>
}