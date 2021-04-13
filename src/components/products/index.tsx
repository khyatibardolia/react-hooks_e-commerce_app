import React, { useCallback, useEffect, useState } from 'react';
import { Navigation } from '../../common/hoc/Navigation';
import './index.scss';
import ItemsList from './items-list/ItemsList';
import ReactPaginate from 'react-paginate';
import { useDispatch } from 'react-redux';
import { GetProducts } from '../../redux/actions/helpers';

/*type initialState = {
    AppReducer: appState;
};*/

const Products = () => {
    const [products, setProducts] = useState([]);
    const [finalProducts, setFinalProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [isLoading, setLoader] = useState(false);

    /* const allProducts: Array<[]> | any = useSelector((state: initialState) => {
        console.log('state', state);
        return state?.AppReducer?.products;
    });*/
    const dispatch = useDispatch();
    const PER_PAGE = 6;

    const handlePageClick = ({ selected: selectedPage }: any) => {
        setCurrentPage(selectedPage);
        currentPageData();
    };
    const offset = currentPage * PER_PAGE;
    const currentPageData = () => {
        fetchProducts();
    };

    const pageCount = Math.ceil(products.length / PER_PAGE);

    const fetchProducts = useCallback(() => {
        setLoader(true);
        dispatch(GetProducts(PER_PAGE, offset)).then((res: any) => {
            setFinalProducts(res.payload);
            setLoader(false);
        });
    }, [dispatch, offset]);

    useEffect(() => {
        dispatch(GetProducts()).then((res: any) => {
            setProducts(res.payload);
        });
        fetchProducts();
    }, [dispatch, offset, fetchProducts]);

    return (
        <main className="product-page">
            <div className="container">
                {isLoading ? (
                    'Loading...'
                ) : (
                    <>
                        <ItemsList products={finalProducts} />
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
                    </>
                )}
            </div>
        </main>
    );
};
export default Navigation(Products);
