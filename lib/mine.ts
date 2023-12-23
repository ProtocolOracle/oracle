import {ethers} from 'ethers'
import abi from '@/abi/abi.json'
import BN from 'bn.js'

const provider = new ethers.providers.JsonRpcProvider("https://avalanche-mainnet.infura.io/v3/a4b7ea4320f349e99528b1eef9b32266")

let challenge: ethers.BigNumber
let difficulty: ethers.BigNumber
let currentGasPrice: ethers.BigNumber
// console.log(challenge, difficulty)

export const miner = async (contractAddr: string, walletAddr: string): Promise<ethers.BigNumber> => {
    const contract = new ethers.Contract(contractAddr, abi, provider)
    challenge = await contract.challenge() as ethers.BigNumber
    difficulty = await contract.difficulty() as ethers.BigNumber
    while (true) {
        const txHash = await worker(currentGasPrice, walletAddr)
        if (txHash) {
            return txHash[1]
            break
        }
    }
}
const worker = async (currentGasPrice: ethers.BigNumber, walletAddr: string): Promise<[string, ethers.BigNumber] | void> => {
    const dataNonce: ethers.BigNumber = ethers.BigNumber.from(BigInt(Math.floor(Math.random() * 10000000000000000000)))
    let noncePadded = ethers.utils.zeroPad(dataNonce.toHexString(), 32)
    let challengePadded = ethers.utils.zeroPad(challenge.toHexString(), 32)

    let addressBytes = ethers.utils.arrayify(walletAddr)

    let data = ethers.utils.concat([challengePadded, addressBytes, noncePadded])

    const hash = ethers.utils.keccak256(data)
    const hashBN = new BN(hash.substring(2), 16) 

    let one = new BN(1)
    const difficultyUint = ethers.BigNumber.from(difficulty).toNumber()
    let targetThreshold = one.shln(256 - difficultyUint)
    if (hashBN.lt(targetThreshold)) {
        console.log('found')
        return [hash, dataNonce]
    }
};
