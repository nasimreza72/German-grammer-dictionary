import { useState } from "react";

export default function Registration() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function submitRegistration(e) {
    e.preventDefault();

    const config = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    };

    fetch("http://localhost:3005/register", config)
    .then((response) => {
      response.json();
      console.log(response.ok);
      if (response.ok) {
        return;
      } else {
        alert("Username already taken!!");
      }
    });
  }

  return (
    <div id="registration">
      <form onSubmit={submitRegistration}>
        <input
          type="text"
          placeholder="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <br />
        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <button type="submit">Register me</button>
      </form>
    </div>
  );
}
