import { setCart, addCartItemInCart, updateQuantity, removeItem, removeItems } from '@/store/slices/cart.slice'
import { useDispatch, useSelector } from 'react-redux'
import { useSnackbar } from 'notistack';
import { RootState } from '@/store';
import { findCartByUserId, createCartItemSerive, removeCartItemService, bulkDeleteCartItems } from '@/services/Cart.service';
import { updateQuantityCartItems,createCart} from "@/services/Cart.service"
import { useEffect } from 'react';

function useCart() {
    const userStore = useSelector((state: RootState) => state.userSlice);
    const { me } = userStore;
    const countItem = useSelector((state: RootState) => state.cartSlice?.cart?.items?.length);
    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
        if (me && me.userId) {
            fetchCartByUserId(me.userId);
        }
    }, [me]);

    const createCartItem = async (data: any) => {
        const cart = await createCartItemSerive(data);
        const cartItemData = cart && typeof cart === 'object' && 'data' in cart ? (cart as any).data : cart;
        enqueueSnackbar("Add product to cart successfully", { variant: 'success' });
        dispatch(addCartItemInCart(cartItemData))
    }
    const fetchCartByUserId = async (userId: string) => {
        const cart = await findCartByUserId(userId);
        const cartData = cart && typeof cart === 'object' && 'data' in cart ? (cart as any).data : cart;
        dispatch(setCart(cartData));
    }
    const updateQuantityCartItem = async (cartItemId: string, quantity: number) => {
        const cart_item = await updateQuantityCartItems(cartItemId, quantity);
        const cartItemData = cart_item && typeof cart_item === 'object' && 'data' in cart_item ? (cart_item as any).data : cart_item;
        dispatch(updateQuantity(cartItemData));
    }
    const removeCartItem = async (cartItemId: string) => {
        const result = await removeCartItemService(cartItemId);
        console.log("check result remove cart item: ", result);

        if (result && typeof result === 'object' && 'success' in result ? (result as any).success !== false : true) {
            enqueueSnackbar("Removed product from cart successfully", { variant: 'success' });
            dispatch(removeItem(cartItemId));
        } else {
            enqueueSnackbar("Failed to remove product from cart", { variant: 'error' });
        }
    }
    const removeCartItems = async (cartItemIds: string[]) => {
        const result = await bulkDeleteCartItems(cartItemIds);
        console.log("check result bulk delete cart items: ", result);
        if (result && typeof result === 'object' && 'success' in result ? (result as any).success !== false : true) {
            dispatch(removeItems(cartItemIds));
        } else {
            console.log("check result bulk delete cart items: ", result);
        }
    }
    const createCarts = async () => {
        try {
            const response = await createCart();
            console.log("Check data create Cart: ",response);
            
            if (response.success) {
                dispatch(setCart(response.data));
            } else {
                console.error('Failed to create cart :', response.message);
            }
            return response;
        } catch (error) {
            console.error('Failed to create cart :', error);
        }
    };
    return { fetchCartByUserId, createCartItem, updateQuantityCartItem, removeCartItem, removeCartItems, countItem,createCarts};
}
export default useCart;