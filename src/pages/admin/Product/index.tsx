import React, { useState, useCallback, useEffect, useMemo, useRef } from 'react';
import { Container, Grid, Box, IconButton, Button, CircularProgress } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ProductForm from '@/components/Admin/Product/ProductForm';
import ColorVariantManager from '@/components/Admin/Product/ColorVariantManager';
import SpecificationManager from '@/components/Admin/Product/SpecificationManager';
import CategoryDialog from '@/components/Admin/Product/CategoryDialog';
import SpecificationDialog from '@/components/Admin/Product/SpecificationDialog';
import ImageLightbox from '@/components/Admin/Product/ImageLightBox';
import ProductTable from '@/pages/admin/Product/ProductTable';
import useProduct from '@/hook/api/useProduct';
import { uploadMultipleImages } from '@/services/Upload.service';
import { createProduct, bulkCreateInventory } from '@/services/Product.service';
import { SelectChangeEvent } from '@mui/material';
import { marked } from 'marked';
import DOMPurify from 'dompurify';
import { useSnackbar } from 'notistack';

export interface Specification {
    key: string;
    value: string;
}

export interface Product {
    name: string;
    description: string; // Stores Markdown
    price: string;
    promotionId: string;
    categoryId: string;
    supplierId: string;
    colors: string[];
    images: { [color: string]: string[] };
    quantities: { [color: string]: number };
    specifications: Specification[];
}

export interface GalleryPhoto {
    src: string;
    width: number;
    height: number;
    color: string;
}

export const colorsList = ['Blue', 'Red', 'Green', 'Yellow', 'Pink', 'Purple', 'Black', 'White', 'Brown', 'Orange'];

