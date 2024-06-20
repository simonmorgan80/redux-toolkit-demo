import { useSelector } from "react-redux";
import { selectUserById } from "../users/usersSlice";
import { selectPostsByUser } from "../posts/postsSlice";
import { Link, useParams } from "react-router-dom";

const UserPage = () => {
    const { userId } = useParams();
    const user = useSelector(state => selectUserById(state, Number(userId)));
    const postsForUser = useSelector(state => selectPostsByUser(state, Number(userId)));

    const postTitles = postsForUser.map(post => {
        return (
            <li key={post.id} className="py-1">
                <Link to={`/post/${post.id}`} className="underline underline-offset-2 hover:no-underline">
                    {post.title}
                </Link>
            </li>
        )
    })

    return (
        <>  
            <h2 class="text-3xl mt-4 mb-4">{user?.name}</h2>
            <h2 class="text-xl mt-4 mb-2">Posts</h2>
            <ul className="list-disc px-5">{postTitles}</ul>
        </>
    )
}

export default UserPage



// 