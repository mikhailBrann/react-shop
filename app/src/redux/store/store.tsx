import { configureStore } from "@reduxjs/toolkit";
import { hitSalesSlice } from "../slices/hitSalesSlice";
import { catalogSectionSlice} from "../slices/CatalogSectionSlice";
import { cartSlice }  from "../slices/CartSlice";

export const store = configureStore({
    reducer: {
        [hitSalesSlice.name]: hitSalesSlice.reducer,
        [catalogSectionSlice.name]: catalogSectionSlice.reducer,
        [cartSlice.name]: cartSlice.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware()
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;