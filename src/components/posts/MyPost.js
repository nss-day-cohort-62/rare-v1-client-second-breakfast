import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { getMyPosts, getPosts } from "../../managers/PostManager"

export const MyPost = () => {
    const [posts, setPosts] = useState([])
    const [filteredPost, setFilteredPosts] = useState([])
    const localUser = localStorage.getItem("auth_token")
    const navigate = useNavigate()
    useEffect(
        () => {
            getMyPosts().then(
                (data) => {
                    setPosts(data)
                }
            )
        }, []
    )

    return <>
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
                    <section className="reaction__buttons">
                    <div className="post__reaction_count">Reaction count: 0</div>
                </section>
                </section>
                <section className="action__buttons_container">
                    <img className="action__buttons" src="gear.png"></img>
                    <img className="action__buttons" src="trashcan.png" />
                </section>
            </section>
        })
    }
        </article>
    </>
}