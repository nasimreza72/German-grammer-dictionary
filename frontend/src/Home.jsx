import { useEffect, useState } from 'react'

export default function Home (props) {



    return (
      <div id="home">
      <h1>Welcome to the learn german page</h1>
      <button onClick={()=>props.setLogin(false)}>logout</button>
      </div>
    )
  }