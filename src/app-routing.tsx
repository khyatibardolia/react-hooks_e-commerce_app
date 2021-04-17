import React from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import { routes } from './constants/routes';
import Products from './components/products';
import ViewCart from './components/cart/ViewCart';
import ViewWishlist from './components/wishlist/ViewWishlist';
import PageNotFound from './components/page-not-found/PageNotFound';

const AppRouting: React.FC = () => {
    return (
        <Switch>
            <Route exact path={routes.PRODUCTS} component={Products} />
            <Route exact path={routes.VIEWCART} component={ViewCart} />
            <Route exact path={routes.VIEW_WISHLIST} component={ViewWishlist} />
            <Route component={PageNotFound} />
        </Switch>
    );
};
export default withRouter(AppRouting);
