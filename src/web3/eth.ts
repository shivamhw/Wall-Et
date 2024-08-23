import web3 from 'web3'

const backend = "https://eth-sepolia.g.alchemy.com/v2/lW1iO6RZUsOO4-rypY3Yc3Fc1_3ko_I6"

export async function getBal(address : string): Promise<string>{
    const connection = new web3(backend)
    const balance =  web3.utils.fromWei(await connection.eth.getBalance(address), 'ether')
    console.log(balance)
    return balance
}
