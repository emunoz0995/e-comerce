import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { setIsLoading } from './isLoading.slice';
import getConfig from '../../utils/getConfig';
import { getCartThunk } from './cart.slice';

export const purchasesSlice = createSlice({
    name: 'purchases',
    initialState: [],
    reducers: {
        setPurchases: (state, action) => {
            return action.payload
        }
    }
})

export const getPurchasesThunk = () => dispatch => {
    dispatch(setIsLoading(true));
    axios.get('https://e-commerce-api.academlo.tech/api/v1/purchases', getConfig())
        .then(res => dispatch(setPurchases(res.data.data.purchases)))
        .finally(() => dispatch(setIsLoading(false)))
}

export const createPurchasesThunk = (item) => dispatch => {
    dispatch(setIsLoading(true));
    axios.post('https://e-commerce-api.academlo.tech/api/v1/cart', item, getConfig())
    .then(res => dispatch(getCartThunk()))
    .finally(() => dispatch(setIsLoading(false)))
}

export const {setPurchases} = purchasesSlice.actions;

export default purchasesSlice.reducer;
