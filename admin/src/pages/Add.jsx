import React, { useState } from "react";
import { assets } from "../assets/assets";
import { backendUrl } from "../App";
import axios from "axios";
import { toast } from "react-toastify";

const Add = () => {
  const [image, setImage] = useState(false);
  const [data, setData] = useState({
    name: "",
    description: "",
    price: "",
    category: "Salad",
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData({ ...data, [name]: value });
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("price", Number(data.price));
    formData.append("category", data.category);
    formData.append("image", image);
    const response = await axios.post(`${backendUrl}/api/food/add`, formData);
    if (response.data.success) {
      toast.success(response.data.message);
      setData({
        name: "",
        description: "",
        price: "",
        category: "Salad",
      });
      setImage(false);
    }
    else {
      toast.error(response.data.message)
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 px-4">
      <form
        action=""
        className="w-full max-w-2xl bg-white p-8 rounded-2xl shadow-lg space-y-6"
        onSubmit={onSubmitHandler}
      >
        {/* Upload Image */}
        <div>
          <p className="font-semibold text-lg mb-2">Upload Image</p>
          <label
            htmlFor="imageUpload"
            className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg cursor-pointer p-6 hover:border-orange-500 hover:bg-orange-50 transition"
          >
            <img
              src={image ? URL.createObjectURL(image) : assets.upload_area}
              alt="upload"
              className="w-20 h-20 object-contain opacity-70"
            />
            <span className="text-sm text-gray-500 mt-2">
              {image ? "Image Selected" : "Click to upload"}
            </span>
          </label>
          <input
            type="file"
            id="imageUpload"
            hidden
            required
            onChange={(e) => setImage(e.target.files[0])}
          />
        </div>

        {/* Product Name */}
        <div>
          <p className="font-semibold text-lg mb-2">Product Name</p>
          <input
            type="text"
            name="name"
            placeholder="Enter Product Name"
            value={data.name}
            onChange={onChangeHandler}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-400 outline-none"
          />
        </div>

        {/* Product Description */}
        <div>
          <p className="font-semibold text-lg mb-2">Product Description</p>
          <textarea
            name="description"
            rows={6}
            placeholder="Enter Product Description"
            required
            value={data.description}
            onChange={onChangeHandler}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-400 outline-none resize-none"
          />
        </div>

        {/* Category & Price */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Category */}
          <div>
            <p className="font-semibold text-lg mb-2">Product Category</p>
            <select
              name="category"
              onChange={onChangeHandler}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-400 outline-none"
            >
              <option value="Salad">Salad</option>
              <option value="Rolls">Rolls</option>
              <option value="Deserts">Deserts</option>
              <option value="Sandwich">Sandwich</option>
              <option value="Cake">Cake</option>
              <option value="Pure Veg">Pure Veg</option>
              <option value="Pasta">Pasta</option>
              <option value="Noodles">Noodles</option>
            </select>
          </div>

          {/* Price */}
          <div>
            <p className="font-semibold text-lg mb-2">Product Price</p>
            <input
              type="text"
              name="price"
              placeholder="Enter Product Price"
              value={data.price}
              onChange={onChangeHandler}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-400 outline-none"
            />
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-orange-500 text-white font-semibold py-3 rounded-lg shadow-md hover:bg-orange-600 transition"
        >
          ADD PRODUCT
        </button>
      </form>
    </div>
  );
};

export default Add;
