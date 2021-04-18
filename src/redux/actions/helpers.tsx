import { Dispatch } from 'react';
import axios from 'axios';
import {
    ADD_ITEMS_TO_CART,
    ADD_ITEMS_TO_WISHLIST,
    ADD_WISHLIST_ITEMS_TO_CART,
    FETCH_PER_PAGE_PRODUCTS,
    FETCH_PRODUCTS,
    FETCH_PRODUCTS_ERROR,
    REMOVE_ITEMS_FROM_CART,
    REMOVE_ITEMS_FROM_WISHLIST,
    UPDATE_PRODUCT_QTY,
} from '../reducers/constants';
import { ActionCreator } from 'redux';
import { ItemslistTypes } from '../../components/products/items-list/itemslist.types';

export const API_BASE_URL = 'https://api.musement.com/api/v3';

export const Axios = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'accept-language': 'it',
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache',
        'x-musement-version': '3.4.0',
    },
});

//Products API
export const GetProducts: ActionCreator<any> = (limit?: number, offset?: number) => {
    return async (dispatch: Dispatch<any>) => {
        try {
            const response = await Axios.get(`/venues/164/activities`, {
                params: {
                    limit,
                    offset,
                },
            });
            if (limit) {
                return dispatch({ type: FETCH_PER_PAGE_PRODUCTS, payload: response?.data });
            } else {
                return dispatch({ type: FETCH_PRODUCTS, payload: response?.data });
            }
        } catch (error) {
            return dispatch({ type: FETCH_PRODUCTS_ERROR, error });
        }
    };
};

export const addItemsToCart: ActionCreator<any> = (product: ItemslistTypes) => (
    dispatch: Dispatch<any>,
) => {
    return dispatch({
        type: ADD_ITEMS_TO_CART,
        payload: { product },
    });
};

export const addItemsToWishList: ActionCreator<any> = (product: ItemslistTypes) => (
    dispatch: Dispatch<any>,
) => {
    return dispatch({
        type: ADD_ITEMS_TO_WISHLIST,
        payload: { product },
    });
};

export const addWishlistItemsToCart: ActionCreator<any> = (product: ItemslistTypes) => (
    dispatch: Dispatch<any>,
) => {
    return dispatch({
        type: ADD_WISHLIST_ITEMS_TO_CART,
        payload: { product },
    });
};

export const removeFromCart: ActionCreator<any> = (product: any) => (dispatch: Dispatch<any>) => {
    return dispatch({
        type: REMOVE_ITEMS_FROM_CART,
        payload: { product },
    });
};

export const removeFromWishList: ActionCreator<any> = (product: any) => (
    dispatch: Dispatch<any>,
) => {
    return dispatch({
        type: REMOVE_ITEMS_FROM_WISHLIST,
        payload: { product },
    });
};

export const updateProductQty: ActionCreator<any> = (product: any) => (dispatch: Dispatch<any>) => {
    return dispatch({
        type: UPDATE_PRODUCT_QTY,
        payload: { product },
    });
};
