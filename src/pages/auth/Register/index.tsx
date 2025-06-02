import { Box, Button, TextField, Typography, IconButton, InputAdornment, MenuItem } from "@mui/material";
import { Link } from "react-router-dom";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import useUser from "@/hook/api/useUser";
import { useSnackbar } from 'notistack';
import  useCart  from "@/hook/api/useCart";

const RegisterTemplate = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [phoneNumber, setPhoneNumber] = useState("");
    const [role, setRole] = useState("USER");
    const [gender, setGender] = useState("MALE");
    const [email, setEmail] = useState("");
    const [fullName, setFullName] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const { handleRegister } = useUser();
    const { enqueueSnackbar } = useSnackbar();

    const validateFullName = (name) => {
        if (!name) return "Name is required.";
        return "";
    };

    const validateEmail = (email) => {
        if (!email) return "Email is required.";
        const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
        if (!regex.test(email)) return "Invalid email format.";
        return "";
    };

    const validatePassword = (pwd) => {
        if (!pwd) return "Password is required.";
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        if (!regex.test(pwd)) {
            return "Password must be at least 8 characters, including uppercase, lowercase, number, and special character (@$!%*?&).";
        }
        return "";
    };

    const validatePhoneNumber = (phone) => {
        if (!phone) return "Phone number is required.";
        const regex = /^\d{10,12}$/;
        if (!regex.test(phone)) return "Phone number must be 10-12 digits.";
        return "";
    };

    // Xử lý khi nhấn Register
    const handleSubmit = () => {
        // Kiểm tra tất cả các trường
        const fullNameErr = validateFullName(fullName);
        if (fullNameErr) {
            enqueueSnackbar(fullNameErr, { variant: "error" });
            return;
        }

        const emailErr = validateEmail(email);
        if (emailErr) {
            enqueueSnackbar(emailErr, { variant: "error" });
            return;
        }

        const passwordErr = validatePassword(password);
        if (passwordErr) {
            enqueueSnackbar(passwordErr, { variant: "error" });
            return;
        }

        if (password !== confirmPassword) {
            enqueueSnackbar("Passwords do not match.", { variant: "error" });
            return;
        }

        const phoneErr = validatePhoneNumber(phoneNumber);
        if (phoneErr) {
            enqueueSnackbar(phoneErr, { variant: "error" });
            return;
        }

        const user = {
            "email":email,
            "password":password,
            "fullName":fullName,
            "phoneNumber":phoneNumber,
            "avatar": null, 
            "role":role,
            "gender":gender,
        };
        const address = {
            district: "",
            fullAddress: "",
            city: "",
            street: "",
            ward: "",
            country: "",
            userId: "",
          }
        console.log("Data sent to register:", user);
        handleRegister(user,address);
    };

    return (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            minHeight="100vh"
            bgcolor="#f3f8f3"
            padding={{ xs: 2, sm: 5 }}
        >
            <Box
                minHeight={600}
                width={{ xs: "100%", sm: 600 }}
                bgcolor="white"
                p={{ xs: 3, sm: 4 }}
                borderRadius={2}
                boxShadow={3}
                textAlign="center"
            >
                {/* Logo */}
                <Typography variant="h3" fontWeight="bold" mb={2}>
                    <span style={{ color: "black" }}>Cycle</span>
                    <span style={{ color: "red" }}>City</span>
                </Typography>

                {/* Name Input */}
                <Typography align="left" fontWeight="bold" marginTop={5}>
                    Name
                </Typography>
                <TextField
                    fullWidth
                    variant="outlined"
                    placeholder="Enter Your Name"
                    margin="dense"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    sx={{
                        height: "50px",
                        "& .MuiOutlinedInput-root": {
                            height: "50px",
                        },
                    }}
                />

                {/* Email Input */}
                <Typography align="left" fontWeight="bold" mt={2}>
                    Email
                </Typography>
                <TextField
                    fullWidth
                    variant="outlined"
                    placeholder="Enter Your Email"
                    margin="dense"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    sx={{
                        height: "50px",
                        "& .MuiOutlinedInput-root": {
                            height: "50px",
                        },
                    }}
                />

                {/* Password Input */}
                <Typography align="left" fontWeight="bold" mt={2}>
                    Enter Password
                </Typography>
                <TextField
                    fullWidth
                    variant="outlined"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter Password"
                    margin="dense"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
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
                        height: "50px",
                        "& .MuiOutlinedInput-root": {
                            height: "50px",
                        },
                        "&::-ms-reveal, &::-ms-clear": {
                            display: "none",
                        },
                    }}
                />

                {/* Confirm Password Input */}
                <Typography align="left" fontWeight="bold" mt={2}>
                    Enter Password Again
                </Typography>
                <TextField
                    fullWidth
                    variant="outlined"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter Password"
                    margin="dense"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
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
                        height: "50px",
                        "& .MuiOutlinedInput-root": {
                            height: "50px",
                        },
                        "&::-ms-reveal, &::-ms-clear": {
                            display: "none",
                        },
                    }}
                />

                {/* Phone Number Input */}
                <Typography align="left" fontWeight="bold" mt={2}>
                    Phone Number
                </Typography>
                <TextField
                    fullWidth
                    variant="outlined"
                    placeholder="Enter Your Phone Number"
                    margin="dense"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    sx={{
                        height: "50px",
                        "& .MuiOutlinedInput-root": {
                            height: "50px",
                        },
                    }}
                />

                {/* Role Input */}
                <Typography align="left" fontWeight="bold" mt={2}>
                    Role
                </Typography>
                <TextField
                    fullWidth
                    select
                    variant="outlined"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    margin="dense"
                    sx={{
                        height: "50px",
                        "& .MuiOutlinedInput-root": {
                            height: "50px",
                        },
                    }}
                >
                    <MenuItem value="USER">User</MenuItem>
                    <MenuItem value="ADMIN">Admin</MenuItem>
                </TextField>

                {/* Gender Input */}
                <Typography align="left" fontWeight="bold" mt={2}>
                    Gender
                </Typography>
                <TextField
                    fullWidth
                    select
                    variant="outlined"
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    margin="dense"
                    sx={{
                        height: "50px",
                        "& .MuiOutlinedInput-root": {
                            height: "50px",
                        },
                    }}
                >
                    <MenuItem value="MALE">Male</MenuItem>
                    <MenuItem value="FEMALE">Female</MenuItem>
                    <MenuItem value="OTHER">Other</MenuItem>
                </TextField>

                {/* Register Button */}
                <Button
                    fullWidth
                    variant="contained"
                    color="error"
                    sx={{ mt: 4, py: 1.5, fontWeight: "bold", fontSize: "16px" }}
                    onClick={handleSubmit}
                >
                    Register
                </Button>

                {/* Login Link */}
                <Typography mt={2}>
                    Already have an account?{" "}
                    <Link to="/auth/login" style={{ color: "red", fontWeight: "bold" }}>
                        Login
                    </Link>
                </Typography>

                {/* Google Sign In */}
                <Typography mt={2}>
                    Or sign in with{" "}
                    <Link to="/" style={{ fontWeight: "bold" }}>
                        Google
                    </Link>
                </Typography>
            </Box>
        </Box>
    );
};

export default RegisterTemplate;