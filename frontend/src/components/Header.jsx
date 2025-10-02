import React from "react";
import headerImg from "../assets/header_img.png";

const Header = () => {
  return (
    <div
      className="relative w-full h-[80vw] sm:h-[34vw] bg-cover bg-center mt-4 mb-4 rounded"
      style={{ backgroundImage: `url(${headerImg})` }}
    >
      <div className="text-white sm:p-12 p-3 absolute left-[10px] bottom-0 animate-fade-in">
        <h2 className="text-3xl font-extrabold md:text-6xl">
          Order your favourite <br /> food here.
        </h2>
        <p className="mt-2 max-w-md">
          Choose from a diverse menu featuring a variety of delicious dishes
          crafted with the freshest ingredients
        </p>
        <button className="mt-4 text-gray-600 text-sm bg-white px-8 py-3 rounded-3xl hover:scale-105 transition ease-in-out duration-200 hover:text-black">
          View Menu
        </button>
      </div>
    </div>
  );
};

export default Header;
