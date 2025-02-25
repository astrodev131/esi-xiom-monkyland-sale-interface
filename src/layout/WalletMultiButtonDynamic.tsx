"use client"; // ✅ Ensures this runs in the browser

import dynamic from "next/dynamic";
import React from "react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { BaseWalletMultiButton } from "@solana/wallet-adapter-react-ui";

// ✅ Custom Labels
const CUSTOM_LABELS = {
  "no-wallet": "Connect Wallet", // Default state before selecting a wallet
  "has-wallet": "Connect", // After a wallet is selected
  "select-wallet": "Connect Wallet", // Default text when selecting a wallet
  "change-wallet": "Change Wallet",
  connecting: "Connecting...",
  "copy-address": "Copy Address",
  copied: "Copied!",
  disconnect: "Disconnect",
};

const WalletMultiButtonDynamic = dynamic(
    async () => (await import("@solana/wallet-adapter-react-ui")).WalletMultiButton,
    { ssr: false }
  );


// ✅ Wrap `WalletMultiButton` and inject custom labels
export const CustomWalletButton = dynamic(
  () =>
    Promise.resolve(() => <BaseWalletMultiButton labels={CUSTOM_LABELS} />),
  { ssr: false }
);

export default WalletMultiButtonDynamic;
