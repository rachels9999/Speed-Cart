import React from 'react'
import { Link } from 'react-router-dom'
import Header from '../components/Header'


const OrderSuccess = () => {
    

  return (
    <>
    <Header/>
    <div className='flex flex-col justify-center items-center mt-32'>
        <h1 className='text-4xl font-bold text-green-600'>Order Placed Successfully!!</h1>
        <p className='mt-4'>Thank you for shopping with us. Hope you enjoyed!</p>
        <Link to="/" className='mt-6 bg-violet-600 text-white px-6 py-2 rounded'>
        Continue Shopping</Link>
    </div>
    
     
    
    </>
  )
}

export default OrderSuccess