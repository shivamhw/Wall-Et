import { generateMnemonic } from 'bip39'
import { useState } from 'react'


function Home() {
  const [mn, setMn] = useState<string>();
  const getMn = () => {
    const mnemonic = generateMnemonic()
    localStorage.setItem("mnemonic", mnemonic)
    console.log("mnemonic set")
  }


  return (
    <>
      <button type="button" onClick={getMn}>Get mnemonic</button>
      <h1>MN {mn}</h1>
    </>
  )
}

export default Home
