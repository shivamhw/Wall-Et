import { useEffect, useState } from "react";
import { Buffer } from 'buffer';
import { mnemonicToSeedSync } from 'bip39'
import { Box, Button, Stack, Typography } from "@mui/material";
import { getEthWallet } from "../web3/eth";
import { getSolWallet } from "../web3/sol";
import WalletCard from "../components/WalletCard";
import { useNavigate } from "react-router-dom";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

window.Buffer = window.Buffer || Buffer;

export interface wallet {
    privateKey: string
    publicKey: string
    address: string
    chain?: string
}


function Wallet() {
    const [mnemonic, setMnemonic] = useState<string>()
    const [seed, setSeed] = useState<Buffer>()
    const [wall, setWall] = useState<wallet[]>([])
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
            width: '99vw',
            padding: {
                xs: 3
            }
        }}
        >
            <Box display='flex' gap={2} flexDirection='column' sx={{
                padding: 3,
                boxShadow: '0px 4px 12px #5555',
                borderRadius: '16px',
                width :{
                    lg: "1000px",
                    xs: '100%'
                }
            }}>
                <Typography variant="h2" sx={{
                    fontSize: {
                        xs: 50
                    }
                }} >Your mnemonic is</Typography>
                <Typography sx={{
                    fontFamily: "monospace"
                }} variant="h5">{mnemonic} <Button variant="contained" size="small"  color="secondary" onClick={() => {
                    navigate("/")}}><DeleteForeverIcon/></Button></Typography>
                
                <Box display='flex' justifyContent='center' alignItems='center' gap={3}>
                    <Button variant="contained" onClick={() => {
                        setWall((prev) => [...prev, {...getEthWallet(seed!, prev.length), chain: "eth"}])
                    }} >Get ETH wallet</Button>

                    <Button variant="contained" color="info" onClick={() => {
                        setWall((prev) => [...prev, {...getSolWallet(seed!, prev.length), chain: "sol"}])
                    }} >Get Sol wallet</Button>

                </Box>  
            </Box>
            {
                wall.map((wall) => {
                    return <WalletCard key={wall.address} chain={wall.chain || "eth"} wallet={wall}></WalletCard>
                })
            }
        </Stack>
    )
}
export default Wallet