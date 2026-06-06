import { useState } from "react";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../store/Store";
import { addUser } from "../store/userSlice";

export const AddUserForm = () => {
    const dispatch = useDispatch<AppDispatch>();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e. preventDefault();
        if (!name || !email || !phone) return;
        dispatch(addUser({ name, email, phone }));
        setName("");
        setEmail("");
        setPhone("");
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Add New User</h2>
            <input placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)} required />
            <input placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)} required />
            <input placeholder="Phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            />
            <button type="submit">Add User</button>
        </form>
    );
};