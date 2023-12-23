import { ethers } from 'ethers'
import path from 'path'
import fs from 'fs'

const nodeUrl: string = 'https://goerli.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161'
const provider = new ethers.providers.JsonRpcProvider(nodeUrl)

const abiPath = path.join(__dirname, 'abi.json')
const abi = JSON.parse(fs.readFileSync(abiPath, 'utf8'))

const address = '0x2934a9b0da2a5a8a6E031adcF4B19abf7E7f6487'
const contract = new ethers.Contract('0x49110868BD0d7604570e7090a11a03209dEDEf67', abi, provider)

// 获取当前钱包铭文余额
const getBalance = async () => {
    const balance = await contract.balance(address)
    console.log(address, "的余额为：", ethers.BigNumber.from(balance).toNumber())
}
getBalance()

// 获取铭文总供应量
const getTotalSupply = async () => {
    const totalSupply = await contract.MAX_COUNT()
    console.log("总供应量为：", ethers.BigNumber.from(totalSupply).toNumber(), "张")
}
getTotalSupply()

// 获取已mint的铭文数量
const getMintedCount = async () => {
    const mintedCount = await contract.counter()
    console.log("已铸造数量为：", ethers.BigNumber.from(mintedCount).toNumber(), "张")
}
getMintedCount()

// 获取铭文文字内容
const getInscription = async () => {
    const inscription = await contract._inscription()
    console.log("铭文内容为：", inscription)
}
getInscription()

// 获取铭文名字
const getName = async () => {
    const name = await contract.tick()
    console.log("铭文名字为：", name)
}
getName()

// 获取所有铸造记录
const getMintedEvents = async () => {
    const filters = contract.filters["ethrunes_protocol_Inscribe"]()
    const events = await contract.queryFilter(filters)
    console.log("所有铸造记录为：")
    for (const event of events) {
        // console.log(event) // 完整的事件数据
        console.log(event.args?.to, event.args?.content)
    }
}
getMintedEvents()

// 获取某一钱包的铸造记录
const getMintedEventsByAddress = async (address: string) => {
    const filters = contract.filters["ethrunes_protocol_Inscribe"](address)
    const events = await contract.queryFilter(filters)
    console.log("某一钱包的铸造记录为：", address)
    for (const event of events) {
        // console.log(event) // 完整的事件数据
        console.log(event.args?.to, event.args?.content)
    }
}
getMintedEventsByAddress(address)

// 获取所有转账记录
const getTransferEvents = async () => {
    const filters = contract.filters["etherunes_protocol_Transfer"]()
    const events = await contract.queryFilter(filters)
    console.log("所有转账记录为：")
    for (const event of events) {
        // console.log(event) // 完整的事件数据
        console.log("from: ", event.args?.from, "to: ", event.args?.to, event.args?.content)
    }
}
getTransferEvents()

// 获取某一钱包的转账记录
const getTransferEventsByAddress = async (address: string) => {
    const filters = contract.filters["etherunes_protocol_Transfer"](address)
    const events = await contract.queryFilter(filters)
    console.log("某一钱包的转账记录为：", address)
    for (const event of events) {
        // console.log(event) // 完整的事件数据
        console.log("from: ", event.args?.from, "to: ", event.args?.to, event.args?.content)
    }
}
getTransferEventsByAddress(address)