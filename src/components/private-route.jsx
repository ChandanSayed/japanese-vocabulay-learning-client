import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const userDetails = useSelector(state => state.userData.value);

  useEffect(() => {
    if (!userDetails?.email) {
      return <Navigate to="/login" />;
    } else {
      return null;
    }
  }, []);
  return children;
};

export default PrivateRoute;
