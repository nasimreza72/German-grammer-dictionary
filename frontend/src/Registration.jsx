import { useState } from "react";

export default function Registration() {
  const [createUser, setCreateUser] = useState("");
  const [createPassword, setCreatePassword] = useState("");

  function submitRegistration(e) {
    e.preventDefault();

    const config = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      // body: JSON.stringify({ createUser, createPassword }),
      body: JSON.stringify({ username, password }),

    };

    fetch("http://localhost:3005/register", config)
    .then((response) => {
      response.json();
      console.log(response.ok);
      if (response.ok) {
        props.setLogin(true);
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
          value={createUser}
          onChange={(e) => setCreateUser(e.target.value)}
        />
        <br />
        <input
          type="password"
          placeholder="password"
          value={createPassword}
          onChange={(e) => setCreatePassword(e.target.value)}
        />
        <br />
        <button type="submit">Register me</button>
      </form>
    </div>
  );
}
