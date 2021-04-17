import React, { useCallback, useEffect, useState } from 'react';
import { Navigation } from '../../common/hoc/Navigation';
import './index.scss';
import ItemsList from './items-list/ItemsList';
import ReactPaginate from 'react-paginate';
import { useDispatch, useSelector } from 'react-redux';
import { GetProducts } from '../../redux/actions/helpers';
import { appState } from '../../redux/reducers/appState.types';

type initialState = {
    AppReducer: appState;
};

const Products = () => {
    const { products, perPageProducts } = useSelector((state: initialState) => state.AppReducer);
    const [currentPageProducts, setCurrentPageProducts] = useState(perPageProducts);
    useEffect(() => {
        setCurrentPageProducts(perPageProducts);
    }, [perPageProducts]);
    const [currentPage, setCurrentPage] = useState(0);
    const [isLoading, setLoader] = useState(false);

    const [pageCount, setPageCount] = useState(0);
    const dispatch = useDispatch();
    const PER_PAGE = 6;

    const handlePageClick = ({ selected: selectedPage }: any) => {
        setCurrentPage(selectedPage);
        const offset = selectedPage * PER_PAGE;
        fetchProducts(offset);
    };

    useEffect(() => {
        if (products && products.length) {
            setPageCount(Math.ceil(products.length / PER_PAGE));
        }
    }, [products]);

    const fetchProducts = useCallback(
        (offset) => {
            setLoader(true);
            dispatch(GetProducts(PER_PAGE, offset)).then(() => {
                setLoader(false);
            });
        },
        [dispatch],
    );

    useEffect(() => {
        if (products && !products.length) {
            setLoader(true);
            dispatch(GetProducts()).then(() => {
                fetchProducts(currentPage * PER_PAGE);
            });
        }
    }, [dispatch, fetchProducts, products, currentPage]);

    return (
        <>
            <div className="product-page mt-4 container">
                {isLoading ? (
                    <div
                        data-testid="loader"
                        className={'vh-100 d-flex justify-content-center align-items-center'}
                    >
                        <span className="spinner-border loader" role="status" />
                    </div>
                ) : !isLoading && currentPageProducts?.length ? (
                    <ItemsList data-testid="items-list" products={currentPageProducts} />
                ) : (
                    <div className={'d-flex justify-content-center align-items-center'}>
                        <h4>No data found...</h4>
                    </div>
                )}
            </div>

            {!isLoading && currentPageProducts?.length ? (
                <div className={'p-4 d-flex justify-content-center align-items-center'}>
                    <div>
                        <ReactPaginate
                            previousLabel={'<'}
                            nextLabel={'>'}
                            breakLabel={'...'}
                            breakClassName={'break-me'}
                            pageCount={pageCount}
                            marginPagesDisplayed={2}
                            pageRangeDisplayed={5}
                            forcePage={currentPage}
                            onPageChange={handlePageClick}
                            containerClassName="pagination"
                            activeClassName="active"
                            pageLinkClassName="page-link"
                            breakLinkClassName="page-link"
                            nextLinkClassName="page-link"
                            previousLinkClassName="page-link"
                            pageClassName="page-item"
                            nextClassName="page-item"
                            previousClassName="page-item"
                        />
                    </div>
                </div>
            ) : null}
        </>
    );
};
export default Navigation(Products);
