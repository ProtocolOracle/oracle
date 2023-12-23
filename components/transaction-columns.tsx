"use client"

import { ColumnDef } from "@tanstack/react-table"
import Link from "next/link"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Transaction = {
  hash: string
  protocol: string
  type: "Deploy" | "Mint" | "Transfer"
  from: string
  to: string
  blockNumber: string
}

export const transactionColums: ColumnDef<Transaction>[] = [
  {
    accessorKey: "hash",
    header: "Transaction Hash",
    cell: ({ row }) => {
        const v:string = row.getValue("hash")
        
        return <Link
                    href={ "/tx/" + v}
                    className="transition-colors hover:text-foreground/80 text-foreground"
                >
                    <span className="text-right font-medium">{v.substring(0, 20)}...</span>
                </Link>
    },
  },
  {
    accessorKey: "protocol",
    header: "Protocol",
  },
  {
    accessorKey: "type",
    header: "Type",
  },
  {
    accessorKey: "from",
    header: "From",
    cell: ({ row }) => {
        const v:string = row.getValue("from")
        
        return <Link
                    href={ "/addr/" + v}
                    className="transition-colors hover:text-foreground/80 text-foreground"
                >
                    <span className="text-right font-medium">{v.substring(0, 20)}...</span>
                </Link>
    },
  },
  {
    accessorKey: "to",
    header: "To",
    cell: ({ row }) => {
        const v:string = row.getValue("to")
        
        return <Link
                    href={ "/addr/" + v}
                    className="transition-colors hover:text-foreground/80 text-foreground"
                >
                    <span className="text-right font-medium">{v.substring(0, 20)}...</span>
                </Link>
    },
  },
  {
    accessorKey: "blockNumber",
    header: "Block Number",
    cell: ({ row }) => {
        const v:string = row.getValue("blockNumber")
        
        return <Link
                    href={ "/block/" + v}
                    className="transition-colors hover:text-foreground/80 text-foreground"
                >
                    <span className="text-right font-medium">{v}</span>
                </Link>
    },
  },
]
