import reducers from '../reducers/index';

test('should return the initial state', () => {
    const obj = {
        AppReducer: {
            cartItems: [],
            perPageProducts: [],
            products: [],
            totalItemsInCart: 0,
            totalItemsInWishlist: 0,
            wishList: [],
        },
    };
    expect(reducers(undefined, { type: '', payload: '' })).toEqual(obj);
});
