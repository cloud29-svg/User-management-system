import { useEffect } from "react"; 
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import type { AppDispatch, RootState } from "../store/Store";
import { fetchUsers } from "../store/userSlice"; 
import { UserCard } from "../components/UserCard";

export const UserListPage = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const { users, loading, error } = useSelector(
        (state: RootState) => state.users
    );

    useEffect(() => {
        if (users.length === 0) dispatch(fetchUsers());
    }, [dispatch]);

    if (loading) return <div className="status">Loading users...</div>;
    if (error) return <div className="status error">{error}</div>;

    return (
        <div className="page">
            <div className="page-header">
                <h1>User Management</h1>
                <button className="btn-primary" onClick={() => navigate("/add-user")}>
                    + Add User
                </button>
            </div>
            <div className="user-grid">
                {users.map((user) => (
                    <UserCard key={user.id} user={user} />
                ))}
            </div>
        </div>
    );
};