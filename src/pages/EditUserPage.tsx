import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import type { AppDispatch, RootState } from "../store/Store";
import { updateUser } from "../store/userSlice";
import type { User } from "../store/userSlice";
import { UserForm } from "../components/UserForm";

export const EditUserPage = () => {
    const { id } = useParams();
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const user = useSelector((state: RootState) =>
        state.users.users.find((u) => u.id === Number(id))
    );

    if (!user) return (
        <div className="page">
            <p className="status">User not found.</p>
            <button className="btn-back" onClick={() => navigate("/users")}>← Back</button>
        </div>
    );

    const handleSubmit = (data: Omit<User, "id">) => {
        dispatch(updateUser({ id: user.id, ...data }));
        navigate("/users");
    };

    return (
        <div className="page">
            <button className="btn-back" onClick={() => navigate("/users")}>
                ← Back to Users
            </button>
            <h1>Edit User</h1>
            <UserForm initialData={user} onSubmit={handleSubmit} submitLabel="Save Changes" />
        </div>
    );
};