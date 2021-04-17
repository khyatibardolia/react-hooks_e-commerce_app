import React from 'react';
import App from './App';
import { Provider } from 'react-redux';
import { store } from './index';
import { render } from '@testing-library/react';

test('app renders without crashing', () => {
    render(
        <Provider store={store}>
            <App />
        </Provider>,
    );
});
