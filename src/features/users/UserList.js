import { useSelector } from "react-redux";
import { selectAllUsers } from "./usersSlice";
import { Link } from "react-router-dom";

const UserList = () => {
    const users = useSelector(selectAllUsers);

    const renderedUsers = users.map(user => {
        return (
            <li key={user.id} className="py-1">
                <Link to={`/users/${user.id}`} className="underline underline-offset-2 hover:no-underline">
                    {user.name}
                </Link>
            </li>
        )  
    })

    return (
        <div>
            <h2 class="text-3xl mt-4 mb-4">Users</h2>
            <ul className="pt-4 list-disc px-5">{renderedUsers}</ul>
        </div>
    )
}

export default UserList