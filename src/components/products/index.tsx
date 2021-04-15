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
    const allProducts: Array<[]> | any = useSelector((state: initialState) => {
        return state?.AppReducer?.products;
    });
    const perPageProducts: Array<[]> | any = useSelector((state: initialState) => {
        return state?.AppReducer?.perPageProducts;
    });
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
        if (allProducts && allProducts.length) {
            setPageCount(Math.ceil(allProducts.length / PER_PAGE));
        }
    }, [allProducts]);

    const fetchProducts = useCallback(() => {
        setLoader(true);
        dispatch(GetProducts(PER_PAGE, offset)).then((res: any) => {
            // setFinalProducts(res.payload);
            setLoader(false);
        });
    }, [dispatch, offset]);

    useEffect(() => {
        if (allProducts && !allProducts.length) {
            dispatch(GetProducts()).then((res: any) => {
                fetchProducts();
            });
        }
    }, [dispatch, fetchProducts, allProducts]);

    return (
        <main className="product-page">
            {perPageProducts && perPageProducts.length ? (
                <div className="container">
                    {isLoading ? (
                        <div className={'d-flex justify-content-center align-items-center'}>
                            <span className="spinner-border loader" role="status" />
                        </div>
                    ) : (
                        <ItemsList products={perPageProducts} />
                    )}
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
                </div>
            ) : (
                <div className={'text-center'}>No data found...</div>
            )}
        </main>
    );
};
export default Navigation(Products);
