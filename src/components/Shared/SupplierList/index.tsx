import React, { useState } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, TextField, Pagination, Box, InputAdornment, IconButton,
  Select, MenuItem, FormControl, InputLabel, Button,
  Dialog, DialogTitle, DialogContent, DialogActions, DialogContentText
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddressMap from "../AddressMap";
import useSupplier from '@/hook/api/useSupplier';

interface AddressType {
  fullAddress: string;
  city: string;
  district: string;
  street: string;
  ward: string;
  country: string;
}

interface SupplierType {
  supplierId: string;
  name: string;
  email: string;
  phone: string;
  description: string;
  address: AddressType;
}

const SupplierList: React.FC = () => {
  const [page, setPage] = useState<number>(1);
  const {
    suppliers,
    totalPages,
    loading,
    fetchSuppliers,
    searchSupplier,
    create,
    update,
    remove
  } = useSupplier(page);
  const [searchType, setSearchType] = useState<'supplierId' | 'email'>('supplierId');
  const [searchInput, setSearchInput] = useState<string>('');
  const [openModal, setOpenModal] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [selectedSupplier, setSelectedSupplier] = useState<SupplierType | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    description: '',
    address: {
      fullAddress: '',
      city: '',
      district: '',
      street: '',
      ward: '',
      country: 'Viet Nam'
    }
  });

  const center = [10.7769, 106.7009]; // Tọa độ trung tâm TP.HCM

  const [addressFields, setAddressFields] = useState({
    fullAddress: "",
    street: "",
    ward: "",
    district: "",
    city: "",
    country: "Viet Nam",
  });
  const [mapVisible, setMapVisible] = useState(false);

  // Cập nhật các trường địa chỉ từ AddressMap
  const handleAddressChange = (addressData: any) => {
    if (addressData) {
      setFormData(prev => ({
        ...prev,
        address: {
          ...prev.address,
          ...addressData,
          country: 'Viet Nam'
        }
      }));
    }
  };

  // Xử lý cập nhật các trường địa chỉ
  const handleFieldChange = (field: string, value: string) => {
    setAddressFields((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleCreate = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      description: '',
      address: {
        fullAddress: '',
        city: '',
        district: '',
        street: '',
        ward: '',
        country: 'Viet Nam'
      }
    });
    setIsEditing(false);
    setOpenModal(true);
  };

  const handleEdit = (supplier: SupplierType) => {
    setFormData({
      name: supplier.name,
      email: supplier.email,
      phone: supplier.phone,
      description: supplier.description,
      address: { ...supplier.address }
    });
    setSelectedSupplier(supplier);
    setIsEditing(true);
    setOpenModal(true);
  };

  const handleDelete = (supplier: SupplierType) => {
    setSelectedSupplier(supplier);
    setOpenDeleteDialog(true);
  };

  const handleSearch = async () => {
    if (searchInput.trim() === '') {
      fetchSuppliers();
    } else {
      await searchSupplier(searchType, searchInput.trim());
    }
  };

  const handleSubmit = async () => {
    if (isEditing && selectedSupplier) {
      await update(selectedSupplier.supplierId, formData);
    } else {
      await create(formData);
    }
    fetchSuppliers();
    setOpenModal(false);
  };

  const handleDeleteConfirm = async () => {
    if (selectedSupplier) {
      await remove(selectedSupplier.supplierId);
      fetchSuppliers();
    }
    setOpenDeleteDialog(false);
  };

  return (
    <Box sx={{ p: 2 }}>
      {/* Search và Create */}
      <Box sx={{ display: 'flex', gap: 1, mb: 2, alignItems: 'center' }}>
        <FormControl sx={{ width: 200 }}>
          <InputLabel>Tìm kiếm theo</InputLabel>
          <Select
            value={searchType}
            label="Tìm kiếm theo"
            onChange={(e) => setSearchType(e.target.value as any)}
          >
            <MenuItem value="supplierId">Supplier ID</MenuItem>
            <MenuItem value="email">Email</MenuItem>
          </Select>
        </FormControl>

        <TextField
          label={`Nhập ${searchType === 'supplierId' ? 'Supplier ID' : 'Email'}`}
          variant="outlined"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          sx={{ flexGrow: 1, '& .MuiInputBase-root': { height: 56 } }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handleSearch}>
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleCreate}
          sx={{ height: 56 }}
        >
          Create
        </Button>
      </Box>

      {/* Bảng hiển thị */}
      <TableContainer component={Paper} sx={{ mb: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold' }}>STT</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Supplier ID</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Name</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Email</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Phone</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Description</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Address</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {suppliers.map((supplier, index) => (
              <TableRow key={supplier.supplierId}>
                <TableCell>{(page - 1) * 10 + index + 1}</TableCell>
                <TableCell>{supplier.supplierId}</TableCell>
                <TableCell>{supplier.name}</TableCell>
                <TableCell>{supplier.email}</TableCell>
                <TableCell>{supplier.phone}</TableCell>
                <TableCell>{supplier.description}</TableCell>
                {/* <TableCell>
                  {`${supplier.address.street}, ${supplier.address.ward}, ${supplier.address.district}, ${supplier.address.city}`}
                </TableCell> */}
                <TableCell>{supplier.address.fullAddress}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleEdit(supplier)}>
                    <EditIcon color="primary" />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(supplier)}>
                    <DeleteIcon color="error" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Phân trang */}
      {totalPages > 1 && (<Pagination
        count={totalPages}
        page={page}
        onChange={(_, newPage) => setPage(newPage)}
        sx={{ display: 'flex', justifyContent: 'center' }}
      />)}

      {/* Modal tạo/cập nhật */}
      <Dialog open={openModal} onClose={() => setOpenModal(false)}>
        <DialogTitle>{isEditing ? 'Update Supplier' : 'Create New Supplier'}</DialogTitle>
        <DialogContent>
          <TextField
            sx={{ flexGrow: 1, '& .MuiInputBase-root': { height: 56 } }}
            margin="dense"
            label="Name"
            fullWidth
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
          <TextField
            sx={{ flexGrow: 1, '& .MuiInputBase-root': { height: 56 } }}
            margin="dense"
            label="Email"
            fullWidth
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
          <TextField
            sx={{ flexGrow: 1, '& .MuiInputBase-root': { height: 56 } }}
            margin="dense"
            label="Phone"
            fullWidth
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          />
          <TextField
            sx={{ flexGrow: 1, '& .MuiInputBase-root': { height: 56 } }}
            margin="dense"
            label="Description"
            fullWidth
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          />

          {/* map */}
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

          <TextField
            sx={{ flexGrow: 1, '& .MuiInputBase-root': { height: 56 } }}
            margin="dense"
            label="fullAddress"
            fullWidth
            disabled
            value={formData.address.fullAddress}
            onChange={(e) => setFormData(prev => ({
              ...prev,
              address: { ...prev.address, fullAddress: e.target.value }
            }))}
          />
          <TextField
            sx={{ flexGrow: 1, '& .MuiInputBase-root': { height: 56 } }}
            margin="dense"
            label="Street"
            fullWidth
            value={formData.address.street}
            onChange={(e) => setFormData(prev => ({
              ...prev,
              address: { ...prev.address, street: e.target.value }
            }))}
          />
          <TextField
            sx={{ flexGrow: 1, '& .MuiInputBase-root': { height: 56 } }}
            margin="dense"
            label="Ward"
            fullWidth
            value={formData.address.ward}
            onChange={(e) => setFormData(prev => ({
              ...prev,
              address: { ...prev.address, ward: e.target.value }
            }))}
          />
          <TextField
            sx={{ flexGrow: 1, '& .MuiInputBase-root': { height: 56 } }}
            margin="dense"
            label="District"
            fullWidth
            value={formData.address.district}
            onChange={(e) => setFormData(prev => ({
              ...prev,
              address: { ...prev.address, district: e.target.value }
            }))}
          />
          <TextField
            sx={{ flexGrow: 1, '& .MuiInputBase-root': { height: 56 } }}
            margin="dense"
            label="City"
            fullWidth
            value={formData.address.city}
            onChange={(e) => setFormData(prev => ({
              ...prev,
              address: { ...prev.address, city: e.target.value }
            }))}
          />
        <TextField
          sx={{ flexGrow: 1, '& .MuiInputBase-root': { height: 56 } }}
          margin="dense"
          label="Country"
          fullWidth
          value={formData.address.country}
          disabled
        />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenModal(false)}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained">
            Save
          </Button>
        </DialogActions>
      </Dialog>

      {/* Dialog xác nhận xóa */}
      <Dialog open={openDeleteDialog} onClose={() => setOpenDeleteDialog(false)}>
        <DialogTitle>Confirm deleting</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Delete supplier {selectedSupplier?.name}?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDeleteDialog(false)}>cancel</Button>
          <Button onClick={handleDeleteConfirm} color="error" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default SupplierList;