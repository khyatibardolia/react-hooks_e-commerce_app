import React from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import { routes } from './constants/routes';
import Products from './components/products';

const AppRouting: React.FC = () => {
    return (
        <Switch>
            <Route exact path={routes.PRODUCTS} component={Products} />
        </Switch>
    );
};
export default withRouter(AppRouting);
