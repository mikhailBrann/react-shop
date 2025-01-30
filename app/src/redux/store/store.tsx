import { configureStore } from "@reduxjs/toolkit";
import { hitSalesSlice } from "../slices/hitSalesSlice";

export const store = configureStore({
    reducer: {
        [hitSalesSlice.name]: hitSalesSlice.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware()
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;