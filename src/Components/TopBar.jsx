import { FaEnvelope, FaPhoneAlt, FaHeart, FaShoppingCart, FaBars, FaTimes } from "react-icons/fa";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const TopBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State for mobile menu

  // Fetch cart and wishlist items from Redux state with default empty array to prevent errors
  const cartItems = useSelector((state) => state.cart?.items || []); // Safe access for cart
  const wishlistItems = useSelector((state) => state.wishlist?.items || []); // Safe access for wishlist

  const totalCartItems = cartItems.reduce((total, item) => total + item.quantity, 0); // Calculate total items in cart
  const totalWishlistItems = wishlistItems.length; // Calculate total items in wishlist

  return (
    <div className="bg-purple-600 h-16 flex items-center justify-between px-4 text-white relative">
      {/* Left side content (Email, Phone) */}
      <div className="flex items-center space-x-6 text-sm">
        <div className="flex items-center space-x-2">
          <FaEnvelope title="Email" />
          <span className="font-josefin font-semibold">mdqamrul74@gmail.com</span>
        </div>
        <div className="flex items-center space-x-2">
          <FaPhoneAlt title="Phone" />
          <span className="font-josefin font-semibold">(12345)67890</span>
        </div>
      </div>

      {/* Burger Menu Icon for smaller screens */}
      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="sm:hidden focus:outline-none text-lg"
        aria-label="Toggle Menu"
      >
        {isMenuOpen ? <FaTimes /> : <FaBars />}
      </button>

      {/* Center content for larger screens */}
      <div className="hidden sm:flex items-center space-x-6 text-sm">
        <select
          className="bg-purple-600 border-none text-sm font-josefin text-white cursor-pointer outline-none focus:ring focus:ring-purple-400"
          defaultValue="English"
        >
          <option value="English">English</option>
          <option value="Bangla">Bangla</option>
          <option value="French">French</option>
        </select>

        <select
          className="bg-purple-600 border-none text-sm font-josefin text-white cursor-pointer outline-none focus:ring focus:ring-purple-400"
          defaultValue="USD"
        >
          <option value="USD">USD</option>
          <option value="TK">BDT</option>
          <option value="Euro">Euro</option>
        </select>

        <Link to="/login" className="font-josefin font-semibold text-sm cursor-pointer">
          Login
        </Link>

        {/* Wishlist Icon linked to ShopWishList */}
        <Link to="/shop-wishlist">
          <div className="relative">
            <FaHeart className="text-sm cursor-pointer" title="Wishlist" />
            {totalWishlistItems > 0 && (
              <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {totalWishlistItems}
              </span>
            )}
          </div>
        </Link>

        {/* Shopping Cart Icon */}
        <Link to="/cart">
          <div className="relative">
            <FaShoppingCart className="text-sm cursor-pointer" title="Shopping Cart" />
            {totalCartItems > 0 && (
              <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {totalCartItems}
              </span>
            )}
          </div>
        </Link>
      </div>

      {/* Mobile Slide-in Menu */}
      <div
        className={`fixed top-0 left-0 h-screen bg-purple-600 text-white p-6 sm:hidden z-20 transform transition-transform duration-500 ease-in-out ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <button
          onClick={() => setIsMenuOpen(false)}
          className="text-white text-2xl absolute top-4 right-4 focus:outline-none"
        >
          <FaTimes />
        </button>
        <ul className="space-y-6 text-sm mt-12">
          <li>
            <select
              className="w-full bg-purple-600 border-none text-sm font-josefin text-white cursor-pointer outline-none focus:ring focus:ring-purple-400"
              defaultValue="English"
            >
              <option value="English">English</option>
              <option value="Bangla">Bangla</option>
              <option value="French">French</option>
            </select>
          </li>
          <li>
            <select
              className="w-full bg-purple-600 border-none text-sm font-josefin text-white cursor-pointer outline-none focus:ring focus:ring-purple-400"
              defaultValue="USD"
            >
              <option value="USD">USD</option>
              <option value="TK">BDT</option>
              <option value="Euro">Euro</option>
            </select>
          </li>
          <li>
            <Link to="/login" className="block font-josefin font-semibold text-sm">
              Login
            </Link>
          </li>
          <li>
            <Link to="/shop-wishlist" className="block">
              Wishlist ({totalWishlistItems})
            </Link>
          </li>
          <li>
            <Link to="/cart" className="block">
              Cart ({totalCartItems})
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default TopBar;