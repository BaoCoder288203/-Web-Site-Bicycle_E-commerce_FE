import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button } from '@mui/material';
import { Specification } from '@/pages/Admin/Product';

interface SpecificationDialogProps {
    open: boolean;
    newSpec: Specification;
    handleSpecChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleAddSpec: () => void;
    handleClose: () => void;
}

const SpecificationDialog: React.FC<SpecificationDialogProps> = ({
    open,
    newSpec,
    handleSpecChange,
    handleAddSpec,
    handleClose,
}) => {
    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Thêm thông số kỹ thuật</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    label="Tên thông số"
                    name="key"
                    fullWidth
                    value={newSpec.key}
                    onChange={handleSpecChange}
                    variant="outlined"
                    sx={{
                        "& .MuiOutlinedInput-root": {
                            "& input": {
                                paddingY: "26px",
                            },
                        },
                    }}
                />
                <TextField
                    margin="dense"
                    label="Giá trị"
                    name="value"
                    fullWidth
                    value={newSpec.value}
                    onChange={handleSpecChange}
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
                <Button onClick={handleAddSpec} disabled={!newSpec.key || !newSpec.value}>
                    Thêm
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default SpecificationDialog;