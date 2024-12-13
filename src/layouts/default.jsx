import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function DefaultLayout({ children }) {
  const userDetails = useSelector(state => state.userData.value);
  const navigate = useNavigate();
  useEffect(() => {
    if (userDetails?.email) {
      return navigate("/dashboard");
    } else {
      return navigate("/login");
    }
  }, []);
  return <>{children}</>;
}
