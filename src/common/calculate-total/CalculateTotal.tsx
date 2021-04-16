import React from 'react';
import { routes } from '../../constants/routes';
import { fnFormatCurrency } from '../../utilities/fnFormatCurrency';
import { useHistory } from 'react-router-dom';
import { ItemslistTypes } from '../../components/products/items-list/itemslist.types';

type Props = {
    data?: ItemslistTypes[];
};

const CalculateTotal: React.FC<Props> = ({ data }: Props) => {
    const history = useHistory();

    return (
        <>
            <div className={`cart__shop-section col-lg-6 col-md-6 col-sm-12 d-flex`}>
                <div className="cart__btn">
                    <button
                        onClick={() => history.push(routes.PRODUCTS)}
                        className="product__add-to-cart button button--primary"
                    >
                        Continue Shopping
                    </button>
                </div>
            </div>
            {data && data.length ? (
                <div className="col-lg-6 col-md-6 col-sm-12 d-flex justify-content-end">
                    <div className="cart__total__procced">
                        <h6 className={'m-0 border-bottom p-1'}>Total</h6>
                        <div className={'m-0 cart__subtotal'}>
                            <div className={'px-1'}>
                                Sub-Total{' '}
                                <span>
                                    {fnFormatCurrency(
                                        data.reduce(
                                            (a: any, c: any) => a + c.retail_price * c.quantity,
                                            0,
                                        ),
                                    )}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            ) : null}
        </>
    );
};
export default CalculateTotal;
