import { useState } from 'react'
import './App.css'
import { BrowserRouter, Routes ,Route, Navigate} from 'react-router-dom'
import Home from './Pages/Home'
import Navbar from './Component/Navbar'
import Login from './Pages/Login'
import Signup from './Pages/Signup'

function App() {
 
  const [login, setLogin] = useState(
    JSON.parse(localStorage.getItem("expenseLogin")) ? true : false)
  return (
    <>
     <BrowserRouter>
     <Navbar/>
     <Routes>
     <Route path="/" element={login ? <Home /> : <Navigate to="/login" />} />
     <Route path="/login" element={<Login setLogin={setLogin} />} />
     {/* <Route path="/" element={login ? <Login /> : <Navigate to="/login" />} /> */}


      <Route path= '/signup' element={<Signup/>}/>
     </Routes>
     </BrowserRouter>
    </>
  )
}

export default App
