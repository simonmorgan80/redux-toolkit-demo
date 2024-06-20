import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectPostById, updatePost, deletePost } from "./postsSlice";
import { selectAllUsers } from "../users/usersSlice";

import { useParams, useNavigate } from "react-router-dom";

const EditPostForm = () => {
    const { postId } = useParams();
    const navigate = useNavigate();

    const post = useSelector((state) => selectPostById(state, Number(postId)));
    const users = useSelector(selectAllUsers);

    const [title, setTitle] = useState(post?.title);
    const [content, setContent] = useState(post?.body);
    const [userId, setUserId] = useState(post?.userId);
    const [requestStatus, setRequestStatus] = useState('idle');

    const dispatch = useDispatch();

    if (!post) {
        return (
            <section>
                <h2>Post not found</h2>
            </section>
        )
    }

    const onTitleChanged = e => setTitle(e.target.value);
    const onContentChanged = e => setContent(e.target.value);
    const onAuthorChanged = e => setUserId(Number(e.target.value));

    const canSave = [title, content, userId].every(Boolean) && requestStatus === 'idle';

    const onSavePostClicked = () => {
        if (canSave) {

            try {
                setRequestStatus('pending');
                dispatch(updatePost({id: post.id, title, body: content, userId, reactions: post.reactions})).unwrap();

                setTitle('');
                setContent('');
                setUserId('');
                navigate(`/post/${post.id}`);

            } catch (err) {
                console.error('failed too save post', err);
            } finally {
                setRequestStatus('idle');
            }
        }
    }

    const usersOptions = users.map(user => {
        return (
            <option value={user.id} key={user.id}>
                {user.name}
            </option>
        )
    });


    const onDeletePostClicked = () => {
        try {
            setRequestStatus('pending');
            dispatch(deletePost({id: post.id})).unwrap();

            setTitle('');
            setContent('');
            setUserId('');
            navigate('/');
        } catch (err) {
            console.error('failed to delete post', err);
        } finally {
            setRequestStatus('idle');
        }
    }

    return (
        <section className="w-2/5">
            <form action="">

                <div className="mb-4">
                    <label htmlFor="postTitle" class="block text-sm font-medium leading-6 text-gray-900">Title</label>
                    <input type="text" id="postTitle" name="postTitle" value={title} onChange={onTitleChanged} className="block flex-1 border border-slate-300 w-full px-2 py-2"/>
                </div>

                <div className="mb-4">
                    <label htmlFor="userId">User</label>
                    <select name="userId" id="userId" onChange={onAuthorChanged} value={userId} className="block flex-1 border border-slate-300 w-full px-2 py-2">
                        <option value=""></option>
                        {usersOptions}
                    </select>
                </div>

                <div className="mb-4">
                    <label htmlFor="postContent">Content</label>
                    <textarea type="text" id="postContent" name="postContent" value={content} onChange={onContentChanged} className="block flex-1 border border-slate-300 w-full px-2 py-2">
                    </textarea>
                </div>

                <button 
                type="button" 
                onClick={onSavePostClicked}
                disabled={!canSave}
                className="text-left bg-slate-200 px-3 py-2 border border-slate-300 hover:bg-slate-300
                w-20 disabled:cursor-not-allowed"
                >
                    Submit
                </button>

                <button 
                type="button" 
                onClick={onDeletePostClicked}
                className="text-left bg-slate-200 px-3 py-2 border border-slate-300 hover:bg-slate-300
                w-20 disabled:cursor-not-allowed"
                >
                    Delete
                </button>

            </form>
        </section>
    )
}

export default EditPostForm