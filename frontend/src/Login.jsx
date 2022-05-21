import { useState } from "react";
import Registration from "./Registration";

export default function Login(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showRegistration, setShowRegistration] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();

    const config = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    };

    fetch("http://localhost:3005/login", config).then((response) => {
      response.json();
      console.log(response.ok);
      if (response.ok) {
        props.setLogin(true);
      } else {
        alert("Invalid password!!");
      }
    });
  }

  return (
    <div id="login">
      <form onSubmit={handleSubmit}>
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
        <button type="submit">Login</button>
      </form>
      <div>
        <button onClick={() => setShowRegistration(true)}>Registration</button>
        {showRegistration && <Registration />}
      </div>
    </div>
  );
}
