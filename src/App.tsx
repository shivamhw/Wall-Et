import Home from './pages/Home';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Wallet from './pages/Wallet';
import Account from './pages/Account';

function App() {

  return (
    <BrowserRouter>
    <Routes>
    <Route path="/" element={<Home/>}></Route>
    <Route path="/wallet" element={<Wallet/>}></Route>
    <Route path='/account' element={<Account/>} ></Route>
    </Routes>
    
    </BrowserRouter>
  )
}

export default App
