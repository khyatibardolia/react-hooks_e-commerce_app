import React from 'react';
import { act, waitFor, screen, waitForElementToBeRemoved } from '@testing-library/react';
import Products from '../index';
import { GetProducts } from '../../../redux/actions/helpers';
import { store } from '../../../index';
import { fnRenderComponentWithRedux } from '../../../utilities/fnRenderComponentWithRedux';

test('dispatch products action to store', async () => {
    const component = fnRenderComponentWithRedux(<Products />);
    await waitFor(() => expect(component.getByTestId('loader')).toBeInTheDocument());
    act(() => {
        const limit = 6,
            offset = 0;
        store.dispatch(GetProducts(limit, offset));
    });
    waitForElementToBeRemoved(() => screen.getByTestId('loader'));
});
