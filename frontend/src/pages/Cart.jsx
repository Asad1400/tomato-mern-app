import React, { useContext } from "react";
import ShopContext from "../context/ShopContext";
import CartTotal from "../components/CartTotal";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const navigate = useNavigate();
  const { cartItems, food_list, removeFromCart, backendUrl } = useContext(ShopContext);

  return (
    <div className="max-w-5xl mx-auto mt-10 px-4">
      <h1 className="text-2xl font-bold mb-6">Your Cart</h1>

      {/* Table Header */}
      <div className="grid grid-cols-5 gap-4 text-gray-700 font-semibold border-b pb-3">
        <p className="text-center">Item</p>
        <p className="text-center">Title</p>
        <p className="text-center">Price</p>
        <p className="text-center">Quantity</p>
        <p className="text-center">Remove</p>
      </div>

      {/* Cart Items */}
      {food_list.map((item) => {
        if (cartItems[item._id] > 0) {
          return (
            <div
              key={item._id}
              className="grid grid-cols-5 gap-4 items-center py-4 border-b hover:bg-gray-50 transition"
            >
              {/* Image */}
              <div className="flex justify-center">
                <img
                  src={ backendUrl + "/images/" + item.image}
                  alt={item.name}
                  className="w-16 h-16 object-cover rounded-lg shadow"
                />
              </div>

              {/* Title */}
              <p className="text-center font-medium">{item.name}</p>

              {/* Price */}
              <p className="text-center text-gray-600">${item.price}</p>

              {/* Quantity & Subtotal */}
              <p className="text-center">{cartItems[item._id]}</p>

              {/* Remove Button */}
              <div className="flex justify-center">
                <button
                  onClick={() => removeFromCart(item._id)}
                  className="text-red-500 font-bold text-lg hover:text-red-700"
                >
                  ×
                </button>
              </div>
            </div>
          );
        }
        return null;
      })}

      {/* Cart Summary */}
      <div className="mt-6 flex justify-end">
        <div className="bg-gray-100 rounded-lg shadow-md p-6 w-80">
          <CartTotal />
          <button onClick={() => navigate("/placeorder")} className="mt-4 w-full bg-orange-500 text-white font-semibold py-2 rounded-lg hover:bg-orange-600 transition">
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
