"use client";

import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import * as z from "zod";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
// import {
//   useWeb3ModalAccount,
//   useWeb3ModalProvider,
// } from "@web3modal/ethers5/react";
import {
  ConnectWallet,
  useAddress,
  useSigner,
  useNetworkMismatch,
} from "@thirdweb-dev/react";
import { ethers } from "ethers";
import { useEffect } from "react";

/// tick, amt, max, difficulty, feeAddr, fee
const profileFormSchema = z.object({
  tick: z
    .string()
    .min(2, {
      message: "Tick must be at least 2 characters.",
    })
    .max(6, {
      message: "Tick must not be longer than 6 characters.",
    }),
  difficulty: z
    .string()
    .min(2, {
      message: "Tick must be at least 2 characters.",
    })
    .max(18, {
      message: "Tick must not be longer than 16 characters.",
    }),
  amt: z
    .string()
    .min(2, {
      message: "Tick must be at least 2 characters.",
    })
    .max(18, {
      message: "Tick must not be longer than 16 characters.",
    }),
  max: z
    .string()
    .min(2, {
      message: "Tick must be at least 2 characters.",
    })
    .max(18, {
      message: "Tick must not be longer than 16 characters.",
    }),
  to: z
    .string()
    .min(42, {
      message: "Tick must be at least 42 characters.",
    })
    .max(42, {
      message: "Tick must not be longer than 42 characters.",
    }),
  fee: z
    .string()
    .min(1, {
      message: "Tick must be at least 1 characters.",
    })
    .max(10, {
      message: "Tick must not be longer than 10 characters.",
    }),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

// This can come from your database or API.
const defaultValues: Partial<ProfileFormValues> = {};

export function MintForm() {
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues,
    mode: "onChange",
  });

  const address = useAddress();
  const isMismatched = useNetworkMismatch();
  const signer = useSigner();
  async function onSubmit(data: ProfileFormValues) {
    if (typeof address === "undefined" || !signer || isMismatched) {
      return;
    }
    console.log("onsubmit");
    const txData = `data:,{"p":"orac", "op":"deploy", "tick":"${data.tick}", "amt":"${data.amt}", "max":"${data.max}", "difficulty":"${data.difficulty}", "feeAddr":"${data.to}}", "fee":"${data.fee}"}"`;
    const tx = {
      from: address,
      to: address,
      data: ethers.utils.hexlify(ethers.utils.toUtf8Bytes(txData)),
    };
    const txResponse = await signer.sendTransaction(tx);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="tick"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tick</FormLabel>
              <FormControl>
                <Input placeholder="" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="difficulty"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Difficulty (0x0000 or more 0s)</FormLabel>
              <FormControl>
                <Input placeholder="" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="amt"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Amount Per Tick</FormLabel>
              <FormControl>
                <Input placeholder="" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="max"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Max</FormLabel>
              <FormControl>
                <Input placeholder="" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="to"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Wallet Address</FormLabel>
              <FormControl>
                <Input placeholder="" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="fee"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mint Fee</FormLabel>
              <FormControl>
                <Input placeholder="" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={!address || isMismatched}>
          Deploy
        </Button>
      </form>
    </Form>
  );
}
