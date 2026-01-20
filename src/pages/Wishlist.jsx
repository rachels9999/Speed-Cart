import React from 'react'
import Header from '../components/Header'
import { Link } from 'react-router-dom'
import { removeItem } from '../redux/slices/wishlistSlice'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart } from '../redux/slices/cartSlice'

const Wishlist = () => {

    const userCart = useSelector(state => state.cartReducer)
    const userWishlist = useSelector(state => state.wishlistReducer)
    const dispatch = useDispatch()


    const handleCart = (product) => {
        
        dispatch(addToCart(product))
        const existingProduct = userCart?.find(item => item?.id == product?.id)
        if (existingProduct) {
            alert("Product Quantity incrementing!")
        } else {
            alert("Product added to cart!")
        }
        dispatch(removeItem(product?.id))
    }


    return (
        <>
            <Header />
            <div style={{ paddingTop: '100px' }} className='px-5'>
                {
                    userWishlist?.length > 0 ? (
                        <>
                            <h1 className='text-4xl font-bold text-blue-600 text-center'>My Wishlist</h1>
                            <div className='grid grid-cols-4 gap-4'>
                                {
                                    userWishlist?.map((product) => (
                                        <div key={product?.id} className='rounded border border-orange-800 p-2 shadow'>
                                            <img width={'100%'} height={'200px'} src={product?.thumbnail} alt="no image" />
                                            <div className='text-center'>
                                                <h3 className='text-xl font-bold'>{product?.title}</h3>
                                                <div className='flex justify-evenly mt-3'>
                                                    <button onClick={() => dispatch(removeItem(product?.id))} className='text-xl'><i className='fa-solid fa-heart-circle-xmark text-red-500'></i></button>
                                                    <button onClick={() => handleCart(product)} className='text-xl'><i className='fa-solid fa-cart-plus text-green-500'></i></button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                            </div>
                        </>
                    ) : (
                        <div className='flex flex-col justify-center items-center'>
                            <img className='w-100 h-1/2' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0PrfbyN35WUqeZ9Z2aIuF1j0KtWzPfN6WmQ&s" alt="empty cart" />
                            <h1 className='text-3xl text-blue-600'>Your Wishlist is empty</h1>
                        </div>
                    )}

            </div>
        </>
    )
}

export default Wishlist