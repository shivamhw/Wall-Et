import * as web3 from '@solana/web3.js'

const backend = "https://solana-devnet.g.alchemy.com/v2/lW1iO6RZUsOO4-rypY3Yc3Fc1_3ko_I6"

export async function getBal(address: string): Promise<string> {
    const connection = new web3.Connection(backend, "finalized");
    const balance = await connection.getBalance(new web3.PublicKey(address)) / web3.LAMPORTS_PER_SOL
    return balance.toString()
}

export async function airDrop(address: string) {
    console.log("started airdrop for solana")
    const connection = new web3.Connection(backend, "finalized")
    const pubKey = new web3.PublicKey(address)
    const sign = await connection.requestAirdrop(pubKey, 0.1 * web3.LAMPORTS_PER_SOL)
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