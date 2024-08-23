import { generateMnemonic } from 'bip39'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'


function Home() {
  const [mn, setMn] = useState<string>()
  const navigate = useNavigate()
  const getMn = () => {
    const mnemonic = generateMnemonic()
    localStorage.setItem("mnemonic", mnemonic)
    console.log("mnemonic set")
    setMn(mnemonic)
  }


  return (
    <>
      <h1>This is home page {mn}</h1>
      <button type="button" onClick={getMn}>Get mnemonic</button>
      {mn && <button onClick={()=> navigate("/wallet")}>Get wallets</button>}
    </>
  )
}

export default Home
