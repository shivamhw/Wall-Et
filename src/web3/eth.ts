import { HDNodeWallet } from 'ethers/wallet'
import web3 from 'web3'
import { wallet } from '../pages/Wallet'
const backend = "https://eth-sepolia.g.alchemy.com/v2/lW1iO6RZUsOO4-rypY3Yc3Fc1_3ko_I6"

export async function getBal(address : string): Promise<string>{
    const connection = new web3(backend)
    const balance =  web3.utils.fromWei(await connection.eth.getBalance(address), 'ether')
    console.log(balance)
    return balance
}


export function getEthWallet(seed: Buffer, index: number): wallet {
    console.log(`generating eth wallet for ${index}`)
    const path = `m/44'/60'/0'/${index}'/0'`
    const newWallet = HDNodeWallet.fromSeed(seed).derivePath(path)
    return {
        privateKey: newWallet.privateKey,
        publicKey: newWallet.publicKey,
        address: newWallet.address
    }
}