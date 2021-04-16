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

const API_BASE_URL = 'https://api.musement.com/api/v3';

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
//create-cart API
/*export const CreateCart: ActionCreator<any> = () => {
    return async (dispatch: Dispatch<any>) => {
        try {
            const response = await Axios.post(`/carts`, {});
            return dispatch({ type: CART, payload: response?.data });
        } catch (error) {
            return dispatch({ type: CART_ERROR, error });
        }
    };
};*/
/*//add-item-to-cart API
export const AddItemsToCart: ActionCreator<any> = (cartUuid: number) => {
    return async (dispatch: Dispatch<any>) => {
        try {
            const response = await Axios.post(`/carts/${cartUuid}/items`, {
                type: 'musement-giftbox',
                product_identifier: '1',
                quantity: 1,
            });
            return dispatch({ type: ADD_ITEMS_TO_CART, payload: response?.data });
        } catch (error) {
            return dispatch({ type: ADD_ITEMS_TO_CART_ERROR, error });
        }
    };
};*/
export const addItems: ActionCreator<any> = (product: ItemslistTypes, type: string) => (
    dispatch: Dispatch<any>,
    getState: any,
) => {
    const { cartItems, wishList, perPageProducts } = getState().AppReducer;
    const isCart = type === 'cart';
    const data = isCart ? cartItems.slice() : wishList.slice();
    const productData = perPageProducts || [];
    let alreadyExists = false;
    data.forEach((x: any) => {
        if (x.uuid === product.uuid) {
            alreadyExists = true;
            x.count++;
        }
    });
    const price = product?.retail_price?.formatted_value.split(' ');
    const obj = {
        uuid: product.uuid,
        cover_image_url: product.cover_image_url,
        title: product.title,
        description: product.description,
        net_price: product.discount > 0 ? product.net_price.formatted_value : '',
        retail_price: price ? price[1] : 0,
    };
    if (!alreadyExists) {
        data.push({ ...obj, quantity: 1 });
        productData.forEach((x: any) => {
            if (x.uuid === product.uuid) {
                x.isFavorite = false;
                x.itemAddedToCart = product.itemAddedToCart;
            }
            return x;
        });
        if (isCart) {
            dispatch({
                type: ADD_ITEMS_TO_CART,
                payload: data,
            });
            dispatch({ type: FETCH_PER_PAGE_PRODUCTS, payload: productData });
            //localStorage.setItem('cartItems', JSON.stringify(data));
        } else {
            dispatch({
                type: ADD_ITEMS_TO_WISHLIST,
                payload: data,
            });
            dispatch({ type: FETCH_PER_PAGE_PRODUCTS, payload: productData });
            //localStorage.setItem('wishList', JSON.stringify(data));
        }
    }
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
    //localStorage.setItem('cartItems', JSON.stringify(cartItems));
};

export const removeFromWishList: ActionCreator<any> = (product: any) => (
    dispatch: Dispatch<any>,
) => {
    return dispatch({
        type: REMOVE_ITEMS_FROM_WISHLIST,
        payload: { product },
    });
    //localStorage.setItem('cartItems', JSON.stringify(cartItems));
};

export const updateProductQty: ActionCreator<any> = (product: any) => (dispatch: Dispatch<any>) => {
    return dispatch({
        type: UPDATE_PRODUCT_QTY,
        payload: { product },
    });
};
