import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import EditIcon from "@mui/icons-material/Edit";
import CircularProgress from "@mui/material/CircularProgress";
import { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import useUser from "@/hook/api/useUser";
import EditAddressModal from "@/components/Shared/EditAddress";
import { getValueFromLocalStorage } from "@/utils/localStorage";
import dayjs from "dayjs";
import { enqueueSnackbar } from "notistack";
import AvatarModal from "../../../components/Shared/AvatarModal";
import useUpload from "@/hook/api/useUpload";
import { setAvatar } from "@/store/slices/user.slice";

const UserProfile = () => {
    const { handleEditProfile, handleUpdateAvatar } = useUser();
    const { me } = useSelector((state: any) => state.userSlice);
    const dispatch = useDispatch();
    const [userInfo, setUserInfo] = useState({
        userId: "",
        fullName: "",
        email: "",
        phoneNumber: "",
        dob: "",
        avatar: "",
        gender: "",
        addressId: "",
    });
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [openAvatarModal, setOpenAvatarModal] = useState(false);
    const [avatarLoading, setAvatarLoading] = useState(false); // New state for avatar upload loading
    const fileInputRef = useRef<HTMLInputElement>(null);

    const { handleUploadSingleImage } = useUpload();

    let userId = getValueFromLocalStorage("userId");
    userId = userId ? userId.substring(1, userId.length - 1) : "";

    // Lấy thông tin người dùng khi component mount
    useEffect(() => {
        if (me && !userInfo.userId) {  // Chỉ cập nhật khi me có giá trị và userInfo chưa được set
            setUserInfo({
                userId: me.userId || "",
                fullName: me.fullName || "",
                email: me.email || "",
                phoneNumber: me.phoneNumber || "",
                dob: me.dob ? me.dob.replace("T00:00:00", "") : "",
                avatar: me.avatar || "",
                gender: me.gender || "",
                addressId: me.address?.addressId || "",
            });
        }
        setIsLoading(false);
    }, [me]);

    // Dọn dẹp URL tạm thời khi avatar thay đổi
    useEffect(() => {
        return () => {
            if (userInfo.avatar.startsWith("blob:")) {
                URL.revokeObjectURL(userInfo.avatar);
            }
        };
    }, [userInfo.avatar]);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    // Mở Modal xem ảnh
    const handleOpenAvatarModal = () => {
        setOpenAvatarModal(true);
    };

    // Đóng Modal xem ảnh
    const handleCloseAvatarModal = () => {
        setOpenAvatarModal(false);
    };

    // Xử lý chọn ảnh
    const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            if (!file.type.startsWith("image/")) {
                enqueueSnackbar("Vui lòng chọn file ảnh", { variant: "error" });
                return;
            }
            if (file.size > 5 * 1024 * 1024) {
                enqueueSnackbar("Ảnh không được lớn hơn 5MB", { variant: "error" });
                return;
            }
            setAvatarLoading(true); // Start loading
            try {
                console.log("check file: ", file);
                const imageUrl = await handleUploadSingleImage(file);
                const data = {
                    userId: userInfo.userId,
                    avatarUrl: imageUrl,
                };
                await handleUpdateAvatar(data);
                setUserInfo((prev) => ({ ...prev, avatar: imageUrl }));
                // Update the avatar in the Redux store
                dispatch(setAvatar(imageUrl));
                enqueueSnackbar("Cập nhật ảnh đại diện thành công!", { variant: "success" });
            } catch (err) {
                enqueueSnackbar("Lỗi khi tải ảnh lên", { variant: "error" });
                console.error("UserProfile: handleAvatarChange error =", err);
            } finally {
                setAvatarLoading(false); // Stop loading
                handleCloseAvatarModal(); // Đóng Modal sau khi chọn ảnh
            }
        }
    };

    // Kích hoạt input file
    const handleEditAvatar = () => {
        fileInputRef.current?.click();
    };

    // Xử lý thay đổi ngày sinh
    const handleDobChange = (e: any) => {
        const newDob = e.target.value;
        console.log("UserProfile: handleDobChange newDob =", newDob);
        setUserInfo((prev) => {
            const updated = { ...prev, dob: newDob };
            console.log("UserProfile: handleDobChange updated userInfo =", updated);
            return updated;
        });
    };

    const handleEditUser = async () => {
        if (!userInfo.userId) {
            enqueueSnackbar("Không tìm thấy userId", { variant: "error" });
            return;
        }
        if (!userInfo.fullName || !userInfo.phoneNumber) {
            enqueueSnackbar("Vui lòng cung cấp họ tên và số điện thoại", { variant: "error" });
            return;
        }
        setLoading(true);
        try {
            const formattedUserInfo = {
                ...userInfo,
                dob: userInfo.dob ? `${userInfo.dob}T00:00:00` : "",
            };
            const response = await handleEditProfile(formattedUserInfo);
            console.log("UserProfile: handleEditUser response =", response);
            enqueueSnackbar("Cập nhật thông tin thành công!", { variant: "success" });
        } catch (err: any) {
            const errorMessage = err.response?.data?.message || err.message || "Lỗi không xác định";
            enqueueSnackbar("Lỗi khi cập nhật thông tin: " + errorMessage, { variant: "error" });
        } finally {
            setLoading(false);
        }
    };

    if (isLoading) {
        return (
            <Box sx={{ display: "flex", justifyContent: "center", p: 4 }}>
                <CircularProgress />
            </Box>
        );
    }

    if (!me) {
        return (
            <Box sx={{ p: 4, textAlign: "center" }}>
                Không thể tải thông tin người dùng.
            </Box>
        );
    }
    console.log("check userInfor:", userInfo);

    return (
        <Box
            alignItems={"center"}
            sx={{
                p: 2,
                backgroundColor: "white",
                borderRadius: 2,
            }}
        >
            <Box sx={{ position: "relative", textAlign: "center" }}>
                <Avatar
                    src={userInfo.avatar || "/profile.jpg"}
                    sx={{
                        cursor: "pointer",
                        width: 200,
                        height: 200,
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        border: '4px solid #ccc'
                    }}
                    onClick={handleOpenAvatarModal}
                />
                {/* Input file ẩn */}
                <input
                    type="file"
                    accept="image/*"
                    style={{ display: "none" }}
                    ref={fileInputRef}
                    onChange={handleAvatarChange}
                />
            </Box>

            {/* Sử dụng component AvatarModal với prop avatarLoading */}
            <AvatarModal
                open={openAvatarModal}
                onClose={handleCloseAvatarModal}
                avatarSrc={userInfo.avatar || "/profile.jpg"}
                onEdit={handleEditAvatar}
                loading={avatarLoading} // Pass loading state to AvatarModal
            />

            <Box
                component="form"
                sx={{ mt: 15, backgroundColor: "#d6d6d2", p: 2, borderRadius: 2 }}
            >
                <TextField
                    fullWidth
                    id="hoTen"
                    label="Họ tên"
                    variant="outlined"
                    margin="normal"
                    onChange={(e) => setUserInfo({ ...userInfo, fullName: e.target.value })}
                    value={userInfo.fullName || ""}
                    sx={{
                        backgroundColor: "white",
                        borderRadius: 1,
                        "& .MuiInputLabel-root": {
                            transform: "translate(14px, -9px) scale(0.75)",
                            color: "black",
                        },
                        "& .MuiOutlinedInput-root": {
                            "& input": {
                                paddingY: "26px",
                            },
                            "&.Mui-focused fieldset": {
                                borderColor: "blue",
                            },
                        },
                    }}
                />
                <TextField
                    fullWidth
                    id="gioiTinh"
                    label="Giới tính"
                    variant="outlined"
                    margin="normal"
                    value={userInfo.gender === "MALE" ? "Nam" : userInfo.gender === "FEMALE" ? "Nữ" : ""}
                    disabled
                    sx={{
                        backgroundColor: "white",
                        borderRadius: 1,
                        "& .MuiInputLabel-root": {
                            transform: "translate(14px, -9px) scale(0.75)",
                            color: "black",
                        },
                        "& .MuiOutlinedInput-root": {
                            "& input": {
                                paddingY: "26px",
                            },
                            "&.Mui-focused fieldset": {
                                borderColor: "blue",
                            },
                        },
                    }}
                />
                <TextField
                    fullWidth
                    id="ngaySinh"
                    label="Ngày sinh"
                    type="date"
                    variant="outlined"
                    margin="normal"
                    onChange={handleDobChange}
                    value={userInfo.dob ? dayjs(userInfo.dob).format("YYYY-MM-DD") : ""}
                    sx={{
                        backgroundColor: "white",
                        borderRadius: 1,
                        "& .MuiInputLabel-root": {
                            transform: "translate(14px, -9px) scale(0.75)",
                            color: "black",
                        },
                        "& .MuiOutlinedInput-root": {
                            "& input": {
                                paddingY: "26px",
                            },
                            "&.Mui-focused fieldset": {
                                borderColor: "blue",
                            },
                        },
                    }}
                />
                <TextField
                    fullWidth
                    id="email"
                    label="Email"
                    variant="outlined"
                    margin="normal"
                    value={userInfo.email || ""}
                    disabled
                    sx={{
                        backgroundColor: "white",
                        borderRadius: 1,
                        "& .MuiInputLabel-root": {
                            transform: "translate(14px, -9px) scale(0.75)",
                            color: "black",
                        },
                        "& .MuiOutlinedInput-root": {
                            "& input": {
                                paddingY: "26px",
                            },
                            "&.Mui-focused fieldset": {
                                borderColor: "blue",
                            },
                        },
                    }}
                />
                <TextField
                    fullWidth
                    id="soDienThoai"
                    label="Số điện thoại"
                    variant="outlined"
                    margin="normal"
                    onChange={(e) => setUserInfo({ ...userInfo, phoneNumber: e.target.value })}
                    value={userInfo.phoneNumber || ""}
                    sx={{
                        backgroundColor: "white",
                        borderRadius: 1,
                        "& .MuiInputLabel-root": {
                            transform: "translate(14px, -9px) scale(0.75)",
                            color: "black",
                        },
                        "& .MuiOutlinedInput-root": {
                            "& input": {
                                paddingY: "26px",
                            },
                            "&.Mui-focused fieldset": {
                                borderColor: "blue",
                            },
                        },
                    }}
                />
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <TextField
                        fullWidth
                        id="diaChi"
                        label="Địa chỉ"
                        variant="outlined"
                        margin="normal"
                        value={
                            me.address
                                ? `${me.address.fullAddress || ""}, ${me.address.ward || ""}, ${me.address.district || ""}, ${me.address.city || ""}, ${me.address.country || ""}`
                                : ""
                        }
                        sx={{
                            backgroundColor: "white",
                            borderRadius: 1,
                            "& .MuiInputLabel-root": {
                                transform: "translate(14px, -9px) scale(0.75)",
                                color: "black",
                            },
                            "& .MuiOutlinedInput-root": {
                                "& input": {
                                    paddingY: "26px",
                                },
                                "&.Mui-focused fieldset": {
                                    borderColor: "blue",
                                },
                            },
                        }}
                    />
                    <Button
                        variant="contained"
                        startIcon={<EditIcon />}
                        onClick={handleOpen}
                        sx={{ mt: 1, height: "56px" }}
                    >
                        Sửa
                    </Button>
                </Box>
            </Box>
            <Box sx={{ mt: 2 }}>
                <Button
                    onClick={handleEditUser}
                    variant="contained"
                    startIcon={<EditIcon />}
                    disabled={loading}
                >
                    {loading ? <CircularProgress size={24} color="inherit" /> : "Chỉnh sửa thông tin"}
                </Button>
            </Box>
            <EditAddressModal handleClose={handleClose} open={open} />
        </Box>
    );
};

export default UserProfile;