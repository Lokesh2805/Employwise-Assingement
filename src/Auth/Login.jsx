import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "../AuthContext";
import { useNavigate } from "react-router-dom";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
const AuthScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false); 
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const response = await axios.post("https://reqres.in/api/login", {
        email,
        password,
      });

      //console.log("API Response:", response.data);

      if (response.status === 200) {
        const { token } = response.data;
        if (token) {
          login(token);
          navigate("/users");
        } else {
          throw new Error("No token returned by the server.");
        }
      } else {
        setError("Invalid credentials.");
      }
    } catch (err) {
      setError("Invalid credentials. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-lg w-96"
      >
        <div className="flex flex-col justify-center items-center">
          {" "}
          <h2 className="text-5xl text-[#3c009d] font-bold mb-4 text-center">
            Login
          </h2>
          <div className="w-16 h-1.5 bg-[#3c009d] rounded-xl"></div>
        </div>
        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
        <div className="my-4">
          <div className="flex gap-2 justify-center items-center">
            <MdEmail size="1.8em" />
            <div className="relative w-full">
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                class="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-2 border-gray-300 appearance-none   focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder="Email"
                required
              />
              <label
                for="email"
                class="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white  px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
              >
                Email
              </label>
            </div>
          </div>
        </div>
        <div className="mb-4">
          <div className="flex gap-2 justify-center items-center">
            <RiLockPasswordFill size="1.8em" />
            <div className="relative w-full">
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                class="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-2 border-gray-300 appearance-none   focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder="Password"
                required
              />
              <label
                for="password"
                class="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white  px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
              >
                Password
              </label>
            </div>
          </div>
        </div>

        <div className="text-blue-500 hover:text-blue-700 mb-2 text-md">
          <a href="#">Forget Password?</a>
        </div>
        <button
          type="submit"
          className={`w-full py-2 px-4 rounded-lg transition-colors ${
            isLoading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-[#3c009d] text-white hover:bg-blue-600"
          }`}
          disabled={isLoading}
        >
          {isLoading ? (
            <div className="flex items-center justify-center">
              <svg
                className="animate-spin h-5 w-5 text-white mr-2"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            </div>
          ) : (
            "Login"
          )}
        </button>
      </form>
    </div>
  );
};

export default AuthScreen;
