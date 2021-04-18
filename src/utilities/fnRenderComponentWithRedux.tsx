import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../index';
import React, { ReactElement } from 'react';
import { appState } from '../redux/reducers/appState.types';

export const fnRenderComponentWithRedux = (
    component: ReactElement,
    initialState?: appState,
): any => {
    return {
        ...render(<Provider store={store}>{component}</Provider>),
        store,
        initialState,
    };
};
