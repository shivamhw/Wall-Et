import { useState } from "react";
import { useLocation } from "react-router-dom"
import { getBal as ethBal } from '../web3/eth'
import { getBal as solBal, airDrop as solDrop } from '../web3/sol'

async function checkBal(address: string, chain: string){
    if(chain == "eth"){
        return await ethBal(address)
    }
    return await solBal(address)
}

function Account(){
    const location = useLocation()
    const [bal, setBal] = useState<string>()
    const query = new URLSearchParams(location.search);
    const add = query.get("id")
    const chain = query.get("chain")
    return(
        <>
        this is account {add}
        <div>
            Check balance of {chain == "eth" ? "Ethereum": "Solana"}
            <button onClick={ async ()=>{
                const balance = await checkBal(add!, chain!)
                setBal(balance)
            }}>Check Bal</button><button onClick={ async () => {
                solDrop(add!)
            }}>Airdrop sol</button>
            <div>Balance is {bal}</div>
        </div>
        </>
    )
}

export default Account