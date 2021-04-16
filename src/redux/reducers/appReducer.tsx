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
} from './constants';
import { AnyAction } from 'redux';
import { appState } from './appState.types';
import { ItemslistTypes } from '../../components/products/items-list/itemslist.types';

const initialState: appState = {
    products: [],
    perPageProducts: [],
    cartItems: [],
    wishList: [],
    totalItemsInCart: 0,
    totalItemsInWishlist: 0,
};

export const AppReducer = (state = initialState, action: AnyAction): appState => {
    let alreadyExists = false;
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
            state.cartItems.forEach((x: any) => {
                if (x.uuid === action.payload.product.uuid) {
                    alreadyExists = true;
                }
            });
            if (!alreadyExists) {
                const obj = getObj(action.payload.product);
                state.cartItems.push({ ...obj, quantity: 1 });
            }
            const obj = getData(state, action.payload, 'cart');
            return {
                ...state,
                cartItems: state.cartItems,
                perPageProducts: obj.perPageProducts,
                totalItemsInCart: state.cartItems.length,
            };
        }
        case ADD_ITEMS_TO_WISHLIST: {
            state.wishList.forEach((x: any) => {
                if (x.uuid === action.payload.product.uuid) {
                    alreadyExists = true;
                }
            });
            if (action.payload.product.isFavorite) {
                state.wishList.forEach((d: any, i: number) => {
                    if (state.wishList[i].uuid === action.payload.product.uuid) {
                        state.wishList.splice(i, 1);
                    }
                });
            }
            if (!alreadyExists) {
                const obj = getObj(action.payload.product);
                state.wishList.push({ ...obj, quantity: 1 });
            }
            const obj = getData(state, action.payload, 'wishlist');
            return {
                ...state,
                wishList: state.wishList,
                perPageProducts: obj.perPageProducts,
                totalItemsInWishlist: state.wishList.length,
            };
        }
        case REMOVE_ITEMS_FROM_CART: {
            const data = state.cartItems
                .slice()
                .filter((x: any) => x.uuid !== action.payload.product.uuid);
            const obj = getData(state, action.payload, 'item_removed');
            return {
                ...state,
                cartItems: data,
                perPageProducts: obj.perPageProducts,
                totalItemsInCart: data.length,
            };
        }
        case UPDATE_PRODUCT_QTY: {
            return {
                ...state,
            };
        }
        case REMOVE_ITEMS_FROM_WISHLIST: {
            const data = state.wishList
                .slice()
                .filter((x: any) => x.uuid !== action.payload.product.uuid);
            const obj = getData(state, action.payload, 'item_removed');
            return {
                ...state,
                wishList: data,
                perPageProducts: obj.perPageProducts,
                totalItemsInWishlist: data.length,
            };
        }
        case ADD_WISHLIST_ITEMS_TO_CART: {
            state.cartItems.forEach((x: any) => {
                if (x.uuid === action.payload.product.uuid) {
                    alreadyExists = true;
                }
            });
            let updatedWishListData = [];

            if (!alreadyExists) {
                state.cartItems.push({ ...action.payload.product, quantity: 1 });
                updatedWishListData = getDataToRemoveFromWishlist(state, action.payload.product);
            } else {
                updatedWishListData = getDataToRemoveFromWishlist(state, action.payload.product);
            }
            return {
                ...state,
                wishList: updatedWishListData,
                cartItems: state.cartItems,
                totalItemsInWishlist: updatedWishListData.length,
                totalItemsInCart: state.cartItems.length,
            };
        }
        default:
            return state;
    }
};

const getObj = (product: any) => {
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

const getData = (state: appState, payload: any, type: string) => {
    const index = state.perPageProducts.findIndex((d: any) => d.uuid === payload.product.uuid);
    if (index > -1) {
        if (type === 'cart' || type === 'item_removed') {
            state.perPageProducts[index].itemAddedToCart =
                state.totalItemsInCart === 0 ? false : payload.product.itemAddedToCart;
        }
        state.perPageProducts[index].isFavorite = payload.product.isFavorite;
    }
    return {
        perPageProducts: state.perPageProducts,
    };
};

const getDataToRemoveFromWishlist = (state: appState, product: ItemslistTypes) => {
    let data: ItemslistTypes[] = [];
    data = state.wishList.slice().filter((x: any) => x.uuid !== product.uuid);
    return data;
};
