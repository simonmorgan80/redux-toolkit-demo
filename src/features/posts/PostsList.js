import { useSelector } from "react-redux";
import { selectPostIds, getPostsStatus, getPostsError  } from './postsSlice';

import PostsExcerpt from "./PostsExcerpt";

function PostsList() {
    const orderedPostIds = useSelector(selectPostIds);
    const postStatus = useSelector(getPostsStatus);
    const error = useSelector(getPostsError);

    let content;
    
    if (postStatus === 'loading') {
        content = <p>Loading...</p>;
    } else if (postStatus === 'succeeded') {
        content = orderedPostIds.map(postId => <PostsExcerpt key={postId} postId={postId} /> );
    } else if (postStatus === 'failed') {
        content = <p>{error}</p>;
    }
    return (
        <section>
            <h2 className="text-3xl mt-4 mb-4">Posts</h2>
            {content}
        </section>
    )
}

export default PostsList