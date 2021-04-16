import React, { useEffect, useState } from 'react';
import './headerStyle.scss';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { routes } from '../../constants/routes';
import { fnFormatCurrency } from '../../utilities/fnFormatCurrency';

const Header: React.FC = () => {
    const { totalItemsInWishlist, totalItemsInCart, cartItems } = useSelector(
        (state: any) => state.AppReducer,
    );
    const history = useHistory();

    const [cartData, setCartData] = useState(cartItems);

    useEffect(() => {
        setCartData(cartItems);
    }, [cartItems]);
    return (
        <header className="header shadow">
            <h1 className="page-title m-0">
                <span
                    className={'outline-none'}
                    role="button"
                    tabIndex={0}
                    onKeyDown={() => history.push(routes.PRODUCTS)}
                    onClick={() => history.push(routes.PRODUCTS)}
                >
                    The Plaza
                </span>
            </h1>
            <aside className="header-bag">
                <div className="header-bag__item header-bag__count">
                    <div className="header-bag__price">
                        {fnFormatCurrency(
                            cartData.reduce((a: any, c: any) => a + c.retail_price * c.quantity, 0),
                        )}
                    </div>
                    <svg
                        className="icon"
                        width="17px"
                        height="18px"
                        viewBox="36 8 17 18"
                        version="1.1"
                        xmlns="http://www.w3.org/2000/svg"
                        onClick={() => history.push(routes.VIEWCART)}
                    >
                        <title>Bag Icon</title>
                        <path
                            d="M52.997701,12.8571429 L49.3553365,12.8571429 L49.3553365,8 L39.6423645,8 L39.6423645,12.8571429 L36,12.8571429 L36,25 L52.997701,25 L52.997701,12.8571429 Z M42.0706075,10.4285714 L46.9270935,10.4285714 L46.9270935,12.8571429 L42.0706075,12.8571429 L42.0706075,10.4285714 Z"
                            id="Bag-Icon"
                            stroke="none"
                            fill={'white'}
                        />
                    </svg>
                    <span className="bag__item-counter">{totalItemsInCart}</span>
                </div>
                <div className="header-bag__item header-bag__wishlist-count">
                    <svg
                        className="icon"
                        width="20px"
                        height="20px"
                        viewBox="0 6 20 20"
                        version="1.1"
                        xmlns="http://www.w3.org/2000/svg"
                        onClick={() => history.push(routes.VIEW_WISHLIST)}
                    >
                        <title>Wishlist Icon</title>
                        <polygon
                            id="Wishlist-Icon"
                            stroke="none"
                            fill={'white'}
                            points="12.3598869 13.2675869 20 13.2675869 13.8200565 17.7545318 16.1782804 25.0221187 9.99833694 20.5318477 3.81839348 25.0221187 6.17994346 17.7545318 0 13.2675869 7.63678696 13.2675869 9.99833694 6"
                        />
                    </svg>
                    <span className="bag__item-counter">{totalItemsInWishlist}</span>
                </div>
            </aside>
        </header>
    );
};
export default Header;
