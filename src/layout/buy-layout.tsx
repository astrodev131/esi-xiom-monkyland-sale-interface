/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import { Icon, IconType } from "@/components/icons";
import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { toast } from "react-toastify";
import usePresale from "@/hooks/usePresale";
import { useWallet } from "@solana/wallet-adapter-react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import {
  BONUS_PERCENTAGE,
  BUY_MIN_IN_USD,
  LISTING_PRICE,
  PRESALE_PROGRAM_PUBKEY,
  SALE_CAP_DECIMAL,
  SOL_USDC_RATE,
  TOKEN_DECIMAL,
  TOKEN_PRICE_DECIMALS,
  USDC_ADDRESS,
  USDT_ADDRESS,
} from "@/constants/constants";
import Checkbox from "@mui/material/Checkbox";
import CountdownCustom from "../components/CountdownCustom";
import WalletMultiButtonDynamic from "./WalletMultiButtonDynamic";
import SolanaLogo from "../../public/images/solana.png";
import USDCLogo from "../../public/images/usdc.png";
import USDTLogo from "../../public/images/usdt.png";
import WalletLogo from "../../public/images/wallet.png";
import CheckLogo from "../../public/images/checkmark.png";
import CopyLogo from "../assets/images/copy.svg";
import CopiedLogo from "../assets/images/copied.svg";
import ProgressBar from "@/components/progressbar";
import { connection, getTokenBalance } from "@/utils/solWeb3";
import { PublicKey } from "@solana/web3.js";

