import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle,} from "@/components/ui/card";
import {Bone} from "@/lib/consts";
import {Button} from "./ui/button";
import Link from "next/link";

const BoneCard = ({
                      bone,
                  }: {
    bone: Bone
}) => {
    return (
        <div>
            <Card className="bg-transition-colors backdrop-blur text-white">
                <CardHeader>
                    <CardTitle>{bone.tick}</CardTitle>
                    <CardDescription>
                        Supply: {bone.remainSupply} / {bone.max}
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    {/*<div className="break-words">{bone.contract}</div>*/}
                    <div className="bg-gray-300">
                        <code
                            className="text-2xl w-full break-words text-red-500 p-3">{`data:,{"p":"orac","op":"mint","tick":"${bone.tick}","amt":"${bone.amt}","difficulty":"${bone.difficulty}"}`}</code>
                    </div>
                </CardContent>
                <CardFooter>
                    <div>
                        <span
                            className={bone.status == 'MINING' ? "text-green-400" : "text-red-500"}>{bone.status}</span>

                        <Link href={"/bone/" + bone.tick}>
                            {bone.status == "MINING" ? <Button className="bg-red-800 ml-10">MINT</Button> :
                                <Button className="bg-red-800 ml-10">CHECK</Button>}
                        </Link>
                    </div>
                </CardFooter>
            </Card>
        </div>
    );
};

export default BoneCard;
