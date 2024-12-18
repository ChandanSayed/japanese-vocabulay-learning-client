import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { GET, POST, PUT } from "@/utils/use-api";
import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

export default function AddVocabulary() {
  const id = useParams().id;
  const navigate = useNavigate();
  const [lessons, setLessons] = useState([]);
  const [form, setForm] = useState({
    words: "",
    pronunciation: "",
    meaning: "",
    whenToSay: "",
    lessonNo: null,
  });

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const res = await (id
        ? PUT(`/api/update-vocabulary/${id}`, form)
        : POST(`/api/create-vocabulary/`, form));
      if (res.status === 201 || res.status === 200) {
        Swal.fire({
          title: "Good job!",
          text: "Vocabulary added successfully!",
          icon: "success",
        });
        navigate("/dashboard/vocabulary-management");
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    async function getVocabulary() {
      const res = await GET(`/api/get-vocabulary/${id}`);
      if (res.status === 200) {
        setForm(res.data);
      }
    }
    if (id) getVocabulary();
  }, [id]);

  async function getLessons() {
    const res = await GET(`/api/get-lessons/`);
    setLessons(res.data);
  }
  useEffect(() => {
    getLessons();
  }, []);
  return (
    <div>
      <form action="" onSubmit={handleSubmit}>
        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="words" className="text-base capitalize">
            Words
          </Label>
          <Input
            id="words"
            placeholder="Words"
            value={form.words}
            onChange={e => setForm({ ...form, words: e.target.value })}
          />
        </div>
        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="pronunciation" className="text-base capitalize">
            Pronunciation
          </Label>
          <Input
            id="pronunciation"
            placeholder="pronunciation"
            value={form.pronunciation}
            onChange={e => setForm({ ...form, pronunciation: e.target.value })}
          />
        </div>
        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="meaning" className="text-base capitalize">
            Meaning
          </Label>
          <Input
            id="meaning"
            placeholder="meaning"
            value={form.meaning}
            onChange={e => setForm({ ...form, meaning: e.target.value })}
          />
        </div>
        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="whenToSay" className="text-base capitalize">
            When To Say
          </Label>
          <Input
            id="whenToSay"
            placeholder="When To Say"
            value={form.whenToSay}
            onChange={e => setForm({ ...form, whenToSay: e.target.value })}
          />
        </div>
        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="whenToSay" className="text-base capitalize">
            Lesson Number
          </Label>

          <Select
            id="lessonNo"
            placeholder="Select Lesson Number"
            value={form.lessonNo}
            onValueChange={val => setForm({ ...form, lessonNo: val * 1 })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select Lesson Number" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {lessons.map(lesson => (
                  <SelectItem value={lesson.number} key={lesson._id}>
                    {lesson.number}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <Button type="submit" className="mt-4 bg-blue-500 text-white p-2 rounded-md">
          {id ? "Update Vocabulary" : "Add Vocabulary"}
        </Button>
      </form>
    </div>
  );
}
