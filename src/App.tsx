import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppRouting from './app-routing';
import 'bootstrap/dist/css/bootstrap.min.css';

const App: React.FC = () => {
    return (
        <BrowserRouter>
            <AppRouting />
        </BrowserRouter>
    );
};

export default App;
