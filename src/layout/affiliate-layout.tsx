/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import { Icon, IconType } from "@/components/icons";
import React, { useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import usePresale from "@/hooks/usePresale";
import { useWallet } from "@solana/wallet-adapter-react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { SOL_USDC_RATE, TOKEN_PRICE_DECIMALS } from "@/constants/constants";
import WalletMultiButtonDynamic, { CustomWalletButton } from "./WalletMultiButtonDynamic";
import SolanaLogo from "../../public/images/solana.png";
import UsdcLogo from "../../public/images/usdc.png";
import UsdtLogo from "../../public/images/usdt.png";
import EthLogo from "../../public/images/eth.png";
import BnbLogo from "../../public/images/bnb.png";
import CopyLogo from "../assets/images/copy.svg";
import CopiedLogo from "../assets/images/copied.svg";
import rot13 from "@/utils/solWeb3";

export default function AffiliateLayout() {
  const { price_per_token, walletConnected, referralInfo, referrerClaim } =
    usePresale();

  console.log("debug referral info::", referralInfo);
  const { publicKey } = useWallet();
  const [copied, setCopied] = useState(false);
  const onCopy = () => {
    setCopied(true);
    window.setTimeout(() => {
      setCopied(false);
    }, 3000);
  };

  const onRefClaim = async () => {
    await referrerClaim();
  };

  console.log("debug ");
  return (
    <div className="flex flex-col md:flex-row items-center gap-4 w-full">
      {/* Left Sidebar Section */}
      <div className="w-full md:w-2/3 bg-[#e7a324] p-4 rounded-lg h-full text-center flex flex-col gap-4">
        <span className="text-[#000000] text-[20px] flex justify-start">
          Welcome to the $MKYL Affiliate Program!
        </span>
        <div className="flex justify-between items-center">
          <span className="text-[#000000] text-[16px] flex justify-start">
            USD Earned $
            {(referralInfo.claimedSolAmount / 10 ** 9) * SOL_USDC_RATE +
              referralInfo.claimedUsdcAmount / 10 ** 6 +
              referralInfo.claimedUsdtAmount / 10 ** 6}
          </span>
          <button className="tokenButtons selected" style={{ width: "120px" }}>
            {10}%
          </button>
        </div>
        <div>
          <div className="flex justify-between my-1">
            <div className="flex">
              <img className="tokenImage" src={SolanaLogo.src} />
              <span>Referred SOL Amount:</span>
            </div>
            <span>
              {referralInfo.referredSolAmount / 10 ** 9} ($
              {(referralInfo.referredSolAmount * SOL_USDC_RATE) / 10 ** 9})
            </span>
          </div>
          <div className="flex justify-between my-2">
            <div className="flex">
              <img className="tokenImage" src={UsdcLogo.src} />
              <span>Referred USDC Amount:</span>
            </div>
            <span>
              {referralInfo.referredUsdcAmount / 10 ** 6} ($
              {referralInfo.referredUsdcAmount / 10 ** 6})
            </span>
          </div>
          <div className="flex justify-between my-1">
            <div className="flex">
              <img className="tokenImage" src={UsdtLogo.src} />
              <span>Referred USDT Amount:</span>
            </div>
            <span>
              {referralInfo.referredUsdtAmount / 10 ** 6} ($
              {referralInfo.referredUsdtAmount / 10 ** 6})
            </span>
          </div>
        </div>
        <div className="price-line-container">
          <span className="text-[#000000] text-[16px] flex justify-center">
            {`1 MKYL = $${price_per_token / TOKEN_PRICE_DECIMALS}`}
          </span>
        </div>
        {!walletConnected && (
          <>
            <div className="goback-box flex justify-between text-gray-500 text-[16px]">
              <span>Connect your wallet. </span>
            </div>
            <div className="flex justify-center">
              <CustomWalletButton />
            </div>
          </>
        )}
        {walletConnected && publicKey && (
          <>
            <div className="goback-box flex justify-between text-black text-[16px]">
              <span>Referral Code: </span>
              <span>{`${rot13(publicKey.toBase58())}`}</span>
            </div>
            <div className="goback-box flex justify-between text-black text-[16px]">
              <div>
                <span>Referrals Count: </span>
                <span>{referralInfo.referralsCount} </span>
              </div>
            </div>
            <div className="flex items-center border-2 border-gray-500">
              <div className="p-2 w-10/12 flex justify-between items-center">
                <span> URL:</span>
                <span className="text-[16px] sm:text-[13px]">
                  {" "}
                  {`https://monkyland-sale-interface.vercel.app/?ref=${rot13(
                    publicKey.toBase58()
                  )}`}
                </span>
              </div>
              <div className="p-2 w-2/12 border-l-2 border-gray-500 flex justify-center">
                <CopyToClipboard
                  text={`https://monkyland-sale-interface.vercel.app/?ref=${rot13(
                    publicKey.toBase58()
                  )}`}
                  onCopy={onCopy}
                >
                  <img
                    src={copied ? CopiedLogo.src : CopyLogo.src}
                    alt="copyLogo"
                    className="copy2board"
                    width={23}
                  />
                </CopyToClipboard>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Main Content Section */}
      <div
        className="w-full md:w-1/3 bg-[#e7a324] p-4 rounded-lg h-full md:h-[443px] text-center"
        style={{ height: "443px" }}
      >
        <span className="text-[#000000] text-[20px] flex justify-start">
          Claim Rewards
        </span>
        <div className="rewardBox my-2">
          <img className="tokenImage" src={SolanaLogo.src} />
          <span className="tokenButtonText">Solana </span>
          <span className="ml-2">
            <span>
              $
              {(referralInfo.referredSolAmount * SOL_USDC_RATE) / 10 ** 9 +
                referralInfo.referredUsdcAmount / 10 ** 6 +
                referralInfo.referredUsdtAmount / 10 ** 6}{" "}
            </span>
          </span>
        </div>
        <div className="rewardBox my-2">
          <img className="tokenImage" src={EthLogo.src} />
          <span className="tokenButtonText">ETH </span>
          <span className="ml-2"> ${0} </span>
        </div>
        <div className="rewardBox my-2">
          <img className="tokenImage" src={BnbLogo.src} />
          <span className="tokenButtonText">BNB </span>
          <span className="ml-2"> ${0} </span>
        </div>

        <div className="mt-32">
          <div className="flex justify-between">
            <span>Remaining:</span>
            <span>
              {" "}
              $
              {((referralInfo.referredSolAmount -
                referralInfo.claimedSolAmount) /
                10 ** 9) *
                SOL_USDC_RATE +
                (referralInfo.referredUsdcAmount -
                  referralInfo.claimedUsdcAmount) /
                  10 ** 6 +
                (referralInfo.referredUsdtAmount -
                  referralInfo.claimedUsdtAmount) /
                  10 ** 6}{" "}
            </span>
          </div>
          <button className="tokenButtons selected" onClick={onRefClaim}>
            Claim
          </button>
        </div>
      </div>
    </div>
  );
}
