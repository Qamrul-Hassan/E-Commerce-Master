import { FaEnvelope, FaPhoneAlt, FaHeart, FaShoppingCart } from "react-icons/fa";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux"; // Use useSelector to get state from Redux

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
            <FaHeart
              className="text-sm cursor-pointer"
              title="Wishlist"
            />
            {/* Display wishlist item count */}
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
            {/* Display cart item count */}
            {totalCartItems > 0 && (
              <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {totalCartItems}
              </span>
            )}
          </div>
        </Link>
      </div>

      {/* Mobile menu (Dropdown when burger menu is clicked) */}
      <div
        className={`absolute top-16 left-0 w-full bg-purple-600 text-white p-4 sm:hidden z-10 transition-all duration-700 ease-in-out ${
          isMenuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
        } overflow-hidden`}
      >
        {/* Mobile menu content */}
      </div>
    </div>
  );
};

export default TopBar;
