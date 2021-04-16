import React, { useEffect, useState } from 'react';
import { ItemslistTypes } from './itemslist.types';
import { addItemsToCart, addItemsToWishList } from '../../../redux/actions/helpers';
import { useDispatch } from 'react-redux';

type Props = {
    products: ItemslistTypes[];
};
const ItemsList: React.FC<Props> = ({ products }: Props) => {
    const dispatch = useDispatch();

    const [pData, setpData] = useState(products);
    useEffect(() => {
        setpData(products);
    }, [products]);

    const addItemsToCartOrWishList = (product: any, type: string) => {
        const isCart = type === 'cart';
        if (isCart) {
            dispatch(addItemsToCart(product));
        } else {
            dispatch(addItemsToWishList(product));
        }
        const newArr = pData.map((item) => {
            if (item.uuid === product.uuid) {
                if (isCart) {
                    item.itemAddedToCart = true;
                } else {
                    item.isFavorite = !item.isFavorite;
                }
                return { ...item };
            } else {
                return item;
            }
        });
        setpData(newArr);
    };

    return (
        <div className="product-list row">
            {pData && pData.length
                ? pData.map((item) => {
                      return (
                          <div
                              key={item.uuid}
                              className="col-sm-12 col-lg-4 col-md-6 product-list__item"
                          >
                              <article
                                  className="product shadow-sm"
                                  itemScope
                                  itemType="http://schema.org/Product"
                              >
                                  <figure className="product__image-wrapper m-0">
                                      <img
                                          className="product__image"
                                          src={item.cover_image_url}
                                          alt="Product"
                                          itemProp="image"
                                      />
                                      <button
                                          onClick={() => addItemsToCartOrWishList(item, 'wishlist')}
                                          className="product__wishlist-button button button--round button--wishlist"
                                      >
                                          <svg
                                              className={`icon ${
                                                  item.isFavorite ? 'favorite' : ''
                                              }`}
                                              width="20px"
                                              height="20px"
                                              viewBox="0 6 20 20"
                                              version="1.1"
                                              xmlns="http://www.w3.org/2000/svg"
                                          >
                                              <title>Wishlist Icon</title>
                                              <polygon
                                                  id="Wishlist-Icon"
                                                  stroke="none"
                                                  fill="evenodd"
                                                  points="12.3598869 13.2675869 20 13.2675869 13.8200565 17.7545318 16.1782804 25.0221187 9.99833694 20.5318477 3.81839348 25.0221187 6.17994346 17.7545318 0 13.2675869 7.63678696 13.2675869 9.99833694 6"
                                              />
                                          </svg>
                                      </button>
                                  </figure>
                                  <div className="product__details">
                                      <div className={'h-75'}>
                                          <h1 className="product__title" itemProp="brand">
                                              {item.title}
                                          </h1>
                                          <p className="product__subtitle" itemProp="description">
                                              {item.description}
                                          </p>
                                          <div
                                              className="product__price"
                                              itemScope
                                              itemType="http://schema.org/Offer"
                                          >
                                              <span className="product__price--strike">
                                                  {item.discount > 0
                                                      ? item.net_price.formatted_value
                                                      : ''}
                                              </span>
                                          </div>
                                      </div>
                                      <div>
                                          <span
                                              className="product__price--discounted"
                                              itemProp="price"
                                          >
                                              {item?.retail_price?.formatted_value}
                                          </span>
                                          <button
                                              disabled={item.itemAddedToCart}
                                              onClick={() => addItemsToCartOrWishList(item, 'cart')}
                                              className={`product__add-to-cart button button--primary ${
                                                  item.itemAddedToCart ? 'disable-btn' : ''
                                              }`}
                                          >
                                              {!item.itemAddedToCart ? 'Add to Cart' : 'In Cart'}
                                          </button>
                                      </div>
                                  </div>
                              </article>
                          </div>
                      );
                  })
                : null}
        </div>
    );
};
export default ItemsList;
