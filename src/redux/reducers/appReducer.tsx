import {
    ADD_ITEMS_TO_CART,
    ADD_ITEMS_TO_WISHLIST,
    FETCH_PER_PAGE_PRODUCTS,
    FETCH_PRODUCTS,
    FETCH_PRODUCTS_ERROR,
    REMOVE_ITEMS_FROM_CART,
} from './constants';
import { AnyAction } from 'redux';
import { appState } from './appState.types';
import { ItemslistTypes } from '../../components/products/items-list/itemslist.types';
import { fnFormatCurrency } from '../../utilities/fnFormatCurrency';

const initialState: appState = {
    products: [],
    perPageProducts: [],
    cartItems: [],
    wishList: [],
};

export const AppReducer = (state = initialState, action: AnyAction): appState => {
    switch (action.type) {
        case FETCH_PRODUCTS:
            return {
                ...state,
                products: action.payload,
            };
        case FETCH_PER_PAGE_PRODUCTS:
            return {
                ...state,
                perPageProducts: action.payload,
            };
        case FETCH_PRODUCTS_ERROR:
            return {
                ...state,
                products: action.payload,
            };
        case ADD_ITEMS_TO_CART: {
            /*const { cartItems, perPageProducts } = state;
            let alreadyExists = false;
            cartItems.forEach((x: any) => {
                if (x.uuid === action.payload.product.uuid) {
                    alreadyExists = true;
                    x.count++;
                }
            });
            const index = perPageProducts.findIndex((d) => d.uuid === action.payload.product.uuid);
            if (index > -1) {
                perPageProducts[index].itemAddedToCart = true;
            }
            if (!alreadyExists) {
                const obj = getObj(action.payload.product);
                cartItems.push({ ...obj, quantity: 1 });
            }*/
            const obj = getData(state.cartItems, state.perPageProducts, action.payload, 'cart');
            console.log('objjj', obj);
            /*return Object.assign({}, state, {
                cartItems: obj.data,
                perPageProducts: obj.perPageProducts,
            });*/
            return { ...state, cartItems: obj.data, perPageProducts: obj.perPageProducts };
        }
        case ADD_ITEMS_TO_WISHLIST: {
            const obj = getData(state.wishList, state.perPageProducts, action.payload, 'wishlist');
            console.log('objjj', obj);
            return { ...state, wishList: obj.data, perPageProducts: obj.perPageProducts };
        }
        case REMOVE_ITEMS_FROM_CART:
            return {
                ...state,
                cartItems: action.payload,
            };
        default:
            return state;
    }
};

const getObj = (product: any) => {
    console.log('product3333333333333333333333', product);
    const price = product?.retail_price?.formatted_value.split(' ');
    return {
        uuid: product.uuid,
        cover_image_url: product.cover_image_url,
        title: product.title,
        description: product.description,
        net_price: product.discount > 0 ? product.net_price.formatted_value : '',
        retail_price: price ? price[1] : 0,
        discount: product.discount,
        subTotal: parseInt(product.quantity, 10) * parseInt(price, 10),
    };
};

const getData = (arr: any, perPageProducts: any, payload: any, type: string) => {
    console.log('payload', payload);
    let alreadyExists = false;
    arr.forEach((x: any) => {
        if (x.uuid === payload.product.uuid) {
            alreadyExists = true;
            x.count++;
        }
    });
    const index = perPageProducts.findIndex((d: any) => d.uuid === payload.product.uuid);
    if (index > -1) {
        if (type === 'cart') {
            perPageProducts[index].itemAddedToCart = payload.product.itemAddedToCart;
        }
        perPageProducts[index].isFavorite = payload.product.isFavorite;
    }
    console.log('payload.product', payload.product);
    if (!alreadyExists) {
        const obj = getObj(payload.product);
        arr.push({ ...obj, quantity: 1 });
    }
    if (payload.product.isFavorite) {
        console.log('went inside', arr);
        arr.forEach((d: any, i: number) => {
            if (arr[i].uuid === payload.product.uuid) {
                arr.splice(i, 1);
            }
        });
    }
    return {
        data: arr,
        perPageProducts: perPageProducts,
    };
};
