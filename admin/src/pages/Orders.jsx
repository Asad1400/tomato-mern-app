import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { assets } from "../assets/assets";

const Orders = ({ backendUrl }) => {
  const [orders, setOrder] = useState([]);

  const fetchOrders = async () => {
    try {
      const response = await axios.post(backendUrl + "/api/orders/list");
      if (response.data.success) {
        setOrder(response.data.data);
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const statusHandler = async (event, orderId) => {
    const response = await axios.post(backendUrl + "/api/orders/status", {
      orderId,
      status: event.target.value,
    })
    if (response.data.success) {
      toast.success(response.data.message);
      await fetchOrders();
    }
    else {
      toast.error(response.data.message);
    }
  }

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="p-6">
      <h3 className="text-2xl font-bold mb-6">Orders</h3>
      <div className="grid gap-6">
        {orders.map((order, index) => (
          <div
            key={index}
            className="flex items-start gap-6 bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow"
          >
            <img
              src={assets.parcel_icon}
              alt="Parcel"
              className="w-16 h-16 object-contain"
            />

            <div className="flex flex-col flex-1 gap-2">
              {/* Items */}
              <p className="text-gray-700 text-sm">
                <span className="font-semibold">Items: </span>
                {order.items.map((item, idx) =>
                  idx === order.items.length - 1
                    ? `${item.name} x${item.quantity}`
                    : `${item.name} x${item.quantity}, `
                )}
              </p>

              {/* Customer Info */}
              <p className="font-medium text-lg text-gray-900">
                {order.address.first_name} {order.address.last_name}
              </p>
              <p className="text-sm text-gray-600">
                {order.address.city}, {order.address.state},{" "}
                {order.address.country}, {order.address.zipcode}
              </p>
              <p className="text-sm text-gray-600">
                📞 {order.address.phone}
              </p>

              {/* Order Info */}
              <div className="flex justify-between items-center mt-2">
                <p className="text-sm text-gray-600">
                  Total Items:{" "}
                  <span className="font-semibold">{order.items.length}</span>
                </p>
                <p className="text-lg font-bold text-green-600">
                  ${order.amount}
                </p>

                <select name="" onChange={(event) => statusHandler(event, order._id)} value={order.status}>
                  <option value="Food Processing">Food Processing</option>
                  <option value="Out for Delivery">Out for Delivery</option>
                  <option value="Delivered">Delivered</option>
                </select>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
