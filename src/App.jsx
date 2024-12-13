import { useEffect, useState } from "react";
import "./App.css";
import { Outlet } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";
import { getUserData } from "./redux/features/user/user-slice";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "./components/Navbar";

function App() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = Cookies.get("token");
    async function ValidateUser() {
      const res = await axios.get("/auth/validate-token", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch(getUserData(res.data.user));
      setLoading(false);
    }
    if (token) {
      ValidateUser();
    }
  }, []);
  if (loading) {
    return <h1>Loading...</h1>;
  }
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}

export default App;
