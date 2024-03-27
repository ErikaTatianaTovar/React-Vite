import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Family from "./components/family";
import Footer from "./components/footer";
import Header from "./components/header";
import UserList from "./components/user/UserList";
import Login from "./components/auth/Login";
import UserFormCreate from "./components/user/UserFormCreate";
import UserFormEdit from "./components/user/UserFormEdit";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { loginSuccess } from "./features/authSlice";
import PrivateRoute from "./components/privateRoute";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const storageData = localStorage.getItem("sessionData");
    //const sessionData = localStorage.getItem('sessionData');
    if (storageData) {
      const sessionData = JSON.parse(sessionData);
      dispatch(loginSuccess(sessionData));
    }
  });
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          {/* Rutas Privadas */}
          <Route path="/" element={<PrivateRoute Component={Family} />} />
          <Route path="/user" element={<PrivateRoute Component={UserList} />} />
          <Route
            path="/user/:id"
            element={<PrivateRoute Component={UserFormEdit} />}
          />
          {/* Rutas Publicas */}
          <Route path="/create-user" element={<UserFormCreate />} />
          <Route path="/login" element={<Login />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}
export default App;
