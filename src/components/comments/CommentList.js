import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getComments, createComment, getCommentsByPostId, getPostComments } from "../../managers/CommentManager";

export const CommentList = () => {
    const [comment, setComment] = useState({content: ""});
    const [comments, setComments] = useState([]);
    const { postId } = useParams();

    useEffect(() => {
        getPostComments(postId).then((commentData) => setComments(commentData));
    }, [postId]);

    const handleInputChange = (event) => {
        const newComment = { ...comment };
        newComment[event.target.name] = event.target.value;
        setComment(newComment);
    };

    const saveComment = () => {
        const newComment = {
            content: comment.content,
            postId
        };
        createComment(newComment).then(() => {
            getCommentsByPostId(postId).then(setComments);
            setComment({content: ""});
        });
    };

    return (
        <div>
            <form>
                <label htmlFor="content">New Comment: </label>
                <input
                    type="text"
                    name="content"
                    value={comment.content}
                    onChange={handleInputChange}
                />
                <button type="button" onClick={saveComment}>
                    Save Comment
                </button>
            </form>
            <h2>Comments</h2>
            {comments.map((comment) => (
                <div key={comment.id}>
                    <p>{comment.content}</p>
                    {/* Display additional information about the comment here */}
                </div>
            ))}
        </div>
    );
};