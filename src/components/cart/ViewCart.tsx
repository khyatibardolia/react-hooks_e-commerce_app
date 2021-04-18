import React, { useCallback, useEffect, useState } from 'react';
import { Navigation } from '../../common/hoc/Navigation';
import '../../common/scss/style.scss';
import Table from '../../common/table/Table';
import { useDispatch, useSelector } from 'react-redux';
import { removeFromCart, updateProductQty } from '../../redux/actions/helpers';
import CalculateTotal from '../../common/calculate-total/CalculateTotal';

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
        (event: React.ChangeEvent<HTMLInputElement>, product: Cart) => {
            const newArr = cartData.map((item) => {
                if (item.uuid === product.uuid) {
                    item.quantity = event.target.value;
                    dispatch(updateProductQty(item));
                    return { ...item };
                } else {
                    return item;
                }
            });
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

    return (
        <section className="shop-cart py-2">
            <div className={'shop-cart__banner'}>
                <h2>Shopping Cart</h2>
                <span className={'text-dark fs-15'}>{'Home > Cart'}</span>
            </div>
            <div className="container py-4">
                <div className="row">
                    <div className="col-lg-12">
                        <Table
                            data={cartData}
                            isCartPage={true}
                            tableHeadArr={tableHeadArr}
                            handleChange={handleChange}
                            removeCartItem={removeCartItem}
                        />
                    </div>
                </div>
                <div className="row">
                    <CalculateTotal data={cartData} />
                </div>
            </div>
        </section>
    );
};
export default Navigation(ViewCart);
