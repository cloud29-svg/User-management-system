import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../store/Store";
import { fetchUsers, deleteUser } from "../store/userSlice";
import type { User } from "../store/userSlice";
import { EditUserModal } from "./EditUserModal";

export const UserList = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { users, loading, error } = useSelector(
        (state: RootState) => state.users
    );

    const [editingUser, setEditingUser] = useState<User | null>(null);

    useEffect(() => {
        dispatch(fetchUsers());
    }, [dispatch]);

    if (loading) return <p>Loading users...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <>
            <ul>
                {users.map((user) => (
                    <li key={user.id}>
                        <strong>{user.name}</strong> — {user.email} — {user.phone}
                        <button onClick={() => setEditingUser(user)}>Edit</button>
                        <button onClick={() => dispatch(deleteUser(user.id))}>Delete</button>
                    </li>
                ))}
            </ul>

            {editingUser && (
                <EditUserModal
                    user={editingUser}
                    onClose={() => setEditingUser(null)}
                />
            )}
        </>
    );
};