import React, { useState } from "react";
import { useDonor } from "../context/DonorContext";
import { useDonee } from "../context/DoneeContext";
import { useBloodManager } from "../context/BloodManagerContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Bounce } from "react-toastify";

const Register = () => {
  const { registerDonor } = useDonor();
  const { registerDonee } = useDonee();
  const { registerManager } = useBloodManager();

  const [role, setRole] = useState("DONOR");
  const [registrationData, setRegistrationData] = useState({
    name: "",
    email: "",
    password: "",
    bloodGroup: "",
    contactNumber: "",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleInputChange = (e) => {
    setRegistrationData({ ...registrationData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let registrationResponse;
      
      if (role === "DONOR") {
        registrationResponse = await registerDonor(registrationData);
      } else if (role === "DONEE") {
        registrationResponse = await registerDonee(registrationData);
      } else {
        registrationResponse = await registerManager(registrationData);
      }
      
      console.log("API Response:", registrationResponse);
      
      if (registrationResponse?.error) {
        throw new Error(registrationResponse.error);
      }
      
      toast.success("Registration successful!", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
        transition: Bounce,
      });
      setIsModalOpen(true);
    } catch (error) {
      console.error("Registration Error:", error);
      toast.error(error.message || "Registration failed", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
        transition: Bounce,
      });
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={registrationData.name}
          onChange={handleInputChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={registrationData.email}
          onChange={handleInputChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={registrationData.password}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="bloodGroup"
          placeholder="Blood Group"
          value={registrationData.bloodGroup}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="contactNumber"
          placeholder="Contact Number"
          value={registrationData.contactNumber}
          onChange={handleInputChange}
          required
        />

        <div>
          <button
            type="button"
            className={role === "DONOR" ? "active" : ""}
            onClick={() => setRole("DONOR")}
          >
            Donor
          </button>
          <button
            type="button"
            className={role === "DONEE" ? "active" : ""}
            onClick={() => setRole("DONEE")}
          >
            Donee
          </button>
          <button
            type="button"
            className={role === "MANAGER" ? "active" : ""}
            onClick={() => setRole("MANAGER")}
          >
            Manager
          </button>
        </div>

        <button type="submit">Register</button>
      </form>

      {isModalOpen && <div className="modal">Registration Successful!</div>}
    </div>
  );
};

export default Register;
