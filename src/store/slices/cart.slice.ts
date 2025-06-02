import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface CartItem {
    cartId: string;
    cartItemId: string;
    productId: string;
    productName: string;
    imageUrl: string;
    color: string;
    quantity: number;
}

interface Cart {
    cartId: string;
    userId: string;
    items: CartItem[];
}

export interface InitStateType {
    cart: Partial<Cart>;
}

const initState: InitStateType = {
    cart: {
        cartId: '',
        userId: '',
        items: [],
    },
};

export const cartSlice = createSlice({
    name: 'cartSlice',
    initialState: initState,
    reducers: {
        setCart: (state: InitStateType, { payload }: PayloadAction<Cart>) => {
            state.cart = payload;
        },
        addCartItemInCart: (state: InitStateType, { payload }: PayloadAction<CartItem>) => {
            state.cart.items = [...(state.cart.items || []), payload];
        },
        updateQuantity: (
            state: InitStateType,
            { payload }: PayloadAction<{ cartItemId: string; quantity: number }>
        ) => {
            if (state.cart.items) {
                state.cart.items = state.cart.items.map((item) =>
                    item.cartItemId === payload.cartItemId
                        ? { ...item, quantity: Math.max(1, payload.quantity) }
                        : item
                );
            }
        },
        removeItem: (
            state: InitStateType,
            { payload }: PayloadAction<string>
        ) => {
            if (state.cart.items) {
                state.cart.items = state.cart.items.filter(
                    (item) => item.cartItemId !== payload
                );
            }
        },
        removeItems: (
            state: InitStateType,
            { payload }: PayloadAction<string[]>
        ) => {
            if (state.cart.items) {
                state.cart.items = state.cart.items.filter(
                    (item) => !payload.includes(item.cartItemId)
                );
            }
        },
    },
});

export const {
    setCart,
    addCartItemInCart,
    updateQuantity,
    removeItem,
    removeItems,
} = cartSlice.actions;

export default cartSlice.reducer;