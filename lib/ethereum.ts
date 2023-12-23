import {ethers} from 'ethers'
import abi from "@/abi/abi.json"
import factoryAbi from "@/abi/factory.json"

export const provider = new ethers.providers.JsonRpcProvider('https://avalanche-mainnet.infura.io/v3/a4b7ea4320f349e99528b1eef9b32266')
// const contractAddress = '0x0b126f9f222345367B7053620be8270c0Cb0cCD9'
const factoryAddress = '0x7cE32777254a230E9F27d8Bd321e014455865203'
const factoryContract = new ethers.Contract(factoryAddress, factoryAbi, provider)

export const getBlockHeight = async () => {
    const blockNumber = await provider.getBlockNumber()
    console.log('blockNumber', blockNumber)
    return blockNumber
}

export const getBalance = async (contractAddr: string, walletAddr: string) => {
    const contract = new ethers.Contract(contractAddr, abi, provider)
    const balance = ethers.BigNumber.from(await contract.balanceOf(walletAddr)).toNumber()
    return balance
}

export const getCurrentSupply = async (contract: ethers.Contract) => {
    const amt = ethers.BigNumber.from(await contract.counter()).toNumber() + 1
    return amt
}

export const getMaxSupply = async (contract: ethers.Contract) => {
    const amt = ethers.BigNumber.from(await contract.MAX_COUNT()).toNumber()
    return amt
}

export const getBones = async () => {
    const bones = ethers.BigNumber.from(await factoryContract.getTotalCreatedContracts()).toNumber()
    return bones
}

export const getRecentTx = async (contractAddress: string) => {
    const contract = new ethers.Contract(contractAddress, abi, provider)
    const filters = contract.filters.Transfer()
    const events = await contract.queryFilter(filters)
    return events
}

export const getAllRecentTx = async () => {
    const contracts = await getAllContracts()
    const allTx: any[] = []

    for (const contract of contracts) {
        const contractEvents = await getRecentTx(contract)
        // console.log('contractEvents', contractEvents);
        allTx.push(...contractEvents) 
    }

    allTx.sort((a: any, b: any) => a.blockNumber - b.blockNumber)

    return allTx
}

export const getAllContracts = async () => {
    const allContracts = await factoryContract.getAllContracts()
    // console.log('allContracts', allContracts)
    return allContracts
}

interface INames {
    address: string
    name: string
}

export const getDeployEvents = async () => {
    const filters = factoryContract.filters.oracle_protocol_Deploy()
    const events = await factoryContract.queryFilter(filters)
    return events
}

export const getNames = async () => {
    const events = await getDeployEvents()
    const nameMap = new Map<string, string>()
    events.forEach((event) => {
        if (event.args) {
            nameMap.set(event.args?._address, event.args?.tick)
        }
    })
    return nameMap
}
