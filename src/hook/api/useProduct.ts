import { setCategories, setProducts, setPromotions, setSpecifications, setSuppliers } from '@/store/slices/product.slice'
import { getAllCategory, getAllSupplier, getAllPromotions, createSpecifications, getAllProduct, getSpecificationByProductId } from "@/services/Product.service";
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
function useProduct() {
    const dispatch = useDispatch();
    const productStore = useSelector((state: RootState) => state.productSlice);
    const { categories, suppliers, products, promotions } = productStore;
    const handleFetchProducts = async () => {
        const response = await getAllProduct();
        dispatch(setProducts(response.data))
    }
    const handleFetchCategories = async () => {
        const response = await getAllCategory();
        dispatch(setCategories(response.data))
    }
    const handleFetchSupplier = async () => {
        const response = await getAllSupplier();
        dispatch(setSuppliers(response.data));
    }
    const handleFetchPromotion = async () => {
        const response = await getAllPromotions();
        dispatch(setPromotions(response));
    }
    const handleFetchSpecifications = async (productId: string) => {
        const response = await getSpecificationByProductId(productId);
        dispatch(setSpecifications(response));
    }
    const handleCreateSpecifications = async (data: any) => {
        const response = await createSpecifications(data);
        return response;
    }

    return { handleFetchCategories, handleFetchSupplier, handleFetchProducts, handleFetchPromotion,handleFetchSpecifications, categories, suppliers, products, promotions, handleCreateSpecifications };
}

export default useProduct;