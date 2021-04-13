import { FETCH_PRODUCTS, FETCH_PRODUCTS_ERROR } from './constants';
import { AnyAction } from 'redux';
import { appState } from './appState.types';

const initialState: appState = {
    products: [],
};

export const AppReducer = (state = initialState, action: AnyAction): appState => {
    switch (action.type) {
        case FETCH_PRODUCTS:
            return {
                ...state,
                products: action.payload,
            };
        case FETCH_PRODUCTS_ERROR:
            return {
                ...state,
                products: action.payload,
            };
        default:
            return state;
    }
};
