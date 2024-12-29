// react-movies/src/pages/loginPage.js
import React, { useState } from 'react';

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:8080/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ username, password })
      });
      const data = await res.json();

      if (res.ok && data.success) {
        localStorage.setItem("token", data.token);
        alert("Login success!");
      } else {
        alert(data.msg || "Login failed");
      }
    } catch (err) {
      console.error("Login error:", err);
      alert("Error during login");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Login</h2>
        <form onSubmit={handleLogin}>
          <div style={styles.formGroup}>
            <label htmlFor="username" style={styles.label}>Username</label>
            <input
              id="username"
              style={styles.input}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter username"
            />
          </div>
          <div style={styles.formGroup}>
            <label htmlFor="password" style={styles.label}>Password</label>
            <input
              id="password"
              type="password"
              style={styles.input}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
            />
          </div>
          <button type="submit" style={styles.button}>
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

const styles = {
    container: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "80vh",     
      backgroundColor: "#f4f4f4"
    },
    card: {
      backgroundColor: "#ffffff",
      padding: "2rem",
      borderRadius: "8px",
      boxShadow: "0 0 10px rgba(0,0,0,0.1)",
      width: "350px"
    },
    title: {
      marginBottom: "1.5rem",
      textAlign: "center"
    },
    formGroup: {
      display: "flex",
      flexDirection: "column",
      marginBottom: "1rem"
    },
    label: {
      marginBottom: "0.5rem",
      fontWeight: "bold"
    },
    input: {
      padding: "0.5rem",
      fontSize: "1rem",
      borderRadius: "4px",
      border: "1px solid #ccc"
    },
    button: {
      width: "100%",
      padding: "0.75rem",
      fontSize: "1rem",
      borderRadius: "4px",
      backgroundColor: "#8e24aa",
      color: "#fff",
      border: "none",
      cursor: "pointer"
    }
  };
