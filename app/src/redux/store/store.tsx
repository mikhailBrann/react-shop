import { configureStore } from "@reduxjs/toolkit";
import { hitSalesSlice } from "../slices/hitSalesSlice";
import { catalogSectionSlice} from "../slices/CatalogSectionSlice";

export const store = configureStore({
    reducer: {
        [hitSalesSlice.name]: hitSalesSlice.reducer,
        [catalogSectionSlice.name]: catalogSectionSlice.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware()
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;