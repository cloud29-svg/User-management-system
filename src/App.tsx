import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/Store";
import { UserListPage } from "./pages/UserListPage";
import { UserDetailPage } from "./pages/UserDetailPage";
import { AddUserPage } from "./pages/AddUserPage";
import { EditUserPage } from "./pages/EditUserPage";

function App() {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Navigate to="/users" />} />
                    <Route path="/users" element={<UserListPage />} />
                    <Route path="/users/:id" element={<UserDetailPage />} />
                    <Route path="/add-user" element={<AddUserPage />} />
                    <Route path="/edit-user/:id" element={<EditUserPage />} />
                </Routes>
            </BrowserRouter>
        </Provider>
    );
}

export default App;