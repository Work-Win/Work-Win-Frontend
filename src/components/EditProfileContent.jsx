// Copyright ©2024 SachinAkash01, All rights reserved.
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../assets/work&win.png";
import axios from "axios";
import Cookies from "js-cookie";
import "../styles/content.css";

const EditProfileContent = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [initialEmail, setInitialEmail] = useState(""); // To track initial email
  const [username, setUsername] = useState("");
  const [initialContact, setInitialContact] = useState("");
  const [initialProfession, setInitialProfession] = useState("");
  const [contact, setContact] = useState("");
  const [profession, setProfession] = useState("");
  const [emailError, setEmailError] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isDataChanged, setIsDataChanged] = useState(false); // Flag to track if data changed
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const email = Cookies.get("email");
        if (email) {
          setEmail(email);
          setInitialEmail(email);
          const response = await axios.get(
            `http://localhost:3001/api/users/${email}`
          );
          const userData = response.data;
          setUsername(userData.username);
          setProfession(userData.profession);
          setInitialProfession(userData.profession);
          setContact(userData.contact);
          setInitialContact(userData.contact);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  const dashboardNavigate = () => {
    navigate("/dashboard");
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const saveDetails = async () => {
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError("Please enter a valid email address.");
      return;
    } else {
      setEmailError("");
    }

    // Check if any data is changed
    if (
      email !== initialEmail ||
      contact !== initialContact ||
      profession !== initialProfession
    ) {
      // If any data is changed, send it to backend
      try {
        await axios.put(`http://localhost:3001/api/users/${initialEmail}`, {
          email,
          contact,
          profession,
        });
        setIsDataChanged(false); // Reset data changed flag
        setModalContent("User details updated successfully!");
        setModalOpen(true);
      } catch (error) {
        console.error("Error updating user details:", error);
        setModalContent("Failed to update user details!");
        setModalOpen(true);
      }
    } else {
      setModalContent("No changes detected!");
      setModalOpen(true);
    }
  };

  const changePassword = async () => {
    try {
      // Validate old password
      const response = await axios.post("http://localhost:3001/api/login", {
        email,
        password: oldPassword,
      });
      const { token } = response.data;

      // Check if new password and confirm new password are not empty
      if (!newPassword || !confirmNewPassword) {
        setPasswordError(
          "Please enter both new password and confirm password."
        );
        return;
      } else {
        setPasswordError("");
      }

      // Compare new passwords
      if (newPassword !== confirmNewPassword) {
        setPasswordError("New password and confirm password do not match.");
        return;
      } else {
        setPasswordError("");
      }

      // Request to change password
      await axios.put(
        `http://localhost:3001/api/user/${email}/password`,
        {
          newPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Send JWT token for authentication
          },
        }
      );
      setModalContent("Password changed successfully!");
      setModalOpen(true);
      setOldPassword("");
      setNewPassword("");
      setConfirmNewPassword("");
    } catch (error) {
      console.error("Error changing password:", error);
      setModalContent(
        "Failed to change password. Please check whether your old password is correct!"
      );
      setModalOpen(true);
    }
  };

  return (
    <div className="content-feedback">
      <div className="content--header">
        <h1 className="header--title">
          <span onClick={dashboardNavigate} style={{ cursor: "pointer" }}>
            Dashboard
          </span>{" "}
          {">>"} Edit Profile ({username})
        </h1>
      </div>
      <div className="grama-form mt-20">
        <div className="form-container">
          {/* Personal Details Section */}
          <div className="form-section mr-20">
            <h2 className="section-title font-bold text-center mb-10 text-xl">
              Personal Details
            </h2>
            <div className="form-group">
              <label htmlFor="email" className="block mb-2">
                Email:
              </label>
              <input
                type="text"
                id="email"
                name="email"
                placeholder="john@gmail.com"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (emailError && e.target.value) setEmailError("");
                }}
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
              {emailError && (
                <p className="text-red-500 text-sm">{emailError}</p>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="contact" className="block mb-2">
                Contact Number:
              </label>
              <input
                type="text"
                id="contact"
                name="contact"
                placeholder="+94 xxxxxxxx"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>
            <div className="form-group">
              <label htmlFor="profession" className="block mb-2">
                Profession:
              </label>
              <input
                type="text"
                id="profession"
                name="profession"
                placeholder="Accountant"
                value={profession}
                onChange={(e) => setProfession(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>
            <div className="text-center">
              <button
                onClick={saveDetails}
                className="btnAboutHoverEffect bg-[#0693c9] text-black rounded-md font-medium py-2 px-4 mt-6"
              >
                Save Details
              </button>
            </div>
          </div>
          {/* Change Password Section */}
          <div className="form-section ml-20">
            <h2 className="section-title font-bold text-center mb-10 text-xl">
              Change Password
            </h2>
            <div className="form-group">
              <label htmlFor="oldPassword" className="block mb-2">
                Old Password:
              </label>
              <input
                type="password"
                id="oldPassword"
                name="oldPassword"
                placeholder="****************"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>
            <div className="form-group">
              <label htmlFor="newPassword" className="block mb-2">
                New Password:
              </label>
              <input
                type="password"
                id="newPassword"
                name="newPassword"
                placeholder="****************"
                value={newPassword}
                onChange={(e) => {
                  setNewPassword(e.target.value);
                  if (passwordError && e.target.value) setPasswordError("");
                }}
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>
            <div className="form-group">
              <label htmlFor="confirmNewPassword" className="block mb-2">
                Confirm New Password:
              </label>
              <input
                type="password"
                id="confirmNewPassword"
                name="confirmNewPassword"
                placeholder="****************"
                value={confirmNewPassword}
                onChange={(e) => {
                  setConfirmNewPassword(e.target.value);
                  if (passwordError && e.target.value) setPasswordError("");
                }}
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
              {passwordError && (
                <p className="text-red-500 text-sm">{passwordError}</p>
              )}
            </div>
            <div className="text-center">
              <button
                onClick={changePassword}
                className="btnAboutHoverEffect bg-[#0693c9] text-black rounded-md font-medium py-2 px-4 mt-6"
              >
                Change Password
              </button>
            </div>
          </div>
        </div>
      </div>
      {modalOpen && (
        <div className="modal-overlay">
          <dialog
            id="my_modal_5"
            className="modal modal-center"
            open
            onClick={handleCloseModal}
          >
            <div className="modal-box" onClick={(e) => e.stopPropagation()}>
              <div className="flex items-left">
                <img
                  src={Logo}
                  className="logo-icon w-[56px] mx-2 my-2 cursor-pointer"
                  alt="Logo"
                />
                <h3 className="font-cursive font-bold text-lg ml-1 mt-5">
                  WORK & WIN - Alert
                </h3>
              </div>
              <p className="py-4 text-left ml-8">{modalContent}</p>
              <div className="modal-action text-right">
                <button
                  className="btn btnAboutHoverEffect bg-[#0693c9] text-black rounded-md font-medium py-2 px-7 mr-4"
                  onClick={handleCloseModal}
                >
                  Close
                </button>
              </div>
            </div>
          </dialog>
        </div>
      )}
    </div>
  );
};

export default EditProfileContent;