export default function BuyLayout() {
  const {
    buyTokenWithSol,
    buyTokenWithUsdc,
    buyTokenWithUsdt,
    claimToken,
    claimSOL,
    transactionPending,
    startTime,
    endTime,
    entireBuyAmount,
    totalQuoteAmount,
    balance,
    buyAmount,
    quoteAmount,
    userInfo,
    price_per_token,
    next_price_per_token,
    stageNumber,
    totalHardCap,
    totalSoftCap,
    stage_hardcap,
    stagePurchasedAmount,
    walletConnected,
  } = usePresale();
  const { publicKey } = useWallet();
  const [canBuy, setCanBuy] = useState(true);
  const [inAmount, setInputAmount] = useState(0);
  const [outTokenAmount, setOutTokenAmount] = useState(0);
  const [softCapReached, setSoftCapReached] = useState(0);
  const [selectedToken, setSelectToken] = useState(0);
  const [checked, setChecked] = React.useState(true);
  const [slidePage, setSlidepage] = useState(0);
  const [copied, setCopied] = useState(false);
  const [progress, setProgress] = useState(0);
  const [resInvest, setRestInvest] = useState({
    usdValue: 0,
    percentageIndex: 0,
  });
  const [currencyBalance, setCurrencyBalance] = useState({
    sol: 0,
    usdc: 0,
    usdt: 0,
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };

  const handleBuyNow = () => {
    if (inAmount == 0) {
      toast.error("Invalid input amount!");
      return;
    }

    if (selectedToken == 0 && inAmount * SOL_USDC_RATE < BUY_MIN_IN_USD) {
      toast.error(
        `Minimum buy amount should be greather than $${BUY_MIN_IN_USD}`
      );
      return;
    }

    if (selectedToken != 0 && inAmount < BUY_MIN_IN_USD) {
      toast.error(
        `Minimum buy amount should be greather than $${BUY_MIN_IN_USD}`
      );
      return;
    }
    setSlidepage(1);
  };

  const handleBack = () => {
    setSlidepage((c) => c - 1);
  };

  const handleBackFirst = () => {
    setSlidepage(0);
  };

  const handleNext = () => {
    if (walletConnected) {
      setSlidepage((c) => c + 1);
    }
  };

  const handleInput = (inputAmount: number) => {
    setInputAmount(inputAmount);
  };

  const handleTokenOut = (tokenAmount: number) => {
    setOutTokenAmount(tokenAmount);
  };

  const handleMax = () => {
    console.log("debug max::");
    if (selectedToken == 0) {
      setInputAmount(currencyBalance.sol);
    } else if (selectedToken == 1) {
      setInputAmount(currencyBalance.usdc);
    } else {
      setInputAmount(currencyBalance.usdt);
    }
  };

  const onHandleSend = async () => {
    if (inAmount < 0.001) {
      toast.warning("Please check SOL balance again.");
      setSlidepage(0);
      return;
    }
    setSlidepage((c) => c + 1);
    let res;
    if (selectedToken == 0) {
      if (inAmount * SOL_USDC_RATE < BUY_MIN_IN_USD) {
        toast.error(
          `Minimum buy amount should be greather than $${BUY_MIN_IN_USD}`
        );
        setSlidepage(0);
        return;
      }
      res = await buyTokenWithSol(
        inAmount,
        (inAmount * SOL_USDC_RATE * TOKEN_PRICE_DECIMALS) / price_per_token
      );
    } else if (selectedToken == 1) {
      if (inAmount < BUY_MIN_IN_USD) {
        toast.error(
          `Minimum buy amount should be greather than $${BUY_MIN_IN_USD}`
        );
        setSlidepage(0);
        return;
      }
      res = await buyTokenWithUsdc(
        inAmount,
        (inAmount * TOKEN_PRICE_DECIMALS) / price_per_token
      );
    } else if (selectedToken == 2) {
      if (inAmount < BUY_MIN_IN_USD) {
        toast.error(
          `Minimum buy amount should be greather than $${BUY_MIN_IN_USD}`
        );
        return;
      }
      res = await buyTokenWithUsdt(
        inAmount,
        (inAmount * TOKEN_PRICE_DECIMALS) / price_per_token
      );
    } else {
      toast.warning("Invalid Selected Token");
    }

    if (res === undefined) {
      setSlidepage((c) => c - 1);
    } else if (res == false) {
      setSlidepage((c) => c + 1);
    } else {
      toast.warning("Invalid Res");
    }
  };

  const onClaimToken = async () => {
    await claimToken();
  };

  const onClaimSOL = async () => {
    await claimSOL();
  };

  // const onSolanaSelect = async () => {
  //   try {
  //     setSelectToken(0);
  //   } catch (err) {}
  // };

  // const onUSDCSelect = async () => {
  //   try {
  //     setSelectToken(1);
  //   } catch (err) {}
  // };

  // const onUSDTSelect = async () => {
  //   try {
  //     setSelectToken(2);
  //   } catch (err) {}
  // };

  const content = useMemo(() => {
    if (publicKey) {
      const base58 = publicKey.toBase58();
      return base58.slice(0, 4) + ".." + base58.slice(-4);
    }
  }, [publicKey]);

  const onCopy = () => {
    setCopied(true);
    window.setTimeout(() => {
      setCopied(false);
    }, 3000);
  };

  useEffect(() => {
    const current = Date.now();

    if (
      startTime * 1000 < current &&
      endTime * 1000 > current &&
      Number(quoteAmount) / 10 ** TOKEN_DECIMAL <= 250
    ) {
      setCanBuy(true);
    } else {
      setCanBuy(false);
    }
    if (Number(entireBuyAmount) >= Number(totalSoftCap)) {
      setSoftCapReached(1);
    }
  }, [
    startTime,
    endTime,
    quoteAmount,
    buyAmount,
    stageNumber,
    entireBuyAmount,
    totalSoftCap,
  ]);

  useEffect(() => {
    const usdValue = selectedToken == 0 ? inAmount * SOL_USDC_RATE : inAmount;
    if (usdValue >= 3000) {
      setProgress(100);
      setRestInvest({
        usdValue: 0,
        percentageIndex: 5,
      });
    } else if (usdValue >= 1500) {
      setProgress(70);
      setRestInvest({
        usdValue: 3000 - usdValue,
        percentageIndex: 4,
      });
    } else if (usdValue >= 600) {
      setProgress(50);
      setRestInvest({
        usdValue: 1500 - usdValue,
        percentageIndex: 3,
      });
    } else if (usdValue >= 200) {
      setProgress(30);
      setRestInvest({
        usdValue: 600 - usdValue,
        percentageIndex: 2,
      });
    } else {
      setProgress(0);
      setRestInvest({
        usdValue: 200 - usdValue,
        percentageIndex: 1,
      });
    }
  }, [inAmount, selectedToken]);

  useEffect(() => {
    async function fetchCurrencBalances() {
      if (!publicKey) {
        return;
      }
      const solBalanceLamports = await connection.getBalance(publicKey);
      const solBalance = solBalanceLamports / 1e9; // Convert lamports to SOL
      const usdcBalance = await getTokenBalance(
        publicKey,
        new PublicKey(USDC_ADDRESS)
      );
      const usdtBalance = await getTokenBalance(
        publicKey,
        new PublicKey(USDT_ADDRESS)
      );
      setCurrencyBalance({
        sol: solBalance,
        usdc: usdcBalance,
        usdt: usdtBalance,
      });
    }
    fetchCurrencBalances();
  }, [publicKey]);

  console.log("debug stage::", stageNumber);
  return (
    <div className="flex flex-col sm:flex-row items-center gap-8">
      {/* Left Sidebar Section */}
      <div className="w-full sm:w-1/4 bg-[#e7a324] p-4 rounded-lg sidebar min-w-[300px] h-full text-center">
        <div className="flex justify-end">
          <button className="selected tokenButton">
            <h4 className="font-bold text-xl">
              {price_per_token == 0
                ? 0
                : (
                    (100 *
                      (price_per_token / TOKEN_PRICE_DECIMALS -
                        LISTING_PRICE)) /
                    LISTING_PRICE
                  ).toFixed(2)}
              % to TGE Price ${LISTING_PRICE}
            </h4>
          </button>
        </div>
        <CountdownCustom
          startTime={startTime}
          endTime={endTime}
          stageNumber={stageNumber}
        />
        <span className="text-[16px] block mt-4">
          1 MKYL = $
          {parseFloat((price_per_token / TOKEN_PRICE_DECIMALS).toFixed(4))}
        </span>
        <span className="text-[12px] mt-2">
          ➡ Next round price will be : $
          {parseFloat((next_price_per_token / TOKEN_PRICE_DECIMALS).toFixed(4))}
        </span>
        <div className="mt-4 text-[#000000]">
          <span className="text-[16px] block">Round {stageNumber}/8</span>
          <span className="text-[14px] mt-2">
            ☑ Over ${totalQuoteAmount} raised in advisor round.
          </span>
        </div>
        <div className="flex flex-col mt-1 gap-1">
          <div className="stage-info-4">
            <h4 className="text-md font-semibold mt-2 flex justify-left">
              USD Raised
            </h4>
            <div className="relative w-full h-8 bg-gray-800 bg-opacity-80 backdrop-blur-md rounded-lg overflow-hidden ">
              <div
                className="h-full bg-yellow-400 transition-all duration-300"
                style={{
                  width: `${
                    totalHardCap == 0
                      ? 0
                      : (totalQuoteAmount * 100) / totalHardCap
                  }%`,
                }}
              ></div>
            </div>
            <div className="flex justify-between mt-2 text-sm text-gray-900">
              <span>${totalQuoteAmount.toLocaleString()}</span>
              <span>${totalHardCap.toLocaleString()}</span>
            </div>
          </div>
          <div className="flex justify-between stage-info">
            <span> My Balance</span>
            <span>
              {" "}
              {buyAmount} MKYL ($
              {quoteAmount / 10 ** SALE_CAP_DECIMAL})
            </span>
          </div>
          <div className="flex justify-between stage-info">
            <span> Claimable</span>
            <span>
              {" "}
              {stageNumber == 8 && endTime * 1000 < Date.now()
                ? userInfo.buyTokenAmount - userInfo.claimedTokenAmount
                : 0}{" "}
              MKYL
            </span>
          </div>
          <div className="flex justify-between stage-info">
            <span> Claimed</span>
            <span> {userInfo.claimedTokenAmount} MKYL</span>
          </div>
        </div>
        <div className="mt-4 bg-[#f67c2f] px-8 py-4 rounded-lg flex flex-col gap-1">
          {resInvest.percentageIndex < 5 && (
            <>
              <div className="flex gap-2 justify-center items-center">
                <span className="text-[32px] font-[600] leading-[100%] text-gray-700">
                  {BONUS_PERCENTAGE[resInvest.percentageIndex - 1]}%
                </span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="black"
                >
                  <path
                    d="M1.6665 9.99998C1.6665 14.6 5.39984 18.3333 9.99984 18.3333C14.5998 18.3333 18.3332 14.6 18.3332 9.99998C18.3332 5.39998 14.5998 1.66665 9.99984 1.66665C5.39984 1.66665 1.6665 5.39998 1.6665 9.99998ZM10.8582 7.05831L13.3582 9.55831C13.4832 9.68331 13.5415 9.84165 13.5415 9.99998C13.5415 10.1583 13.4832 10.3166 13.3582 10.4416L10.8582 12.9416C10.6165 13.1833 10.2165 13.1833 9.97484 12.9416C9.73317 12.7 9.73317 12.3 9.97484 12.0583L11.4082 10.625L7.08317 10.625C6.7415 10.625 6.45817 10.3416 6.45817 9.99998C6.45817 9.65831 6.7415 9.37498 7.08317 9.37498L11.4082 9.37498L9.97484 7.94165C9.73317 7.69998 9.73317 7.29998 9.97484 7.05831C10.2165 6.81665 10.6165 6.81665 10.8582 7.05831Z"
                    fill="#000"
                  ></path>
                </svg>
                <span className="text-[32px] font-[600] leading-[100%]">
                  {" "}
                  {BONUS_PERCENTAGE[resInvest.percentageIndex]}%
                </span>
              </div>
              <div>
                <span>
                  if you invest more than ${Math.ceil(resInvest.usdValue)} you
                  get {BONUS_PERCENTAGE[resInvest.percentageIndex]}% bonus
                </span>
              </div>
            </>
          )}
          {resInvest.percentageIndex == 5 && (
            <>
              <div className="flex gap-2 justify-center items-center">
                <span className="text-[32px] font-[600] leading-[100%]">
                  {" "}
                  {BONUS_PERCENTAGE[resInvest.percentageIndex - 1]}%
                </span>
              </div>
              <div>
                <span>
                  You will get {BONUS_PERCENTAGE[resInvest.percentageIndex - 1]}
                  % bonus
                </span>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Main Content Section */}
      <div className="w-full h-full sm:w-3/4 bg-[#e7a324] p-4 rounded-lg main-content">
        <div className="text-[#000000] text-[14px] mb-4">
          Choose your payment method & amount (Min $50)
        </div>
        <section className="tokensButton block sm:flex">
          {selectedToken === 0 ? (
            <button className="bnbButton tokenButtons selected mt-2">
              <img className="tokenImage" src={SolanaLogo.src} />
              <span className="tokenButtonText">SOL</span>
            </button>
          ) : (
            <button
              className="bnbButton tokenButtons mt-2"
              onClick={() => setSelectToken(0)}
            >
              <img className="tokenImage" src={SolanaLogo.src} />
              <span className="tokenButtonText">SOL</span>
            </button>
          )}
          {selectedToken === 1 ? (
            <button className="tokenButtons selected mt-2">
              <img className="tokenImage" src={USDCLogo.src} />
              <span className="tokenButtonText">USDC</span>
            </button>
          ) : (
            <button
              className="tokenButtons mt-2"
              onClick={() => setSelectToken(1)}
            >
              <img className="tokenImage" src={USDCLogo.src} />
              <span className="tokenButtonText">USDC</span>
            </button>
          )}
          {selectedToken === 2 ? (
            <button className="tokenButtons selected mt-2">
              <img className="tokenImage" src={USDTLogo.src} />
              <span className="tokenButtonText">USDT</span>
            </button>
          ) : (
            <button
              className="tokenButtons mt-2"
              onClick={() => setSelectToken(2)}
            >
              <img className="tokenImage" src={USDTLogo.src} />
              <span className="tokenButtonText">USDT</span>
            </button>
          )}
        </section>
        <div className="flex flex-col items-center gap-2 sm:flex-row mb-4">
          {/* SOL Input Amount */}
          <div className="rounded-[10px] flex flex-col justify-between px-1 w-full">
            <div className="text-sm text-[#000000] flex flex-row items-center justify-between">
              <span className="">From</span>
              <span className="">
                Balance:{" "}
                {selectedToken == 0
                  ? parseFloat(currencyBalance.sol.toFixed(3))
                  : selectedToken == 1
                  ? parseFloat(currencyBalance.usdc.toFixed(3))
                  : parseFloat(currencyBalance.usdt.toFixed(3))}
              </span>
            </div>
            <div className="flex flex-row items-center bg-[#e9bc23] justify-between rounded-[7px]  py-0.5">
              <div className="flex items-center">
                <img
                  alt="sol"
                  src={
                    selectedToken == 0
                      ? "/images/solana.png"
                      : selectedToken == 1
                      ? "/images/usdc.png"
                      : "/images/usdt.png"
                  }
                  className="tokenImage mr-2 ml-[10px]"
                />
                <span className="mr-2">
                  {selectedToken === 0
                    ? "SOL"
                    : selectedToken === 1
                    ? "USDC"
                    : "USDT"}
                </span>
                <input
                  type="number"
                  value={Number(inAmount).toString()}
                  onChange={(e) => {
                    handleInput(Number(e.target.value));
                  }}
                  className="w-full h-12 outline-none px-1 text-[#000000] text-xl bg-transparent"
                />
                <button
                  className="max-button"
                  onClick={() => {
                    handleMax();
                  }}
                >
                  MAX
                </button>
              </div>
            </div>
          </div>

          {/* LING Output Amount */}
          <div className="rounded-[10px] flex flex-col justify-between px-1 w-full">
            <div className="text-sm text-[#000000] flex flex-row items-center justify-between">
              <span className="">To</span>
            </div>
            <div className="flex flex-row items-center bg-[#e9bc23] justify-between rounded-[7px]  py-0.5">
              <div className="flex items-center">
                <input
                  type="number"
                  value={
                    selectedToken == 0
                      ? Number(
                          (inAmount * SOL_USDC_RATE * TOKEN_PRICE_DECIMALS) /
                            price_per_token
                        ).toString()
                      : Number(
                          (inAmount * TOKEN_PRICE_DECIMALS) / price_per_token
                        ).toString()
                  }
                  className="w-full h-12 outline-none px-1 text-[#000000] text-xl bg-transparent ml-[10px]"
                />
                <img
                  alt="sol"
                  src="/images/icon-aape.png"
                  className="tokenImage mr-2"
                />
                <span className="mr-2">MKYL</span>
              </div>
            </div>
          </div>
        </div>
        <ProgressBar
          // usdValue={selectedToken == 0 ? inAmount * SOL_USDC_RATE : inAmount}
          progress={progress}
        />
        {slidePage == 0 && (
          <div>
            <div className="check-container my-2">
              <Checkbox
                checked={checked}
                onChange={handleChange}
                inputProps={{ "aria-label": "controlled" }}
              />
              I confirm Receiving address is correct & agree with Terms &
              Conditions
            </div>
            <div className="flex justify-end my-4">
              <button
                className="btn-primary w-full sm:w-1/2"
                disabled={!checked}
                onClick={handleBuyNow}
              >
                Buy Now
              </button>
            </div>
          </div>
        )}
        {slidePage === 1 && (
          <>
            <div className="flex flex-between flex-col lg:flex-row">
              <div className="goback-box flex justify-between flex-grow flex-between">
                <button
                  onClick={handleBack}
                  className="bg-[#f67c2f] rounded-[5px] mx-[10px] p-4 px-4 text-white"
                >
                  <span>&lt; Go back</span>
                </button>
                <button
                  onClick={handleNext}
                  className="bg-[#f67c2f] rounded-[5px] mx-[10px] p-4 px-4 text-white"
                >
                  <span>Go next &gt;</span>
                </button>
              </div>
            </div>
            <div className="goback-box text-gray-500 text-center mt-2">
              <h6 className="">
                {`You have selected ${
                  selectedToken === 0
                    ? "SOL "
                    : selectedToken === 1
                    ? "USDC"
                    : "USDT"
                } method`}
              </h6>
            </div>
            <span className="text-[#000000] text-[16px] flex justify-center my-4">
              Connect your wallet to begin a transaction:
            </span>
            <div className="flex justify-center">
              <WalletMultiButtonDynamic />
            </div>
          </>
        )}
        {slidePage === 2 && (
          <>
            <div className="flex flex-between flex-col lg:flex-row">
              <div className="goback-box flex justify-between flex-col lg:flex-row mr-auto">
                <button
                  onClick={handleBack}
                  className="bg-[#f67c2f] rounded-[5px] mx-[10px] p-1 px-4 text-white"
                >
                  <span>&lt; Go back</span>
                </button>
                <div />
              </div>
              <div className="goback-box text-gray-500 text-center mt-2 mx-auto">
                <h6 className="">
                  {`You have selected ${
                    selectedToken === 0
                      ? "SOL "
                      : selectedToken === 1
                      ? "USDC"
                      : "USDT"
                  } method`}
                </h6>
                <div className="flex items-center mx-auto">
                  <img src={WalletLogo.src} className="px-1 h-6" />
                  <span>{content}</span>
                </div>
              </div>
            </div>
            <div>
              <span className="text-[#000000] text-[24px] flex justify-center my-4 mb-2">
                {`Send ${inAmount} ${
                  selectedToken === 0
                    ? "SOL"
                    : selectedToken === 1
                    ? "USDC"
                    : "USDT"
                } to:`}
              </span>
              <div className="flex justify-center mb-4">
                <input
                  type="text"
                  value={PRESALE_PROGRAM_PUBKEY.toBase58()}
                  readOnly={true}
                  className="w-full sm:w-2/3 mr-2 h-6 text-[#000000] text-lg bg-transparent text-center"
                />
                <CopyToClipboard
                  text={PRESALE_PROGRAM_PUBKEY.toBase58()}
                  onCopy={onCopy}
                >
                  <img
                    src={copied ? CopiedLogo.src : CopyLogo.src}
                    alt="copyLogo"
                    className="copy2board"
                    width={16}
                    height={16}
                  />
                </CopyToClipboard>
              </div>
            </div>
            <div className="flex justify-end">
              <button
                className="btn-primary w-full sm:w-1/2"
                onClick={onHandleSend}
              >
                Confirm Transaction
              </button>
            </div>
            {/* <div className="flex justify-end mt-2">
              <button
                className="btn-primary w-full sm:w-1/2"
                onClick={onClaimToken}
              >
                Claim
              </button>
            </div> */}
          </>
        )}
        {slidePage === 3 && transactionPending && (
          <>
            <div className="flex flex-between flex-col lg:flex-row">
              <div className="goback-box flex justify-between flex-col lg:flex-row mr-auto">
                <button
                  onClick={handleBack}
                  className="bg-[#f67c2f] rounded-[5px] mx-[10px] p-4 px-4 text-white"
                >
                  <span>&lt; Go back</span>
                </button>
                <div />
              </div>
              <div className="goback-box text-gray-500">
                <div className="flex items-center">
                  <img src={WalletLogo.src} className="px-1 h-6" />
                  <span>{content}</span>
                </div>
              </div>
            </div>
            <div className="flex justify-center mt-4">
              <Box sx={{ display: "flex" }}>
                <CircularProgress size={60} />
              </Box>
            </div>
            <div className="flex justify-center mt-4">
              <span className="text-[#000000] text-[16px] flex justify-center">
                Transaction detected, waiting for confirmation...
              </span>
            </div>
          </>
        )}
        {slidePage === 4 && (
          <>
            <div className="flex flex-between flex-col lg:flex-row">
              <div className="goback-box flex justify-between flex-col lg:flex-row mr-auto">
                <button
                  onClick={handleBackFirst}
                  className="bg-[#f67c2f] rounded-[5px] mx-[10px] p-4 px-4 text-white"
                >
                  <span>&lt; Go first</span>
                </button>
                <div />
              </div>
              <div className="goback-box text-gray-500">
                <div className="flex items-center">
                  <img src={WalletLogo.src} className="px-1 h-6" />
                  <span>{content}</span>
                </div>
              </div>
            </div>
            <div>
              <span className="text-[#000000] text-[24px] flex justify-center">
                Congratulations
              </span>
            </div>
            <div className="flex justify-center mt-4">
              <img src={CheckLogo.src} className="h-16 sm:h-32" />
            </div>
            <div className="flex justify-center mt-4">
              <span className="text-[#000000] text-[16px] flex justify-center">
                {`You all set! You have successfully purchased ${
                  selectedToken === 0
                    ? (inAmount * SOL_USDC_RATE * TOKEN_PRICE_DECIMALS) /
                      price_per_token
                    : (inAmount * TOKEN_PRICE_DECIMALS) / price_per_token
                } MKYL !`}
              </span>
            </div>
          </>
        )}
        <Link
          href="/affiliate"
          className="fixed bottom-0 left-0 w-full py-3 shadow-md mt-4"
        >
          <span className="text-[#000000] text-[20px] flex justify-center">
            Earn an extra 10% from referrals.
          </span>
        </Link>
      </div>
    </div>
  );
}
