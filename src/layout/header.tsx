import React from "react";
import Link from "next/link";
import { toast } from "react-toastify";
import { useWallet } from "@solana/wallet-adapter-react";
import usePresale from "@/hooks/usePresale";
import WalletMultiButtonDynamic, { CustomWalletButton } from "./WalletMultiButtonDynamic";
import { PRESALE_AUTHORITY } from "@/constants/constants";

export default function Header() {
  const { select, wallets, publicKey, disconnect } = useWallet();
  const { walletConnected } = usePresale();

  const onWalletConnect = () => {
    if (!publicKey) {
      const installedWallets = wallets.filter(
        (wallet) => wallet.readyState === "Installed"
      );
      if (installedWallets.length <= 0) {
        toast.warning("Phantom wallet is not installed yet.");
        return;
      }
      select(wallets[1].adapter.name);
    } else {
      disconnect();
    }
  };

  return (
    <div
      className="flex flex-row justify-center"
      style={{ backgroundColor: "rgb(7 10 41 / 70%)" }}
    >
      <div
        className="w-full max-w-[1440px] px-5 relative flex"
        style={{ justifyContent: "space-between" }}
      >
        <Link
          href="/"
          className="flex flex-row items-center justify-start h-20 gap-4"
        >
          <img alt="logo" src="/images/monkey.png" className="h-full pb-2" />
          <div className="hidden sm:flex h-full pt-1 pb-2">
            <img alt="monkeyland" src="/images/monkeyland.png" className="" />
          </div>
        </Link>

        <div
          className="top-0 flex flex-row items-center  right-5"
          style={{ width: "max-content" }}
        >
          <Link href="/presale">
            <button className="px-5 py-2 bg-[#f67c2f] rounded-md text-[#eff3f6] h-12 text-base mr-4 ">
              Presale
            </button>
          </Link>

          <Link href="/affiliate" className="hidden md:flex">
            <button className="px-5 py-2 bg-[#f67c2f] rounded-md text-[#eff3f6] h-12 text-base mr-4 ">
              Affiliate
            </button>
          </Link>

          <CustomWalletButton />
        </div>
      </div>
    </div>
  );
}
