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
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function VocabularyManagement() {
  const [vocabularies, setVocabularies] = useState([]);

  async function deleteVocabulary(id) {
    await DELETE(`/api/delete-vocabulary/${id}`);
    getLessons();
  }

  async function getLessons() {
    const res = await GET(`/api/get-vocabularies/`);

    setVocabularies(res.data);
  }

  useEffect(() => {
    getLessons();
  }, []);
  return (
    <div>
      <Table className="overflow-scroll">
        <TableCaption>A list of created Vocabularies.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Words</TableHead>
            <TableHead>Pronunciation</TableHead>
            <TableHead>Meaning</TableHead>
            <TableHead>When To Say</TableHead>
            <TableHead>Lesson No.</TableHead>
            <TableHead>Creator</TableHead>
            <TableHead className="w-44 text-center">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {vocabularies.map(vocabulary => (
            <TableRow key={vocabulary._id}>
              <TableCell className="font-medium">{vocabulary.words}</TableCell>
              <TableCell>{vocabulary.pronunciation}</TableCell>
              <TableCell>{vocabulary.meaning}</TableCell>
              <TableCell>{vocabulary.whenToSay}</TableCell>
              <TableCell>{vocabulary.lessonNo}</TableCell>
              <TableCell>{vocabulary.creator}</TableCell>
              <TableCell>
                <div className="flex flex-wrap gap-1">
                  <Button asChild>
                    <Link to={`/dashboard/vocabularies/update/${vocabulary._id}`}>Update</Link>
                  </Button>
                  <Button onClick={() => deleteVocabulary(vocabulary._id)}>Delete</Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
