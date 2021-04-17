import { act, render, waitFor, screen, waitForElementToBeRemoved } from '@testing-library/react';
import Products from './index';
import { Provider } from 'react-redux';
import { store } from '../../index';
import React, { useState } from 'react';
import { appState } from '../../redux/reducers/appState.types';
import { createStore } from 'redux';
import axios from 'axios';
import { GetProducts } from '../../redux/actions/helpers';
import ItemsList from './items-list/ItemsList';

const renderWithRedux = (component: any, initialState?: any) => {
    return {
        ...render(<Provider store={store}>{component}</Provider>),
        store,
        initialState,
    };
};

test('checks products component rendered', async () => {
    renderWithRedux(<Products />);
    /* await waitFor(() => expect(component.getByTestId('loader')).toBeInTheDocument());
    await waitForElementToBeRemoved(() => screen.getByTestId('loader'));
    await waitFor(() => expect(component.getByTestId('items-list')).toBeInTheDocument());*/
});

/*test('checks products component rendered', () => {
    const getByTestId  = renderWithRedux(<Products />);
    expect(getByTestId.containsMatchingElement(<ItemsList products={})).toEqual(true);
});*/
