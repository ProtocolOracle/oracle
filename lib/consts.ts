import {ethers} from "ethers"
import {provider} from "./ethereum"
import abi from "@/abi/abi.json"

export type Bone = {
    tick: string
    contract: string
    status: string
    remainSupply: string
    max: string
    difficulty: string
    amt: string
    fee: string
}

export const getBoneList = async () => {
    const contract = new ethers.Contract("0x6C0d13E625bf810fD7ea57ae09F9D4105E8a2C4E", abi, provider)
    // const max = ethers.BigNumber.from(await contract.MAX_COUNT()).toNumber()
    const max = 2100000
    // const tick = await contract.tick()
    const tick = "BONE"
    const minted = ethers.BigNumber.from(await contract.counter()).toNumber()
    const remainSupply = max - minted
    // const amt: string = await contract.amt()
    const amt = "1000"
    // const difficulty = ethers.BigNumber.from(await contract.difficulty()).toNumber()
    const difficulty = 17
    const status = remainSupply > 0 ? "MINING" : "FINISHED"
    // const fee = ethers.BigNumber.from(await contract.FEE()).toString()
    const fee = ethers.BigNumber.from("10000000000000000").toString()
    return [
        {
            tick: tick,
            contract: contract.address,
            remainSupply: remainSupply.toString(),
            minted: minted.toString(),
            difficulty: difficulty.toString(),
            status: status,
            max: max.toString(),
            amt: amt,
            fee: fee
        }
    ]
}

export const getBone = async (tick: string) => {
    const boneList: Bone[] = await getBoneList()
    const boneMap: Map<string, Bone> = new Map()
    boneList.map((bone) => {
        boneMap.set(bone.tick, bone)
    })

    return boneMap.get(tick)
}