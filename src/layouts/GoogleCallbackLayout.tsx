import { useEffect, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import useAuth from "@/hook/api/useAuth";
import { APP_ROUTES } from "@/constants";
import { useSnackbar } from "notistack";

const GoogleCallbackLayout = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { handleLoginWithGoogle } = useAuth();
  const { enqueueSnackbar } = useSnackbar();
  const isProcessing = useRef(false);

  useEffect(() => {
    if (isProcessing.current) {
      console.log("Bỏ qua xử lý: Đang xử lý");
      return;
    }
    const params = Object.fromEntries(searchParams.entries());
    console.log("Params:", params);

    const code = searchParams.get("code");
    const error = searchParams.get("error");


    if (!code) {
      console.log("Bỏ qua xử lý: Code không tồn tại");
      navigate("/auth/login", { replace: true });
      return;
    }

    console.log("Google callback received, code:", code, "query:", searchParams.toString());

    isProcessing.current = true;

    handleLoginWithGoogle(code)
      .then((response) => {
        console.log("Login response received:", response);
        if (response && response.success && response.data && response.data.accessToken) {
          console.log("Google login successful, navigating to dashboard");
          enqueueSnackbar({ message: "Login successful!", variant: "success" });
          navigate(APP_ROUTES.DASHBOARD, { replace: true });
        } else {
          console.log("Google login failed, navigating to login page");
          enqueueSnackbar({ message: "Login failed", variant: "error" });
          navigate("/auth/login", { replace: true });
        }
      })
      .catch((err) => {
        localStorage.removeItem('processing_google_login');
        if (err.response?.data?.message?.includes('invalid_grant')) {
          enqueueSnackbar({
            message: "Authentication session expired. Please try logging in again.",
            variant: "error"
          });
        } else {
          const errorMessage = err.response?.data?.message || "Google login failed";
          enqueueSnackbar({ message: errorMessage, variant: "error" });
        }
        navigate("/auth/login", { replace: true });
      })
      .finally(() => {
        isProcessing.current = false;
      });
  }, [searchParams]);

  return <div>Đang xử lý đăng nhập...</div>;
};

export default GoogleCallbackLayout;
