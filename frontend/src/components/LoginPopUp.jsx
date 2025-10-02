import React, { useContext, useState } from "react";
import { assets } from "../assets/assets";
import ShopContext from "../context/ShopContext";
import axios from "axios"
import { toast } from "react-toastify";

const LoginPopUp = ({ setShowLogin }) => {
  const [currState, setCurrState] = useState("Sign Up");
  const { backendUrl, setToken } = useContext(ShopContext);

  const [data, setData] = useState({
    name: "",
    email: "",
    password: ""
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData({ ...data, [name]: value });
  };

  const onLogin = async ( event ) => {
    event.preventDefault();
    let newUrl = backendUrl;
    if (currState === "Sign In") {
      newUrl += "/api/user/login"
    }
    else {
      newUrl += "/api/user/register"
    }
    const response = await axios.post(newUrl , data);
      console.log(response.data);
    if (response.data.success) {
      setToken(response.data.token);
      localStorage.setItem("token", response.data.token);
      toast.success(response.data.message);
      setShowLogin(false);
    }
    else {
      toast.error(response.data.message);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <form onSubmit={onLogin} className="relative bg-white rounded-2xl shadow-xl p-6 w-96 flex flex-col gap-4">
        {/* Header */}
        <div className="flex justify-between items-center border-b pb-3">
          <h2 className="text-xl font-bold text-gray-800">{currState}</h2>
          <img
            className="cursor-pointer w-5 h-5"
            src={assets.cross_icon}
            onClick={() => setShowLogin(false)}
            alt="close"
          />
        </div>

        {/* Input Fields */}
        <div className="flex flex-col gap-3 mt-3">
          {currState === "Sign Up" && (
            <input
              type="text"
              placeholder="Your Name"
              name="name"
              onChange={onChangeHandler}
              required
              className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          )}
          <input
            type="email"
            placeholder="Enter Email"
            name="email"
            onChange={onChangeHandler}
            required
            className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
          <input
            type="password"
            placeholder="Enter Password"
            name="password"
            onChange={onChangeHandler}
            required
            className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>

        {/* Submit Button */}
        <button className="mt-2 bg-orange-400 text-white font-semibold rounded-lg py-2 hover:bg-orange-500 transition">
          {currState === "Sign Up" ? "Register" : "Sign In"}
        </button>

        {/* Terms & Conditions */}
        <div className="flex items-start gap-2 text-sm text-gray-600 mt-2">
          <input type="checkbox" required className="mt-1" />
          <p>
            By continuing, I agree to the{" "}
            <span className="text-blue-600 cursor-pointer hover:underline">
              Terms of Use
            </span>{" "}
            &{" "}
            <span className="text-blue-600 cursor-pointer hover:underline">
              Privacy Policy
            </span>
          </p>
        </div>

        {/* Switch between Sign In / Sign Up */}
        <div className="text-sm text-center mt-3 text-gray-700">
          {currState === "Sign In" ? (
            <p>
              Create a new account?{" "}
              <span
                className="cursor-pointer text-orange-500 font-semibold hover:underline"
                onClick={() => setCurrState("Sign Up")}
              >
                Click Here
              </span>
            </p>
          ) : (
            <p>
              Already have an account?{" "}
              <span
                className="cursor-pointer text-orange-500 font-semibold hover:underline"
                onClick={() => setCurrState("Sign In")}
              >
                Login Here
              </span>
            </p>
          )}
        </div>
      </form>
    </div>
  );
};

export default LoginPopUp;
