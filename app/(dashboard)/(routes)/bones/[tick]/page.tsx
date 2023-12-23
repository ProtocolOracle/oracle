import Link from "next/link";
import React from "react";
import { Progress } from "@/components/ui/progress"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import { Button } from "@/components/ui/button";


function TickPage({ params }: { params: { tick: string } }) {
  return (
        <div className="container mx-auto py-10">
            <h2 className={`mb-3 text-2xl font-semibold`}>
                <Link href={"/bones"} >
                    Bones{' '}
                </Link>
                <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                &gt;&gt;
                </span>
                <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                    &nbsp;{params.tick}
                </span>
            </h2>
            <div className="p-6">
                <p className="mb-3 text-2xl font-semibold">Protocol</p>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 p-6">
                <Card className="bg-transition-colors backdrop-blur text-white">
                        <CardContent>
                            <p>{"xxxx"}</p>
                        </CardContent>
                    </Card>
                </div>
                
                <p className="mb-3 text-2xl font-semibold">Process</p>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 p-6">
                    <div>
                        <div className="flex justify-between p-3">
                            <span>{params.tick}</span>
                            <span>Fee: 0.1</span>
                        </div>
                        <Progress value={33} />
                        <div className="flex justify-center p-3">
                            <span>33%</span>
                        </div>
                        <div className="flex justify-center p-3">
                            <Button>MINT</Button>
                        </div>
                        
                    </div>
                </div>
            </div>
            <div className="p-6">
                <p className="mb-3 text-2xl font-semibold">Overview</p>
                <div className="grid gap-3 md:grid-cols-3 lg:grid-cols-3 border rounded-xl p-6">
                    <div className="p-3">
                        <div className="flex justify-center">{params.tick}</div>
                        <div className="flex justify-center">Fee: 0.1</div>
                    </div>
                    <div className="p-3">
                        <div className="flex justify-center">{params.tick}</div>
                        <div className="flex justify-center">Fee: 0.1</div>
                    </div>
                    <div className="p-3">
                        <div className="flex justify-center">{params.tick}</div>
                        <div className="flex justify-center">Fee: 0.1</div>
                    </div>
                </div>
            </div>
            <div className="p-6">
                <p className="mb-3 text-2xl font-semibold">Mine</p>
                <div className="p-3">
                    <div>{params.tick}: 99999</div>
                </div>
            </div>
        </div>
    );
}

export default TickPage;