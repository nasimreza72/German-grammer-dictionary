import { useEffect, useState } from 'react'

export default function Home () {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
  
    function handleSubmit(e) {
      e.preventDefault()
  
      const config = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
      }
  
      fetch("http://localhost:3005/login", config)
        .then(response => response.json())
        .then(result => {
          console.log(result)
          if (result.error) {
            alert(result.error)
          } else {
            props.setToken(result.token)
          }
        })
        .catch(error => console.error(error))
    }
  
    return (
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="username"
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
        <br />
        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <br />
        <button type="submit">Login</button>
      </form>
    )
  }