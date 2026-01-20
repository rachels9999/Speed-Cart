import React from 'react'
import { useSelector } from 'react-redux'
import Header from '../components/Header'



const YourOrders = () => {
    const orders = useSelector(state => state.ordersReducer)
    const userMail = localStorage.getItem("userMail")

    const userOrders = orders.filter(order => order.userMail === userMail)

    const getOrderStatus = (orderDate) => {
        const orderTime = new Date(orderDate).getTime()
        const now = Date.now()
        const diffMinutes = (now - orderTime) / 60000
        if (diffMinutes < 0.1) return 1           //placed
        if (diffMinutes < 0.2) return 2           //packed
        if (diffMinutes < 0.3) return 3           //shipped
        return 4                                //delivered
    }


    return (
        <>
            <Header />
            <div className='container mx-auto px-4 mt-24 max-w-5xl'>
                <h1 className='text-4xl text-blue-600 font-bold mb-6'>Your Orders!</h1>
                {userOrders.length === 0 ? (
                    <p className='text-gray-500 text-lg'>Orders yet to be taken!</p>
                ) : (
                    userOrders.map(order => (
                        <div key={order.id} className='bg-white rounded-xl shadow-lg border'>
                            <p className='text-sm text-gray-500'><b>Order ID:</b>{order.id}</p>
                            <p className='font-semibold'><b>Date:</b>{order.orderDate}</p>
                            <p className='text-sm text-gray-500 mt-1'><b>Payment:</b>{order.paymentMethod}</p>

                            <hr className='my-3' />

                            {order.items.map(item => (
                                <div key={item.id} className='flex justify-between'>
                                    <span>{item.title}*{item.quantity}</span>
                                    <span>${item.price * item.quantity}</span>
                                </div>
                            ))}

                            <p className='text-right font-bold mt-3'>
                                Total:${order.totalAmount}
                            </p>

                            {/*Order Status*/}
                            <div className='mt-4'>
                                <p className='font-semibold mb-2'>Order Status</p>
                                <div className='flex items-center justify-between text-sm'>
                                    {["Placed", "Packed", "Shipped", "Delivered"].map((step, index) => (
                                        <div key={step} className='flex-1 text-center'>
                                            <div className={`mx-auto w-4 h-4 rounded-full ${getOrderStatus(order.orderDate) > index ? "bg-green-600" : "bg-gray-300"}`}>

                                            </div>
                                            <p className='mt-1'>{step}</p>
                                        </div>

                                    ))}

                                </div>
                            </div>


                            <button onClick={() => window.print()} className='mt-4 mb-2 ms-2 bg-blue-600 text-white px-3 py-2 rounded hover:bg-blue-500'>Download Invoice</button>

                        </div>
                    ))
                )}

            </div>


        </>
    )
}

export default YourOrders