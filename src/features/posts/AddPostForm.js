import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addNewPost } from "./postsSlice";
import { selectAllUsers } from "../users/usersSlice";

import { useNavigate } from "react-router-dom";

const AddPostForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [userId, setUserId] = useState('');
    const [addRequestStatus, setAddRequestStatus] = useState('idle');

    const users = useSelector(selectAllUsers);

    const onTitleChanged = e => setTitle(e.target.value);
    const onContentChanged = e => setContent(e.target.value);
    const onAuthorChanged = e => setUserId(Number(e.target.value));

    const canSave = [title, content, userId].every(Boolean) && addRequestStatus === 'idle';

    const onSavePostClicked = () => {
        if (canSave) {

            try {
                setAddRequestStatus('pending');
                dispatch(addNewPost({title, body: content, userId})).unwrap();

                setTitle('');
                setContent('');
                setUserId('');

                navigate('/');
            } catch (err) {
                console.error('failed too save post', err);
            } finally {
                setAddRequestStatus('idle');
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

    return (
        <section className="w-2/5">
            <form action="">

                <div className="mb-4">
                    <label htmlFor="postTitle" class="block text-sm font-medium leading-6 text-gray-900">Title</label>
                    <input type="text" id="postTitle" name="postTitle" value={title} onChange={onTitleChanged} className="block flex-1 border border-slate-300 w-full px-2 py-2"/>
                </div>

                <div className="mb-4">
                    <label htmlFor="userId" class="block text-sm font-medium leading-6 text-gray-900">User</label>
                    <select name="userId" id="userId" onChange={onAuthorChanged} className="block flex-1 border border-slate-300 w-full px-2 py-2">
                        <option value=""></option>
                        {usersOptions}
                    </select>
                </div>

                <div className="mb-4">
                    <label htmlFor="postContent" class="block text-sm font-medium leading-6 text-gray-900">Content</label>
                    <textarea type="text" id="postContent" name="postContent" value={content} onChange={onContentChanged} className="block flex-1 border border-slate-300 w-full px-2 py-2">
                    </textarea>
                </div>

                <button 
                type="button" 
                onClick={onSavePostClicked}
                disabled={!canSave}
                className="text-left px-3 py-2 border border-slate-300
                w-20 disabled:cursor-not-allowed"
                >
                    Submit
                </button>

            </form>
        </section>
    )
}

export default AddPostForm