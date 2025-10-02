import React, { useContext, useState, useEffect } from "react";
import ShopContext from "../context/ShopContext";
import axios from "axios";
import { assets } from "../assets/assets";

const MyOrders = () => {
  const { backendUrl, token } = useContext(ShopContext);
  const [data, setData] = useState([]);

  const fetchOrders = async () => {
    try {
      const response = await axios.post(
        backendUrl + "/api/orders/userorders",
        {},
        { headers: { token } }
      );
      const orders = response.data.data;
      setData(Array.isArray(orders) ? orders : []); // force array
    } catch (error) {
      console.error("Failed to fetch orders:", error);
      setData([]); // fallback to empty array on error
    }
  };

  useEffect(() => {
    if (token) {
      fetchOrders();
    }
  }, [token]);

  return (
    <div className="px-6 py-10">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">My Orders</h2>

      {data.length === 0 ? (
        <p className="text-gray-500">No orders found.</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {data.map((order, index) => (
            <div
              key={index}
              className="bg-white shadow-md rounded-xl p-5 flex flex-col justify-between hover:shadow-lg transition"
            >
              {/* Top Row: Icon + Items */}
              <div className="flex items-start gap-4">
                <img
                  src={assets.parcel_icon}
                  alt="parcel"
                  className="w-12 h-12"
                />
                <div className="flex-1">
                  <p className="text-sm text-gray-700 mb-2">
                    {order.items.map((item, i) => (
                      <span key={i}>
                        {item.name} x{item.quantity}
                        {i < order.items.length - 1 && ", "}
                      </span>
                    ))}
                  </p>
                  <p className="text-lg font-semibold text-gray-900">
                    ${order.amount}.00
                  </p>
                  <p className="text-sm text-gray-500">
                    Items: {order.items.length}
                  </p>
                </div>
              </div>

              {/* Status + Action */}
              <div className="mt-4 flex items-center justify-between">
                <p
                  className={`flex items-center gap-2 text-sm font-medium ${
                    order.status === "Delivered"
                      ? "text-green-600"
                      : order.status === "Pending"
                      ? "text-yellow-600"
                      : "text-blue-600"
                  }`}
                >
                  <span
                    className={`w-3 h-3 rounded-full ${
                      order.status === "Delivered"
                        ? "bg-green-500"
                        : order.status === "Pending"
                        ? "bg-yellow-500"
                        : "bg-blue-500"
                    }`}
                  ></span>
                  {order.status}
                </p>
                <button className="px-4 py-1.5 text-sm font-semibold text-white bg-orange-500 rounded-lg hover:bg-orange-600 transition">
                  Track Order
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyOrders;
