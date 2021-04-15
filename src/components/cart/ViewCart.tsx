import React, { useCallback, useEffect, useState } from 'react';
import { Navigation } from '../../common/hoc/Navigation';
import './cartStyle.scss';
import Table from '../../common/table/Table';
import { useDispatch, useSelector } from 'react-redux';
import { fnFormatCurrency } from '../../utilities/fnFormatCurrency';
import { routes } from '../../constants/routes';
import { useHistory } from 'react-router-dom';
import { removeFromCart, updateProductQty } from '../../redux/actions/helpers';
interface Cart {
    uuid: number;
    cover_image_url: string;
    title: number;
    description: number;
    discount: number;
    quantity?: any;
    net_price: any;
    retail_price: any;
}
const ViewCart = () => {
    const cartItems = useSelector((state: any) => {
        return state?.AppReducer?.cartItems;
    });
    const [cartData, setCartData] = useState<Cart[]>(cartItems);
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

    useEffect(() => {
        setCartData(cartItems);
    }, [cartItems, cartData]);

    const dispatch = useDispatch();

    const handleChange = useCallback(
        (event: any, product: any) => {
            const newArr = cartData.map((item) => {
                if (item.uuid === product.uuid) {
                    item.quantity = event.target.value;
                    dispatch(updateProductQty(item));
                    return { ...item };
                } else {
                    return item;
                }
            });
            //   dispatch(updateProductQty(product));
            setCartData(newArr);
        },
        [dispatch, cartData],
    );

    const removeCartItem = useCallback(
        (product: Cart) => {
            dispatch(removeFromCart(product));
        },
        [dispatch],
    );

    const renderTableData = () => {
        return cartData && cartData.length ? (
            cartData.map((item: any) => {
                return (
                    <tr key={item.uuid}>
                        <td className="cart__product__item">
                            <img
                                src={item.cover_image_url}
                                width={'150px'}
                                height={'100px'}
                                alt="Product"
                            />
                            <div className="cart__product__item__title">
                                <h6>{item.title}</h6>
                            </div>
                        </td>
                        <td className="cart__price">{item?.retail_price}</td>
                        <td className="cart__quantity">
                            <div className="pro-qty">
                                <input
                                    onChange={(e) => handleChange(e, item)}
                                    type="number"
                                    min={1}
                                    defaultValue={item.quantity ? item.quantity : 1}
                                />
                            </div>
                        </td>
                        <td className="cart__total">
                            {fnFormatCurrency(item?.retail_price * item.quantity)}
                        </td>
                        <td className="cart__close">
                            <span
                                role={'button'}
                                tabIndex={0}
                                className="icon_close"
                                onClick={() => removeCartItem(item)}
                                onKeyDown={() => removeCartItem(item)}
                            >
                                <i className="fa fa-times" aria-hidden="true" />
                            </span>
                        </td>
                    </tr>
                );
            })
        ) : (
            <tr>
                <td colSpan={tableHeadArr.length} className={'text-center'}>
                    <h5 className={'m-0'}>No items in cart...</h5>
                </td>
            </tr>
        );
    };

    console.log('cartDatacartDatacartDatacartDatacartData', cartData);
    return (
        <section className="shop-cart">
            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        <Table tableHeadArr={tableHeadArr} renderTableData={renderTableData} />
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
                    {cartData && cartData.length ? (
                        <div className="col-lg-6 col-md-6 col-sm-6 d-flex justify-content-end">
                            <div className="cart__total__procced">
                                <h6 className={'m-0 border-bottom p-1'}>Cart total</h6>
                                <div className={'m-0 cart__subtotal'}>
                                    <div className={'px-1'}>
                                        Sub-Total{' '}
                                        <span>
                                            {fnFormatCurrency(
                                                cartData.reduce(
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
    );
};
export default Navigation(ViewCart);
