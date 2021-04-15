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
    const [offset, setoffset] = useState(0);
    const dispatch = useDispatch();
    const PER_PAGE = 6;

    const handlePageClick = ({ selected: selectedPage }: any) => {
        setoffset(selectedPage * PER_PAGE);
        setCurrentPage(selectedPage);
        fetchProducts();
    };

    console.log('currentPage', currentPage);

    console.log('offset', offset);
    useEffect(() => {
        if (products && products.length) {
            setPageCount(Math.ceil(products.length / PER_PAGE));
        }
    }, [products]);

    const fetchProducts = useCallback(() => {
        setLoader(true);
        dispatch(GetProducts(PER_PAGE, offset)).then(() => {
            // setFinalProducts(res.payload);
            setLoader(false);
        });
    }, [dispatch, offset]);

    useEffect(() => {
        if (products && !products.length) {
            dispatch(GetProducts()).then(() => {
                fetchProducts();
            });
        }
    }, [dispatch, fetchProducts, products]);

    return (
        <main className="product-page h-100">
            <div className="container">
                {isLoading ? (
                    <div className={'d-flex justify-content-center align-items-center'}>
                        <span className="spinner-border loader" role="status" />
                    </div>
                ) : currentPageProducts && currentPageProducts.length ? (
                    <ItemsList products={currentPageProducts} />
                ) : (
                    <div>No data</div>
                )}
            </div>
            {!isLoading && currentPageProducts && currentPageProducts.length ? (
                <div className={'p-4 d-flex justify-content-center'}>
                    <ReactPaginate
                        previousLabel={'<'}
                        nextLabel={'>'}
                        breakLabel={'...'}
                        breakClassName={'break-me'}
                        pageCount={pageCount}
                        marginPagesDisplayed={2}
                        pageRangeDisplayed={5}
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
            ) : null}
        </main>
    );
};
export default Navigation(Products);
