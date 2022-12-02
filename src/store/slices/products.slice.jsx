import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { setIsLoading } from './isLoading.slice';

export const productsSlice = createSlice({
    name: 'products',
    initialState: [],
    reducers: {
        setProducts: (state, action) => {
            return action.payload
        },
        filterPrice: (state, action) => {
            const {fromPrice, toPrice} = action.payload;
            return state.filter(product => product.price > fromPrice && product.price < toPrice)
        }
    }
})

export const getProductsThunk = () => dispatch => {
    dispatch(setIsLoading(true));
    axios.get('https://e-commerce-api.academlo.tech/api/v1/products')
        .then(res => dispatch(setProducts(res.data.data.products)))
        .finally(() => dispatch(setIsLoading(false)))
}

export const filterProductsThunk = (id) => dispatch => {
    dispatch(setIsLoading(true));
    axios.get(`https://e-commerce-api.academlo.tech/api/v1/products?category=${id}`)
        .then(res => dispatch(setProducts(res.data.data.products)))
        .finally(() => dispatch(setIsLoading(false)))
}

export const filterThunk = (imputSearch) => dispatch => {
    dispatch(setIsLoading(true));
    axios.get(`https://e-commerce-api.academlo.tech/api/v1/products?query=${imputSearch}`)
        .then(res => dispatch(setProducts(res.data.data.products)))
        .finally(() => dispatch(setIsLoading(false)))
}




export const { setProducts, filterPrice } = productsSlice.actions;

export default productsSlice.reducer;
