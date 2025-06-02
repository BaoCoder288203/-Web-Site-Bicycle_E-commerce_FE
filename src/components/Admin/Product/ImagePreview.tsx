import React from 'react';
import { Grid, Typography, Box } from '@mui/material';
import Gallery from 'react-photo-gallery';
import { GalleryPhoto } from '@/pages/Admin/Product';

interface ImagePreviewProps {
    photos: GalleryPhoto[];
    colors: string[];
    images: { [color: string]: string[] };
    quantities: { [color: string]: number };
    renderImage: ({ index, photo }: { index: number; photo: GalleryPhoto }) => JSX.Element;
}

const ImagePreview: React.FC<ImagePreviewProps> = ({ photos, colors, images, quantities, renderImage }) => {
    return (
        <Grid item xs={12}>
            {photos.length > 0 && (
                <Box sx={{ mt: 2 }}>
                    <Typography variant="subtitle1">Preview ảnh:</Typography>
                    {colors.map((color) => (
                        (images[color]?.length > 0) && (
                            <Box key={color} sx={{ mb: 2 }}>
                                <Typography variant="subtitle2">
                                    {color} (Số lượng: {quantities[color] || 0})
                                </Typography>
                                <Gallery
                                    photos={photos.filter((photo) => photo.color === color)}
                                    renderImage={renderImage}
                                    targetRowHeight={100}
                                />
                            </Box>
                        )
                    ))}
                </Box>
            )}
        </Grid>
    );
};

export default ImagePreview;