import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { login } from "@/utils/use-auth";

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [form, setForm] = useState({
    password: "",
    email: "",
  });

  const handleSubmit = async e => {
    e.preventDefault();
    const res = await login(
      {
        email: form.email,
        password: form.password,
      },
      navigate,
      dispatch
    );
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
          Login
        </Button>
        <p>
          Not Registered? <Link to={"/register"}>Register</Link>
        </p>
      </form>
    </div>
  );
}
