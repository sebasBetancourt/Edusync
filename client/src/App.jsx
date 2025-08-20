import { useState } from 'react'
import Landing from "./components/Landing.jsx";


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    
      <Landing></Landing>
    </>
  )
}

export default App
