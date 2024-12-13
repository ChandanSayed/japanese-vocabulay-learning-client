import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

export default function DashboardLayout({ children }) {
  const userDetails = useSelector(state => state.userData.value);
  const navigate = useNavigate();
  useEffect(() => {
    if (userDetails?.email) {
    } else {
      return navigate("/login");
    }
  }, []);
  return (
    <div className="container px-2 md:px-4 mx-auto">
      <div className="flex">
        <div className="w-[200px]">
          <ul className="space-y-2">
            <li>
              <Button asChild>
                <Link className="w-full" to={"lessons"}>
                  Lessons
                </Link>
              </Button>
            </li>
            <li>
              <Button asChild>
                <Link className="w-full" to={"add-lessons"}>
                  Add Lessons
                </Link>
              </Button>
            </li>
            <li>
              <Button asChild>
                <Link className="w-full" to={"add-vocabularies"}>
                  Add Vocabularies
                </Link>
              </Button>
            </li>
            <li>
              <Button asChild>
                <Link className="w-full" to={"manage-user"}>
                  Manage Users
                </Link>
              </Button>
            </li>
            <li>
              <Button asChild>
                <Link className="w-full" to={"lesson-management"}>
                  Lesson Management
                </Link>
              </Button>
            </li>
            <li>
              <Button asChild>
                <Link className="w-full" to={"vocabulary-management"}>
                  Vocabulary Management
                </Link>
              </Button>
            </li>
          </ul>
        </div>
        <div className="flex-1">{children}</div>
      </div>
    </div>
  );
}
