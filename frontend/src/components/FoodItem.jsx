import React, { useContext } from "react";
import { assets } from "../assets/assets";
import ShopContext from "../context/ShopContext";

const FoodItem = ({ id, name, price, description, image }) => {
  const { cartItems, addToCart, removeFromCart, backendUrl } = useContext(ShopContext);

  return (
    <div className="shadow rounded-xl flex flex-col gap-4 pb-3 transform transition duration-300 ease-in-out hover:scale-105">
      <div className="relative">
        <img className="rounded-t-xl" src={backendUrl + "/images/" + image} alt="" />
        {!cartItems[id] ? (
          <img
            className="absolute right-2 bottom-2"
            onClick={() => addToCart(id)}
            src={assets.add_icon_white}
            alt=""
          />
        ) : (
          <div className="flex flex-row gap-2 absolute right-2 bottom-2 justify-center items-center bg-white rounded-3xl p-1">
            <img
              onClick={() => removeFromCart(id)}
              src={assets.remove_icon_red}
              alt=""
            />
            <p>{cartItems[id]}</p>
            <img
              onClick={() => addToCart(id)}
              src={assets.add_icon_green}
              alt=""
            />
          </div>
        )}
      </div>
      <div className="flex flex-col px-4">
        <div className="flex flex-row items-center justify-between gap-2 mb-2">
          <p className="font-semibold flex">{name}</p>
          <img src={assets.rating_starts} alt="" />
        </div>
        <p className="text-xs font-light mb-1">{description}</p>
        <p className="text-red-400 font-medium text-lg">${price}</p>
      </div>
    </div>
  );
};

export default FoodItem;
