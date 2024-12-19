import React from "react";
import PageLayout from "../Components/PageLayout"; 
import illustration from "../assets/Image/Brand.png"; 

const LoginPage = () => {
  return (
    <PageLayout pageTitle="My Account">
    
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md mx-auto">
        <h2 className="text-2xl font-semibold text-center mb-2">Login</h2>
        <p className="text-gray-500 text-center mb-6">
          Please login using account details below.
        </p>
        <form>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="email">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              placeholder="Email Address"
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Password"
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
          </div>
          <div className="text-right mb-4">
            <a href="#" className="text-pink-500 text-sm hover:underline">
              Forgot your password?
            </a>
          </div>
          <button
            type="submit"
            className="w-full bg-pink-500 text-white py-2 rounded hover:bg-pink-600"
          >
            Sign In
          </button>
        </form>
        <p className="text-center text-sm text-gray-500 mt-6">
          Don’t have an Account?{" "}
          <a href="#" className="text-pink-500 hover:underline">
            Create account
          </a>
        </p>
      </div>

     
    </PageLayout>
  );
};

export default LoginPage;
