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
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.error || "Login failed");
        return;
      }

      // ✅ STORE DATA (OLD WAY – KEEPING IT)
      localStorage.setItem("loginToken", data.token);
      localStorage.setItem("vendorId", data.vendorId);

      alert("Login successful");

      setEmail("");
      setPassword("");

      showWelcomeHandler(true);
    } catch (error) {
      console.error("Login error:", error);
      alert("Something went wrong");
    }
  };

  return (
    <div className="loginSection">
      <form className="authForm" onSubmit={loginHandler}>
        <h3>Vendor Login</h3>

        <label>Email</label>
        <input value={email} onChange={(e) => setEmail(e.target.value)} />

        <label>Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Login;
