import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { decrementQuantity, emptycart, incrementQuantity, removeCartItem } from '../redux/slices/cartSlice'

const Cart = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const userCart = useSelector(state=>state.cartReducer)
    const [cartTotal,setCartTotal] = useState(0)

    useEffect(()=>{
        if(userCart?.length>0){
            setCartTotal(userCart?.map(item=>item.totalPrice).reduce((a1,a2)=>a1+a2))
        }
    },[userCart])


    const handleDecrementQuantity = (product)=>{
        if(product?.quantity>1){
            dispatch(decrementQuantity(product?.id))
        }else{
            dispatch(removeCartItem(product?.id))
        }
    }

    const checkout = ()=>{
        dispatch(emptycart())
        alert("Order received...Thank you for shopping!")
        navigate('/')
    }


    return (
        <>
            <Header />
            <div style={{ paddingTop: '100px' }} className='px-5'>
                {
                    userCart?.length > 0 ?
                        <>
                            <h1 className='text-5xl font-bold text-blue-600'>Cart Summary</h1>
                            <div className='grid grid-cols-3 gap-4 mt-5'>
                                <div className='col-span-2 border rounded p-5 shadow'>
                                    <table className='table-auto w-full'>
                                        <thead>
                                            <tr>
                                                <td className='font-semibold'>#</td>
                                                <td className='font-semibold'>Name</td>
                                                <td className='font-semibold'>Image</td>
                                                <td className='font-semibold'>Quantity</td>
                                                <td className='font-semibold'>Price</td>
                                                <td className='font-semibold'>...</td>
                                            </tr>
                                        </thead>
                                        <tbody>
                                           {
                                            userCart?.map((product,index)=>(
                                                 <tr key={product?.id}>
                                                <td>{index+1}</td>
                                                <td>{product?.title}</td>
                                                <td><img width={'70px'} height={'70px'} src={product?.thumbnail} alt="no image" /></td>
                                                <td>
                                                    <div className='flex'>
                                                        <button onClick={()=>handleDecrementQuantity(product)} className='font-bold'>-</button>
                                                        <input style={{ width: '40px' }} type="text" className='border p-1 rounded' value={product?.quantity} />
                                                        <button onClick={()=>dispatch(incrementQuantity(product?.id))} className='font-bold'>+</button>
                                                    </div>
                                                </td>
                                                <td>${product?.totalPrice}</td>
                                                <td>
                                                    <button onClick={()=>dispatch(removeCartItem(product?.id))} className='text-red-600'><i class="fa-solid fa-trash"></i></button>
                                                </td>

                                            </tr>
                                            ))
                                           }
                                        </tbody>
                                    </table>
                                    <div className='float-right mt-5'>
                                        <button onClick={()=>dispatch(emptycart())} className='bg-red-600 rounded p-2 text-white'>Empty Cart</button>
                                        <Link to={'/'} className='bg-blue-600 ms-3 rounded p-2 text-white'>Shop More</Link>
                                    </div>
                                </div>
                                <div className='col-span-1'>
                                    <div className='border rounded shadow p-5'>
                                        <h2 className='text-2xl font-bold'>
                                            Total Amount: <span className='text-red-600'>${cartTotal}</span></h2>
                                        <hr />
                                        <Link to="/checkout" className='block text-center bg-green-600 hover:bg-green-700 transition text-white font-semibold rounded px-4 py-3 mt-2 w-full'>Proceed to Checkout</Link>
                                    </div>

                                </div>

                            </div>
                        </>
                        :
                        <div className='flex flex-col justify-center items-center'>
                            <img className='w-100 h-1/2' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0PrfbyN35WUqeZ9Z2aIuF1j0KtWzPfN6WmQ&s" alt="empty cart" />
                            <h1 className='text-3xl text-blue-800'>Your cart is empty</h1>
                        </div>
                }

            </div>

        </>
    )
}

export default Cart