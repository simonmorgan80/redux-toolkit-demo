import PostAuthor from './PostAuthor';
import TimeAgo from './TimeAgo';
import ReactionButtons from './ReactionButtons';
import { Link } from 'react-router-dom';

import { useSelector } from 'react-redux';
import { selectPostById } from './postsSlice';

const PostsExcerpt = ({ postId }) => {
    const post = useSelector(state => selectPostById(state, postId));
    return (
        <article className="w-4/5 mb-2 pb-4 pt-4 border-b">
            <h3 className="text-2xl mb-2">
                <Link to={`post/${post.id}`} className=''>
                    {post.title} &raquo;
                </Link>
            </h3>
            <p className="mb-2">
                {post.body.substring(0,150)}
            </p>

            <TimeAgo timestamp={post.date} />

            <Link to={`/users/${post.userId}`} className="mb-2 inline-block underline underline-offset-1 hover:no-underline">
                <PostAuthor userId={post.userId} />
            </Link>
            
            <ReactionButtons post={post} />
        </article>
    )
}

export default PostsExcerpt