"use client";

import axios from "axios";

import { Transaction, transactionColums } from "./transaction-columns";
import { DataTable } from "./data-table";
import TransactionCard from "./transaction-card";
import { getAllRecentTx, getNames } from "@/lib/ethereum";
import { useEffect, useState } from "react";
import { ethers, Event } from "ethers";

const TransactionList = () => {
  const [data, setData] = useState<Event[]>();
  const [names, setNames] = useState<Map<string, string>>();
  useEffect(() => {
    const fetchData = async () => {
      const data = await getAllRecentTx();
      setData(data);
    };
    fetchData();
  }, []);
  useEffect(() => {
    const fetchNames = async () => {
      const names = await getNames();
      setNames(names);
    };
    fetchNames();
  }, []);
  return (
    <div className="container mx-auto py-10">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {data && names &&
          data.map((event) => (
            <TransactionCard event={event} map={names} key={event.transactionHash} />
          ))}
      </div>
    </div>
  );
};

export default TransactionList;
