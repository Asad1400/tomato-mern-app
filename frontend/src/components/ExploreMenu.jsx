import React from "react";
import { menu_list } from "../assets/assets";
import "../index.css"; // make sure this imports your CSS with no-scrollbar class

const ExploreMenu = ({ category, setCategory }) => {
  return (
    <div className="mt-5 flex flex-col gap-2">
      <h1 className="font-bold text-3xl">Explore our Menu</h1>
      <p className="font-sm font-light">
        Choose from a diverse menu featuring a variety of delicious dishes
        crafted with the freshest ingredients
      </p>

      <div className="flex flex-row gap-6 items-center justify-center overflow-x-scroll no-scrollbar md:overflow-hidden">
        {menu_list.map((item, index) => (
          <div
            onClick={() =>
              setCategory((prev) =>
                prev === item.menu_name ? "All" : item.menu_name
              )
            }
            key={index}
            className="flex flex-col items-center gap-1 cursor-pointer"
          >
            <img
              className={`w-10 h-10 md:w-20 md:h-20 lg:w-24 lg:h-24 object-cover ${
                category === item.menu_name
                  ? "border-2 sm:border-4 border-orange-400 rounded-full p-1"
                  : "rounded-full"
              }`}
              src={item.menu_image}
              alt="category_image"
            />
            <p className="text-gray-600 text-xs font-medium sm:font-semibold">
              {item.menu_name}
            </p>
          </div>
        ))}
      </div>

      <hr className="mt-3" />
    </div>
  );
};

export default ExploreMenu;
