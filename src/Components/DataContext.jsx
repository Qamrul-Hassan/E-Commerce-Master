import React, { createContext, useState, useEffect } from "react";

export const DataContext = createContext();

const DataContextProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [offers, setOffers] = useState([]);
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]); // State for managing wishlist
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [loadingBlogs, setLoadingBlogs] = useState(true);
  const [loadingOffers, setLoadingOffers] = useState(true);

  // Fetch products data
  const fetchProducts = async () => {
    setLoadingProducts(true);
    try {
      const response = await fetch("https://fakestoreapi.com/products");
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoadingProducts(false);
    }
  };

  // Fetch blogs data
  const fetchBlogs = async () => {
    setLoadingBlogs(true);
    try {
      const response = await fetch("https://jsonplaceholder.typicode.com/posts");
      const data = await response.json();
      setBlogs(data);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    } finally {
      setLoadingBlogs(false);
    }
  };

  // Fetch offers data
  const fetchOffers = async () => {
    setLoadingOffers(true);
    try {
      const response = await fetch("https://jsonplaceholder.typicode.com/posts");
      const data = await response.json();
      setOffers(data);
    } catch (error) {
      console.error("Error fetching offers:", error);
    } finally {
      setLoadingOffers(false);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchBlogs();
    fetchOffers();
  }, []);

  // Add product to cart
  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingProductIndex = prevCart.findIndex((item) => item.id === product.id);
      if (existingProductIndex > -1) {
        return prevCart.map((item, index) =>
          index === existingProductIndex
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  // Remove product from cart
  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  // Clear the entire cart
  const clearCart = () => {
    setCart([]); // Clears the cart
  };

  // Toggle product in wishlist
  const toggleWishlist = (productId) => {
    setWishlist((prevWishlist) =>
      prevWishlist.includes(productId)
        ? prevWishlist.filter((id) => id !== productId) // Remove from wishlist
        : [...prevWishlist, productId] // Add to wishlist
    );
  };

  // Remove product from wishlist
  const removeFromWishlist = (productId) => {
    setWishlist((prevWishlist) => prevWishlist.filter((id) => id !== productId));
  };

  // Clear the entire wishlist
  const clearWishlist = () => {
    setWishlist([]); // Clears the wishlist
  };

  return (
    <DataContext.Provider
      value={{
        products,
        blogs,
        offers,
        cart,
        wishlist,
        addToCart,
        removeFromCart,
        clearCart, // Provide the clearCart function
        toggleWishlist,
        removeFromWishlist,
        clearWishlist, // Provide the clearWishlist function
        loadingProducts,
        loadingBlogs,
        loadingOffers,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataContextProvider;
