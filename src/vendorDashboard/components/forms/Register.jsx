import React, { useState } from "react";
import { API_URL } from "../../data/apiPath";

const Register = ({ showLoginHandler }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;

    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/vendor/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Registration failed");
        setLoading(false);
        return;
      }

      alert("Vendor registered successfully");

      setUsername("");
      setEmail("");
      setPassword("");

      // ✅ GO BACK TO LOGIN (OLD FLOW)
      showLoginHandler();
    } catch (error) {
      console.error("Register error:", error);
      alert("Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="registerSection">
      <form className="authForm" onSubmit={handleSubmit}>
        <h3>Vendor Register</h3>

        <label>Username</label>
        <input value={username} onChange={(e) => setUsername(e.target.value)} />

        <label>Email</label>
        <input value={email} onChange={(e) => setEmail(e.target.value)} />

        <label>Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">{loading ? "Submitting..." : "Submit"}</button>
      </form>
    </div>
  );
};

export default Register;
