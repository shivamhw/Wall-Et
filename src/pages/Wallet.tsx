import { useEffect, useState } from "react"
import { HDNodeWallet } from 'ethers'
import {Buffer} from 'buffer';
import { mnemonicToSeedSync } from 'bip39'


window.Buffer = window.Buffer || Buffer;

interface wallet {
    privateKey: string
    publicKey: string
    address: string
}


function Wallet(){
    const [mnemonic, setMnemonic] = useState<string>()
    const [wallets, setWallets] = useState<wallet[]>()
    const path = "m/44'/60'/0'/0/1"
    const loadMnemonic = () =>{
        const val = localStorage.getItem('mnemonic')
        if(val){
            console.log("mnemonic", val)
            setMnemonic(val)
            if(val){
                const wallGen = HDNodeWallet.fromSeed(mnemonicToSeedSync(val))
                const wall = wallGen.derivePath(path)
                setWallets([
                    {
                        privateKey: wall.privateKey,
                        publicKey: wall.publicKey,
                        address: wall.address
                    }
                ])


            }
        }else{
            console.log("seed not set")
        }
    }
    useEffect(loadMnemonic, [])



    return (
        <>
        <h1>This is wallet</h1>
        wallet {JSON.stringify(wallets)}
        </>
    )
}
export default Wallet