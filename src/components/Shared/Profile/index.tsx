import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import EditIcon from "@mui/icons-material/Edit";

const UserProfile = () => {
  return (
    <Box
      alignItems={"center"}
      sx={{
        p: 2,
        backgroundColor: "white",
        borderRadius: 2
      }}
    >
      <Box>
        <Avatar
          src="/profile.jpg"
          sx={{ width: 120, height: 120, margin: "auto", mb: 1 }}
        />
        <Button size="small" color="primary">
          Sửa ảnh
        </Button>
      </Box>
      <Box
        component="form"
        sx={{ mt: 2, backgroundColor: "gray", p: 2, borderRadius: 2 }}
      >
        <TextField
          fullWidth
          id="hoTen"
          label="Họ tên"
          variant="outlined"
          margin="normal"
          sx={{
            backgroundColor: "white",
            borderRadius: 1,
            "& .MuiInputLabel-root": { color: "black" },
            "& .MuiOutlinedInput-root": {
              "&.Mui-focused fieldset": { borderColor: "blue" },
            },
          }}
        />
        <TextField
          fullWidth
          id="gioiTinh"
          label="Giới tính"
          variant="outlined"
          margin="normal"
          sx={{
            backgroundColor: "white",
            borderRadius: 1,
            "& .MuiInputLabel-root": { color: "black" },
            "& .MuiOutlinedInput-root": {
              "&.Mui-focused fieldset": { borderColor: "blue" },
            },
          }}
        />
        <TextField
          fullWidth
          id="ngaySinh"
          label="Ngày sinh"
          variant="outlined"
          margin="normal"
          sx={{
            backgroundColor: "white",
            borderRadius: 1,
            "& .MuiInputLabel-root": { color: "black" },
            "& .MuiOutlinedInput-root": {
              "&.Mui-focused fieldset": { borderColor: "blue" },
            },
          }}
        />
        <TextField
          fullWidth
          id="email"
          label="Email"
          variant="outlined"
          margin="normal" sx={{
            backgroundColor: "white",
            borderRadius: 1,
            "& .MuiInputLabel-root": { color: "black" },
            "& .MuiOutlinedInput-root": {
              "&.Mui-focused fieldset": { borderColor: "blue" },
            },
          }}
        />
        <TextField
          fullWidth
          id="soDienThoai"
          label="Số điện thoại"
          variant="outlined"
          margin="normal"
          sx={{
            backgroundColor: "white",
            borderRadius: 1,
            "& .MuiInputLabel-root": { color: "black" },
            "& .MuiOutlinedInput-root": {
              "&.Mui-focused fieldset": { borderColor: "blue" },
            },
          }}
        />
        <TextField
          fullWidth
          id="diaChi"
          label="Địa chỉ"
          variant="outlined"
          margin="normal"
          sx={{
            backgroundColor: "white",
            borderRadius: 1,
            "& .MuiInputLabel-root": { color: "black" },
            "& .MuiOutlinedInput-root": {
              "&.Mui-focused fieldset": { borderColor: "blue" },
            },
          }}
        />
      </Box>
      <Box sx={{ mt: 2 }}>
        <Button variant="contained" startIcon={<EditIcon />}>
          Chỉnh sửa thông tin
        </Button>
      </Box>
    </Box>
  );
};

export default UserProfile;
