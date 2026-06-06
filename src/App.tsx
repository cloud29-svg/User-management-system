import { Provider } from "react-redux";
import store from "./store/Store";
import { UserList } from "./components/UserList";
import { AddUserForm } from "./components/AddUserForm";

function App() {
  return (
    <Provider store={store}>
      <h1>User Management System</h1>
      <AddUserForm />
      <UserList />
    </Provider>
  );
}

export default App;