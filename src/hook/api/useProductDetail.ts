import {  useState } from 'react';
import {getProductById, getSpecifications, getAllReviews} from '@/services/ProductDetail.Service';

interface CategoryType {
    categoryId: string;
    name: string;
    description: string;
    createdAt: string;
    updatedAt: string;
}

interface InventoryType {
    inventoryId: string;
    productId: string;
    importDate: string;
    color: string;
    imageUrls: string[];
    quantity: number;
    createdAt: string;
    updatedAt: string;
}

interface SupplierType {
    supplierId: string;
    name: string;
    addressId: string;
    phone: string;
    email: string;
    description: string;
    createdAt: string;
    updatedAt: string;
}

interface ProductType {
    productId: string;
    name: string;
    categoryId: string;
    supplierId: string;
    description: string;
    price: number;
    priceReduced: number;
    promotionId: string | null;
    createdAt: string;
    updatedAt: string;
    category: CategoryType;
    inventory: InventoryType[];
    supplier: SupplierType;
}

interface SpecificationType {
    specificationId: string;
    productId: string;
    key: string;
    value: string;
    createdAt: string | null;
    updatedAt: string | null;
};

interface ReviewType {
    reviewId: string;
    userId: string;
    productId: string;
    content: string;
    rating: number;
    createdAt: string | null;
    updatedAt: string | null;
};

function useProductDetail() {
    const [specifications, setSpecifications] = useState<SpecificationType[]>([]);
    const [reviews, setReviews] = useState<ReviewType[]>([]);
    const [productInfo, setProductInfo] = useState<ProductType | null>(null);

    const fetchProduct = async (productId: string) => {
        try {
            const res = await getProductById(productId);
            if (res.data) {
                setProductInfo(res.data);
            }
        } catch (error) {
            console.error('Failed to fetch product:', error);
        }
    };

    const fetchSpecifications = async (productId: string) => {
        try {
            const res = await getSpecifications(productId);
            if (res.data) {
                setSpecifications(res.data);
            }
        } catch (error) {
            console.error('Failed to fetch specifications:', error);
        }
    };

    const fetchReviews = async (productId: string) => {
        try {
            const res = await getAllReviews(productId);
            if (res.data) {
                setReviews(res.data);
            }
        } catch (error) {
            console.error('Failed to fetch reviews:', error);
        }
    };

    return{
        productInfo,
        specifications,
        reviews,
        fetchProduct,
        fetchSpecifications,
        fetchReviews
    };
};

export default useProductDetail;
