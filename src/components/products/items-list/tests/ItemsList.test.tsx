import { screen, fireEvent } from '@testing-library/react';
import { store } from '../../../../index';
import React from 'react';
import ItemsList from '../ItemsList';
import { ItemslistTypes } from '../itemslist.types';
import { fnRenderComponentWithRedux } from '../../../../utilities/fnRenderComponentWithRedux';

const products = store.getState().AppReducer.perPageProducts;
const container = fnRenderComponentWithRedux(<ItemsList products={products} />);
test('check if element is rendered properly', () => {
    expect(container.getByTestId('items')).toBeInTheDocument();
});

test('check if product data has rendered properly & add to cart event works', () => {
    products.forEach((item: ItemslistTypes) => {
        expect(container.getByTestId('item-image')).toHaveAttribute('src', item.cover_image_url);
        expect(container.getByTestId('item-title')).toEqual(item.title);
        expect(container.getByTestId('item-description')).toEqual(item.description);
        expect(container.getByTestId('item-net-price')).toEqual(
            item.discount > 0 ? item.net_price.formatted_value : '',
        );
        expect(container.getByTestId('item-retail-price')).toEqual(
            item?.retail_price?.formatted_value,
        );
        const button = screen.getByTestId('item-cart-btn');
        expect(button).toHaveTextContent('Add to Cart');
        fireEvent.click(button);
        expect(button).toBeCalledTimes(1);
        expect(button).toHaveTextContent('In Cart');
        expect(button).toBeDisabled();
    });
});
