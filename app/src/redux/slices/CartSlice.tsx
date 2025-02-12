//CartSlice
import {
    buildCreateSlice,
    asyncThunkCreator,
    PayloadAction,
} from "@reduxjs/toolkit";

export type CartStateType = {
    cartList: [],
    cartCount: number,
};

const initialState: CartStateType = {
    cartList: JSON.parse(localStorage.getItem('cartList')) || [],
    cartCount: localStorage.getItem('cartCount') || 0,
};
const createSliceWithThunk = buildCreateSlice({
    creators: { asyncThunk: asyncThunkCreator },
});

export const cartSlice = createSliceWithThunk({
    name: "cart",
    initialState,
    selectors: {
        getcartList: (state) => state.cartList,
        getcartCount: (state) => state.cartCount,
    },
    reducers: {
        addItemToCartList: (state, action: PayloadAction<any>) => {
            let update = false;
            const newData = action.payload;

            state.cartList.forEach((cartGood, index) => {
                if(cartGood.id === newData.id && cartGood.size === newData.size) {
                    state.cartList[index].quantity += newData.quantity;
                    update = true;
                }
            });

            state.cartList = update ? [...state.cartList] : [...state.cartList, newData];
            state.cartCount = state.cartList.length;
            localStorage.setItem('cartList', JSON.stringify(state.cartList));
            localStorage.setItem('cartCount', JSON.stringify(state.cartCount));
        },
        removeItemToCartList: (state, action: PayloadAction<any>) => {
            const removeItem = action.payload;
            const newList = state.cartList.filter(item => !(item.id === removeItem.id && item.size === removeItem.size));

            state.cartList = newList;
            state.cartCount = state.cartList.length;
            localStorage.setItem('cartList', JSON.stringify(state.cartList));
            localStorage.setItem('cartCount', state.cartCount);
        },
        clearCartList: (state) => {
            state.cartList = [];
            state.cartCount = 0;
            localStorage.setItem('cartList', JSON.stringify(state.cartList));
            localStorage.setItem('cartCount', state.cartCount);
        }
    }
});

export const { addItemToCartList, removeItemToCartList, clearCartList } = cartSlice.actions;
export default cartSlice.reducer;

