import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import AddressMap from "../AddressMap";
import "./index.css";
import useUser from "@/hook/api/useUser";
import { enqueueSnackbar } from "notistack";
import useAuth from "@/hook/api/useAuth";
import { useEffect } from "react";
const center = [10.7769, 106.7009];

const EditAddressModal = ({ open, handleClose }: any) => {
    const { handleEditAddress } = useUser();
    const { me } = useAuth();
    const [addressFields, setAddressFields] = useState({
        addressId: "",
        userId: "",
        fullAddress: "",
        street: "",
        ward: "",
        district: "",
        city: "",
        country: "Vietnam",
    });

    // Đồng bộ addressFields khi me.address thay đổi
    useEffect(() => {
        if (me?.address) {
            setAddressFields({
                addressId: me.address.addressId || "",
                userId: me.address.userId || "",
                fullAddress: me.address.fullAddress || "",
                street: me.address.street || "",
                ward: me.address.ward || "",
                district: me.address.district || "",
                city: me.address.city || "",
                country: me.address.country || "Vietnam",
            });
        }
    }, [me?.address]);
    const [mapVisible, setMapVisible] = useState(false);

    const handleAddressChange = (addressData: any) => {
        if (addressData) {
            console.log("EditAddressModal: Received addressData:", addressData);
            setAddressFields((prev) => ({
                ...prev,
                fullAddress: addressData.fullAddress || prev.fullAddress,
                street: addressData.street || prev.street,
                ward: addressData.ward || prev.ward,
                district: addressData.district || prev.district,
                city: addressData.city || prev.city,
                country: addressData.country || prev.country,
            }));
        }
    };

    const handleFieldChange = (field: any, value: any) => {
        setAddressFields((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const handleAddressSubmit = async (event: any) => {
        event.preventDefault();
        try {
            await handleEditAddress(addressFields);
            enqueueSnackbar("Cập nhật địa chỉ thành công!", { variant: "success" });
            handleClose();
        } catch (err: any) {
            enqueueSnackbar("Lỗi khi cập nhật địa chỉ: " + err.message, { variant: "error" });
        }
    };

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
        >
            <Box
                sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: { xs: "90%", md: 800 },
                    bgcolor: "background.paper",
                    borderRadius: 2,
                    boxShadow: 24,
                    p: 4,
                    maxHeight: "90vh",
                    overflowY: "auto",
                }}
            >
                <Typography
                    id="modal-modal-title"
                    variant="h6"
                    component="h2"
                    sx={{ mb: 3, fontWeight: "bold", textAlign: "center" }}
                >
                    Sửa địa chỉ
                </Typography>
                <Box component="form" onSubmit={handleAddressSubmit}>
                    <TextField
                        label="Địa chỉ chi tiết"
                        value={addressFields.fullAddress}
                        onChange={(e) => handleFieldChange("fullAddress", e.target.value)}
                        fullWidth
                        sx={{
                            mb: 2,
                            backgroundColor: "white",
                            borderRadius: 1,
                            "& .MuiInputLabel-root": {
                                color: "black",
                            },
                            "& .MuiOutlinedInput-root": {
                                "& input": {
                                    paddingY: "20px",
                                },
                                "&.Mui-focused fieldset": {
                                    borderColor: "blue",
                                },
                            },
                        }}
                    />
                    <TextField
                        label="Đường"
                        value={addressFields.street}
                        onChange={(e) => handleFieldChange("street", e.target.value)}
                        fullWidth
                        sx={{
                            mb: 2,
                            backgroundColor: "white",
                            borderRadius: 1,
                            "& .MuiInputLabel-root": {
                                color: "black",
                            },
                            "& .MuiOutlinedInput-root": {
                                "& input": {
                                    paddingY: "20px",
                                },
                                "&.Mui-focused fieldset": {
                                    borderColor: "blue",
                                },
                            },
                        }}
                    />
                    <TextField
                        label="Phường/Xã"
                        value={addressFields.ward}
                        onChange={(e) => handleFieldChange("ward", e.target.value)}
                        fullWidth
                        sx={{
                            mb: 2,
                            backgroundColor: "white",
                            borderRadius: 1,
                            "& .MuiInputLabel-root": {
                                color: "black",
                            },
                            "& .MuiOutlinedInput-root": {
                                "& input": {
                                    paddingY: "20px",
                                },
                                "&.Mui-focused fieldset": {
                                    borderColor: "blue",
                                },
                            },
                        }}
                    />
                    <TextField
                        label="Quận/Huyện"
                        value={addressFields.district}
                        onChange={(e) => handleFieldChange("district", e.target.value)}
                        fullWidth
                        sx={{
                            mb: 2,
                            backgroundColor: "white",
                            borderRadius: 1,
                            "& .MuiInputLabel-root": {
                                color: "black",
                            },
                            "& .MuiOutlinedInput-root": {
                                "& input": {
                                    paddingY: "20px",
                                },
                                "&.Mui-focused fieldset": {
                                    borderColor: "blue",
                                },
                            },
                        }}
                    />
                    <TextField
                        label="Tỉnh/Thành phố"
                        value={addressFields.city}
                        onChange={(e) => handleFieldChange("city", e.target.value)}
                        fullWidth
                        sx={{
                            mb: 2,
                            backgroundColor: "white",
                            borderRadius: 1,
                            "& .MuiInputLabel-root": {
                                color: "black",
                            },
                            "& .MuiOutlinedInput-root": {
                                "& input": {
                                    paddingY: "20px",
                                },
                                "&.Mui-focused fieldset": {
                                    borderColor: "blue",
                                },
                            },
                        }}
                    />
                    <Button
                        variant="outlined"
                        onClick={() => setMapVisible(!mapVisible)}
                        fullWidth
                        sx={{
                            mb: 2,
                            textTransform: "none",
                            borderRadius: "8px",
                            fontWeight: "bold",
                        }}
                    >
                        {mapVisible ? "Ẩn bản đồ" : "Mở bản đồ để chọn địa chỉ"}
                    </Button>
                    {mapVisible && (
                        <AddressMap
                            initialPosition={center}
                            onAddressChange={handleAddressChange}
                        />
                    )}
                    <Box sx={{ mt: 3, display: "flex", justifyContent: "space-between", gap: 2 }}>
                        <Button
                            onClick={handleClose}
                            variant="outlined"
                            sx={{
                                textTransform: "none",
                                borderRadius: "8px",
                                fontWeight: "bold",
                            }}
                        >
                            Hủy
                        </Button>
                        <Button
                            type="submit"
                            variant="contained"
                            sx={{
                                textTransform: "none",
                                borderRadius: "8px",
                                fontWeight: "bold",
                                backgroundColor: "#3f51b5",
                                ":hover": { backgroundColor: "#303f9f" },
                            }}
                        >
                            Lưu
                        </Button>
                    </Box>
                </Box>
            </Box>
        </Modal>
    );
};

export default EditAddressModal;