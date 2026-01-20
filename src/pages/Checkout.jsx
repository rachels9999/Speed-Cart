import React, { useState } from 'react'
import Header from '../components/Header'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { clearCart } from '../redux/slices/cartSlice'
import { placeOrder } from '../redux/slices/ordersSlice'





const Checkout = () => {

    const [paymentMethod, setPaymentMethod] = useState("cod")
    const [address,setAddress] = useState("")
    const cartItems = useSelector(state => state.cartReducer)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const userMail = localStorage.getItem("userMail")

    const totalAmount = cartItems.reduce(
        (total, item) => total + item.price * item.quantity, 0
    )

    const handlePlaceOrder = () => {
        if (!paymentMethod) {
            alert("Please select a payment method")
            return;
        }
        if(!address.trim()){
            alert("Please enter your delivery address")
            return;
        }

        const newOrder = {
            id:Date.now(),
            userMail,
            items:cartItems,totalAmount,paymentMethod,address,
            orderDate:new Date().toLocaleString()
        }

        alert("Order placed successfully")
        dispatch(placeOrder(newOrder))      //save the order
        dispatch(clearCart())     // clears cart after placing order
        navigate("/order-success")
    }

    return (
        <>
            <Header />
            <div className='container mx-auto px-4 mt-24 grid grid-cols-1 md:grid-cols-3 gap-6'>

                <div className='md:col-span-2 bg-white p-6 rounded shadow'>
                    <h2 className='text-2xl font-bold mb-4'>Payment Methods</h2>
                    <div className='space-y-4'>
                        <label className='flex items-center gap-3'>
                            <input type="radio" value="cod" checked={paymentMethod === "cod"} onChange={(e) => setPaymentMethod(e.target.value)} />
                            Cash on Delivery
                        </label>

                        <label className='flex items-center gap-3'>
                            <input type="radio" value="card" checked={paymentMethod === "card"} onChange={(e) => setPaymentMethod(e.target.value)} />
                            Debit/Credit Card
                        </label>

                        <label className='flex items-center gap-3'>
                            <input type="radio" value="upi" checked={paymentMethod === "upi"} onChange={(e) => setPaymentMethod(e.target.value)} />
                            UPI
                        </label>
                    </div>

                {/*Address*/}
                <div className='mt-6'>
                    <h3 className='text-lg font-semibold mb-2'>Address</h3>
                    <textarea value={address} onChange={(e)=>setAddress(e.target.value)} className='w-full p-3 border rounded' placeholder='Please enter your delivery address' rows={4}></textarea>
                </div>

                </div>

                {/*Order Summary*/}
                <div className='bg-gray-100 p-6 rounded shadow'>
                    <h2 className='text-2xl font-bold mb-4'>Order Summary</h2>

                    {cartItems.length > 0 ? (
                        <>
                            {cartItems.map(item => (
                                <div key={item.id} className='flex justify-between mb-2'>
                                    <span>{item.title}*{item.quantity}</span>
                                    <span>${item.price * item.quantity}</span>
                                </div>
                            ))}
                            <div className='flex justify-between font-bold text-lg'>
                                <span>Total</span>
                                <span>${totalAmount}</span>
                            </div>
                            <button onClick={handlePlaceOrder} className='mt-6 w-full bg-green-600 text-white py-3 rounded hover:bg-green-700'>
                                Place Order</button>

                        </>
                    ) : (
                        <p>Your cart is empty!</p>
                    )}

                </div>
            </div>


        </>
    )
}

export default Checkout