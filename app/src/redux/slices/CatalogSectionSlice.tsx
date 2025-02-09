import {
    buildCreateSlice,
    asyncThunkCreator,
    PayloadAction,
} from "@reduxjs/toolkit";

export type CatalogSectionStateType = {
    catalogList: [],
    catalogListLoading: boolean,
    catalogListError: string,
    catalogListOffset: number,
    catalogListCurrentCategory: number,
    catalogListMoreGoods: boolean,
    catalogCategoryList: [],
    catalogListSearchQuery: string,
};

const initialState: CatalogSectionStateType = {
    catalogList: [],
    catalogListLoading: false,
    catalogListError: '',
    catalogListOffset: 0,
    catalogListCurrentCategory: 0,
    catalogListMoreGoods: true,
    catalogCategoryList: [],
    catalogListSearchQuery: '',
};
const createSliceWithThunk = buildCreateSlice({
    creators: { asyncThunk: asyncThunkCreator },
});

export const catalogSectionSlice = createSliceWithThunk({
    name: "catalogSection",
    initialState,
    selectors: {
        getCatalogList: (state) => state.catalogList,
        getCatalogListLoading: (state) => state.catalogListLoading,
        getCatalogListError: (state) => state.catalogListError,
        getcatalogListOfffset: (state) => state.catalogListOffset,
        getCatalogListCurrentCategory: (state) => state.catalogListCurrentCategory,
    },
    reducers: (create) => ({         
        fetchCatalog: create.asyncThunk(
            async (searchQuery: string = '', {rejectWithValue}) => {
                try {
                    const queryObject = new URLSearchParams(searchQuery);

                    if(!queryObject.get("categoryId")) {
                        queryObject.set("categoryId", "0");
                    }

                    if(!queryObject.get("offset")) {
                        queryObject.set("offset", "0");
                    }

                    const queryParam = queryObject.toString() ? "?" + queryObject.toString() : "";
                    const apiPath = import.meta.env.VITE_API_URL + "/api/items" + queryParam;
                    const response = await fetch(apiPath);
                    
                    if(!response.ok) {
                        return rejectWithValue("Loading error!");
                    }

                    return await response.json();
                } catch (error) {
                    return rejectWithValue(error);
                }
            },
            {
                pending: (state) => {
                    state.catalogListLoading = true;
                    state.catalogListError = "";
                },
                fulfilled: (state, action: PayloadAction<any>) => {
                    const defaultGoodsCount = parseInt(import.meta.env.VITE_DEFAULT_GOODS_COUNT);

                    state.catalogListLoading = true;
                    
                    
                    if(action.meta.arg !== "" ) {
                        const queryObject = new URLSearchParams(action.meta.arg);

                        if(queryObject.get("categoryId")) {
                            state.catalogListCurrentCategory = Number(queryObject.get("categoryId"));
                        }

                        if(queryObject.get("offset")) {
                            state.catalogListOffset = Number(queryObject.get("offset"));
                        }
                    }

                    
                    
                    state.catalogListError = "";
                    
                    //goods count check
                    if(action.payload?.length && action.payload.length < defaultGoodsCount) {
                        state.catalogListMoreGoods = false;
                    } else {
                        state.catalogListMoreGoods = true;
                    }

                    if(action.payload?.length <= 0) {
                        state.catalogListMoreGoods = false;
                        return;
                    }
                    
                    state.catalogList = [...state.catalogList, ...action.payload];
                    return;
                },                
                rejected: (state, action: PayloadAction<any>) => {
                    state.catalogListError = action.payload as string;
                },
                settled: (state) => {
                    state.catalogListLoading = false;
                },
            }
        ),
        setCatalogListOffset: (state, action: PayloadAction<number>) => {
            state.catalogListOffset = action.payload;
        },
        setCatalogListCurrentCategory: (state, action: PayloadAction<number>) => {
            state.catalogListCurrentCategory = action.payload;
            state.catalogListOffset = 0;
            state.catalogList = [];
            state.catalogListMoreGoods = false;
        },
        setCatalogCategoryList: (state, action: PayloadAction<any>) => {
            state.catalogCategoryList = action.payload;
        },
        setCatalogListSearchQuery: (state, action: PayloadAction<string>) => {
            state.catalogListSearchQuery = action.payload;
        }
    })
});

export const { fetchCatalog } = catalogSectionSlice.actions;
export default catalogSectionSlice.reducer;