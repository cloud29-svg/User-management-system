import { useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import type { RootState } from "../store/Store";

export const UserDetailPage = () => {
    const { id } = useParams();
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

    return (
        <div className="page">
            <button className="btn-back" onClick={() => navigate("/users")}>
                ← Back to Users
            </button>
            <div className="detail-card">
                <div className="detail-avatar">{user.name.charAt(0).toUpperCase()}</div>
                <h2>{user.name}</h2>
                <div className="detail-grid">
                    <div className="detail-row">
                        <span className="detail-label">Email</span>
                        <span className="detail-value">{user.email}</span>
                    </div>
                    <div className="detail-row">
                        <span className="detail-label">Address</span>
                        <span className="detail-value">{user.address}</span>
                    </div>
                </div>
                <button className="btn-edit-full"
                    onClick={() => navigate(`/edit-user/${user.id}`)}>
                    Edit User
                </button>
            </div>
        </div>
    );
};