"use client";

import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { Button } from "./ui/button";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Bone = {
  tick: string;
  launchType: string;
  status: "Completed" | "Processing";
  limit: string;
  difficulty: string;
  fee: string;
  process: string;
};

export const boneColums: ColumnDef<Bone>[] = [
  {
    accessorKey: "tick",
    header: "Tick",
    cell: ({ row }) => {
      const v: string = row.getValue("tick");
      const link: string = "/bones/" + v;

      return (
        <Link href={link}>
          <span className="text-right font-medium">{v}</span>
        </Link>
      );
    },
  },
  {
    accessorKey: "launchType",
    header: "LaunchType",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "limit",
    header: "Limit",
  },
  {
    accessorKey: "difficulty",
    header: "Difficulty",
  },
  {
    accessorKey: "fee",
    header: "Fee",
  },
  {
    accessorKey: "process",
    header: "Process",
  },
  {
    accessorKey: "name",
    header: "",
    cell: ({ row }) => {
      const v: string = row.getValue("name");
      const link: string = "/bones/" + v;

      return (
        <Link href={link}>
          <Button>Check Detail</Button>
        </Link>
      );
    },
  },
];
