import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { GET, POST, PUT } from "@/utils/use-api";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

export default function AddLesson() {
  const id = useParams().id;

  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    number: "",
  });

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const res = await (id
        ? PUT(`/api/update-lesson/${id}`, form)
        : POST(`/api/create-lesson/`, form));
      if (res.status === 201 || res.status === 200) {
        Swal.fire({
          title: "Good job!",
          text: id ? "Lesson updated successfully!" : "Lesson added successfully!",
          icon: "success",
        });
        navigate("/dashboard/lessons");
      } else {
        Swal.fire({
          title: "Sorry!",
          text: "Failed to add lesson!",
          icon: "error",
        });
      }
    } catch (error) {
      console.log(error.response.data);
    }
  }

  useEffect(() => {
    async function getLesson() {
      const res = await GET(`/api/get-lesson/${id}`);
      if (res.status === 200) {
        setForm(res.data);
      }
    }
    if (id) getLesson();
  }, [id]);

  return (
    <div>
      <form action="" onSubmit={handleSubmit}>
        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="name" className="text-base capitalize">
            Lesson Name
          </Label>
          <Input
            id="name"
            placeholder="Lesson Name"
            value={form.name}
            onChange={e => setForm({ ...form, name: e.target.value })}
          />
        </div>
        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="number" className="text-base capitalize">
            Lesson Number
          </Label>
          <Input
            id="number"
            placeholder="Lesson Number"
            value={form.number}
            onChange={e => setForm({ ...form, number: e.target.value })}
          />
        </div>
        <Button type="submit" className="mt-4 bg-blue-500 text-white p-2 rounded-md">
          {id ? "Update Lesson" : "Add Lesson"}
        </Button>
      </form>
    </div>
  );
}
