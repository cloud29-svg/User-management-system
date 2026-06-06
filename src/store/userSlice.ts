import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export type User = {
    id: number;
    name: string;
    email: string;
    phone: string;
};

export type UserState = {
    users: User[];
    loading: boolean;
    error: string | null;
};

const initialState: UserState = {
    users: [],
    loading: false,
    error: null,
};

export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    const data = await response.json();
    return data.map((user: User) => ({
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
    }));
});

const userSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        // ✅ All local — no API calls
        addUser: (state, action: PayloadAction<Omit<User, "id">>) => {
            const newId = state.users.length
                ? Math.max(...state.users.map((u) => u.id)) + 1
                : 1;
            state.users.push({ id: newId, ...action.payload });
        },
        updateUser: (state, action: PayloadAction<User>) => {
            const index = state.users.findIndex((u) => u.id === action.payload.id);
            if (index !== -1) state.users[index] = action.payload;
        },
        deleteUser: (state, action: PayloadAction<number>) => {
            state.users = state.users.filter((u) => u.id !== action.payload);
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUsers.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.loading = false;
                state.users = action.payload;
            })
            .addCase(fetchUsers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Failed to fetch users";
            });
    },
});

export const { addUser, updateUser, deleteUser } = userSlice.actions;
export default userSlice.reducer;