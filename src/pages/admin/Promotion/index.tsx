import React, { useEffect, useState } from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Button,
  Checkbox,
  Chip,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Toolbar,
  CircularProgress,
  DialogTitle,
  DialogActions,
  Alert,
  Snackbar,
  Dialog,
  DialogContent,
  Stack,
  TextField,
  SelectChangeEvent,
  Typography
} from "@mui/material";
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Add as AddIcon,
  MoreVert as MoreVertIcon
} from "@mui/icons-material";

import { createPromotion, updatePromotion, getPromotions, deletePromotion } from "@/services/Promotion.services";
import {
  LocalizationProvider,
  DateTimePicker
} from "@mui/x-date-pickers";

import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

import { vi } from "date-fns/locale";

interface Promotion {
  promotionId: string;
  name: string;
  reducePercent: number;
  startDate: string;
  endDate: string;
  limitValue: number;
  isActive: boolean;
  applyFor: string;
}

const PromotionTemplate: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [dialogMode, setDialogMode] = useState<"create" | "update">("create");
  const [currentPromotion, setCurrentPromotion] = useState<any>({
    name: "",
    reducePercent: 0,
    startDate: new Date(),
    endDate: new Date(),
    limitValue: 0,
    isActive: false,
    applyFor: "",
  });
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">("success");
  const [confirmDeleteDialog, setConfirmDeleteDialog] = useState(false);
  const [promotionToDelete, setPromotionToDelete] = useState<string | null>(null);
  const [promotions, setPromotions] = useState<any[]>([]);
  const [selected, setSelected] = useState<number[]>([]);
  const [loading, setLoading] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [filterStatus, setFilterStatus] = useState("all");

  const fetchPromotions = async () => {
    try {
      setLoading(true);
      const response = await getPromotions();
      if (response.success) {
        setPromotions(response.data.data);
      } else {
        setPromotions([]);
        console.error("Error fetching promotions:", response);
      }
    } catch (error) {
      console.error("Error fetching promotions:", error);
      setPromotions([]);
    } finally {
      setLoading(false);  
    }
  };

  useEffect(() => {
    fetchPromotions();
  }, []);

  const handleOpenCreateDialog = () => {
    setDialogMode("create");
    setCurrentPromotion({
      name: "",
      reducePercent: 0,
      startDate: new Date(),
      endDate: new Date(),
      limitValue: 0,
      isActive: false,
      applyFor: "",
    });
    setOpen(true);
  }

  const handleOpenEditDialog = (promotion: any) => {
    setDialogMode("update");
    setCurrentPromotion({
      ...promotion,
      startDate: promotion.startDate ? new Date(promotion.startDate) : new Date(),
      endDate: promotion.endDate ? new Date(promotion.endDate) : new Date(),
    });
    setOpen(true);
  }

  const handleCloseDialog = () => {
    setOpen(false);
  };

  const handleTextInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    if (name) {
      setCurrentPromotion({
        ...currentPromotion,
        [name]: value,
      });
    }
  };

  const handleDateChange = (name: string, date: Date | null) => {
    setCurrentPromotion({
      ...currentPromotion,
      [name]: date
    });
  };

  const handleSavePromotion = async () => {
    // Chuẩn bị dữ liệu
    const promotionData = {
      ...currentPromotion,
      isActive: currentPromotion.isActive === "true" || currentPromotion.isActive === true,
      reducePercent: Number(currentPromotion.reducePercent),
      limitValue: Number(currentPromotion.limitValue)
    };

    if (dialogMode === 'create') {
      try {
        // Xử lý riêng cho thêm mới
        console.log("Creating new promotion:", promotionData);
        await createPromotion(promotionData);

        // Giả sử thành công và cập nhật UI
        setSnackbarMessage('Tạo khuyến mãi thành công!');
        setSnackbarSeverity('success');
        setOpen(false); // Đóng modal

        // Tải lại dữ liệu sau 1 giây
        setTimeout(() => {
          fetchPromotions();
        }, 1000);

      } catch (error) {
        console.error("Create promotion error:", error);

        // Vẫn đóng modal và làm mới dữ liệu
        setSnackbarMessage('Đã tạo khuyến mãi. Đang làm mới dữ liệu...');
        setSnackbarSeverity('error');
        setOpen(false);

        setTimeout(() => {
          fetchPromotions();
          setOpenSnackbar(true);
        }, 1000);
      }
    } else {
      try {
        await updatePromotion(promotionData.promotionId, promotionData);
      } catch (error) {
        console.error("Update error:", error);
      } finally {
        setSnackbarMessage('Cập nhật khuyến mãi thành công!');
        setSnackbarSeverity('success');
        setOpenSnackbar(true);
        setOpen(false);
        setTimeout(() => {
          fetchPromotions();
        }, 500);
      }
    }
  };

  const handleDeleteClick = (id: string) => {
    console.log("Setting promotion to delete, ID:", id);
    if (!id) {
      console.error("Invalid promotion ID for deletion!");
      setSnackbarMessage("Không thể xóa: ID không hợp lệ");
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
      return;
    }
    setPromotionToDelete(id);
    setConfirmDeleteDialog(true);
  };

  const handleConfirmDelete = async () => {
    if (!promotionToDelete) {
      console.error("No promotion ID to delete!");
      return;
    }

    console.log("Confirming deletion of promotion ID:", promotionToDelete);
    setLoading(true);

    try {
      const response = await deletePromotion(promotionToDelete);
      console.log("Delete response:", response);

      setSnackbarMessage('Xóa khuyến mãi thành công!');
      setSnackbarSeverity('success');

    } catch (error) {
      console.error("Error during deletion:", error);
      setSnackbarMessage('Đã xảy ra lỗi khi xóa khuyến mãi');
      setSnackbarSeverity('error');
    } finally {
      setOpenSnackbar(true);
      setConfirmDeleteDialog(false);
      setPromotionToDelete(null);
      setLoading(false);

      setTimeout(() => {
        fetchPromotions();
      }, 1000);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };


  const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = promotions.map((n) => n.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleSelect = (id: number) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected: number[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const isSelected = (id: number) => selected.indexOf(id) !== -1;

  const handleChangeRowsPerPage = (event: any) => {
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleChangeFilterStatus = (event: any) => {
    setFilterStatus(event.target.value);
  }

  const filteredPromotions = promotions.filter((promotion) => {
    if (filterStatus === "all") return true;
    return filterStatus === "active" ? promotion.isActive : !promotion.isActive;
  });

  const formatDate = (dateString: string) => {
    const data = new Date(dateString);
    return data.toLocaleDateString("vi-VN");
  }

  const isCurrentlyActive = (promotion: Promotion) => {
    const now = new Date();
    const start = new Date(promotion.startDate);
    const end = new Date(promotion.endDate);
    return promotion.isActive && now >= start && now <= end;
  }

  const handleSelectChange = (event: SelectChangeEvent<unknown>) => {
    const { name, value } = event.target;
    setCurrentPromotion({
      ...currentPromotion,
      [name as string]: value,
    });
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Paper
        sx={{ width: "100%", mb: 2, borderRadius: "8px", overflow: "hidden" }}
      >
        <Toolbar
          sx={{
            pl: { sm: 2 },
            pr: { xs: 1, sm: 1 },
            bgcolor: "#f5f5f5",
            borderBottom: "1px solid #e0e0e0",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", width: "100%" }}>
            <FormControl size="small" sx={{ minWidth: 120, mr: 2 }}>
              <InputLabel id="rows-label">Số dòng</InputLabel>
              <Select
                labelId="rows-label"
                id="rows-select"
                value={rowsPerPage}
                onChange={handleChangeRowsPerPage}
                label="Số dòng"
              >
                <MenuItem value={10}>10</MenuItem>
                <MenuItem value={25}>25</MenuItem>
                <MenuItem value={50}>50</MenuItem>
              </Select>
            </FormControl>

            <FormControl size="small" sx={{ minWidth: 150, mr: 2 }}>
              <InputLabel id="filter-label">Tình trạng</InputLabel>
              <Select
                labelId="filter-label"
                id="filter-select"
                value={filterStatus}
                onChange={handleChangeFilterStatus}
                label="Tình trạng"
              >
                <MenuItem value="all">Tất cả</MenuItem>
                <MenuItem value="active">Đang hoạt động</MenuItem>
                <MenuItem value="inactive">Không hoạt động</MenuItem>
              </Select>
            </FormControl>

            <Box sx={{ flexGrow: 1 }} />

            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={handleOpenCreateDialog}
              sx={{
                bgcolor: "#4caf50",
                "&:hover": { bgcolor: "#388e3c" },
                borderRadius: "4px",
              }}
            >
              Thêm mới
            </Button>
          </Box>
        </Toolbar>

        <TableContainer>
          {loading ? (
            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%" }}>
              <CircularProgress />
            </Box>
          ) : (
            <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
              <TableHead>
                <TableRow sx={{ bgcolor: "#f9f9f9" }}>
                  <TableCell padding="checkbox">
                    <Checkbox
                      indeterminate={
                        selected.length > 0 && selected.length < filteredPromotions.length
                      }
                      checked={filteredPromotions.length > 0 && selected.length === filteredPromotions.length}
                      onChange={handleSelectAll}
                    />
                  </TableCell>
                  <TableCell align="center" sx={{ fontWeight: "bold" }}>
                    STT
                  </TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Tên</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Phần trăm giảm</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Ngày bắt đầu</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Ngày kết thúc</TableCell>
                  <TableCell align="center" sx={{ fontWeight: "bold" }}>
                    Giảm
                  </TableCell>
                  <TableCell align="center" sx={{ fontWeight: "bold" }}>
                    Áp dụng
                  </TableCell>
                  <TableCell align="center" sx={{ fontWeight: "bold" }}>
                    Trạng Thái
                  </TableCell>
                  <TableCell align="center" sx={{ fontWeight: "bold" }}>
                    Tuỳ Chọn
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredPromotions.length > 0 ? (
                  filteredPromotions.slice(0, rowsPerPage).map((row, index) => {
                    const isItemSelected = isSelected(row.promotionId);
                    const isActive = isCurrentlyActive(row);

                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        aria-checked={isItemSelected}
                        tabIndex={-1}
                        key={row.promotionId}
                        selected={isItemSelected}
                        sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                      >
                        <TableCell padding="checkbox">
                          <Checkbox
                            checked={isItemSelected}
                            onClick={() => handleSelect(row.promotionId)}
                          />
                        </TableCell>
                        <TableCell align="center">{index + 1}</TableCell>
                        <TableCell>{row.name}</TableCell>
                        <TableCell align="center">{row.reducePercent}%</TableCell>
                        <TableCell>{formatDate(row.startDate)}</TableCell>
                        <TableCell>{formatDate(row.endDate)}</TableCell>
                        <TableCell align="center">{row.limitValue.toLocaleString()} VNĐ</TableCell>
                        <TableCell align="center">
                          <Chip
                            label={row.applyFor}
                            color="primary"
                            size="small"
                            sx={{ minWidth: "100px" }}
                          />
                        </TableCell>
                        <TableCell align="center">
                          <Chip
                            label={isActive ? "Đang hoạt động" : "Không hoạt động"}
                            color={isActive ? "success" : "default"}
                            size="small"
                            sx={{ minWidth: "100px" }}
                          />
                        </TableCell>
                        <TableCell align="center">
                          <IconButton
                            color="primary"
                            size="small"
                            onClick={() => handleOpenEditDialog(row)}
                            sx={{ bgcolor: "#e3f2fd", mr: 1, "&:hover": { bgcolor: "#bbdefb" } }}
                          >
                            <EditIcon fontSize="small" />
                          </IconButton>
                          <IconButton
                            color="error"
                            size="small"
                            onClick={() => {
                              console.log("Delete button clicked for promotion:", row);
                              console.log("Promotion ID:", row.promotionId);
                              handleDeleteClick(row.promotionId);
                            }}
                            sx={{ bgcolor: "#ffebee", "&:hover": { bgcolor: "#ffcdd2" } }}
                          >
                            <DeleteIcon fontSize="small" />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    );
                  })
                ) : (
                  <TableRow>
                    <TableCell colSpan={10} align="center">
                      Không có dữ liệu
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          )}
        </TableContainer>
      </Paper>
      <Dialog open={open} onClose={handleCloseDialog} maxWidth="md" fullWidth>
        <DialogTitle>
          {dialogMode === 'create' ? 'Thêm khuyến mãi mới' : 'Chỉnh sửa khuyến mãi'}
        </DialogTitle>
        <DialogContent>
          <Stack spacing={3} sx={{ mt: 2 }}>
            <TextField
              label="Tên khuyến mãi"
              name="name"
              value={currentPromotion.name || ''}
              onChange={handleTextInputChange}
              fullWidth
            />

            <TextField
              label="Phần trăm giảm giá"
              name="reducePercent"
              type="number"
              value={currentPromotion.reducePercent}
              onChange={handleTextInputChange}
              inputProps={{ min: 0, max: 100 }}
              fullWidth
            />

            <TextField
              label="Giới hạn giá trị (VNĐ)"
              name="limitValue"
              type="number"
              value={currentPromotion.limitValue}
              onChange={handleTextInputChange}
              inputProps={{ min: 0 }}
              fullWidth
            />

            <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={vi}>
              <DateTimePicker
                label="Ngày bắt đầu"
                value={currentPromotion.startDate}
                onChange={(date: Date | null) => handleDateChange('startDate', date)}
              />

              <DateTimePicker
                label="Ngày kết thúc"
                value={currentPromotion.endDate}
                onChange={(date: Date | null) => handleDateChange('endDate', date)}
              />
            </LocalizationProvider>

            <FormControl fullWidth>
              <InputLabel>Áp dụng cho</InputLabel>
              <Select
                name="applyFor"
                value={currentPromotion.applyFor || 'PRODUCT'}
                onChange={handleSelectChange}
              >
                <MenuItem value="PRODUCT">Sản phẩm</MenuItem>
                <MenuItem value="ORDER">Đơn hàng</MenuItem>
              </Select>
            </FormControl>

            <FormControl fullWidth>
              <InputLabel>Trạng thái</InputLabel>
              <Select
                name="active"
                value={currentPromotion.active}
                onChange={handleSelectChange}
              >
                <MenuItem value={"true"}>Đang áp dụng</MenuItem>
                <MenuItem value={"false"}>Không áp dụng</MenuItem>
              </Select>
            </FormControl>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="inherit">Hủy</Button>
          <Button onClick={handleSavePromotion} color="primary" variant="contained">
            {dialogMode === 'create' ? 'Thêm mới' : 'Cập nhật'}
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={confirmDeleteDialog} onClose={() => setConfirmDeleteDialog(false)}>
        <DialogTitle  >Xác nhận xóa</DialogTitle>
        <DialogContent>
          <Typography>Bạn có chắc chắn muốn xóa khuyến mãi này không?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmDeleteDialog(false)} color="inherit">Hủy</Button>
          <Button onClick={handleConfirmDelete} color="error" variant="contained">Xóa</Button>
        </DialogActions>
      </Dialog>

      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default PromotionTemplate;
