"use client";
import { ConnectWallet } from "@/components/ThirdwebProvider";
import BoneMining from "@/components/bone-mining";
import { getBone } from "@/lib/consts";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Bone } from "@/lib/consts";

function TickPage({ params }: { params: { tick: string } }) {
  const [bone, setBone] = useState<Bone>();
  useEffect(() => {
    getBone(params.tick).then((bone) => setBone(bone));
  }, [params.tick]);

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <p className="fixed left-0 top-0 flex w-full justify-center from-zinc-200 pb-6 pt-8 dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto lg:p-4 lg:dark:bg-zinc-800/30">
          <Link href={"/"}>
            <code className="font-mono font-bold text-2xl text-red-800">
              Oracle
            </code>
          </Link>
        </p>
        <div className="fixed bottom-0 left-0 flex h-24 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
          <ConnectWallet
            modalSize="compact"
            theme="dark"
            switchToActiveChain={true}
          />
        </div>
      </div>
      <div>{bone && <BoneMining bone={bone} />}</div>
    </main>
  );
}

export default TickPage;
