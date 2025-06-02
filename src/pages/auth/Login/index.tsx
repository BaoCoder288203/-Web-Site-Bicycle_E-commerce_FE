import {
  Box,
  Button,
  TextField,
  Typography,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import GoogleIcon from "@mui/icons-material/Google";
import useAuth from "@/hook/api/useAuth";
import { useGoogleLogin } from "@react-oauth/google";
import { useSnackbar } from "notistack";
import { APP_ROUTES } from "@/constants";

const LoginTemplate = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { handleLogin, handleLoginWithGoogle } = useAuth();
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  
  const handleChangeText = (name: string, value: string) => {
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  const handleGoogleSuccess = (credentialResponse: any) => {
    console.log(
      "Google response: ",
      JSON.stringify(credentialResponse, null, 2)
    );

    const code = credentialResponse.code;

    if (code) {
      handleLoginWithGoogle(code)
        .then((result) => {
          console.log("Login Result:", result);
          enqueueSnackbar({ message: "Login successful!", variant: "success" });
          navigate(APP_ROUTES.DASHBOARD);
        })
        .catch((err) => {
          const errorMessage =
            err.response?.data?.message || "Google login failed";
          console.error("Google login error:", errorMessage, err);
          enqueueSnackbar({ message: errorMessage, variant: "error" });
          navigate("/auth/login");
        });
    } else {
      console.error("No token received from Google");
      enqueueSnackbar({
        message: "No authorization code received",
        variant: "error",
      });
    }
  };

  const handleGoogleError = () => {
    console.error("Google Sign-In failed");
    enqueueSnackbar({ message: "Google Sign-In failed", variant: "error" });
  };

  const googleLogin = useGoogleLogin({
    onSuccess: handleGoogleSuccess,
    onError: handleGoogleError,
    flow: "auth-code",
    ux_mode: "redirect",
    redirect_uri: "http://localhost:3000/auth/google-callback",
    scope:
      "email profile openid https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile",
  });

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      bgcolor="#f3f8f3"
    >
      <Box
        height={600}
        width={600}
        bgcolor="white"
        p={4}
        borderRadius={2}
        boxShadow={3}
        textAlign="center"
        padding={5}
      >
        {/* Logo */}
        <Typography variant="h3" fontWeight="bold" mb={2}>
          <span style={{ color: "black" }}>Cycle</span>
          <span style={{ color: "red" }}>City</span>
        </Typography>

        {/* Email Input */}
        <Typography align="left" fontWeight="bold" marginTop={5}>
          Email
        </Typography>
        <TextField
          onChange={(e) => handleChangeText("email", e.target.value)}
          fullWidth
          variant="outlined"
          placeholder="Enter Your Email"
          margin="dense"
          sx={{
            height: "50px", // Chiều cao tổng thể
            "& .MuiOutlinedInput-root": {
              height: "50px", // Điều chỉnh chiều cao của phần nhập
            },
          }}
        />

        {/* Password Input */}
        <Typography align="left" fontWeight="bold" mt={2}>
          Enter Password
        </Typography>
        <TextField
          onChange={(e) => handleChangeText("password", e.target.value)}
          fullWidth
          variant="outlined"
          type={showPassword ? "text" : "password"}
          placeholder="Enter Password"
          margin="dense"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </IconButton>
              </InputAdornment>
            ),
          }}
          sx={{
            height: "50px", // Chiều cao tổng thể
            "& .MuiOutlinedInput-root": {
              height: "50px", // Điều chỉnh chiều cao của phần nhập
            },
            "&::-ms-reveal, &::-ms-clear": {
              display: "none",
            },
          }}
        />

        {/* Login Button */}
        <Button
          onClick={() => handleLogin(email, password)}
          fullWidth
          variant="contained"
          color="error"
          sx={{ mt: 2, py: 1.5, fontWeight: "bold", fontSize: "16px" }}
        >
          Login
        </Button>

        {/* Register Link */}
        <Typography mt={2}>
          Don't have an account?{" "}
          <Link
            to="/auth/register"
            style={{ color: "red", fontWeight: "bold" }}
          >
            Register
          </Link>
        </Typography>

        {/* Google Login Button */}
        <Button
          fullWidth
          variant="outlined"
          sx={{ mt: 2, py: 1.5, fontWeight: "bold" }}
          startIcon={<GoogleIcon />}
          onClick={() => googleLogin()}
        >
          <span style={{ fontSize: 16, color: "black" }}>
            Login with Google
          </span>
        </Button>
      </Box>
    </Box>
  );
};

export default LoginTemplate;
