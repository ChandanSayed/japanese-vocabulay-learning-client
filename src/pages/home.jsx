import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  const userDetails = useSelector(state => state.userData.value);
  useEffect(() => {
    console.log(userDetails);

    if (userDetails?.email) {
      return navigate("/dashboard");
    } else {
      navigate("/login");
    }
  }, []);
  return (
    <div>
      <Button>Home</Button>
    </div>
  );
}
