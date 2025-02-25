import React, { useState, useEffect } from "react";
import { useAnchorWallet } from "@solana/wallet-adapter-react";
import Countdown from "react-countdown";
import usePresale from "@/hooks/usePresale";

import Grid from "@mui/material/Grid";
import { TOKEN_DECIMAL } from "@/constants/constants";
import WalletMultiButtonDynamic from "./WalletMultiButtonDynamic";

export default function ManageLayout() {
  const { startTime, endTime, totalBuyAmount, stage_hardcap, stageNumber } =
    usePresale();

  const anchorWallet = useAnchorWallet();

  const changeTimeStyle = (time: number) => {
    let date = new Date(time * 1000);

    let optionsForDate: any = {
      year: "numeric",
      month: "short",
      day: "numeric",
    };

    let optionsForTime: any = {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    };

    var formattedDate = date.toLocaleDateString("en-US", optionsForDate);
    var formattedTime = date.toLocaleTimeString("en-US", optionsForTime);
    return formattedDate + ", " + formattedTime;
  };

  return (
    <div
      className="w-full h-144 sm:h-96 max-w-[700px] rounded-3xl bg-[#ffffff66] px-8 sm:px-12 py-8 flex flex-col gap-2 sm:gap-3"
      style={{
        backdropFilter: "blur(5px)",
        minHeight: "270px",
        border: "1px solid #dee2e6",
      }}
    >
      {anchorWallet === undefined && (
        <div
          className="w-[100%] top-0 flex flex-row items-center h-full right-5"
          style={{
            margin: "auto",
            display: "flex",
            height: "10%",
            justifyContent: "center",
          }}
        >
          <WalletMultiButtonDynamic />
        </div>
      )}

      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <div className="flex flex-row items-center bg-[#e6f1fa] justify-between rounded-[7px] px-0.5 py-0.5">
            <div
              className="w-48 h-10 px-4 py-3 flex flex-row items-center justify-between rounded-[7px] bg-[#472584] flex"
              style={{ justifyContent: "space-evenly" }}
            >
              <span className="text-[#ffffff] text-sm">Softcap</span>
            </div>
            <div
              className="rounded-[7px]"
              style={{
                border: "1px solid #0000002d",
                marginLeft: "10px",
                marginRight: "10px",
              }}
            >
              <input
                type="number"
                value={0}
                // onChange={(e) => {
                //   setSolBalance(Number(e.target.value));
                // }}
                className="w-full h-10 outline-none px-2 text-[#212529] text-xl bg-transparent"
              />
            </div>
          </div>
        </Grid>
        <Grid item xs={12} md={6}>
          <div className="flex flex-row items-center bg-[#e6f1fa] justify-between rounded-[7px] px-0.5 py-0.5">
            <div
              className="w-48 h-10 px-4 py-3 flex flex-row items-center justify-between rounded-[7px] bg-[#472584] flex"
              style={{ justifyContent: "space-evenly" }}
            >
              <span className="text-[#ffffff] text-sm">Hardcap</span>
            </div>
            <div
              className="rounded-[7px]"
              style={{
                border: "1px solid #0000002d",
                marginLeft: "10px",
                marginRight: "10px",
              }}
            >
              <input
                type="number"
                value={0}
                // onChange={(e) => {
                //   setSolBalance(Number(e.target.value));
                // }}
                className="w-full h-10 outline-none px-2 text-[#212529] text-xl bg-transparent"
              />
            </div>
          </div>
        </Grid>
        <Grid item xs={12} md={6}>
          <div className="flex flex-row items-center bg-[#e6f1fa] justify-between rounded-[7px] px-0.5 py-0.5">
            <div
              className="w-48 h-10 px-4 py-3 flex flex-row items-center justify-between rounded-[7px] bg-[#472584] flex"
              style={{ justifyContent: "space-evenly" }}
            >
              <span className="text-[#ffffff] text-sm">minToken Per</span>
            </div>
            <div
              className="rounded-[7px]"
              style={{
                border: "1px solid #0000002d",
                marginLeft: "10px",
                marginRight: "10px",
              }}
            >
              <input
                type="number"
                value={0}
                // onChange={(e) => {
                //   setSolBalance(Number(e.target.value));
                // }}
                className="w-full h-10 outline-none px-2 text-[#212529] text-xl bg-transparent"
              />
            </div>
          </div>
        </Grid>
        <Grid item xs={12} md={6}>
          <div className="flex flex-row items-center bg-[#e6f1fa] justify-between rounded-[7px] px-0.5 py-0.5">
            <div
              className="w-48 h-10 px-4 py-3 flex flex-row items-center justify-between rounded-[7px] bg-[#472584] flex"
              style={{ justifyContent: "space-evenly" }}
            >
              <span className="text-[#ffffff] text-sm">maxTokenPer</span>
            </div>
            <div
              className="rounded-[7px]"
              style={{
                border: "1px solid #0000002d",
                marginLeft: "10px",
                marginRight: "10px",
              }}
            >
              <input
                type="number"
                value={0}
                // onChange={(e) => {
                //   setSolBalance(Number(e.target.value));
                // }}
                className="w-full h-10 outline-none px-2 text-[#212529] text-xl bg-transparent"
              />
            </div>
          </div>
        </Grid>
        <Grid item xs={12} md={6}>
          <div className="flex flex-row items-center bg-[#e6f1fa] justify-between rounded-[7px] px-0.5 py-0.5">
            <div
              className="w-48 h-10 px-4 py-3 flex flex-row items-center justify-between rounded-[7px] bg-[#472584] flex"
              style={{ justifyContent: "space-evenly" }}
            >
              <span className="text-[#ffffff] text-sm">Start Time</span>
            </div>
            <div
              className="rounded-[7px]"
              style={{
                border: "1px solid #0000002d",
                marginLeft: "10px",
                marginRight: "10px",
              }}
            >
              <input
                type="number"
                value={0}
                // onChange={(e) => {
                //   setSolBalance(Number(e.target.value));
                // }}
                className="w-full h-10 outline-none px-2 text-[#212529] text-xl bg-transparent"
              />
            </div>
          </div>
        </Grid>
        <Grid item xs={12} md={6}>
          <div className="flex flex-row items-center bg-[#e6f1fa] justify-between rounded-[7px] px-0.5 py-0.5">
            <div
              className="w-48 h-10 px-4 py-3 flex flex-row items-center justify-between rounded-[7px] bg-[#472584] flex"
              style={{ justifyContent: "space-evenly" }}
            >
              <span className="text-[#ffffff] text-sm">End Time</span>
            </div>
            <div
              className="rounded-[7px]"
              style={{
                border: "1px solid #0000002d",
                marginLeft: "10px",
                marginRight: "10px",
              }}
            >
              <input
                type="number"
                value={0}
                // onChange={(e) => {
                //   setSolBalance(Number(e.target.value));
                // }}
                className="w-full h-10 outline-none px-2 text-[#212529] text-xl bg-transparent"
              />
            </div>
          </div>
        </Grid>
        <Grid item xs={12} md={6}>
          <div className="flex flex-row items-center bg-[#e6f1fa] justify-between rounded-[7px] px-0.5 py-0.5">
            <div
              className="w-48 h-10 px-4 py-3 flex flex-row items-center justify-between rounded-[7px] bg-[#472584] flex"
              style={{ justifyContent: "space-evenly" }}
            >
              <span className="text-[#ffffff] text-sm">Stage Hardcap</span>
            </div>
            <div
              className="rounded-[7px]"
              style={{
                border: "1px solid #0000002d",
                marginLeft: "10px",
                marginRight: "10px",
              }}
            >
              <input
                type="number"
                value={0}
                // onChange={(e) => {
                //   setSolBalance(Number(e.target.value));
                // }}
                className="w-full h-10 outline-none px-2 text-[#212529] text-xl bg-transparent"
              />
            </div>
          </div>
        </Grid>
        <Grid item xs={12} md={6}>
          <div className="flex flex-row items-center bg-[#e6f1fa] justify-between rounded-[7px] px-0.5 py-0.5">
            <div
              className="w-48 h-10 px-4 py-3 flex flex-row items-center justify-between rounded-[7px] bg-[#472584] flex"
              style={{ justifyContent: "space-evenly" }}
            >
              <span className="text-[#ffffff] text-sm">Token Price</span>
            </div>
            <div
              className="rounded-[7px]"
              style={{
                border: "1px solid #0000002d",
                marginLeft: "10px",
                marginRight: "10px",
              }}
            >
              <input
                type="number"
                value={0}
                // onChange={(e) => {
                //   setSolBalance(Number(e.target.value));
                // }}
                className="w-full h-10 outline-none px-2 text-[#212529] text-xl bg-transparent"
              />
            </div>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}
