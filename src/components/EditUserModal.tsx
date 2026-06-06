import { useState } from "react";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../store/Store";
import { updateUser} from "../store/userSlice";
import type { User } from "../store/userSlice";
type Props = {
    user: User;
    onClose: () => void;
};

export const EditUserModal = ({ user, onClose}: Props) => {
const dispatch = useDispatch<AppDispatch>();
const [name, setName] = useState(user.name);
const [email, setEmail] = useState(user.email)
const [phone, setPhone] = useState(user.phone);

const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(updateUser({ id: user.id, name, email, phone }));
    onClose();
};

return (
    <div className="modal-overlay">
        <div className="modal">
            <h2>Edit User</h2>
            <form onSubmit={handleSubmit}>
                <input value={name}
                onChange={(e) => setName(e.target.value)} required />
                <input value={email}
                onChange={(e) => setEmail(e.target.value)} required />
                <input value={phone}
                onChange={(e) => setPhone(e.target.value)} required />
                <div className="modal-buttons">
                    <button type="submit">Save Changes</button>
                    <button type="button" onClick={onClose}>Cancel</button>
                </div>
            </form>
        </div>

    </div>
    
)
}