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
    const [address, setAddress] = useState(initialData?.address || "");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!name || !email || !address) return;
        onSubmit({ name, email, address });
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
                <label>Address</label>
                <input value={address} onChange={(e) => setAddress(e.target.value)}
                    placeholder="Enter address" required />
            </div>
            <button type="submit" className="btn-submit">{submitLabel}</button>
        </form>
    );
};