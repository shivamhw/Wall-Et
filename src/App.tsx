import Home from './pages/Home';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import GenWallet from './pages/GenWallets';
import MyWallets from './pages/MyWallets';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/gen-wallets" element={<GenWallet/>}></Route>
        <Route path="/my-wallets" element={<MyWallets/>}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
