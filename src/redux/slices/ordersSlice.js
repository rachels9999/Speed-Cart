import { createSlice } from "@reduxjs/toolkit";


const ordersSlice = createSlice({
    name:"orders",
    initialState:[],
    reducers:{
        placeOrder:(state,action)=>{
            state.push(action.payload)
        }
    }
})

export const {placeOrder} = ordersSlice.actions;
export default ordersSlice.reducer;
