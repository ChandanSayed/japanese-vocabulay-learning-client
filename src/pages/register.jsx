import UploadImage from "@/components/image-uploader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { POST } from "@/utils/use-api";
import { login } from "@/utils/use-auth";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function Register() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userDetails = useSelector(state => state.userData.value);
  const [errors, setErrors] = useState({});
  const [form, setForm] = useState({
    name: "",
    password: "",
    confirmPassword: "",
    email: "",
    image: "",
  });

  const validateForm = () => {
    const newErrors = {};

    // Validate name
    if (!form.name || form.name.length < 3) {
      newErrors.name = "Name must be at least 3 characters long.";
    }

    // Validate email
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!form.email || !emailRegex.test(form.email)) {
      newErrors.email = "Please enter a valid email address.";
    }

    // Validate password
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
    if (!form.password || !passwordRegex.test(form.password)) {
      newErrors.password =
        "Password must be at least 8 characters long and include uppercase, lowercase, a number, and a special character.";
    }

    // Validate confirm password
    if (form.password !== form.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
    }

    // Check if image is uploaded
    if (!form.image) {
      newErrors.image = "Please upload an image.";
    }

    // Set errors state
    setErrors(newErrors);

    return Object.keys(newErrors).length === 0; // If no errors, return true
  };

  const handleSubmit = async e => {
    e.preventDefault();

    if (validateForm()) {
      try {
        const res = await POST("/auth/register/", form);

        if (res.status === 201) {
          login(
            {
              email: form.email,
              password: form.password,
            },
            navigate,
            dispatch
          );
        }
      } catch (err) {
        console.log(err);
        Swal.fire({
          title: "Sorry",
          text: err?.response?.data,
          icon: "error",
        });
      }
    } else {
      console.log("Form has errors");
    }
  };

  useEffect(() => {
    if (userDetails?.email) {
      return navigate("/dashboard");
    }
  }, []);

  return (
    <div className="container mx-auto px-2 md:px-4 py-12">
      <form onSubmit={handleSubmit} className="space-y-3 max-w-lg mx-auto">
        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="name" className="text-base capitalize">
            Name
          </Label>
          <Input
            id="name"
            placeholder="Name"
            value={form.name}
            onChange={e => setForm({ ...form, name: e.target.value })}
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
        </div>
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
          {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
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
          {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
        </div>
        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="confirm_password" className="text-base capitalize">
            Confirm Password
          </Label>
          <Input
            id="confirm_password"
            placeholder="Confirm Password"
            type="password"
            value={form.confirmPassword}
            onChange={e => setForm({ ...form, confirmPassword: e.target.value })}
          />
          {errors.confirmPassword && (
            <p className="text-red-500 text-sm">{errors.confirmPassword}</p>
          )}
        </div>
        <UploadImage setForm={setForm} image={form.image} errors={errors} />
        {errors.image && <p className="text-red-500 text-sm">{errors.image}</p>}

        <Button type="submit" className="mt-4 bg-blue-500 text-white p-2 rounded-md">
          Register
        </Button>
        <p>
          Already Registered? <Link to={"/login"}>Login</Link>
        </p>
      </form>
    </div>
  );
}
