import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getCategories } from "../../managers/CategoryManager"
import { getExactPosts, updatePostDetails } from "../../managers/PostManager"
import { getTags } from "../../managers/TagManager"

export const UpdatePostForm = () => {
    const navigate = useNavigate()
    const { postId } = useParams()
    const [categories, setCategories] = useState([])
    const [tags, setTags] = useState([])
    const [post, updatePost] = useState({
        title: "",
        publication_date: "",
        image_url: "",
        content: "",
        approved: true,
        category: 0,
        tag: [0]
    })

    useEffect(
        () => {
            getExactPosts(postId)
                .then((postData) => {
                    const postObject = postData
                    postObject.title = postData.title
                    postObject.publication_date = postData.publication_date
                    postObject.image_url = postData.image_url
                    postObject.content = postData.content
                    postObject.approved = postData.approved
                    postObject.category = postData.category
                    postObject.tag = postData.tag
                    updatePost(postObject)
                })
        },
        [postId]
    )

    useEffect(
        () => {
            getCategories()
                .then((res) => setCategories(res))
        },
        []
    )

    useEffect(
        () => {
            getTags()
                .then((res) => setTags(res))
        },
        []
    )

    const changePostState = (domEvent) => {
        const copy = {...post}
        copy[domEvent.target.name] = domEvent.target.value
        updatePost(copy)
        }

    return <>
    <form className="post">
        <h2 className="post__title">Post Details:</h2>
        <fieldset>
            <div className="form-group">
                <label htmlFor="title">Title:</label>
                <input
                    name="title"
                    required autoFocus
                    type="text"
                    className="form-control"
                    value={post.title}
                    onChange={changePostState}/>
            </div>
        </fieldset>
        <fieldset>
            <div className="form-group">
                <label htmlFor="image_url">Image URL:</label>
                <input
                    name="image_url"
                    required autoFocus
                    type="text"
                    className="form-control"
                    value={post.image_url}
                    onChange={changePostState}/>
            </div>
        </fieldset>
        <fieldset>
            <div className="form-group">
                <label htmlFor="content">Content:</label>
                <textarea
                    name="content"
                    required autoFocus
                    type="text"
                    className="form-control"
                    value={post.content}
                    onChange={changePostState}/>
            </div>
        </fieldset>
        <fieldset>
            <div className="form-group">
                <label htmlFor="category">Category:</label>
                <select
                    name="content"
                    required
                    className="form-control"
                    value={post.category}
                    onChange={changePostState}>
                    <option value="0">Select Game:</option>
                    {categories.map(category => 
                        <option key={`category--${category.id}`} value={category.id}>{category.label}</option>
                    )}
                </select>
            </div>
        </fieldset>
        <fieldset>
            <div className="form-group">
            <label htmlFor="tag">Tags:</label>
                    <div className="input__field">
                            {tags.map((tag) => (
                                <label key={tag.id} className="checkbox">
                                    <input
                                        type="checkbox"
                                        name="tag"
                                        required
                                        className="form-control"
                                        value={post.tag}
                                        onChange={changePostState}/>
                                        {tag.label}
                                </label>
                                ))}
                        </div>
                        </div>
                </fieldset>
        <button className="btn btn-primary"
        onClick={evt => {
            evt.preventDefault()
            
            const updatedPost = {
                id: postId,
                title: post.title,
                publication_date: post.publication_date,
                image_url: post.image_url,
                content: post.content,
                approved: post.approved,
                category: parseInt(post.category)
            }

            updatePostDetails(updatedPost)
            .then(() => navigate("/posts"))}}>
            Save Post
        </button>
    </form>
</>
}
