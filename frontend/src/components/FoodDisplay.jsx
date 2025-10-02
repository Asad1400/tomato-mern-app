import React, { useContext } from "react";
import ShopContext from "../context/ShopContext";
import FoodItem from "./FoodItem";

const FoodDisplay = ({ category }) => {
    console.log(category)
  const { food_list } = useContext(ShopContext);
  return (
    <div className="mt-4">
      <h2 className="font-bold text-3xl mt-3 mb-3">Top Dishes Near You</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 animate-fade-in duration-75">
        {food_list
          .filter((item) => category === "All" || item.category === category)
          .map((item, index) => (
            <FoodItem
              key={index}
              id={item._id}
              name={item.name}
              price={item.price}
              description={item.description}
              image={item.image}
            />
          ))}
      </div>
    </div>
  );
};

export default FoodDisplay;
