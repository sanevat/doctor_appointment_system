import { configureStore } from '@reduxjs/toolkit'
import { userSlice } from "./features/userSlice";
export default configureStore({
    reducer: {
        user: userSlice.reducer, 
    }
});