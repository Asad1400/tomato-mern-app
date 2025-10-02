import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import PlaceOrder from "./pages/PlaceOrder";
import Footer from "./components/Footer";
import { useState } from "react";
import LoginPopUp from "./components/LoginPopUp";
import { ToastContainer } from "react-toastify";
import Verify from "./pages/Verify";
import MyOrders from "./pages/MyOrders";

export default function App() {
  const location = useLocation();
  const [showLogin, setShowLogin] = useState(false);

  const validRoutes = ["/", "/cart", "/placeorder", "/myorders"];

  const showNavbar = validRoutes.includes(location.pathname);
  const showFooter = validRoutes.includes(location.pathname);

  return (
    <div className="relative">
      <ToastContainer />
      {showLogin ? <LoginPopUp setShowLogin={setShowLogin} /> : <></>}
      <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] min-h-screen">
        {showNavbar && <Navbar setShowLogin={setShowLogin} />}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/placeorder" element={<PlaceOrder />} />
          <Route path="/verify" element={<Verify />} />
          <Route path="/myorders" element={<MyOrders />} />

          <Route
            path="*"
            element={
              <h1 className="text-2xl font-bold flex justify-center items-center h-screen">
                No Pages Found
              </h1>
            }
          />
        </Routes>
      </div>

      {showFooter && <Footer />}
    </div>
  );
}
