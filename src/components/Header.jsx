import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { searchproduct } from '../redux/slices/productSlice'
import { clearCart } from '../redux/slices/cartSlice'


const Header = ({ insideHome }) => {

  const dispatch = useDispatch()
  const userCart = useSelector(state => state.cartReducer)
  const userWishlist = useSelector(state => state.wishlistReducer)

  const navigate = useNavigate()
  const isLoggedIn = localStorage.getItem("isLoggedIn") ==="true"

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn")
    localStorage.removeItem("userMail")
    dispatch(clearCart())
    alert("Logged out successfully")
    navigate("/login")
  }

  return (
    <>

      <nav className='flex bg-orange-800 w-full p-3 text-white'>
        <Link className='text-2xl font-bold' to={'/'}>
          <i className="fa-solid fa-dolly me-1"></i>Speed Cart
        </Link>
        <ul className='flex-1 text-right'>

          {insideHome &&
            <li className='list-none inline-block px-5'><input onChange={e => dispatch(searchproduct(e.target.value.toLowerCase()))} type="text" className='rounded p-2 border' placeholder='Search Products Here!' /></li>
          }


          <Link to={'/wishlist'}>
            <li className='list-none inline-block px-5'><i className="fa-solid fa-heart text-red-400"></i>Wishlist <span className='bg-amber-400 text-white rounded p-1'>{userWishlist?.length}</span></li>
          </Link>

          <Link to={'/cart'}>
            <li className='list-none inline-block px-5'><i className="fa-solid fa-cart-plus text-green-400"></i>Cart <span className='bg-amber-400 text-white rounded p-1'>{userCart?.length}</span></li>
          </Link>

          <Link to={'/your-order'}>
            <li className='list-none inline-block px-5'><i className="fa-solid fa-box text-blue-400"></i>Your Orders </li>
          </Link>

          {/*Login-Logout*/}
          {!isLoggedIn ? (
            <Link to={'/login'}>
            <li className='inline-block px-5 py-2 bg-amber-400 text-white font-semibold rounded hover:bg-amber-300 transition'>Login</li>
            </Link>
          ):(
            <li onClick={handleLogout} className='list-none inline-block px-5 cursor-pointer'>Logout</li>
          )}

        </ul>
      </nav>

    </>
  )
}

export default Header