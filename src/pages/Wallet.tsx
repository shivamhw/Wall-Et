import { useEffect, useState } from "react"
import { HDNodeWallet } from 'ethers'
import { Buffer } from 'buffer';
import { mnemonicToSeedSync } from 'bip39'
import { HDKey } from "micro-ed25519-hdkey";
import { Keypair } from "@solana/web3.js";
import { useNavigate } from "react-router-dom";

window.Buffer = window.Buffer || Buffer;

interface wallet {
    privateKey: string
    publicKey: string
    address: string
}

function getEthWallet(seed: Buffer, index: number): wallet {
    console.log(`generating eth wallet for ${index}`)
    const path = `m/44'/60'/0'/${index}'/0'`
    const newWallet = HDNodeWallet.fromSeed(seed).derivePath(path)
    return {
        privateKey: newWallet.privateKey,
        publicKey: newWallet.publicKey,
        address: newWallet.address
    }
}

function getSolWallet(seed: Buffer, index: number): wallet {
    console.log(`generating sol wallet for ${index}`)
    const path = `m/44'/501'/${index}'/0'`
    const keypair = Keypair.fromSeed(HDKey.fromMasterSeed(seed).derive(path).privateKey)
    return {
        privateKey: keypair.secretKey.toString(),
        publicKey: keypair.publicKey.toString(),
        address: keypair.publicKey.toBase58()
    }

}

function Wallet() {
    const [mnemonic, setMnemonic] = useState<string>()
    const [seed, setSeed] = useState<Buffer>()
    const [ethWall, setEthWall] = useState<wallet[]>([])
    const [solWall, setSolWall] = useState<wallet[]>([])
    const navigate = useNavigate()

    const loadMnemonic = () => {
        const val = localStorage.getItem('mnemonic')
        if (val) {
            console.log("mnemonic", val)
            setMnemonic(val)
            setSeed(mnemonicToSeedSync(val))
        } else {
            console.log("seed not set")
        }
    }
    useEffect(loadMnemonic, [])



    return (
        <>
            <h1>This is mnemonic {mnemonic}</h1>
            <div style={{
                border: "2px solid red"
            }}>
                <div>
                    <h3>Eth Wallet</h3>
                    {
                        ethWall.map((wall) => {
                            return <div>{wall.address} <button onClick={() => {
                                navigate("/account?id="+wall.address+"&chain=eth")
                            }}>get bal</button></div>
                        })
                    }
                    <button onClick={() => {
                        setEthWall((prev) => [...prev, getEthWallet(seed!, prev.length)])
                    }}>Generate Eth wallet</button>
                </div>
                <div>
                    <h3>Sol Wallet</h3>
                    {
                        solWall.map((wall) => {
                            return <div>{wall.address} <button onClick={() => {
                                navigate("/account?id="+wall.address+"&chain=sol")
                            }}>get bal</button></div>
                        })
                    }
                    <button onClick={() => {
                        setSolWall((prev) => [...prev, getSolWallet(seed!, prev.length)])

                    }}>Generate Sol wallet</button>
                </div>
            </div>
        </>
    )
}
export default Wallet