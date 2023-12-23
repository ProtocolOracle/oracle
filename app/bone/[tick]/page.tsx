"use client";
import {ConnectWallet} from "@/components/ThirdwebProvider";
import BoneMining from "@/components/bone-mining";
import {Bone, getBone} from "@/lib/consts";
import Link from "next/link";
import {useEffect, useState} from "react";
import {useAddress} from "@thirdweb-dev/react";
import {CopyToClipboard} from "react-copy-to-clipboard";
import {Button} from "@/components/ui/button";

function TickPage({params}: { params: { tick: string } }) {
  const [bone, setBone] = useState<Bone>();
  const [isCopied, setIsCopied] = useState(false);
  useEffect(() => {
    getBone(params.tick).then((bone) => setBone(bone));
  }, [params.tick]);
  const address = useAddress()
  const handleCopy = () => {
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 1000);
  }
  return (
      <main className="flex min-h-screen flex-col items-center p-24">
        <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
          <p className="fixed left-0 top-0 flex w-full justify-center from-zinc-200 pb-6 pt-8 dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto lg:p-4 lg:dark:bg-zinc-800/30">
            <Link href={"/"}>
              <code className="font-mono font-bold text-2xl text-red-800">
                Oracle Protocol
              </code>
            </Link>
          </p >
          <div className="fixed bottom-0 left-0 flex h-24 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
            <ConnectWallet
                modalSize="compact"
                theme="dark"
                switchToActiveChain={true}
            />
          </div>
        </div>
        {address &&
            <div className="flex mt-5">
              <div className="ml-2 w-16"> Invite Link</div>
              <div className="bg-gray-500 rounded-lg text-white p-2">
                <span>https://oracleprotocol.xyz/?{address}</span>
              </div>
              <div className="ml-2 w-24">
                <CopyToClipboard text={"https://oracleprotocol.xyz/?" + address} onCopy={handleCopy}>
                  <Button>{isCopied ? 'Copied!' : 'Copy Now'}</Button>
                </CopyToClipboard>
              </div>
            </div>
        }
        <div>{bone && <BoneMining bone={bone} />}</div>
      </main>
  );
}

export default TickPage;
