import axios from "axios";
import React, { createContext, useState } from "react";

const DonorContext = createContext();

const BASE_URL = process.env.REACT_APP_BACKEND || "http://localhost:3000";

export const DonorProvider = ({ children }) => {
  const [donorData, setDonorData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const registerDonor = async (registrationData) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(`${BASE_URL}/api/donor/donor-register`, registrationData);
      console.log("Response data:", response.data);
      setDonorData(response.data);
    } catch (err) {
      console.error("Error response data:", err.response?.data || err.message);
      setError(err.response?.data?.error || "An error occurred during registration.");
    } finally {
      setLoading(false);
    }
  };

  const loginDonor = async (loginData) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(`${BASE_URL}/api/donor/donor-login`, loginData);
      setDonorData(response.data);
    } catch (err) {
      console.error("Error response data:", err.response?.data || err.message);
      setError(err.response?.data?.error || "An error occurred during login.");
    } finally {
      setLoading(false);
    }
  };

  const updateDonor = async (id, data) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.put(`${BASE_URL}/api/donor/donor-update-profile/${id}`, data);
      setDonorData(response.data);
    } catch (err) {
      console.error("Error response data:", err.response?.data || err.message);
      setError(err.response?.data?.error || "An error occurred while updating.");
    } finally {
      setLoading(false);
    }
  };

  const makeDonation = async (data) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(`${BASE_URL}/api/donor/donor-makeDonation`, data);
      setDonorData(response.data);
    } catch (err) {
      console.error("Error response data:", err.response?.data || err.message);
      setError(err.response?.data?.error || "An error occurred during donation.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <DonorContext.Provider
      value={{
        donorData,
        loginDonor,
        loading,
        error,
        registerDonor,
        updateDonor,
        makeDonation,
      }}
    >
      {children}
    </DonorContext.Provider>
  );
};

export const useDonor = () => {
  const context = React.useContext(DonorContext);
  if (!context) {
    throw new Error("useDonor must be used within a DonorProvider");
  }
  return context;
};
