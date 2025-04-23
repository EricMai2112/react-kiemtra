import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import SinhVien from './Components/SinhVien'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <SinhVien />
    </>
  )
}

export default App
