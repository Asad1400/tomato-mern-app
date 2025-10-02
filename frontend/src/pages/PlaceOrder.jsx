import React, { useContext, useState } from 'react'
import CartTotal from '../components/CartTotal'
import ShopContext from '../context/ShopContext';
import axios from "axios"
import {toast} from "react-toastify"

const PlaceOrder = () => {
  const { getTotalCartAmount ,token, food_list, cartItems, backendUrl } = useContext(ShopContext);

  const [data, setData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const placeOrder = async (event) => {
    event.preventDefault();
    let orderItems = [];
    food_list.map((item) => {
      if (cartItems[item._id] > 0) {
        let itemInfo = item;
        itemInfo["quantity"] = cartItems[item._id];
        orderItems.push(itemInfo);
      }
    })
    let orderData = {
      address: data,
      items: orderItems,
      amount: getTotalCartAmount()+2,
    }
    const response = await axios.post(backendUrl+"/api/orders/place", orderData, {headers:{token}});
    if (response.data.success) {
      const {session_url} = response.data;
      window.location.replace(session_url)
    }
    else {
      toast.error("Please Login to place order");
    }
  }

  return (
    <form onSubmit={placeOrder} className="flex flex-col sm:flex-row justify-between mt-10 gap-8 items-center px-6">
      {/* Left Side - Delivery Info */}
      <div className="w-full sm:w-[500px] bg-white p-6 rounded-lg shadow-md">
        <p className="mb-6 font-bold text-2xl text-gray-800">Delivery Information</p>

        {/* Name Row */}
        <div className="flex flex-col sm:flex-row gap-4 mb-4">
          <input
            name="first_name"
            value={data.first_name}
            onChange={onChangeHandler}
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
            type="text"
            placeholder="Enter First Name"
            required
          />
          <input
            name="last_name"
            value={data.last_name}
            onChange={onChangeHandler}
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
            type="text"
            placeholder="Enter Last Name"
            required
          />
        </div>

        {/* Email */}
        <input
          name="email"
          value={data.email}
          onChange={onChangeHandler}
          className="w-full border rounded-lg px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-orange-500"
          type="email"
          placeholder="Enter Email Address"
          required
        />

        {/* Street */}
        <input
          name="street"
          value={data.street}
          onChange={onChangeHandler}
          className="w-full border rounded-lg px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-orange-500"
          type="text"
          placeholder="Street"
          required
        />

        {/* City & State */}
        <div className="flex flex-col sm:flex-row gap-4 mb-4">
          <input
            name="city"
            value={data.city}
            onChange={onChangeHandler}
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
            type="text"
            placeholder="Enter City"
            required
          />
          <input
            name="state"
            value={data.state}
            onChange={onChangeHandler}
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
            type="text"
            placeholder="Enter State"
            required
          />
        </div>

        {/* Zipcode */}
        <input
          name="zipcode"
          value={data.zipcode}
          onChange={onChangeHandler}
          className="w-full border rounded-lg px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-orange-500"
          type="text"
          placeholder="Enter Zip Code"
          required
        />

        {/* Country */}
        <input
          name="country"
          value={data.country}
          onChange={onChangeHandler}
          className="w-full border rounded-lg px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-orange-500"
          type="text"
          placeholder="Enter Country"
          required
        />

        {/* Phone */}
        <input
          name="phone"
          value={data.phone}
          onChange={onChangeHandler}
          className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
          type="text"
          placeholder="Enter Phone"
          required
        />
      </div>

      {/* Right Side - Cart Summary */}
      <div className="w-full sm:w-80">
        <div className="bg-gray-100 rounded-lg shadow-md p-6">
          <CartTotal />
          <button
            type="submit"
            className="mt-4 w-full bg-orange-500 text-white font-semibold py-2 rounded-lg hover:bg-orange-600 transition"
          >
            Payment
          </button>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
