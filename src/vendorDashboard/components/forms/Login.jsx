import React, { useState } from "react";
import { API_URL } from "../../data/apiPath";

const Login = ({ showWelcomeHandler }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginHandler = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${API_URL}/vendor/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      // ❌ STOP if login failed
      if (!response.ok) {
        alert(data.error || "Login failed");
        return;
      }

      // ✅ Login success
      alert("Login success");

      setEmail("");
      setPassword("");

      // 🔑 SAVE TOKEN & VENDOR ID
      localStorage.setItem("loginToken", data.token);
      localStorage.setItem("vendorId", data.vendorId);

      const vendorId = data.vendorId;
      console.log("VendorId:", vendorId);

      // 🔒 SAFETY CHECK
      if (!vendorId) {
        console.error("VendorId missing after login");
        return;
      }

      // ✅ Fetch vendor details
      const vendorResponse = await fetch(
        `${API_URL}/vendor/single-vendor/${vendorId}`,
      );

      const vendorData = await vendorResponse.json();

      if (vendorResponse.ok) {
        const vendorFirmId = vendorData.vendorFirmId;

        if (vendorFirmId) {
          localStorage.setItem("firmId", vendorFirmId);
          localStorage.setItem("firmName", vendorData.vendor.firm[0].firmName);
        }
      }

      // ✅ Move to dashboard / welcome screen
      showWelcomeHandler();
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return (
    <div className="loginSection">
      <form className="authForm" onSubmit={loginHandler}>
        <h3>Vendor Login</h3>
        <label>Email</label>
        <input
          type="text"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter Your Email"
        />
        <br />
        <label>Password</label>
        <input
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter Your Password"
        />
        <br />
        <div className="btnSubmit">
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default Login;
