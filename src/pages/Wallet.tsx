import { useEffect, useState } from "react";
import { Buffer } from 'buffer';
import { mnemonicToSeedSync } from 'bip39'
import { Box, Button, Stack, Typography } from "@mui/material";
import { getEthWallet } from "../web3/eth";
import { getSolWallet } from "../web3/sol";
import WalletCard from "../components/WalletCard";
import { useNavigate } from "react-router-dom";


window.Buffer = window.Buffer || Buffer;

export interface wallet {
    privateKey: string
    publicKey: string
    address: string
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
        <Stack spacing={2} alignItems='center' sx={{
            width: '100vw',
            padding: {
                xs: 3
            }
        }}
        >
            <Box display='flex' gap={2} flexDirection='column' sx={{
                padding: 3,
                boxShadow: '0px 4px 12px #5555',
                borderRadius: '16px'
            }}>
                <Typography variant="h2" sx={{
                    fontSize: {
                        xs: 50
                    }
                }} >Your mnemonic is</Typography>
                <Typography sx={{
                    fontFamily: "monospace"
                }} variant="h5">{mnemonic}</Typography>
                <Box display='flex' justifyContent='center' alignItems='center' gap={3}>
                    <Button variant="contained" onClick={() => {
                        setEthWall((prev) => [...prev, getEthWallet(seed!, prev.length)])
                    }} >Get ETH wallet</Button>

                    <Button variant="contained" color="info" onClick={() => {
                        setSolWall((prev) => [...prev, getSolWallet(seed!, prev.length)])
                    }} >Get Sol wallet</Button>
                    <Button variant="contained" color="secondary" onClick={() => {
                        navigate("/")
                    }} >Reset Mnemonic</Button>
                </Box>  
            </Box>
            {
                ethWall.map((wall) => {
                    return <WalletCard key={wall.address} chain="eth" wallet={wall}></WalletCard>
                })
            }
            {
                solWall.map((wall) => {
                    return <WalletCard key={wall.address} chain="sol" wallet={wall}></WalletCard>
                })
            }
        </Stack>
    )
}
export default Wallet