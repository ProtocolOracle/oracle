"use client";

import { Bone } from "@/lib/consts";
import { Button } from "./ui/button";
import { Progress } from "./ui/progress";
import { useEffect, useState } from "react";
import TypewriterComponent from "typewriter-effect";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useAddress, useContract, useContractWrite } from "@thirdweb-dev/react";
import { getBalance } from "@/lib/ethereum";
import abi from "@/abi/abi.json";
import { ethers } from "ethers";
import { miner } from "@/lib/mine";
import { set } from "zod";

const BoneMining = ({ bone }: { bone: Bone }) => {
  const [showDialog, setShowDialog] = useState(false);
  const [balance, setBalance] = useState(0);
  const [nonce, setNonce] = useState<ethers.BigNumber>(
    ethers.BigNumber.from(0)
  );
  const address = useAddress();
  const { contract } = useContract(bone.contract, abi);
  const { mutateAsync, isLoading, error } = useContractWrite(contract, "mint");
  // if address exists, get balance
  useEffect(() => {
    if (address) {
      getBalance(bone.contract, address).then((balance) => {
        setBalance(balance);
      });
    }
  }, [address, bone.contract, nonce]);

  const handleOpenDialog = async () => {
    setShowDialog(true);
    // const nonce = await miner(bone.contract, address);
    // setNonce(nonce)
    // contract?.call("mine", [nonce], {value: ethers.utils.parseUnits("10000", "wei")}).then((res) => {
    //     setShowDialog(false)
    //     setNonce(ethers.BigNumber.from(0))
    // })
    if (!address) {
      setShowDialog(false);
      return;
    }
    miner(bone.contract, address).then((nonce) => {
      setNonce(nonce);
      contract
        ?.call("mine", [nonce], {
          value: ethers.utils.parseUnits(bone.fee, "wei"),
        })
        .then((res) => {
          setShowDialog(false);
          setNonce(ethers.BigNumber.from(0));
        }).catch((err) => {
          setShowDialog(false)
          setNonce(ethers.BigNumber.from(0))
          });
    });
  };

  const handleCloseDialog = () => {
    setShowDialog(false);
    setNonce(ethers.BigNumber.from(0));
  };
  return (
    <div>
      <p className="text-2xl p-10 text-center">ORAC Mining</p>
      <p className="text-xl p-3">Wallet Address: {address ? address : "0x"}</p>
      <p className="text-xl p-3">BONE Balance: {balance}</p>
      <div className="border rounded-xl p-6">
        <div className="text-2xl p-3 text-center text-red-500">{bone.tick}</div>
        <code className="text-l text-red-500 rounded-2xl border bg-gray-300 p-3">{`data:,{"p":"orac","op":"mint","tick":"${bone.tick}","amt":"${bone.amt}","difficulty":"${bone.difficulty}"}`}</code>

        <div className="text-xl p-3">Contract: {bone.contract}</div>
        <div className="text-xl p-3">Total Supply: {bone.max}</div>
        <div className="text-xl p-3">Remain Supply: {bone.remainSupply}</div>
        <div className="text-xl p-3">Difficulty: {bone.difficulty}</div>
        <div className="text-xl p-3">
          <Progress
            value={(100 * parseInt(bone.remainSupply)) / parseInt(bone.max)}
          />
        </div>
        <div className="text-xl p-3">
          Process:{" "}
          {(
            100 -
            (100 * parseInt(bone.remainSupply)) / parseInt(bone.max)
          ).toFixed(2)}{" "}
          %
        </div>
        <div className="text-xl p-3 text-center">{bone.status}</div>
      </div>
      {bone.status == "MINING" ? (
        <div className="text-xl p-3 text-center">
          <Button
            className="text-red-500 text-2xl border border-red-500 h-50"
            onClick={handleOpenDialog}
          >
            MINT NOW
          </Button>
        </div>
      ) : (
        <></>
      )}
      <Dialog open={showDialog}>
        <DialogContent className="max-w-md bg-black">
          <DialogHeader>
            <DialogTitle>Hashing</DialogTitle>
            <DialogDescription>
              You&#39;re POW mining now. Wait a minute...
            </DialogDescription>
          </DialogHeader>
          <div className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
            <TypewriterComponent
              options={{
                strings: [
                  "Mining..............................................................",
                  "Hashing..............................................................",
                  "Calculating..............................................................",
                ],
                autoStart: true,
                loop: true,
              }}
            />
          </div>
          <DialogFooter className="sm:justify-start">
            {nonce.toString() != "0"
              ? "You have found nonce: " + nonce.toString()
              : "Hashing..."}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default BoneMining;
