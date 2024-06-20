import { useDispatch } from "react-redux";
import { reactionAdded } from "./postsSlice";

const reactionEmoji = {
    thumbsUp: '👍',
    thumbsDown: '👎'
}

const ReactionButtons = ( { post } ) => {
    const dispatch = useDispatch();

    const buttons = Object.entries(reactionEmoji).map(([name, emoji]) => {
        return (
            <button
                key={name}
                type="button"
                className="text-left bg-slate-200 px-3 py-2 border border-slate-300 hover:bg-slate-300
                w-20"
                onClick={() =>
                    dispatch(reactionAdded({
                        postId: post.id,
                        reaction: name
                    }))
                }
            >
                {emoji} {post.reactions[name]}
            </button>
        )   
    })

    return (
        <div className="flex gap-2">
            {buttons}
        </div>
    )
}

export default ReactionButtons