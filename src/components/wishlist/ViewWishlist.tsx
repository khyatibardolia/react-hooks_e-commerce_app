import React, { useCallback, useEffect, useState } from 'react';
import { Navigation } from '../../common/hoc/Navigation';
import { useDispatch, useSelector } from 'react-redux';
import { addWishlistItemsToCart, removeFromWishList } from '../../redux/actions/helpers';
import Table from '../../common/table/Table';
import '../../common/scss/style.scss';
import CalculateTotal from '../../common/calculate-total/CalculateTotal';
import { ProductType } from '../types/product-list.types';

const ViewWishlist: React.FC = () => {
    const wishListData = useSelector((state: any) => {
        return state?.AppReducer?.wishList;
    });
    const [wishList, setWishListData] = useState<ProductType[]>(wishListData);
    const tableHeadArr = [
        {
            title: 'Product',
        },
        {
            title: 'Price',
        },
        {
            title: 'Total',
        },
    ];

    useEffect(() => {
        setWishListData(wishListData);
    }, [wishListData, wishList]);

    const dispatch = useDispatch();

    const removeWishlistItem = useCallback(
        (product: ProductType) => {
            dispatch(removeFromWishList(product));
        },
        [dispatch],
    );

    const addWishlistItemToCart = useCallback(
        (product: ProductType) => {
            dispatch(addWishlistItemsToCart(product));
        },
        [dispatch],
    );

    return (
        <section className="shop-cart py-2">
            <div className={'shop-cart__banner'}>
                <h2>Shopping WishList</h2>
                <span className={'text-dark fs-15'}>{'Home > Wishlist'}</span>
            </div>
            <div className="container py-4">
                <div className="row">
                    <div className="col-lg-12">
                        <Table
                            data={wishList}
                            tableHeadArr={tableHeadArr}
                            addWishlistItemToCart={addWishlistItemToCart}
                            removeWishlistItem={removeWishlistItem}
                        />
                    </div>
                </div>
                <div className="row">
                    <CalculateTotal data={wishList} />
                </div>
            </div>
        </section>
    );
};
export default Navigation(ViewWishlist);
