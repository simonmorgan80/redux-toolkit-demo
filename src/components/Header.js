import { Link } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { increaseCount, getCount } from "../features/posts/postsSlice";

const Header = () => {
    // const dispatch = useDispatch();
    // const count = useSelector(getCount);
    return (
        <header className="bg-slate-200">
            <div className="container mx-auto px-4 py-4">
                <h1 className="text-2xl">Redux Toolkit demo</h1>
                <nav className="flex gap-4">
                    <Link to="/" className="text-lg py-1 hover:underline underline-offset-2">Home</Link>
                    <Link to="/post" className="text-lg py-1 hover:underline underline-offset-2">Add post</Link>
                    <Link to="/users" className="text-lg py-1 hover:underline underline-offset-2">Users</Link>
                </nav>
                {/* <div>
                    <button onClick={() => dispatch(increaseCount())}>
                    {count}
                    </button>
                    </div> */}
            </div>
        </header>
    )
}

export default Header