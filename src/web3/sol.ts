import * as web3 from '@solana/web3.js'
import { Keypair } from '@solana/web3.js';
import { HDKey } from 'micro-ed25519-hdkey';
import { wallet } from '../pages/Wallet';

const backend = "https://solana-devnet.g.alchemy.com/v2/lW1iO6RZUsOO4-rypY3Yc3Fc1_3ko_I6"
// const backend = "http://127.0.0.1:8899"
// const solRPC = web3.clusterApiUrl("devnet")


export async function getBal(address: string): Promise<string> {
    const connection = new web3.Connection(backend, "finalized");
    const balance = await connection.getBalance(new web3.PublicKey(address)) / web3.LAMPORTS_PER_SOL
    return balance.toString()
}

export async function airDrop(address: string) {
    console.log("started airdrop for solana")
    const connection = new web3.Connection(backend, "confirmed")
    const pubKey = new web3.PublicKey(address)
    const sign = await connection.requestAirdrop(pubKey, 1 * web3.LAMPORTS_PER_SOL)
    const latestHash = await connection.getLatestBlockhash()
    try {
        await connection.confirmTransaction({
            blockhash: latestHash.blockhash,
            lastValidBlockHeight: latestHash.lastValidBlockHeight,
            signature: sign
        })
        console.log("airdrop completed")
    } catch (err) {
        console.log("this failed again braah ", err)
    }
}

export function getSolWallet(seed: Buffer, index: number): wallet {
    console.log(`generating sol wallet for ${index}`)
    const path = `m/44'/501'/${index}'/0'`
    const keypair = Keypair.fromSeed(HDKey.fromMasterSeed(seed).derive(path).privateKey)
    return {
        privateKey: keypair.secretKey.toString(),
        publicKey: keypair.publicKey.toString(),
        address: keypair.publicKey.toBase58()
    }
}