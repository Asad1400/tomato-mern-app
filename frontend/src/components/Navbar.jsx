import React, { useState, useEffect, useContext, useRef } from "react";
import { assets } from "../assets/assets";
import { Menu, X } from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import ShopContext from "../context/ShopContext";

const Navbar = ({ setShowLogin }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [profileOpen, setProfileOpen] = useState(false);
  const profileTimeout = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { getTotalCartAmount, token, setToken } = useContext(ShopContext);

  const handleScroll = (id) => {
    if (location.pathname !== "/") {
      navigate("/", { state: { scrollTo: id } });
    } else {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
        setActiveSection(id);
        setMobileOpen(false);
      }
    }
  };

  useEffect(() => {
    if (location.state?.scrollTo) {
      const el = document.getElementById(location.state.scrollTo);
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: "smooth" });
          setActiveSection(location.state.scrollTo);
        }, 300);
      }
    }
  }, [location]);

  useEffect(() => {
    const handleScrollSpy = () => {
      const sections = ["home", "menu", "app"];
      let current = "home";

      sections.forEach((id) => {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 80 && rect.bottom >= 80) {
            current = id;
          }
        }
      });

      setActiveSection(current);
    };

    if (location.pathname === "/") {
      window.addEventListener("scroll", handleScrollSpy);
      return () => window.removeEventListener("scroll", handleScrollSpy);
    }
  }, [location.pathname]);

  const navItems = [
    { id: "home", label: "Home" },
    { id: "menu", label: "Menu" },
    { id: "app", label: "Mobile App" },
  ];

  // Show dropdown with delay
  const handleMouseEnter = () => {
    clearTimeout(profileTimeout.current);
    setProfileOpen(true);
  };

  // Hide dropdown with delay
  const handleMouseLeave = () => {
    profileTimeout.current = setTimeout(() => {
      setProfileOpen(false);
    }, 200); // 200ms delay before closing
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setToken(localStorage.getItem("token"));
    }
  }, [])

  return (
    <nav className="w-full px-6 py-4 flex justify-between items-center shadow-sm relative">
      {/* Logo */}
      <button
        onClick={() => handleScroll("home")}
        className="flex flex-col items-center"
      >
        <img src={assets.logo} alt="tomato-logo" className="w-32" />
      </button>

      {/* Desktop Menu */}
      <ul className="hidden md:flex gap-6 justify-end items-center">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => handleScroll(item.id)}
            className="flex flex-col items-center"
          >
            <p
              className={`text-md font-semibold ${
                activeSection === item.id ? "text-orange-500" : "text-gray-700"
              }`}
            >
              {item.label}
            </p>
            <hr
              className={`w-3/4 border-none h-[2px] rounded ${
                activeSection === item.id ? "bg-orange-500" : "bg-transparent"
              }`}
            />
          </button>
        ))}
      </ul>

      {/* Right Actions (desktop only) */}
      <div className="hidden md:flex gap-5 justify-center items-center relative">
        <img className="w-6 h-6" src={assets.search_icon} alt="search-icon" />
        <div className="relative">
          <Link to="/cart">
            <img
              className="w-6 h-6"
              src={assets.basket_icon}
              alt="basket-icon"
            />
          </Link>
          {getTotalCartAmount() === 0 ? null : (
            <div className="w-[8px] h-[8px] bg-red-600 rounded-full absolute right-[-4px] top-[-2px]"></div>
          )}
        </div>

        {/* Auth Section */}
        {!token ? (
          <button
            onClick={() => setShowLogin(true)}
            className="text-sm font-medium bg-orange-500 text-white border border-orange-600 rounded-3xl px-5 py-1.5 hover:bg-orange-600 hover:shadow-md transition"
          >
            Sign In
          </button>
        ) : (
          <div
            className="relative"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <img
              src={assets.profile_icon}
              alt="profile"
              className="w-5 h-7 cursor-pointer"
            />
            {profileOpen && (
              <ul className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-lg z-30">
                <li onClick={() => navigate("/myorders")} className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 cursor-pointer">
                  <img src={assets.bag_icon} alt="orders" className="w-4 h-4" />
                  <p className="text-sm">Orders</p>
                </li>
                <hr />
                <li
                  className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => {
                    setToken("");
                    localStorage.removeItem("token");
                    navigate("/");
                  }}
                >
                  <img
                    src={assets.logout_icon}
                    alt="logout"
                    className="w-4 h-4"
                  />
                  <p className="text-sm">Logout</p>
                </li>
              </ul>
            )}
          </div>
        )}
      </div>

      {/* Mobile Hamburger */}
      <button
        className="md:hidden flex items-center"
        onClick={() => setMobileOpen(!mobileOpen)}
      >
        {mobileOpen ? <X size={28} /> : <Menu size={28} />}
      </button>

      {/* Mobile Menu Dropdown */}
      {mobileOpen && (
        <div className="absolute top-16 left-0 w-full bg-white shadow-md z-50 flex flex-col items-center gap-6 py-6 md:hidden">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleScroll(item.id)}
              className={`${
                activeSection === item.id
                  ? "text-orange-500 font-semibold"
                  : "text-gray-700"
              }`}
            >
              {item.label}
            </button>
          ))}

          {/* Mobile Actions */}
          <div className="flex gap-6 items-center">
            <img
              className="w-6 h-6"
              src={assets.search_icon}
              alt="search-icon"
            />
            <Link to="/cart" className="relative">
              <img
                className="w-6 h-6"
                src={assets.basket_icon}
                alt="basket-icon"
              />
              <div className="w-[8px] h-[8px] bg-red-600 rounded-full absolute right-[-4px] top-[-2px]"></div>
            </Link>
          </div>
          {!token ? (
            <button
              onClick={() => {
                setShowLogin(true);
                setMobileOpen(false);
              }}
              className="text-sm font-medium bg-orange-500 text-white border border-orange-600 rounded-3xl px-6 py-2 hover:bg-orange-600 hover:shadow-md transition"
            >
              Sign In
            </button>
          ) : (
            <div className="flex flex-col gap-2 w-full px-6">
              <button className="flex items-center gap-2 text-sm hover:text-orange-500">
                <img src={assets.bag_icon} alt="orders" className="w-4 h-4" />
                Orders
              </button>
              <button
                className="flex items-center gap-2 text-sm hover:text-orange-500"
                onClick={() => {
                  setToken("");
                  localStorage.removeItem("token");
                  navigate("/");
                  setMobileOpen(false);
                }}
              >
                <img
                  src={assets.logout_icon}
                  alt="logout"
                  className="w-4 h-4"
                />
                Logout
              </button>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
