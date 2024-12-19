import React, { useContext } from "react";
import { DataContext } from "../Components/DataContext"; // Import DataContext
import PageLayout from "../Components/PageLayout";

const Wishlist = () => {
  const { products, wishlist, removeFromWishlist, clearWishlist } = useContext(DataContext); // Get wishlist and methods from DataContext

  // Filter the products that are in the wishlist
  const wishlistProducts = products.filter((product) => wishlist.includes(product.id));

  return (
    <PageLayout pageTitle="Wishlist" subTitle="Home, Pages, Wishlist">
      <div className="p-8 min-h-screen">
        <h2 className="text-3xl font-bold mb-6">Your Wishlist</h2>
        
        {wishlistProducts.length === 0 ? (
          <p>Your wishlist is empty!</p>
        ) : (
          <>
            {/* Clear Wishlist Button */}
            <button
              onClick={clearWishlist} // Activates the clearWishlist function
              className="mb-6 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
            >
              Clear Wishlist
            </button>
            
            {/* Wishlist Items */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {wishlistProducts.map((product) => (
                <div key={product.id} className="bg-white shadow-md rounded-lg overflow-hidden">
                  <div className="w-full p-2">
                    <img
                      src={product.image}
                      alt={product.title}
                      className="w-full h-44 object-contain"
                    />
                  </div>

                  <div className="p-4">
                    <h3 className="text-lg font-bold text-gray-800">{product.title}</h3>
                    <span className="text-lg font-semibold text-blue-500">${product.price}</span>

                    {/* Remove Button for each product */}
                    <button
                      onClick={() => removeFromWishlist(product.id)} // Activates removeFromWishlist function
                      className="mt-2 px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 ml-28"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </PageLayout>
  );
};

export default Wishlist;