import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";



// action return promise
export const fetchproducts = createAsyncThunk("products/fetchproducts", async () => {
    const result = await axios.get("https://dummyjson.com/products")
    // console.log(result.data.products);
    sessionStorage.setItem("allProducts", JSON.stringify(result.data.products))
    return result.data.products

})

const productSlice = createSlice({
    name: "products",
    initialState: {
        allProducts: [],
        dummyAllProducts: [],
        loading: false,
        errorMsg: ""
    },
    reducers: {
        searchproduct: (state, actionbyHeader) => {
            state.allProducts = state.dummyAllProducts.filter(item => item.title.toLowerCase().includes(actionbyHeader.payload))
        },



        filterByCategory: (state, actionbyHeader) => {
            if (actionbyHeader.payload === "all") {
                state.allProducts = state.dummyAllProducts
            } else {
                state.allProducts = state.dummyAllProducts.filter(item => item.category === actionbyHeader.payload)

            }
        },

        sortByPrice: (state, actionbyHeader) => {
            if (actionbyHeader.payload === "low") {
                state.allProducts = [...state.allProducts].sort((a, b) => a.price - b.price)

            }
            if (actionbyHeader.payload === "high") {
                state.allProducts = [...state.allProducts].sort((a, b) => b.price - a.price)
            }
        }
    },


    extraReducers: (builder) => {
        builder.addCase(fetchproducts.fulfilled, (state, apiResult) => {
            state.allProducts = apiResult.payload
            state.dummyAllProducts = apiResult.payload
            state.loading = false
            state.errorMsg = ""
        })
        builder.addCase(fetchproducts.pending, (state) => {
            state.allProducts = []
            state.dummyAllProducts = []
            state.loading = true
            state.errorMsg = ""
        })
        builder.addCase(fetchproducts.rejected, (state) => {
            state.allProducts = []
            state.dummyAllProducts = []
            state.loading = false
            state.errorMsg = "API call failed"
        })
    }
})

export const { searchproduct, filterByCategory, sortByPrice } = productSlice.actions
export default productSlice.reducer