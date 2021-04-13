import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.scss';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import reducers from './redux/reducers/index';
import thunk from 'redux-thunk';

const store = createStore(
    reducers,
    compose(
        applyMiddleware(thunk),
        (window as any).__REDUX_DEVTOOLS_EXTENSION__ &&
            (window as any).__REDUX_DEVTOOLS_EXTENSION__(),
    ),
);

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </React.StrictMode>,
    document.getElementById('root'),
);
