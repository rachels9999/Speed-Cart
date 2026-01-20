import { Navigate, Route, Routes } from "react-router-dom"
import Cart from "./pages/Cart"
import Home from "./pages/Home"
import View from "./pages/View"
import Wishlist from "./pages/Wishlist"
import Footer from "./components/Footer"
import Pnf from "./pages/pnf"
import Auth from "./pages/Auth"
import Checkout from "./pages/Checkout"
import OrderSuccess from "./pages/OrderSuccess"
import YourOrders from "./pages/YourOrders"


function App() {

  return (
    <>
<Routes>
  <Route path="/" element={<Home/>} />
  <Route path="/wishlist" element={localStorage.getItem("isLoggedIn") === "true" ? <Wishlist/> : <Navigate to="/login"/> } />
  <Route path="/login" element={<Auth/>} />
  <Route path="/register" element={<Auth register/>} />
  <Route path="/cart" element={localStorage.getItem("isLoggedIn") === "true" ? <Cart/> : <Navigate to="/login"/>} />
  <Route path="/:id/view" element={<View/>} />
  <Route path="/checkout" element={localStorage.getItem("isLoggedIn") === "true" ? <Checkout/> : <Navigate to="/login"/> } />
  <Route path="/order-success" element={<OrderSuccess/>} />
  <Route path="/your-order" element={<YourOrders/>} />
  <Route path="/*" element={<Pnf/>} />
  </Routes>  
  <Footer/>
    </>
  )
  
}

export default App
