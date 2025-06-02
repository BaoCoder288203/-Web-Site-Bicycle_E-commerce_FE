import React from 'react';
import { Box, Typography, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';

interface Specification {
  specificationId: string;
  productId: string;
  key: string;
  value: string;
}

interface Props {
  specifications: Specification[];
}

const SpecificationPaper = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(3),
    borderRadius: theme.spacing(1),
    backgroundColor: '#fff',
}));

const SpecificationRow = styled(Box)(({ theme }) => ({
    display: 'flex',
    borderBottom: '1px solid #eee',
    padding: theme.spacing(2, 0),
    '&:last-child': {
        borderBottom: 'none',
    },
}));

const SpecificationLabel = styled(Typography)(({ theme }) => ({
    flex: '0 0 200px',
    fontWeight: 700,
    color: '#000',
    paddingRight: theme.spacing(3),
}));

const SpecificationValue = styled(Typography)({
    flex: 1,
    color: '#666',
});

// const specifications: Specification[] = [
//     { label: 'Brakes', value: 'Shimano Ultegra BR-R8000, 2-piston hydraulic Brake Caliper, Shimano 170 (BR-R7000, SRAM Force 22 Brake Calipers, Pad Components Non-Resin, Shimano Deore XT M8000, Input Tech 3 EA, BP Sync-C (Mechanical Disc))' },
//     { label: 'Fork', value: 'Fox Grade: UHC Performance carbon fiber with aluminum steerer tube' },
//     { label: 'Colors', value: 'Green & Black' },
//     { label: 'Rear', value: 'Tyre Maxxis Refuse, 700x40 mm,' },
//     { label: 'Cassete', value: 'Shimano Ultegra BR-R8000' },
//     { label: 'Crankset', value: 'Shimano 105 BR-R7000,' },
//     { label: 'Wheel', value: 'Size 24' },
//     { label: 'Wheelset', value: 'Deore WheelBTR A1, Tubeless ready, Center Lock, 12x100/12x142 mm' },
//     { label: 'Handlebars', value: 'Deore DBR-A2 (204 31.8 mm, 440 mm' },
//     { label: 'Model', value: 'Year 2024' },
//     { label: 'Frame', value: 'Year 2024' },
//     { label: 'Saddle', value: 'Selle Royal Essenza Gel' },
//     { label: 'Shifter', value: 'Shimano GRX, ST-R4000' },
// ];

const SpecificationsComponent: React.FC<Props> = ({ specifications }) => {
    const formatKey = (key: string) => {
        return key.replace(/_/g, ' ').replace(/\b\w/g, char => char.toUpperCase());
    };

    return (
        <Box sx={{ p: 2, maxWidth: '1200px', margin: '0 auto' }}>
            <SpecificationPaper elevation={0}>
                {specifications.map((spec, index) => (
                    <SpecificationRow key={spec.specificationId}>
                        <SpecificationLabel variant="body2">
                            {formatKey(spec.key)}
                        </SpecificationLabel>
                        <SpecificationValue variant="body2">
                            {spec.value}
                        </SpecificationValue>
                    </SpecificationRow>
                ))}
            </SpecificationPaper>
        </Box>
    );
};

export default SpecificationsComponent;