import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ethers } from "ethers";

function abbreviateString(str: string) {
  if (str.length > 20) {
    return str.substring(0, 10) + "..." + str.substring(str.length - 10);
  } else {
    return str;
  }
}

const TransactionCard = ({
  event,
  map,
}: {
  event: ethers.Event;
  map: Map<string, string>;
}) => {
  console.log(map);
  return (
    <Card className="bg-transition-colors backdrop-blur text-white">
      <CardHeader>
        <CardTitle># {event.blockNumber}</CardTitle>
        <CardDescription>
          TXHASH: {abbreviateString(event.transactionHash)}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p>
          {event.args?.from == "0x0000000000000000000000000000000000000000" &&
            "MINT"}
        </p>
        <p>
          {event.args?.from != "0x0000000000000000000000000000000000000000" &&
            "TRANSFER"}
        </p>
      </CardContent>
      <CardFooter>
        <p className="text-red-500">{map.get(event.address)}</p>
      </CardFooter>
    </Card>
  );
};

export default TransactionCard;