const ProductManagement: React.FC = () => {
    const { enqueueSnackbar } = useSnackbar();
    const productRef = useRef<Product>({
        name: '',
        description: '',
        price: '',
        promotionId: '',
        categoryId: '',
        supplierId: '',
        colors: [],
        images: {},
        quantities: {},
        specifications: [],
    });

    const imageFilesRef = useRef<{ [color: string]: File[] }>({});
    const [product, setProduct] = useState<Product>(productRef.current);
    const [imageFiles, setImageFiles] = useState<{ [color: string]: File[] }>({});
    const [submitting, setSubmitting] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);
    const [dataFetched, setDataFetched] = useState<boolean>(false);

    const { handleFetchCategories, handleFetchSupplier, handleFetchPromotion, categories, suppliers, promotions, handleCreateSpecifications } = useProduct();

    useEffect(() => {
        productRef.current = product;
    }, [product]);

    useEffect(() => {
        imageFilesRef.current = imageFiles;
    }, [imageFiles]);

    useEffect(() => {
        if (dataFetched) return;
        const fetchData = async () => {
            try {
                setLoading(true);
                await Promise.all([
                    handleFetchCategories(),
                    handleFetchSupplier(),
                    handleFetchPromotion(),
                ]);
                setDataFetched(true);
            } catch (error: any) {
                console.error('Lỗi khi lấy dữ liệu:', error);
                enqueueSnackbar(`Lỗi khi lấy dữ liệu: ${error.message || 'Không xác định'}`, { variant: 'error' });
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [dataFetched]);

    const [newCategory, setNewCategory] = useState<string>('');
    const [openCategoryDialog, setOpenCategoryDialog] = useState<boolean>(false);
    const [openSpecDialog, setOpenSpecDialog] = useState<boolean>(false);
    const [openPromotionDialog, setOpenPromotionDialog] = useState<boolean>(false);
    const [newSpec, setNewSpec] = useState<Specification>({ key: '', value: '' });
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [currentImage, setCurrentImage] = useState<number>(0);

    const handleInputChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown }> | SelectChangeEvent<string>) => {
            const { name, value } = e.target;
            setProduct((prev) => {
                const updatedProduct = { ...prev, [name as string]: value };
                console.log('check product from ProductManagement:', updatedProduct);
                return updatedProduct;
            });
        },
        []
    );

    const handleColorChange = useCallback((e: SelectChangeEvent<string[]>) => {
        const selectedColors = e.target.value as string[];
        const currentProduct = productRef.current;
        const currentImageFiles = imageFilesRef.current;

        const updatedImages = { ...currentProduct.images };
        const updatedQuantities = { ...currentProduct.quantities };
        const updatedImageFiles = { ...currentImageFiles };

        Object.keys(updatedImages).forEach((color) => {
            if (!selectedColors.includes(color)) {
                updatedImages[color].forEach((img) => URL.revokeObjectURL(img));
                delete updatedImages[color];
                delete updatedQuantities[color];
                delete updatedImageFiles[color];
            }
        });

        setProduct((prev) => ({
            ...prev,
            colors: selectedColors,
            images: updatedImages,
            quantities: updatedQuantities,
        }));

        setImageFiles(updatedImageFiles);
    }, []);

    const handleImageChange = useCallback(
        (color: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
            const files = e.target.files;
            if (files) {
                const newFiles = Array.from(files);
                const newImageUrls = newFiles.map((file) => URL.createObjectURL(file));

                setProduct((prev) => ({
                    ...prev,
                    images: {
                        ...prev.images,
                        [color]: [...(prev.images[color] || []), ...newImageUrls],
                    },
                }));

                setImageFiles((prev) => ({
                    ...prev,
                    [color]: [...(prev[color] || []), ...newFiles],
                }));
            }
        },
        []
    );

    const handleQuantityChange = useCallback(
        (color: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
            const value = e.target.value;
            if (value === '' || (!isNaN(Number(value)) && Number(value) >= 0)) {
                setProduct((prev) => ({
                    ...prev,
                    quantities: {
                        ...prev.quantities,
                        [color]: value === '' ? 0 : Number(value),
                    },
                }));
            }
        },
        []
    );

    const handleDeleteImage = useCallback(
        (color: string, image: string) => {
            const currentProduct = productRef.current;
            const currentImageFiles = imageFilesRef.current;

            const index = currentProduct.images[color]?.indexOf(image) ?? -1;
            if (index !== -1) {
                URL.revokeObjectURL(image);

                const updatedImages = {
                    ...currentProduct.images,
                    [color]: currentProduct.images[color].filter((_, i) => i !== index),
                };

                const updatedImageFiles = {
                    ...currentImageFiles,
                    [color]: (currentImageFiles[color] || []).filter((_, i) => i !== index),
                };

                setProduct((prev) => ({ ...prev, images: updatedImages }));
                setImageFiles(updatedImageFiles);
            }
        },
        []
    );

    const handleAddCategory = useCallback(() => {
        if (newCategory && !categories.find((cat: any) => cat.name === newCategory)) {
            setProduct((prev) => ({ ...prev, categoryId: newCategory }));
            setNewCategory('');
            setOpenCategoryDialog(false);
            enqueueSnackbar('Thêm danh mục mới thành công', { variant: 'success' });
        } else {
            enqueueSnackbar('Danh mục đã tồn tại hoặc không hợp lệ', { variant: 'error' });
        }
    }, [newCategory, categories, enqueueSnackbar]);

    const handleAddPromotion = useCallback(
        (promotionId: string) => {
            setProduct((prev) => ({ ...prev, promotionId }));
            setOpenPromotionDialog(false);
            enqueueSnackbar('Chọn khuyến mãi thành công', { variant: 'success' });
        },
        [enqueueSnackbar]
    );

    const handleSpecChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setNewSpec((prev) => ({ ...prev, [name]: value }));
    }, []);

    const handleAddSpec = useCallback(() => {
        const specToAdd = { ...newSpec };
        if (specToAdd.key && specToAdd.value) {
            setProduct((prev) => ({
                ...prev,
                specifications: [...prev.specifications, specToAdd],
            }));
            setNewSpec({ key: '', value: '' });
            setOpenSpecDialog(false);
            enqueueSnackbar('Thêm thông số kỹ thuật thành công', { variant: 'success' });
        } else {
            enqueueSnackbar('Thông số kỹ thuật không hợp lệ', { variant: 'error' });
        }
    }, [newSpec, enqueueSnackbar]);

    const handleDeleteSpec = useCallback(
        (specToDelete: Specification) => {
            setProduct((prev) => ({
                ...prev,
                specifications: prev.specifications.filter((spec) => spec.key !== specToDelete.key || spec.value !== specToDelete.value),
            })),
                enqueueSnackbar('Xóa thông số kỹ thuật thành công', { variant: 'success' });
        },
        [enqueueSnackbar]
    );

    const handleSubmit = useCallback(
        async (e: React.FormEvent) => {
            e.preventDefault();
            setSubmitting(true);
            enqueueSnackbar('Bắt đầu tạo sản phẩm...', { variant: 'info' });

            const currentProduct = productRef.current;
            const currentImageFiles = imageFilesRef.current;

            try {
                const missingQuantities = currentProduct.colors.filter(
                    (color) => !currentProduct.quantities[color] && currentProduct.quantities[color] !== 0
                );
                if (missingQuantities.length > 0) {
                    enqueueSnackbar(`Vui lòng nhập số lượng cho các màu: ${missingQuantities.join(', ')}`, { variant: 'error' });
                    setSubmitting(false);
                    return;
                }

                enqueueSnackbar('Đang chuyển đổi mô tả sản phẩm...', { variant: 'info' });
                const parsedDescription = await marked.parse(currentProduct.description);
                const descriptionHtml = DOMPurify.sanitize(parsedDescription);

                enqueueSnackbar('Đang tạo sản phẩm...', { variant: 'info' });
                const productData = {
                    name: currentProduct.name,
                    description: descriptionHtml,
                    price: parseFloat(currentProduct.price),
                    promotionId: currentProduct.promotionId || undefined,
                    categoryId: currentProduct.categoryId,
                    supplierId: currentProduct.supplierId,
                };
                const createdProduct = await createProduct(productData);
                const productId = createdProduct.productId;

                enqueueSnackbar('Đang tải ảnh sản phẩm...', { variant: 'info' });
                const uploadedImages: { [color: string]: string[] } = {};
                for (const color of currentProduct.colors) {
                    const files = currentImageFiles[color] || [];
                    if (files.length > 0) {
                        const serverUrls = await uploadMultipleImages(files);
                        uploadedImages[color] = serverUrls.imageUrls;
                    } else {
                        uploadedImages[color] = [];
                    }
                }

                enqueueSnackbar('Đang tạo kho sản phẩm...', { variant: 'info' });
                const inventories = currentProduct.colors.map((color) => ({
                    productId,
                    importDate: new Date().toISOString(),
                    color: color.toUpperCase(),
                    quantity: currentProduct.quantities[color] || 0,
                    imageUrls: uploadedImages[color],
                }));
                await bulkCreateInventory(inventories);

                enqueueSnackbar('Đang thêm thông số kỹ thuật...', { variant: 'info' });
                const specificationsData = currentProduct.specifications.map((spec) => ({
                    productId,
                    key: spec.key,
                    value: spec.value,
                }));
                await handleCreateSpecifications(specificationsData);

                enqueueSnackbar('Tạo sản phẩm thành công!', { variant: 'success' });

                Object.values(currentProduct.images).forEach((images) => {
                    images.forEach((image) => URL.revokeObjectURL(image));
                });
                const resetProduct = {
                    name: '',
                    description: '',
                    price: '',
                    promotionId: '',
                    categoryId: '',
                    supplierId: '',
                    colors: [],
                    images: {},
                    quantities: {},
                    specifications: [],
                };
                setProduct(resetProduct);
                setImageFiles({});
            } catch (error: any) {
                console.error('Lỗi khi tạo sản phẩm:', error);
                enqueueSnackbar(`Đã xảy ra lỗi khi tạo sản phẩm: ${error.message || 'Không xác định'}`, { variant: 'error' });
            } finally {
                setSubmitting(false);
            }
        },
        [enqueueSnackbar, handleCreateSpecifications]
    );

    const openLightbox = useCallback((event: React.MouseEvent, { index }: { index: number }) => {
        setCurrentImage(index);
        setIsOpen(true);
    }, []);

    const closeLightbox = useCallback(() => {
        setCurrentImage(0);
        setIsOpen(false);
    }, []);

    const photos: GalleryPhoto[] = useMemo(() => {
        return product.colors.reduce((acc: GalleryPhoto[], color) => {
            const colorImages = (product.images[color] || []).map((image) => ({
                src: image,
                width: 1,
                height: 1,
                color,
            }));
            return [...acc, ...colorImages];
        }, []);
    }, [product.colors, product.images]);

    const renderImage = useCallback(
        ({ index, photo }: { index: number; photo: GalleryPhoto }) => (
            <Box sx={{ position: 'relative', display: 'inline-block' }}>
                <img
                    src={photo.src}
                    alt={`Product Preview ${photo.color} ${index + 1}`}
                    style={{
                        maxWidth: '100px',
                        maxHeight: '100px',
                        objectFit: 'contain',
                        cursor: 'pointer',
                        margin: '5px',
                    }}
                    onClick={(e) => openLightbox(e, { index })}
                />
                <IconButton
                    size="small"
                    sx={{
                        position: 'absolute',
                        top: 0,
                        right: 0,
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                        color: 'white',
                        '&:hover': {
                            backgroundColor: 'rgba(0, 0, 0, 0.7)',
                        },
                    }}
                    onClick={() => handleDeleteImage(photo.color, photo.src)}
                >
                    <CloseIcon fontSize="small" />
                </IconButton>
            </Box>
        ),
        [openLightbox, handleDeleteImage]
    );

    if (loading) {
        return (
            <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <CircularProgress />
            </Container>
        );
    }

    return (
        <Container disableGutters sx={{ width: '100%', height: '100%', py: 4 }}>
            <Box component="form" onSubmit={handleSubmit} className="space-y-6">
                <Grid container spacing={3}>
                    <ProductForm
                        product={product}
                        categories={categories}
                        suppliers={suppliers}
                        promotions={promotions}
                        openPromotionDialog={openPromotionDialog}
                        handleInputChange={handleInputChange}
                        handleColorChange={handleColorChange}
                        setOpenCategoryDialog={setOpenCategoryDialog}
                        setOpenPromotionDialog={setOpenPromotionDialog}
                        handleAddPromotion={handleAddPromotion}
                    />
                    <ColorVariantManager
                        colors={product.colors}
                        quantities={product.quantities}
                        images={product.images}
                        photos={photos}
                        handleImageChange={handleImageChange}
                        handleQuantityChange={handleQuantityChange}
                        renderImage={renderImage}
                        handleDeleteImage={handleDeleteImage}
                    />
                    <SpecificationManager
                        specifications={product.specifications}
                        handleDeleteSpec={handleDeleteSpec}
                        setOpenSpecDialog={setOpenSpecDialog}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Box className="text-center" sx={{ mt: 5 }}>
                        <Button
                            type="submit"
                            variant="outlined"
                            color="primary"
                            size="large"
                            disabled={submitting}
                            sx={{
                                backgroundColor: 'white',
                                fontSize: '16px',
                                '&:hover': {
                                    backgroundColor: '#0068FF',
                                    color: 'white',
                                },
                            }}
                        >
                            {submitting ? <CircularProgress size={24} /> : 'Lưu sản phẩm'}
                        </Button>
                    </Box>
                </Grid>
            </Box>
            <ProductTable />
            <CategoryDialog
                open={openCategoryDialog}
                newCategory={newCategory}
                setNewCategory={setNewCategory}
                handleAddCategory={handleAddCategory}
                handleClose={() => setOpenCategoryDialog(false)}
            />
            <SpecificationDialog
                open={openSpecDialog}
                newSpec={newSpec}
                handleSpecChange={handleSpecChange}
                handleAddSpec={handleAddSpec}
                handleClose={() => setOpenSpecDialog(false)}
            />
            <ImageLightbox
                isOpen={isOpen}
                currentImage={currentImage}
                photos={photos}
                closeLightbox={closeLightbox}
            />
        </Container>
    );
};

export default ProductManagement;