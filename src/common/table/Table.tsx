import React from 'react';
import './tableStyle.scss';
import { ItemslistTypes } from '../../components/products/items-list/itemslist.types';
import { fnFormatCurrency } from '../../utilities/fnFormatCurrency';

interface TableHead {
    title: string;
}

type Props = {
    tableHeadArr: TableHead[];
    data?: ItemslistTypes[];
    isCartPage?: boolean;
    handleChange?: (event: any, item: ItemslistTypes) => void;
    removeCartItem?: (item: ItemslistTypes) => void;
    removeWishlistItem?: (item: ItemslistTypes) => void;
    addWishlistItemToCart?: (item: ItemslistTypes) => void;
};

const Table: React.FC<Props> = ({
    tableHeadArr,
    data,
    isCartPage,
    handleChange,
    removeCartItem,
    removeWishlistItem,
    addWishlistItemToCart,
}: Props) => {
    return (
        <div className="shop__cart__table table-responsive">
            <table className={'table'}>
                {data && data.length ? (
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
                ) : null}
                <tbody>
                    {data && data.length ? (
                        data.map((item: any) => {
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
                                    {isCartPage ? (
                                        <td className="cart__quantity">
                                            <div className="pro-qty">
                                                <input
                                                    onChange={(e) =>
                                                        handleChange && handleChange(e, item)
                                                    }
                                                    type="number"
                                                    min={1}
                                                    defaultValue={item.quantity ? item.quantity : 1}
                                                />
                                            </div>
                                        </td>
                                    ) : null}
                                    <td className="cart__total">
                                        {fnFormatCurrency(item?.retail_price * item.quantity)}
                                    </td>
                                    <td className="cart__close">
                                        {isCartPage ? (
                                            <span
                                                role={'button'}
                                                tabIndex={0}
                                                className="icon_close"
                                                onClick={() =>
                                                    removeCartItem && removeCartItem(item)
                                                }
                                                onKeyDown={() =>
                                                    removeCartItem && removeCartItem(item)
                                                }
                                            >
                                                <i className="fa fa-times" aria-hidden="true" />
                                            </span>
                                        ) : (
                                            <>
                                                <button
                                                    onClick={() =>
                                                        addWishlistItemToCart &&
                                                        addWishlistItemToCart(item)
                                                    }
                                                    className="product__add-to-cart action-btn button button--primary"
                                                >
                                                    Add to cart
                                                </button>
                                                <button
                                                    onClick={() =>
                                                        removeWishlistItem &&
                                                        removeWishlistItem(item)
                                                    }
                                                    className="product__add-to-cart action-btn button delete--btn"
                                                >
                                                    <i className="fa fa-trash" aria-hidden="true" />{' '}
                                                    Delete
                                                </button>
                                            </>
                                        )}
                                    </td>
                                </tr>
                            );
                        })
                    ) : (
                        <tr>
                            <td colSpan={tableHeadArr.length} className={'text-center'}>
                                <h5 className={'m-0'}>
                                    {isCartPage
                                        ? 'Your cart is currently empty...'
                                        : 'No products added to wishlist...'}
                                </h5>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};
export default Table;
