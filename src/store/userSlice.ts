import { createSlice, createAsyncThunk} from "@reduxjs/toolkit";


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

export const fetchUsers = 
createAsyncThunk("users/fetchUsers", async () => {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    const data = await response.json();
    return data.map((user: User ) => ({
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
    }));
});

export const addUser = createAsyncThunk(
    "users/addUser",
    async (newUser: Omit<User, "id">) => {
        const response = await fetch("https://jsonplaceholder.typicode.com/users", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newUser),
        });
        const data = await response.json();
        return { ...newUser, id: data.id };
    }
);

export const updateUser =
createAsyncThunk(
    "users/updateUser",
    async (updatedUser: User) => {
        await fetch(`https://jsonplaceholder.typicode.com/users/${updatedUser.id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(updatedUser),
            });
            return updatedUser
    }
);

export const deleteUser =
createAsyncThunk(
    "users/deleteUser",
    async (userId: number) => {
        await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`, {
                method: "DELETE",
            })
            return userId;
    }
);

const userSlice = createSlice({
    name: "users",
    initialState,
    reducers: {},
    
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
       })
        .addCase(addUser.fulfilled, (state, action) => {
            state.users.push(action.payload);
        })
        .addCase(updateUser.fulfilled, (state, action) => {
            const index= state.users.findIndex((user) => user.id === action.payload.id);
            if (index !== -1)
                state.users[index] = action.payload;
        })
        .addCase(deleteUser.fulfilled, (state, action) => {
            state.users =
            state.users.filter((user) => user.id !== action.payload);
        });
    },
});

export default userSlice.reducer;