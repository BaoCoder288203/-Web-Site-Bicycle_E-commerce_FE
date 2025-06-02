import React from 'react';
import { Grid, Box, Button, Typography, Chip } from '@mui/material';
import { Specification } from '@/pages/Admin/Product';

interface SpecificationManagerProps {
    specifications: Specification[];
    handleDeleteSpec: (spec: Specification) => void;
    setOpenSpecDialog: (open: boolean) => void;
}

const SpecificationManager: React.FC<SpecificationManagerProps> = ({
    specifications,
    handleDeleteSpec,
    setOpenSpecDialog,
}) => {
    return (
        <Grid item xs={12}>
            <Box className="flex flex-col gap-4">
                <Button
                    variant="outlined"
                    onClick={() => setOpenSpecDialog(true)}
                    className="w-fit"
                    sx={{
                        backgroundColor: 'white',
                        fontSize: '16px',
                        '&:hover': {
                            backgroundColor: '#0068FF',
                            color: 'white',
                        },
                    }}
                >
                    Thêm thông số kỹ thuật
                </Button>
                {specifications.length > 0 && (
                    <Box className="mt-2">
                        <Typography variant="subtitle1">Thông số kỹ thuật:</Typography>
                        <Box className="flex flex-wrap gap-2">
                            {specifications.map((spec, index) => (
                                <Chip
                                    key={index}
                                    label={`${spec.key}: ${spec.value}`}
                                    onDelete={() => handleDeleteSpec(spec)}
                                    color="default"
                                    sx={{ marginRight: 1 }}
                                />
                            ))}
                        </Box>
                    </Box>
                )}
            </Box>
        </Grid>
    );
};

export default SpecificationManager;