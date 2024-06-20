import { useSelector } from 'react-redux';
import { selectPostById } from './postsSlice';
import { useParams, Link } from "react-router-dom";

import PostAuthor from "./PostAuthor";
import TimeAgo from "./TimeAgo";
import ReactionButtons from "./ReactionButtons";

const SinglePostPage = () => {

    const { postId } = useParams();

    const post = useSelector((state) => selectPostById(state, Number(postId)))

    if (!post) {
        return (
            <section>
                <h2>Post {postId} not found</h2>
            </section>
        )
    }

    return (
        <div>
            <h2 className="text-3xl mt-4 mb-4">{post.title}</h2>
            {post.body}

            <div>
                <TimeAgo timestamp={post.date} />                
                <Link to={`/users/${post.userId}`} className="mb-2 inline-block underline underline-offset-1 hover:no-underline">
                    <PostAuthor userId={post.userId} />
                </Link>
                <ReactionButtons post={post} />
            </div>

            <div className="mt-4">
                <Link to={`/post/edit/${post.id}`} className="mb-2 inline-block underline underline-offset-1 hover:no-underline">Edit Post</Link>
            </div>
        </div>
    )
}

export default SinglePostPage