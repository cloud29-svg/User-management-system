import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import type { AppDispatch } from "../store/Store";
import { deleteUser } from "../store/userSlice";
import type { User } from "../store/userSlice";

type Props = { user: User };

export const UserCard = ({ user }: Props) => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    return (
        <div className="user-card">
            <div className="user-avatar">{user.name.charAt(0).toUpperCase()}</div>
            <div className="user-info">
                <h3 className="user-name">{user.name}</h3>
                <p className="user-email">{user.email}</p>
                <p className="user-phone">{user.phone}</p>
            </div>
            <div className="user-actions">
                <button className="btn-view"
                    onClick={() => navigate(`/users/${user.id}`)}>View</button>
                <button className="btn-edit"
                    onClick={() => navigate(`/edit-user/${user.id}`)}>Edit</button>
                <button className="btn-delete"
                    onClick={() => dispatch(deleteUser(user.id))}>Delete</button>
            </div>
        </div>
    );
};