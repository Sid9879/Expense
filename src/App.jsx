import { useEffect, useState } from 'react'
import './App.css'
import { BrowserRouter, Routes ,Route, Navigate} from 'react-router-dom'
import Home from './Pages/Home'
import Navbar from './Component/Navbar'
import Login from './Pages/Login'
import Signup from './Pages/Signup'

function App() {
    let [login, setlogin] = useState(false);
    

  
   
  return (
    <>
     <BrowserRouter>
     <Navbar login={login} setlogin={setlogin}/>
     <Routes>
     <Route path="/" element={login===true ? <Home /> : <Navigate to="/login" />} />
     <Route path="/login" element={ login === false ? <Login setlogin={setlogin}/> : <Navigate to = "/" />} />
      <Route path= '/signup' element={<Signup/>}/>
     </Routes>
     </BrowserRouter>
    </>
  )
}

export default App
