import React from 'react';
import { Navigation } from '../../common/hoc/Navigation';
import './cartStyle.scss';
import Table from '../../common/table/Table';
import { useSelector } from 'react-redux';
import { fnFormatCurrency } from '../../utilities/fnFormatCurrency';
import { routes } from '../../constants/routes';
import { useHistory } from 'react-router-dom';
const ViewCart = () => {
    const cartItems = useSelector((state: any) => {
        return state?.AppReducer?.cartItems;
    });
    const history = useHistory();
    const tableHeadArr = [
        {
            title: 'Product',
        },
        {
            title: 'Price',
        },
        {
            title: 'Quantity',
        },
        {
            title: 'Total',
        },
    ];
    return (
        <>
            <section className="shop-cart">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <Table tableHeadArr={tableHeadArr} data={cartItems} />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-6 col-md-6 col-sm-6">
                            <div className="cart__btn w-50">
                                <button
                                    onClick={() => history.push(routes.PRODUCTS)}
                                    className="product__add-to-cart button button--primary"
                                >
                                    Continue Shopping
                                </button>
                            </div>
                        </div>
                        {cartItems && cartItems.length ? (
                            <div className="col-lg-6 col-md-6 col-sm-6 d-flex justify-content-end">
                                <div className="cart__total__procced">
                                    <h6 className={'m-0 border-bottom p-1'}>Cart total</h6>
                                    <div className={'m-0 cart__subtotal'}>
                                        <div className={'px-1'}>
                                            Sub-Total{' '}
                                            <span>
                                                {fnFormatCurrency(
                                                    cartItems.reduce(
                                                        (a: any, c: any) =>
                                                            a + c.retail_price * c.quantity,
                                                        0,
                                                    ),
                                                )}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : null}
                    </div>
                </div>
            </section>
        </>
    );
};
export default Navigation(ViewCart);
