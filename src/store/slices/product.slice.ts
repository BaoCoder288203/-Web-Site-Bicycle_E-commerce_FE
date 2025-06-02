import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface Inventory {
    inventoryId: string;
    productId: string;
    importDate: string;
    color: string;
    imageUrls: string[];
    quantity: number;
}

interface Product {
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
    category: Category;
    inventory: Inventory[];
    supplier: Supplier;
    specifications: Specification[];
}

interface Specification {
    specificationId: string;
    productId: string;
    key: string;
    value: string;
    createdAt: string | null;
    updatedAt: string | null;
};

interface Category {
    categoryId: string,
    name: string,
    description: string,
}

interface Supplier {
    supplierId: string,
    name: string,
    addressId: string,
    phone: string,
    email: string,
    description: string,
}
interface Promotion {
    createdAt: Date,
    updatedAt: Date,
    promotionId: string,
    name: string,
    reducePercent: number,
    startDate: Date,
    endDate: Date,
    limitValue: number,
    applyFor: string,
    active: boolean
}
export interface InitStateType {
    categories: Partial<Category>[]
    suppliers: Partial<Supplier>[]
    promotions: Partial<Promotion>[]
    products: Partial<Product>[],
    specifications: Partial<Specification>[];
}

const initState: InitStateType = {
    products: [],
    categories: [],
    suppliers: [],
    promotions: [],
    specifications: [],
};

export const useProduct = createSlice({
    name: 'productSlice',
    initialState: initState,
    reducers: {
        setCategories: (state: InitStateType, { payload }: PayloadAction<any>) => {
            state.categories = payload
        },
        setProducts: (state: InitStateType, { payload }: PayloadAction<any>) => {
            state.products = payload
        },
        setSuppliers: (state: InitStateType, { payload }: PayloadAction<any>) => {
            state.suppliers = payload
        },
        setPromotions: (state: InitStateType, { payload }: PayloadAction<any>) => {
            state.promotions = payload
        },
        setSpecifications: (state: InitStateType, { payload }: PayloadAction<any>) => {
            state.specifications = payload;
        },
    },
});
export const {
    setCategories,
    setSuppliers,
    setProducts,
    setPromotions,
    setSpecifications,
} = useProduct.actions;

export default useProduct.reducer;