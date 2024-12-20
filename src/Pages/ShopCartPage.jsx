import React, { useContext, useState, useEffect } from "react";
import { DataContext } from "../Components/DataContext";
import PageLayout from "../Components/PageLayout";
import { FaTrashAlt } from "react-icons/fa"; // Import the trash icon

const CartPage = () => {
  const { cart, removeFromCart, clearCart, updateCart } = useContext(DataContext); // Access context functions
  const [updatedCart, setUpdatedCart] = useState([...cart]); // Maintain a local state for cart changes

  // Update local state whenever the global cart changes
  useEffect(() => {
    setUpdatedCart([...cart]);
  }, [cart]);

  const handleQuantityChange = (id, action) => {
    setUpdatedCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity:
                action === "increase"
                  ? item.quantity + 1
                  : item.quantity > 1
                  ? item.quantity - 1
                  : 1, // Prevent negative quantities
            }
          : item
      )
    );
  };

  const calculateTotal = () => {
    return updatedCart.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    ).toFixed(2);
  };

  const handleUpdateCart = () => {
    updateCart(updatedCart); // Update the global cart in context
    console.log("Cart updated:", updatedCart);
  };

  const handleRemoveFromCart = (id) => {
    removeFromCart(id); // Remove from context
    setUpdatedCart(updatedCart.filter(item => item.id !== id)); // Update local state
  };

  const handleClearCart = () => {
    console.log("Clearing cart");
    clearCart(); // Clear the cart in context
    setUpdatedCart([]); // Clear the local cart state
  };

  return (
    <PageLayout pageTitle="Cart">
      <div className="container mx-auto py-10 px-4 lg:px-20">
        {updatedCart.length === 0 ? (
          <div className="text-center text-gray-500 font-semibold text-xl">
            Your cart is empty.
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
            {/* Cart Items Section */}
            <div className="lg:col-span-2">
              <table className="w-full border-collapse text-left">
                <thead>
                  <tr className="bg-gray-100 text-gray-700 font-semibold text-sm border-b">
                    <th className="py-4">Product</th>
                    <th className="py-4">Price</th>
                    <th className="py-4">Quantity</th>
                    <th className="py-4">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {updatedCart.map((item) => (
                    <tr key={item.id} className="border-b hover:bg-gray-50">
                      <td className="py-4 flex items-center">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-16 h-16 object-cover rounded-md mr-4"
                        />
                        <div>
                          <h5 className="font-semibold text-gray-800">
                            {item.name}
                          </h5>
                          <p className="text-sm text-gray-500">
                            Color: {item.color} <br /> Size: {item.size}
                          </p>
                        </div>
                      </td>
                      <td className="py-4 text-gray-700">
                        ${item.price.toFixed(2)}
                      </td>
                      <td className="py-4 flex items-center">
                        <button
                          onClick={() => handleQuantityChange(item.id, "decrease")}
                          className="px-2 py-1 bg-gray-200 rounded-l-md hover:bg-gray-300"
                        >
                          &lt;
                        </button>
                        <input
                          type="number"
                          value={item.quantity}
                          readOnly
                          className="w-12 text-center border-y border-gray-300"
                        />
                        <button
                          onClick={() => handleQuantityChange(item.id, "increase")}
                          className="px-2 py-1 bg-gray-200 rounded-r-md hover:bg-gray-300"
                        >
                          &gt;
                        </button>
                      </td>
                      <td className="py-4 font-semibold text-gray-800">
                        ${(item.price * item.quantity).toFixed(2)}
                      </td>
                      <td className="py-4">
                        <button
                          onClick={() => handleRemoveFromCart(item.id)}
                          className="text-red-500 font-medium hover:text-red-700"
                        >
                          <FaTrashAlt /> {/* Replace "Remove" with a trash icon */}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Buttons */}
              <div className="mt-6 flex justify-between">
                <button
                  onClick={handleUpdateCart}
                  disabled={JSON.stringify(cart) === JSON.stringify(updatedCart)}
                  className={`py-2 px-6 rounded-md ${
                    JSON.stringify(cart) === JSON.stringify(updatedCart)
                      ? "bg-gray-400 text-gray-200 cursor-not-allowed"
                      : "bg-pink-500 text-white hover:bg-pink-600"
                  }`}
                >
                  Update Cart
                </button>
                <button
                  onClick={handleClearCart}
                  className={`py-2 px-6 rounded-md ${
                    updatedCart.length === 0
                      ? "bg-gray-400 text-gray-200 cursor-not-allowed"
                      : "bg-red-500 text-white hover:bg-red-600"
                  }`}
                  disabled={updatedCart.length === 0}
                >
                  Clear Cart
                </button>
              </div>
            </div>

            {/* Cart Totals Section */}
            <div className="lg:col-span-2 bg-gray-100 p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Cart Totals</h3>
              <div className="border-b pb-4 text-gray-700">
                <p className="flex justify-between">
                  Subtotals: <span>${calculateTotal()}</span>
                </p>
                <p className="flex justify-between">
                  Shipping: <span className="text-green-500">Free</span>
                </p>
              </div>
              <div className="mt-4 text-gray-800 font-bold flex justify-between">
                <p>Totals:</p>
                <p>${calculateTotal()}</p>
              </div>
              <button className="w-full mt-6 bg-green-500 text-white py-2 rounded-md hover:bg-green-600">
                Proceed To Checkout
              </button>

              {/* Shipping Calculator */}
              <div className="mt-6">
                <h4 className="text-gray-800 font-semibold mb-2">
                  Address
                </h4>
                <input
                  type="text"
                  placeholder="Full name"
                  className="w-full mb-3 p-2 border rounded-md"
                />
                <input
                  type="text"
                  placeholder="Address"
                  className="w-full mb-3 p-2 border rounded-md"
                />
                <input
                  type="text"
                  placeholder="City"
                  className="w-full mb-3 p-2 border rounded-md"
                />
                <input
                  type="text"
                  placeholder="Postal Code"
                  className="w-full mb-3 p-2 border rounded-md"
                />
                <input
                  type="text"
                  placeholder="Country"
                  className="w-full mb-3 p-2 border rounded-md"
                />
                <button className="w-full bg-pink-500 text-white py-2 rounded-md hover:bg-pink-600">
                  Continue Shipping
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </PageLayout>
  );
};

export default CartPage;
