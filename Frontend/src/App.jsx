import { useState } from 'react'
import './App.css'
import { useRef } from 'react'

function App() {
  
  const email = useRef(null)
  const password = useRef(null)

  async function submit() {
    const emailValue = email.current.value;
    const passwordValue = password.current.value;

    if (!emailValue || !passwordValue) {
      alert("Please fill in all fields");
      return;
    }

    try {
      const response = await fetch('http://34.131.95.237:3000/user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: emailValue, password: passwordValue })
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error('Error:', error);
    }
    
  }

  return (
    <>
    <h1>Input daal kr cheak kijiye manniya..</h1>
      <input type="text" placeholder='Enter email here' ref={email} />
      <input type="password" placeholder='Enter your password' ref={password} />
      <button onClick={submit}>Submit</button>
    </>
  )
}

export default App
