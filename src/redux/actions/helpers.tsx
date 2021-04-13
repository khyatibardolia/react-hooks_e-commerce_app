import { Dispatch } from 'react';
import axios from 'axios';
import { FETCH_PRODUCTS, FETCH_PRODUCTS_ERROR } from '../reducers/constants';
import { ActionCreator } from 'redux';

const API_BASE_URL = 'https://api.musement.com/api/v3';

export const Axios = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'accept-language': 'it',
        'content-type': 'application/json',
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
            return dispatch({ type: FETCH_PRODUCTS, payload: response?.data });
        } catch (error) {
            return dispatch({ type: FETCH_PRODUCTS_ERROR, error });
        }
    };
};
