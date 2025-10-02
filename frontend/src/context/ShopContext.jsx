import axios from "axios";
import ShopContext from "./ShopContext";
import { useState, useEffect } from "react";

const ShopContextProvider = (props) => {
  const [food_list, setFoodList] = useState([]);
  const [cartItems, setCartItems] = useState({});
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [token, setToken] = useState(localStorage.getItem("token") ? localStorage.getItem("token") : "");

const loadCartItems = async (token) => {
  const response = await axios.post(backendUrl + "/api/cart/get", {}, { headers: { token } });
  setCartItems(response.data.data || {}); // fallback to empty object
};

  const addToCart = async (itemId) => {
    if (!cartItems[itemId]) {
      setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
    } else {
      setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    }
    if (token) {
      await axios.post(backendUrl + "/api/cart/add", {itemId}, {headers: {token}});
    }
  };

  const removeFromCart = async (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
    if (token) {
      await axios.post(backendUrl + "/api/cart/remove", {itemId}, {headers: {token}});
    }
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const itemId in cartItems) {
      if (cartItems[itemId] > 0) {
        const itemInfo = food_list.find((product) => product._id === itemId);
        if (itemInfo) {
          totalAmount += Number(itemInfo.price) * Number(cartItems[itemId]);
        }
      }
    }
    return totalAmount;
  };

  const fetchFoodList = async () => {
    const response = await axios.get(backendUrl + "/api/food/list");
    setFoodList(response.data.data);
  }

  useEffect(() => {
    async function loadData() {
      await fetchFoodList();
      if (localStorage.getItem("token")) {
        setToken(localStorage.getItem("token"));
        loadCartItems(localStorage.getItem("token"));
      }
    }
    loadData();
  }, []);

  const value = {
    food_list,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    backendUrl,
    token,
    setToken
  };

  return (
    <ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>
  );
};

export default ShopContextProvider;
