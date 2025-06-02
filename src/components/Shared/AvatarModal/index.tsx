import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import EditIcon from "@mui/icons-material/Edit";

// CSS tùy chỉnh cho Modal
const modalStyle: React.CSSProperties = {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
};

const modalContentStyle: React.CSSProperties = {
    backgroundColor: "white",
    borderRadius: "8px",
    padding: "16px",
    textAlign: "center",
    maxWidth: "90vw",
    maxHeight: "90vh",
    overflow: "auto",
};

const modalImageStyle: React.CSSProperties = {
    maxWidth: "100%",
    maxHeight: "70vh",
    borderRadius: "8px",
};

const modalButtonContainerStyle: React.CSSProperties = {
    marginTop: "16px",
    display: "flex",
    justifyContent: "center",
    gap: "8px",
};

interface AvatarModalProps {
    open: boolean;
    onClose: () => void;
    avatarSrc: string;
    onEdit: () => void;
    loading: boolean;
}

const AvatarModal: React.FC<AvatarModalProps> = ({ open, onClose, avatarSrc, onEdit, loading }) => {
    if (!open) return null;

    return (
        <div style={modalStyle} onClick={onClose}>
            <div style={modalContentStyle} onClick={(e) => e.stopPropagation()}>
                <Box sx={{ position: "relative" }}>
                    <img
                        src={avatarSrc}
                        alt="Avatar"
                        style={modalImageStyle}
                    />
                    {loading && (
                        <Box
                            sx={{
                                position: "absolute",
                                top: 0,
                                left: 0,
                                width: "100%",
                                height: "100%",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                backgroundColor: "rgba(0, 0, 0, 0.5)",
                                borderRadius: "8px",
                            }}
                        >
                            <CircularProgress color="inherit" />
                        </Box>
                    )}
                </Box>
                <Box sx={modalButtonContainerStyle}>
                    <Button
                        variant="contained"
                        startIcon={<EditIcon />}
                        onClick={onEdit}
                        sx={{ mr: 1 }}
                        disabled={loading}
                    >
                        {loading ? "Đang tải..." : "Sửa ảnh"}
                    </Button>
                    <Button
                        variant="outlined"
                        onClick={onClose}
                        disabled={loading}
                    >
                        Đóng
                    </Button>
                </Box>
            </div>
        </div>
    );
};

export default AvatarModal;