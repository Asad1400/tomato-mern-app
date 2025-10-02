import React, { useEffect, useState, useContext } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import ShopContext from "../context/ShopContext";
import axios from "axios";

const Verify = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const success = searchParams.get("success");
  const orderId = searchParams.get("orderId");

  const { backendUrl } = useContext(ShopContext);
  const [loading, setLoading] = useState(true);

  const verifyPayment = async () => {
    const response = await axios.post(`${backendUrl}/api/orders/verify`, {
      orderId,
      success: success === "true" ? true : false,
    });

    if (response.data.success) {
      navigate("/myorders");
    } else {
      navigate("/");
    }
  };

  useEffect(() => {
    verifyPayment();
    setLoading(false);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen gap-4">
      {loading ? (
        <div className="flex items-center gap-2 text-gray-700 text-lg">
          <div className="w-6 h-6 border-2 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
          <span>Verifying payment...</span>
        </div>
      ) : (
        <span className="text-xl font-semibold">
          {success === "true" ? "✅ Payment Successful!" : "❌ Payment Failed!"}
        </span>
      )}
    </div>
  );
};

export default Verify;
