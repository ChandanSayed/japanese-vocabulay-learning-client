import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import Cookies from "js-cookie";
import { getUserData } from "@/redux/features/user/user-slice";
import Swal from "sweetalert2";
import { POST } from "@/utils/use-api";

export default function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userDetails = useSelector(state => state.userData.value);

  async function logout() {
    const res = await POST("/auth/logout");
    if (res.status === 200) {
      dispatch(getUserData(null));
      navigate("/login");
      Cookies.remove("token");
      Swal.fire({
        title: "Logged Out",
        text: res.data.message,
        icon: "success",
      });
    }
  }

  return (
    <div className="container mx-auto max-w-7xl px-2 md:px-4">
      <nav className="flex justify-between items-center py-2 ">
        <Link to={"/"} className="text-4xl font-extrabold hover:text-gray-600">
          Learn Japanese
        </Link>
        <ul className="flex gap-4 items-center">
          {userDetails?.userType === "admin" && (
            <>
              <li>
                <Link className="hover:text-gray-400" to={"/dashboard"}>
                  Dashboard
                </Link>
              </li>
            </>
          )}
          {userDetails?.userType === "user" && (
            <li>
              <Link className="hover:text-gray-400" to={"/lessons"}>
                Lessons
              </Link>
            </li>
          )}

          {!userDetails ? (
            <li>
              <Link to="/login">Log In</Link>
            </li>
          ) : (
            <li>
              <Button onClick={logout}>Log Out</Button>
            </li>
          )}
        </ul>
      </nav>
    </div>
  );
}
