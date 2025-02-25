/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import TimerLayout from "@/layout/timer-layout";
import BuyLayout from "@/layout/buy-layout";
import StatsLayout from "@/layout/stats-layout";
import usePresale from "@/hooks/usePresale";
import { useWallet } from "@solana/wallet-adapter-react";
import Cookies from "universal-cookie";
import { useSearchParams } from "next/navigation";
import rot13, { isAddress } from "@/utils/solWeb3";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import { PRESALE_AUTHORITY } from "@/constants/constants";
import FaqAccodition from "@/components/InfoBox";
import InfoBox from "@/components/InfoBox";

export default function Home() {
  const cookies = new Cookies();
  const searchParams = useSearchParams();

  const ref = searchParams.get("ref");

  useEffect(() => {
    if (ref) {
      if (isAddress(rot13(ref))) {
        cookies.set("ref", ref);
      }
    }
  }, [ref]);

  return (
    <div className="">
      <div className="w-full  px-5 py-9 relative flex justify-center">
        <BuyLayout />
      </div>
      <div className="flex justify-center  w-full mb-9">
        <InfoBox />
      </div>
    </div>
  );
}
