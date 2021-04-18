describe('LOAD OK', () => {
    it('should load without crashing', function () {
        cy.visit('http://localhost:3000');
    });
    it('should have the right initial state', function () {
        cy.window()
            .its('store')
            .invoke('getState')
            .should('deep.equal', {
                AppReducer: {
                    products: [],
                    perPageProducts: [],
                    cartItems: [],
                    wishList: [],
                    totalItemsInCart: 0,
                    totalItemsInWishlist: 0,
                },
            });
    });
    it('product list fetched successfully from API', () => {
        cy.window().its('store').invoke('dispatch', { type: 'FETCH_PRODUCTS' });
        cy.request('GET', 'https://api.musement.com/api/v3/venues/164/activities').then(
            (response) => {
                expect(response.status).equal(200);
                expect(response.body.data).equal(response?.data);
                expect(response.body).to.not.be.null;
            },
        );
    });
    it('load 6 products per page', () => {
        cy.window()
            .its('store')
            .invoke('getState')
            .its('AppReducer.perPageProducts')
            .should('have.length', 6);
    });
});
