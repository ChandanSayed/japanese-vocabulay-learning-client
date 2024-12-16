import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, Outlet, useNavigate } from "react-router-dom";

export default function DashboardLayout() {
  const userDetails = useSelector(state => state.userData.value);
  const navigate = useNavigate();
  useEffect(() => {
    if (userDetails?.email) {
      if (userDetails?.userType !== "admin") {
        return navigate("/lessons/");
      }
    } else {
      return navigate("/login");
    }
  }, []);
  return (
    <section className="py-20">
      <div className="container px-2 md:px-4 mx-auto">
        <div className="flex flex-col md:flex-row gap-5">
          <div className="w-[200px]">
            <ul className="space-y-3">
              <li>
                <Button asChild>
                  <Link className="w-full" to={"/dashboard/lessons"}>
                    Lessons
                  </Link>
                </Button>
              </li>
              <li>
                <Button asChild>
                  <Link className="w-full" to={"/dashboard/add-lesson"}>
                    Add Lesson
                  </Link>
                </Button>
              </li>
              <li>
                <Button asChild>
                  <Link className="w-full" to={"/dashboard/add-vocabulary"}>
                    Add Vocabulary
                  </Link>
                </Button>
              </li>
              <li>
                <Button asChild>
                  <Link className="w-full" to={"/dashboard/manage-users"}>
                    Manage Users
                  </Link>
                </Button>
              </li>
              <li>
                <Button asChild>
                  <Link className="w-full" to={"/dashboard/lesson-management"}>
                    Lesson Management
                  </Link>
                </Button>
              </li>
              <li>
                <Button asChild>
                  <Link className="w-full" to={"/dashboard/vocabulary-management"}>
                    Vocabulary Management
                  </Link>
                </Button>
              </li>
            </ul>
          </div>
          <div className="flex-1">
            <div className="max-w-4xl mx-auto">
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
