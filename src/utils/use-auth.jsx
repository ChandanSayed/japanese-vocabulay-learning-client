import Cookies from "js-cookie";
import { POST } from "@/utils/use-api";
import { getUserData } from "@/redux/features/user/user-slice";
import Swal from "sweetalert2";

export const login = async (data, navigate, dispatch) => {
  try {
    const res = await POST("/auth/login/", data);
    if (res.data?.loginSuccessful) {
      Cookies.set("token", res.data.token);
      dispatch(getUserData(res.data.data));
      Swal.fire({
        title: "Logged In",
        text: "You are successfully logged in.",
        icon: "success",
      });
      navigate("/dashboard");
      return res;
    }
  } catch (err) {
    const errorMessage = err.response?.data?.message || "Something went wrong. Please try again.";
    Swal.fire({
      title: "Sorry",
      text: errorMessage,
      icon: "error",
    });
  }
};
