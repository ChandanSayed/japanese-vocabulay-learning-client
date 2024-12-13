import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getUserData } from "@/redux/features/user/user-slice";
import axios from "axios";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function Login() {
  const navigate = useNavigate();
  const userDetails = useSelector(state => state.userData.value);
  useEffect(() => {
    if (userDetails?.email) {
      return navigate("/dashboard");
    }
  }, []);
  const dispatch = useDispatch();
  const [form, setForm] = useState({
    password: "",
    email: "",
  });

  const handleSubmit = async e => {
    e.preventDefault();

    try {
      const res = await axios.post("/auth/login/", {
        email: form.email,
        password: form.password,
      });
      console.log(res, "log");
      if (res.data.loginSuccessful) {
        Cookies.set("token", res.data.token);
        dispatch(getUserData(res.data.user));
        Swal.fire({
          title: "Logged In",
          text: "You are successfully logged in.",
          icon: "success",
        });
        return <Navigate to="/" />;
      }
    } catch (err) {
      console.log(err.response.data);
      Swal.fire({
        title: "Sorry",
        text: err.response.data,
        icon: "error",
      });
    }
  };

  return (
    <div className="container mx-auto px-2 md:px-4 py-12">
      <form onSubmit={handleSubmit} className="space-y-3 max-w-lg mx-auto">
        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="email" className="text-base capitalize">
            Email
          </Label>
          <Input
            id="email"
            placeholder="Email"
            value={form.email}
            onChange={e => setForm({ ...form, email: e.target.value })}
          />
        </div>
        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="password" className="text-base capitalize">
            Password
          </Label>
          <Input
            id="password"
            placeholder="Password"
            type="password"
            value={form.password}
            onChange={e => setForm({ ...form, password: e.target.value })}
          />
        </div>

        <Button type="submit" className="mt-4 bg-blue-500 text-white p-2 rounded-md">
          Register
        </Button>
        <p>
          Not Registered? <Link to={"/register"}>Login</Link>
        </p>
      </form>
    </div>
  );
}
