import AddPostForm from "./features/posts/AddPostForm";
import EditPostForm from "./features/posts/EditPostForm";
import Layout from "./components/Layout";
import PostsList from "./features/posts/PostsList";
import SinglePostPage from "./features/posts/SinglePostPage";
import UserList from "./features/users/UserList";
import UserPage from "./features/users/UserPage";

import { Routes, Route, Navigate } from "react-router-dom";

const App = () => {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>

                <Route index element={<PostsList />} />

                <Route path="post">
                    <Route index element={<AddPostForm />} />
                    <Route path=":postId" element={<SinglePostPage />} />
                    <Route path="edit/:postId" element={<EditPostForm />} />
                </Route>

                <Route path="users">
                    <Route index element={<UserList />} />
                    <Route path=":userId" element={<UserPage />} />
                </Route>

                <Route path="*" element={<Navigate to="/" replace />}/>

            </Route>
        </Routes>
    );
}

export default App;