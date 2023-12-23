import Image from "next/image";

import {ConnectWallet} from "@/components/ThirdwebProvider";
import ActivityBones from "@/components/activity-bones";
import Link from "next/link";
import {buttonVariants} from "@/components/ui/button";
import {cn} from "@/lib/utils";
import {Icons} from "@/components/icons";

export default function Home() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
                <p className="fixed left-0 top-0 flex w-full justify-center from-zinc-200 pb-6 pt-8 dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto lg:p-4 lg:dark:bg-zinc-800/30">
                    <Link href={"/"}>
                        <code className="font-mono font-bold text-2xl text-red-800">
                            Oracle Protocol
                        </code>
                    </Link>
                </p>
                <div>
                    <Link
                        href="https://twitter.com/ProtocolOracle"
                        target="_blank"
                        rel="noreferrer"
                    >
                        <div
                            className={cn(
                                buttonVariants({
                                    variant: "ghost",
                                }),
                                "w-16 px-0"
                            )}
                        >
                            <Icons.twitter className="h-6 w-6 fill-current"/>
                            <span className="sr-only">Twitter</span>
                        </div>
                    </Link>
                    <Link
                        href="https://github.com/ProtocolOracle/Miner"
                        target="_blank"
                        rel="noreferrer"
                    >
                        <div
                            className={cn(
                                buttonVariants({
                                    variant: "ghost",
                                }),
                                "w-16 px-0"
                            )}
                        >
                            <Icons.gitHub className="h-6 w-6 fill-current"/>
                            <span className="sr-only">github</span>
                        </div>
                    </Link>
                    <Link
                        href="https://t.me/oracleZHgroup"
                        target="_blank"
                        rel="noreferrer"
                    >
                        <div
                            className={cn(
                                buttonVariants({
                                    variant: "ghost",
                                }),
                                "w-16 px-0"
                            )}
                        >
                            <Icons.telegram className="h-6 w-6 fill-current"/>
                            <span className="sr-only">Telegram</span>
                        </div>
                    </Link>
                    <Link
                        href="https://oracle-protocols-organization.gitbook.io/oracle-protocol/"
                        target="_blank"
                        rel="noreferrer"
                    >
                        <div
                            className={cn(
                                buttonVariants({
                                    variant: "ghost",
                                }),
                                "w-16 px-0"
                            )}
                        >
                            <Icons.gitbook className="h-6 w-6 fill-current"/>
                            <span className="sr-only">Gitbook</span>
                        </div>
                    </Link>
                </div>

                <div
                    className="fixed bottom-0 left-0 flex h-24 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
                    <ConnectWallet modalSize="compact" theme='dark' switchToActiveChain={true}/>
                </div>
            </div>


            <div
                className="relative flex mt-40 place-items-center before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-['']  before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px] z-[-1]">
                <Image
                    className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
                    src="/logo-dark.png"
                    alt="Logo"
                    width={180}
                    height={37}
                    priority
                />
            </div>
            <div className="container mx-auto mt-20">
                <p className="text-xl text-red-800">Activity Bones</p>
            </div>
            <ActivityBones/>
        </main>
    );
}
