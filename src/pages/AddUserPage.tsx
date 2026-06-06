import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import type { AppDispatch } from "../store/Store";
import { addUser } from "../store/userSlice";
import type { User } from "../store/userSlice";
import  { UserForm } from "../components/UserForm";

export const AddUserPage = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    const handleSubmit = (data: Omit<User, "id">) => {
        dispatch(addUser(data));
        navigate("/users");
    };

    return (
        <div className="page">
            <button className="btn-back" onClick={() => navigate("/users")}>
                ← Back to Users
            </button>
            <h1>Add New User</h1>
            <UserForm onSubmit={handleSubmit} submitLabel="Add User" />
        </div>
    );
};