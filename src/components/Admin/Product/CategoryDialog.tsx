import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button } from '@mui/material';

interface CategoryDialogProps {
    open: boolean;
    newCategory: string;
    setNewCategory: (value: string) => void;
    handleAddCategory: () => void;
    handleClose: () => void;
}

const CategoryDialog: React.FC<CategoryDialogProps> = ({
    open,
    newCategory,
    setNewCategory,
    handleAddCategory,
    handleClose,
}) => {
    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Thêm danh mục mới</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    label="Tên danh mục"
                    fullWidth
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    variant="outlined"
                    sx={{
                        "& .MuiOutlinedInput-root": {
                            "& input": {
                                paddingY: "26px",
                            },
                        },
                    }}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Hủy</Button>
                <Button onClick={handleAddCategory} disabled={!newCategory}>
                    Thêm
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default CategoryDialog;