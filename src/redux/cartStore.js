import { configureStore } from "@reduxjs/toolkit";
import productSlice from './slices/productSlice'
import wishlistSlice from './slices/wishlistSlice'
import cartSlice from './slices/cartSlice'
import ordersSlice from './slices/ordersSlice'



const cartStore = configureStore({
    reducer:{
        productReducer : productSlice,
        wishlistReducer : wishlistSlice,
        cartReducer : cartSlice,
        ordersReducer: ordersSlice

    }
})

export default cartStore