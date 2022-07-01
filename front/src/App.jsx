import Cart from "./pages/Cart";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Product from "./pages/Product";
import ProductList from "./pages/ProductList";
import Register from "./pages/Register";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Shipping from "./pages/Shipping";
import Payment from "./pages/Payment";
import PlaceOrder from "./pages/PlaceOrder";
import Order from "./pages/Order";

function App() {
  
  /* const user = useSelector((state) => state.user.currentUser); */

  return (
      <Router>
        <Routes>
          <Route path="/" element={<Home/>} />
        </Routes>
        <Routes>
          <Route path="/products/:category" element={<ProductList/>} />
        </Routes>
        <Routes>
          <Route path="/product/:id" element={<Product/>} />
        </Routes>
        <Routes>
          <Route path="/cart/:id" element={<Cart/>} />
        </Routes>
        <Routes>
          <Route path="/cart" element={<Cart/>} />
        </Routes>
        <Routes>
          <Route path="/login" element={<Login/>}/* element={user ? <Navigate to="/" replace/> : <Login/>}  *//>
        </Routes>
        <Routes>
        <Route path="/register" element={<Register/>}/* element={user ? <Navigate to="/" replace/> : <Register/>} */ />
        </Routes>
        <Routes>
          <Route path="/profile" element={<Profile/>}/* element={user ? <Navigate to="/" replace/> : <Login/>}  *//>
        </Routes>
        <Routes>
          <Route path="/shipping" element={<Shipping/>}/* element={user ? <Navigate to="/" replace/> : <Login/>}  *//>
        </Routes>
        <Routes>
          <Route path="/payment" element={<Payment/>}/* element={user ? <Navigate to="/" replace/> : <Login/>}  *//>
        </Routes>
        <Routes>
          <Route path="/placeorder" element={<PlaceOrder/>}/* element={user ? <Navigate to="/" replace/> : <Login/>}  *//>
        </Routes>
        <Routes>
          <Route path="/order/:id" element={<Order/>}/* element={user ? <Navigate to="/" replace/> : <Login/>}  *//>
        </Routes>
      </Router>
      
  );
}

export default App;
