import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchproducts, filterByCategory, sortByPrice } from '../redux/slices/productSlice'
import { all } from "axios";

const Home = () => {
    const dispatch = useDispatch()
    const { allProducts, loading, errorMsg } = useSelector(state => state.productReducer)
    const [showFilter, setShowFilter] = useState(false)


    console.log(allProducts, loading, errorMsg);

    // pagination
    const [currentPage, setCurrentPage] = useState(1)
    const productPerPage = 8
    const totalPages = Math.ceil(allProducts?.length / productPerPage)
    const currentPageProductLastIndex = currentPage * productPerPage
    const currentPageProductFirstIndex = currentPageProductLastIndex - productPerPage
    const visibleAllProducts = allProducts?.slice(currentPageProductFirstIndex, currentPageProductLastIndex)

    useEffect(() => {
        dispatch(fetchproducts())
    }, [])

    const navigateToNextPage = () => {
        if (currentPage != totalPages) {
            setCurrentPage(currentPage + 1)
        }
    }

    const navigateToPrevPage = () => {
        if (currentPage != 1) {
            setCurrentPage(currentPage - 1)
        }
    }

    return (
        <>
            <Header insideHome={true} />

                {/*Filter Button*/}

                <div className='flex justify-end mb-4'>
                    <button onClick={() => setShowFilter(!showFilter)} className='flex items-center gap-2 bg-stone-500 text-white px-4 py-2 rounded'>
                        <i className='fa-solid fa-filter'></i>
                        {showFilter ? "Filter" : "Filter"}
                    </button>
                </div>

                {/*Filter section*/}
                {showFilter && (
                    <div className='flex flex-wrap gap-4 mb-6 bg-gray-100 p-4 rounded shadow'>
                        {/*Category Filter*/}
                        <select onChange={(e) => dispatch(filterByCategory(e.target.value))} className='p-2 border rounded'>
                            <option value="all">All Categories</option>
                            <option value="furniture">Furnitures</option>
                            <option value="groceries">Groceries</option>
                            <option value="fragrances">Fragrances</option>
                            <option value="beauty">Beauty</option>
                        </select>

                        {/*Price Filter*/}
                        <select onChange={(e) => dispatch(sortByPrice(e.target.value))} className='p-2 border rounded'>
                            <option value="">Sort By Price</option>
                            <option value="low">Low to High</option>
                            <option value="high">High to Low</option>
                        </select>

                    </div>
                )}






            <div style={{ paddingTop: "100px" }} className='container px-4 mx-auto'>
                {
                    loading ? (
                        <div className='flex-justify-center items-center my-5 mx-auto'>
                            <img width={'70px'} height={'70px'} src="data:image/png;base64,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"
                                alt="Loading..." />Loading...
                        </div>
                    ) : (
                        <div className='grid grid-cols-4 gap-4'>
                            {
                                allProducts.length > 0 ? (
                                    visibleAllProducts?.map((product) => (
                                        <div className='rounded border border-orange-800 p-2 shadow'>
                                            <img width={'100%'} height={'200px'} src={product?.thumbnail} alt="no image" />
                                            <div className='text-center'>
                                                <h3 className='text-xl font-bold'>{product?.title}</h3>
                                                <Link to={`${product?.id}/view`} className='bg-orange-800 rounded p-1 mt-3 text-white inline-block'>View More...</Link>
                                            </div>
                                        </div>
                                    ))

                                ) : (
                                    <div>Products not Found! </div>
                                )}
                        </div>
                    )}
            </div>



            {/* pagination */}

            <div className='text-2xl text-center font-bold mt-20'>
                <span onClick={navigateToPrevPage} className='cursor-pointer'><i className='fa-solid fa-backward me-5'></i></span>
                <span>{currentPage} of {totalPages}</span>
                <span onClick={navigateToNextPage} className='cursor-pointer'><i className='fa-solid fa-forward me-5'></i></span>
            </div>


        </>
    );
};

export default Home
