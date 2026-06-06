import { useState } from "react";
import type { User } from "../store/userSlice";

type Props = {
    initialData?: Partial<User>;
    onSubmit: (data: Omit<User, "id">) => void;
    submitLabel: string;
};

export const UserForm = ({ initialData, onSubmit, submitLabel }: Props) => {
    const [name, setName] = useState(initialData?.name || "");
    const [email, setEmail] = useState(initialData?.email || "");
    const [phone, setPhone] = useState(initialData?.phone || "");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!name || !email || !phone) return;
        onSubmit({ name, email, phone });
    };

    return (
        <form className="user-form" onSubmit={handleSubmit}>
            <div className="form-group">
                <label>Full Name</label>
                <input value={name} onChange={(e) => setName(e.target.value)}
                    placeholder="Enter full name" required />
            </div>
            <div className="form-group">
                <label>Email Address</label>
                <input type="email" value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter email" required />
            </div>
            <div className="form-group">
                <label>Phone Number</label>
                <input value={phone} onChange={(e) => setPhone(e.target.value)}
                    placeholder="Enter phone" required />
            </div>
            <button type="submit" className="btn-submit">{submitLabel}</button>
        </form>
    );
};