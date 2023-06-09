import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { deletePost, getExactPosts } from "../../managers/PostManager"
import "./Posts.css"

export const PostDetails = () => {

    const [post, setExactPost] = useState({})
    const { postId } = useParams()
    const navigate = useNavigate()

    useEffect(
        () => {
            getExactPosts(postId).then(postData => {
                setExactPost(postData)})
        }, [postId]
    )

    const handleDeletePost = (postId) => {
        if(window.confirm("Are you sure you want to delete this post?")) {
            deletePost(postId)
            .then(() => {
                navigate('/posts')
            })
        }
    }

    return (
        <>
            <article className="posts">

                <section className="post_detail">
                    <div className="post__title_detail">{post.title}</div>
                    <div>
                        {post.tag?.map((tag) => {
                            return <div key={tag.id}>{tag.label}</div>
                        })}
                    </div>
                    <div className="post__category_detail">Category: {post.category?.label} </div>
                    <img className="post__image_detail" src={post.image_url}></img>
                    <section className="comments__reactions">
                        <div>
                            <div className="post__author_detail" onClick={() => navigate(`/users/${post.user.user.id}`)}>By: <b>{post.user?.user?.username}</b></div>
                            <div className="post__publication_date_detail">Published: <i>{post.publication_date}</i> </div>
                        </div>
                        <button className="comment__button" onClick={() => navigate(`/posts/${post.id}/comments`)}>View Comments</button>
                        <div>Reactions: </div>
                    </section>
                    <div className="post__content_detail">{post.content}</div>
                    <section className="detail__action_buttons">
                        <img className="action__button" src="../gear.png" onClick={() => navigate(`/posts/${post.id}/edit`)}></img>
                        <img className="action__button" src="../trashcan.png" onClick={() => {handleDeletePost(post.id)}}></img>
                    </section>
                </section>
            </article>
        </>
    )
}