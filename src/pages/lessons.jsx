import { DELETE, GET } from "@/utils/use-api";
import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function Lessons() {
  const [lessons, setLessons] = useState([]);
  const userDetails = useSelector(state => state.userData.value);

  async function deleteLesson(id) {
    await DELETE(`/api/delete-lesson/${id}`);
    getLessons();
  }

  async function getLessons() {
    const res = await GET(`/api/get-lessons/`);

    setLessons(res.data);
  }

  useEffect(() => {
    getLessons();
  }, []);

  return (
    <div>
      <Table className="overflow-scroll">
        <TableCaption>A list of created lessons.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Lesson Name</TableHead>
            <TableHead>Lesson Number</TableHead>
            <TableHead>Vocabulary Count</TableHead>
            {userDetails.userType === "admin" && (
              <TableHead className="w-44 text-center">Action</TableHead>
            )}
          </TableRow>
        </TableHeader>
        <TableBody>
          {lessons.map(lesson => (
            <TableRow key={lesson._id}>
              <TableCell className="font-medium">{lesson.name}</TableCell>
              <TableCell>{lesson.number}</TableCell>
              <TableCell>{lesson.vocabularyCount}</TableCell>
              {userDetails.userType === "admin" && (
                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    <Button asChild>
                      <Link to={`/dashboard/lessons/update/${lesson._id}`}>Update</Link>
                    </Button>
                    <Button onClick={() => deleteLesson(lesson._id)}>Delete</Button>
                  </div>
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
