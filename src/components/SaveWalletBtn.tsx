import { Button } from "@mui/material"
import { wallet } from "../pages/GenWallets"

export default function SaveWalletBtn({ wallet } : {wallet: wallet}){
    return (
        <Button variant="contained" onClick={() => {
            wallet.saved = true
            if (localStorage.getItem("wallets") != null){
                const oldWalls : wallet[]  = JSON.parse(localStorage.getItem("wallets")!)
                const found = oldWalls.findIndex((item : wallet) => item.address === wallet.address)
                if(found === -1){
                    oldWalls.push(wallet)
                    localStorage.setItem("wallets", JSON.stringify(oldWalls))
                }
            }else{
                localStorage.setItem("wallets", JSON.stringify([wallet]))
            }
        }}>Save</Button>
    )
}