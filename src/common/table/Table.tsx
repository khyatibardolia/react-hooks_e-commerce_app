import React, { useCallback, useEffect, useState } from 'react';
import './tableStyle.scss';
import { ItemslistTypes } from '../../components/products/items-list/itemslist.types';
import { fnFormatCurrency } from '../../utilities/fnFormatCurrency';
import { removeFromCart } from '../../redux/actions/helpers';
import { useDispatch } from 'react-redux';

interface TableHead {
    title: string;
}
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
type Props = {
    tableHeadArr: TableHead[];
    data: Cart[];
};

const Table: React.FC<Props> = ({ tableHeadArr, data }: Props) => {
    console.log('data', data);
    const [productData, setProductData] = useState<Cart[]>(data);
    const dispatch = useDispatch();
    const handleChange = useCallback(
        (event: any, product: any) => {
            const newArr = productData.map((item) => {
                if (item.uuid === product.uuid) {
                    item.quantity = event.target.value;
                    return { ...item };
                } else {
                    return item;
                }
            });
            setProductData(newArr);
        },
        [productData],
    );
    console.log('removeCartItem');

    const removeCartItem = useCallback(
        (product: Cart) => {
            /*dispatch(removeFromCart(product));
            const newArr = productData.map((item) => {
                if (item.uuid === product.uuid) {
                    return { ...item };
                } else {
                    return item;
                }
            });
            setProductData(newArr);*/
            console.log('prod before', productData);
            // setProductData(productData);
        },
        [productData],
    );
    console.log('prod after', productData);

    return (
        <div className="shop__cart__table">
            <table>
                <thead>
                    <tr>
                        {tableHeadArr.map((item, index) => (
                            <th className="p-1" key={index}>
                                {item.title}
                            </th>
                        ))}
                        <th />
                    </tr>
                </thead>
                <tbody>
                    {productData && productData.length ? (
                        productData.map((item) => {
                            console.log(
                                'total',
                                parseInt(item?.retail_price, 10) * parseInt(item.quantity, 10),
                            );
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
                    )}
                </tbody>
            </table>
        </div>
    );
};
export default Table;
