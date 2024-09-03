// Copyright ©2024 ranalimayadunne, All rights reserved.
import React, { useState } from "react";
import Logo from "../assets/work&win.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Signup = () => {
  const navigate = useNavigate();

  const [newUser, setNewUser] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    profession: "",
    contact: "",
  });

  // State variables for error messages
  const [errors, setErrors] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    profession: "",
    contact: "",
    terms: "",
  });

  // Error message for already existing users
  const [errorMessage, setErrorMessage] = useState("");

  const addUser = async () => {
    try {
      // Check if all fields are filled and terms are accepted
      if (validateForm()) {
        await axios.post("http://localhost:3001/api/user", newUser);
        // Reset form after successful submission
        setNewUser({
          username: "",
          email: "",
          password: "",
          confirmPassword: "",
          profession: "",
          contact: "",
        });
        loginNavigate();
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        // Server responded with 400 status
        // Extract error message from the response
        const errorMessage = error.response.data.error;
        setErrorMessage(errorMessage);
      } else {
        // Handle other errors
        console.error(error);
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    // Clear error message when user starts typing
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = { ...errors };

    // Check if fields are empty
    for (const key in newUser) {
      if (newUser[key].trim() === "") {
        newErrors[key] = "This field is required";
        isValid = false;
      }
    }

    // Check if email is valid
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(newUser.email)) {
      newErrors.email = "Invalid email format";
      isValid = false;
    }

    // Check if password and confirm password match
    if (newUser.password !== newUser.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
      isValid = false;
    }

    // Check if terms are accepted
    if (!newUser.terms) {
      newErrors.terms = "You must accept the terms and conditions";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const loginNavigate = () => {
    navigate("/login");
  };

  const welcomeNavigate = () => {
    navigate("/");
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <a
          onClick={welcomeNavigate}
          className="cursor-pointer flex items-center mb-6 text-4xl font-medium text-[#0693c9] dark:text-[#0693c9]"
        >
          <img className="w-20 h-auto mx-4" src={Logo} alt="logo" />
          WORK & WIN
        </a>
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Create new account
            </h1>
            <form className="space-y-4 md:space-y-6 flex flex-wrap" action="#">
              <div className="flex w-full space-x-4">
                <div className="w-1/2">
                  <label
                    htmlFor="username"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Username
                  </label>
                  <input
                    type="text"
                    name="username"
                    id="username"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="john"
                    value={newUser.username}
                    onChange={handleChange}
                    required=""
                  />
                  {errors.username && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.username}
                    </p>
                  )}
                </div>
                <div className="w-1/2">
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Email
                  </label>
                  <input
                    type="text"
                    name="email"
                    id="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="name@email.com"
                    value={newUser.email}
                    onChange={handleChange}
                    required=""
                  />
                  {errors.email && (
                    <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                  )}
                  {errorMessage && (
                    <p className="text-red-500 text-xs mt-1">{errorMessage}</p>
                  )}
                </div>
              </div>
              {/* Other input fields with similar pattern */}
              <div className="flex w-full space-x-4">
                <div className="w-1/2">
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    value={newUser.password}
                    onChange={handleChange}
                    required=""
                  />
                  {errors.password && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.password}
                    </p>
                  )}
                </div>
                <div className="w-1/2">
                  <label
                    htmlFor="confirmPassword"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    name="confirmPassword"
                    id="confirmPassword"
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    value={newUser.confirmPassword}
                    onChange={handleChange}
                    required=""
                  />
                  {errors.confirmPassword && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.confirmPassword}
                    </p>
                  )}
                </div>
              </div>
              <div className="flex w-full space-x-4">
                <div className="w-1/2">
                  <label
                    htmlFor="profession"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Profession
                  </label>
                  <input
                    type="text"
                    name="profession"
                    id="profession"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="lecturer"
                    value={newUser.profession}
                    onChange={handleChange}
                    required=""
                  />
                  {errors.profession && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.profession}
                    </p>
                  )}
                </div>
                <div className="w-1/2">
                  <label
                    htmlFor="contact"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Contact
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      name="contact"
                      id="contact"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-3 pl-12 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="xxxxxxxxx"
                      value={newUser.contact}
                      onChange={handleChange}
                      required=""
                    />
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-600 dark:text-gray-400">
                      +94{" "}
                    </span>
                  </div>
                  {errors.contact && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.contact}
                    </p>
                  )}
                </div>
              </div>
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="terms"
                    name="terms"
                    aria-describedby="terms"
                    type="checkbox"
                    className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                    checked={newUser.terms}
                    onChange={handleChange}
                    required=""
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label
                    htmlFor="terms"
                    className="font-light text-gray-500 dark:text-gray-300"
                  >
                    I accept the{" "}
                    <a
                      className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                      href="https://github.com/Work-Win/Work-Win-Documentation/blob/main/Terms%20%26%20Conditions.md"
                      target="_blank"
                    >
                      Terms and Conditions
                    </a>
                  </label>
                  {errors.terms && (
                    <p className="text-red-500 text-xs mt-1">{errors.terms}</p>
                  )}
                </div>
              </div>
              <button
                type="button"
                className="btnLoginHoverEffect w-full text-white bg-[#0693c9] focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-cente dark:focus:ring-primary-800"
                onClick={addUser}
              >
                Create an account
              </button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Already have an account?{" "}
                <a
                  onClick={loginNavigate}
                  className="cursor-pointer font-medium text-primary-600 hover:underline"
                >
                  Login here
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Signup;
