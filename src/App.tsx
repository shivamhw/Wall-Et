import { generateMnemonic, mnemonicToSeedSync } from 'bip39'
import { useState } from 'react'
import {Buffer} from 'buffer';
import Home from './pages/Home';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Wallet from './pages/Wallet';

Buffer.from("anything", "base64");
window.Buffer = window.Buffer || Buffer;


interface wallet {
  address : string
  privateKey : string
  publicKey : string
}

function App() {
  // const genWallet = () =>{
  //   const walletCreator = HDNodeWallet.fromSeed(seed!)
  //   const path = "m/44'/60'/0'/0/1"
  //   const wall = walletCreator.derivePath(path)
  //   setWallet({
  //     privateKey: wall.privateKey,
  //     publicKey: wall.publicKey,
  //     address: wall.address
  //   })
  // }


  return (
    <BrowserRouter>
    <Routes>
    <Route path="/" element={<Home/>}></Route>
    <Route path="/wallet" element={<Wallet/>}></Route>
    </Routes>
    
    </BrowserRouter>
  )
}

export default App
