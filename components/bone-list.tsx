import axios from "axios";

import { Bone, boneColums } from "./bone-columns";
import { DataTable } from "./data-table";
import {
  getDeployEvents,
  provider,
  getCurrentSupply,
  getMaxSupply,
} from "@/lib/ethereum";
import { ethers } from "ethers";
import abi from "@/abi/abi.json";

async function getData(): Promise<Bone[]> {
  //   try {
  //     const response = await axios.get("http://localhost:3000/api/bone");
  //     return response.data;
  //   } catch (error: any) {
  //     console.log("[CODE_ERROR]", error);
  //   }
  let events: ethers.Event[] = [];
  let response: Bone[] = [];
  try {
    events = await getDeployEvents();
  } catch (error: any) {
    console.log("[CODE_ERROR]", error);
  }
  if (events.length > 0) {
    const promise: Promise<Bone>[] = events.map(async (event) => {
      const contract = new ethers.Contract(event.args?._address, abi, provider);
      const supply = await getCurrentSupply(contract);
      const TotalSupply = await getMaxSupply(contract);
      const process = ((supply / TotalSupply) * 100).toFixed(2);
      return {
        tick: event.args?.tick as string,
        launchType: "FAIR",
        status: event.args?.status,
        limit: ethers.BigNumber.from(event.args?.amt).toString(),
        difficulty: ethers.BigNumber.from(event.args?.difficulty).toString(),
        fee: ethers.BigNumber.from(event.args?.fee).toString(),
        process: process + "%",
      };
    });
    response = await Promise.all(promise);
  }

  return response;

  // Fetch data from your API here.
  //   return [
  //     {
  //       name: "usdt",
  //       launchType: "fair",
  //       status: "Completed",
  //       limit: "1000",
  //       difficulty: "0x0000",
  //       fee: "0.0001",
  //       owner: "0xaaaaaaaaaa.......asdsadasd",
  //     },
  //   ];
}

const BoneList = async () => {
  const data = await getData();
  console.log(data);
  return (
    <div className="container mx-auto py-10">
      <DataTable columns={boneColums} data={data} />
    </div>
  );
};

export default BoneList;
