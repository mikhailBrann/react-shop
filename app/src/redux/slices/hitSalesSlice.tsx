import {
    buildCreateSlice,
    asyncThunkCreator,
    PayloadAction,
} from "@reduxjs/toolkit";

export type HitSalesStateType = {
    hitSalesList: [],
    hitSalesLoading: boolean,
    hitSalesError: string,
};

const initialState: HitSalesStateType = {
    hitSalesList: [],
    hitSalesLoading: false,
    hitSalesError: '',
};
const createSliceWithThunk = buildCreateSlice({
    creators: { asyncThunk: asyncThunkCreator },
});

export const hitSalesSlice = createSliceWithThunk({
    name: "hitSales",
    initialState,
    selectors: {
        gethitSales: (state) => state.hitSalesList,
        gethitSalesLoading: (state) => state.hitSalesLoading,
        gethitSalesError: (state) => state.hitSalesError,
    },
    reducers: (create) => ({
        fetchHitSales: create.asyncThunk(
            async (searchQuery: string = '', {rejectWithValue}) => {
                try {
                    const apiPath = import.meta.env.VITE_API_URL + "/api/top-sales";
                    const response = await fetch(apiPath);

                    console.log(apiPath);

                    if(!response.ok) {
                        return rejectWithValue("Loading film API error!");
                    }

                    return await response.json();
                } catch (error) {
                    return rejectWithValue(error);
                }
            },
            {
                pending: (state) => {
                    state.hitSalesLoading = true;
                    state.hitSalesError = "";
                },
                fulfilled: (state, action: PayloadAction<any>) => {
                    if(action.payload?.Error) {
                        state.hitSalesError = action.payload?.Error;
                        state.hitSalesList = [];
                        return;
                    }

                    if(action.payload) {
                        state.hitSalesList = action.payload;
                        state.hitSalesError = "";
                        return;
                    }
                },
                rejected: (state, action: PayloadAction<any>) => {
                    state.hitSalesError = action.payload as string;
                },
                settled: (state) => {
                    state.hitSalesLoading = false;
                },
            }
        )
    })
});

export const { fetchHitSales } = hitSalesSlice.actions;
export default hitSalesSlice.reducer;