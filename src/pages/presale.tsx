/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import { useAnchorWallet, useWallet } from "@solana/wallet-adapter-react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Grid from "@mui/material/Grid";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import dayjs, { Dayjs } from "dayjs";
import { toast } from "react-toastify";
import StatsLayout from "@/layout/stats-layout";
import usePresale from "@/hooks/usePresale";
import { PRESALE_AUTHORITY } from "@/constants/constants";
import WalletMultiButtonDynamic from "@/layout/WalletMultiButtonDynamic";

export interface PresaleInfoProps {
  softcap: number;
  hardcap: number;
  minTokenPer: number;
  maxTokenPer: number;
  stagecap: number;
  tokenPrice: number;
  nextTokenPrice: number;
  startTime: number;
  endTime: number;
}

export default function Manage() {
  const { publicKey } = useWallet();
  const [value, setValue] = React.useState("1");
  const {
    createPresale,
    nextPresale,
    updateStagePresale,
    depositToken,
    withdrawSol,
    stageNumber,
    startTime,
    endTime,
    totalBuyAmount,
    totalSoftCap,
    totalHardCap,
    stage_hardcap,
    minTokenBalancePerWallet,
    maxTokenBalancePerWallet,
  } = usePresale();

  const anchorWallet = useAnchorWallet();

  const [presoftcap, setPreSoftcap] = useState(0);
  const [prehardcap, setPreHardcap] = useState(0);
  const [preminTokenPer, setPreMinTokenPer] = useState(0);
  const [premaxTokenPer, setPreMaxTokenPer] = useState(0);
  const [prestagecap, setPreStagecap] = useState(0);
  const [pretokenPrice, setPreTokenPrice] = useState(0);
  const [preNextTokenPrice, setPreNextTokenPrice] = useState(0);
  const [depTokenAmount, setDepTokenAmount] = useState(0);

  const [prestartTime, setPreStartTime] = React.useState<Dayjs | null>(
    dayjs("2024-07-24T07:30")
  );
  const [preendTime, setPreEndTime] = React.useState<Dayjs | null>(
    dayjs("2024-07-24T08:30")
  );

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

  const onCreatePresale = async () => {
    if (prehardcap < presoftcap) {
      toast.error("Invalid softcap and hardcap");
      return;
    }
    if (premaxTokenPer < preminTokenPer) {
      toast.error("Invalid min and max token per address");
      return;
    }

    if (!prestartTime || !preendTime) {
      toast.error("Invalid sale start and end time");
      return;
    }

    const presaleInfo: PresaleInfoProps = {
      softcap: presoftcap,
      hardcap: prehardcap,
      minTokenPer: preminTokenPer,
      maxTokenPer: premaxTokenPer,
      stagecap: prestagecap,
      tokenPrice: pretokenPrice,
      nextTokenPrice: preNextTokenPrice,
      startTime: new Date(prestartTime.toString()).getTime() / 1000,
      endTime: new Date(preendTime.toString()).getTime() / 1000,
    };
    await createPresale(presaleInfo);
  };

  const onNextPresale = async () => {
    console.log("debug next::");
    if (prehardcap < presoftcap) {
      toast.error("Invalid softcap and hardcap");
      return;
    }
    if (premaxTokenPer < preminTokenPer) {
      toast.error("Invalid min and max token per address");
      return;
    }

    if (!prestartTime || !preendTime) {
      toast.error("Invalid sale start and end time");
      return;
    }

    const presaleInfo: PresaleInfoProps = {
      softcap: presoftcap,
      hardcap: prehardcap,
      minTokenPer: preminTokenPer,
      maxTokenPer: premaxTokenPer,
      stagecap: prestagecap,
      tokenPrice: pretokenPrice,
      nextTokenPrice: preNextTokenPrice,
      startTime: new Date(prestartTime.toString()).getTime() / 1000,
      endTime: new Date(preendTime.toString()).getTime() / 1000,
    };
    await nextPresale(presaleInfo);
  };

  const onUpdatePresale = async () => {
    console.log("debug update stage::");
    if (prehardcap < presoftcap) {
      toast.error("Invalid softcap and hardcap");
      return;
    }
    if (premaxTokenPer < preminTokenPer) {
      toast.error("Invalid min and max token per address");
      return;
    }

    if (!prestartTime || !preendTime) {
      toast.error("Invalid sale start and end time");
      return;
    }

    const presaleInfo: PresaleInfoProps = {
      softcap: presoftcap,
      hardcap: prehardcap,
      minTokenPer: preminTokenPer,
      maxTokenPer: premaxTokenPer,
      stagecap: prestagecap,
      nextTokenPrice: preNextTokenPrice,
      tokenPrice: pretokenPrice,
      startTime: new Date(prestartTime.toString()).getTime() / 1000,
      endTime: new Date(preendTime.toString()).getTime() / 1000,
    };
    await updateStagePresale(presaleInfo);
  };

  const onDepositToken = async () => {
    await depositToken();
  };

  const onWithdrawSol = async () => {
    await withdrawSol();
  };

  const [currentStatus, setCurrentStatus] = useState("");

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const Stages = ({ i = 0 }) => {
    if (i <= stageNumber) {
      return (
        <div className="flex col-3 py-3 ps-lg-4 w-[25%] text-[#ffffff] stage-active">
          <div
            className="flex row align-items-center justify-content-center justify-content-lg-start"
            style={{ alignItems: "center" }}
          >
            <div className="col-lg-auto mb-1 mb-lg-0 ico stageNumber">
              <img
                alt=""
                src="/images/stage-check-on.png"
                style={{ width: "32px" }}
              />
            </div>
            <div className="col-lg-auto text-center text-lg-start txt">
              {" "}
              &nbsp; Stage {i}
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="flex col-3 py-3 ps-lg-4 stage w-[25%] text-[#908FAA]">
          <div
            className="flex row align-items-center justify-content-center justify-content-lg-start"
            style={{ alignItems: "center" }}
          >
            <div className="col-lg-auto mb-1 mb-lg-0 ico stageNumber">
              <img alt="" src="/images/stage-check-off.png" className="w-6" />
            </div>
            <div className="col-lg-auto text-center text-lg-start txt">
              {" "}
              &nbsp; Stage {i}
            </div>
          </div>
        </div>
      );
    }
  };

  return (
    <div className="flex flex-row justify-center">
      <div className="w-full max-w-[1440px] px-5 py-9 relative flex flex-col gap-12">
        <div className="container">
          <div
            className="flex row align-items-center justify-content-center mx-0 mb-4 mb-lg-5"
            style={{ justifyContent: "space-evenly" }}
          >
            <div className="flex col-lg-7 blur-navy rounded-[0.375rem] bg-[#11134cd9] stageBox">
              <div className="flex row w-full">
                <Stages i={1} />
                <Stages i={2} />
                <Stages i={3} />
                <Stages i={4} />
                <Stages i={5} />
                <Stages i={6} />
                <Stages i={7} />
                <Stages i={8} />
              </div>
            </div>
          </div>
        </div>
        {/* {PRESALE_AUTHORITY.toBase58() === publicKey?.toBase58() && (
          <div className="flex flex-row items-center gap-2">
            {stageNumber === 0 && (
              <button
                className="px-5 py-2 bg-[#4568dc] rounded-full text-[#eff3f6] text-sm "
                onClick={onCreatePresale}
              >
                Create Presale
              </button>
            )}
            {stageNumber > 0 && (
              <button
                className="px-5 py-2 bg-[#4568dc] rounded-full text-[#eff3f6]   text-sm  "
                onClick={onUpdatePresale}
              >
                Update Presale
              </button>
            )}

            <button
              className="px-5 py-2 bg-[#4568dc] rounded-full text-[#eff3f6]   text-sm  "
              onClick={onDepositToken}
            >
              Deposit Token
            </button>
            <button
              className="px-5 py-2 bg-[#4568dc] rounded-full text-[#eff3f6]   text-sm  "
              onClick={onWithdrawSol}
            >
              Withdraw Sol
            </button>
          </div>
        )} */}
        <Box sx={{ width: "100%", typography: "body1" }}>
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <TabList
                onChange={handleChange}
                aria-label="lab API tabs example"
                indicatorColor="secondary"
                textColor="inherit"
              >
                <Tab
                  label="Create Presale"
                  value="1"
                  className="px-5 py-2 bg-[#4568dc] rounded-full text-[#eff3f6] text-sm "
                />
                <Tab
                  label="Deposit Token"
                  value="2"
                  className="px-5 py-2 bg-[#4568dc] rounded-full text-[#eff3f6] text-sm"
                />
                <Tab
                  label="Withdraw SOL"
                  value="3"
                  className="px-5 py-2 bg-[#4568dc] rounded-full text-[#eff3f6] text-sm"
                />
              </TabList>
            </Box>
            <TabPanel value="1">
              <div className="flex justify-center gap-12 lg:flex-row">
                <div
                  className="w-full h-144 sm:h-100 max-w-[700px] rounded-3xl bg-[#ffffff66] px-8 sm:px-12 py-8 flex flex-col justify-between gap-2 sm:gap-3"
                  style={{
                    backdropFilter: "blur(5px)",
                    minHeight: "270px",
                    border: "1px solid #dee2e6",
                  }}
                >
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                      <div
                        className="flex flex-row items-center bg-[#e6f1fa] justify-between rounded-[7px] px-0.5 py-0.5"
                        style={{
                          cursor: stageNumber >= 1 ? "not-allowed" : "pointer",
                        }}
                      >
                        <div
                          className="w-48 h-10 px-4 py-3 flex flex-row items-center justify-between rounded-[7px] bg-[#472584] flex"
                          style={{ justifyContent: "space-evenly" }}
                        >
                          <span className="text-[#ffffff] text-sm">
                            Softcap
                          </span>
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
                            min="0"
                            value={stageNumber >= 1 ? totalSoftCap : presoftcap}
                            onChange={(e) => {
                              setPreSoftcap(Number(e.target.value));
                            }}
                            disabled={stageNumber >= 1 ? true : false}
                            className="w-full h-10 outline-none px-2 text-[#212529] text-xl bg-transparent"
                          />
                        </div>
                      </div>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <div
                        className="flex flex-row items-center bg-[#e6f1fa] justify-between rounded-[7px] px-0.5 py-0.5"
                        style={{
                          cursor: stageNumber >= 1 ? "not-allowed" : "pointer",
                        }}
                      >
                        <div
                          className="w-48 h-10 px-4 py-3 flex flex-row items-center justify-between rounded-[7px] bg-[#472584] flex"
                          style={{ justifyContent: "space-evenly" }}
                        >
                          <span className="text-[#ffffff] text-sm">
                            Hardcap
                          </span>
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
                            min="0"
                            value={stageNumber >= 1 ? totalHardCap : prehardcap}
                            onChange={(e) => {
                              setPreHardcap(Number(e.target.value));
                            }}
                            disabled={stageNumber >= 1 ? true : false}
                            className="w-full h-10 outline-none px-2 text-[#212529] text-xl bg-transparent"
                          />
                        </div>
                      </div>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <div
                        className="flex flex-row items-center bg-[#e6f1fa] justify-between rounded-[7px] px-0.5 py-0.5"
                        style={{
                          cursor: stageNumber >= 1 ? "not-allowed" : "pointer",
                        }}
                      >
                        <div
                          className="w-48 h-10 px-4 py-3 flex flex-row items-center justify-between rounded-[7px] bg-[#472584] flex"
                          style={{ justifyContent: "space-evenly" }}
                        >
                          <span className="text-[#ffffff] text-sm">
                            minToken Per
                          </span>
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
                            min="0"
                            value={
                              stageNumber >= 1
                                ? minTokenBalancePerWallet
                                : preminTokenPer
                            }
                            onChange={(e) => {
                              setPreMinTokenPer(Number(e.target.value));
                            }}
                            disabled={stageNumber >= 1 ? true : false}
                            className="w-full h-10 outline-none px-2 text-[#212529] text-xl bg-transparent"
                          />
                        </div>
                      </div>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <div
                        className="flex flex-row items-center bg-[#e6f1fa] justify-between rounded-[7px] px-0.5 py-0.5"
                        style={{
                          cursor: stageNumber >= 1 ? "not-allowed" : "pointer",
                        }}
                      >
                        <div
                          className="w-48 h-10 px-4 py-3 flex flex-row items-center justify-between rounded-[7px] bg-[#472584] flex"
                          style={{ justifyContent: "space-evenly" }}
                        >
                          <span className="text-[#ffffff] text-sm">
                            maxTokenPer
                          </span>
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
                            min="0"
                            value={
                              stageNumber >= 1
                                ? maxTokenBalancePerWallet
                                : premaxTokenPer
                            }
                            onChange={(e) => {
                              setPreMaxTokenPer(Number(e.target.value));
                            }}
                            disabled={stageNumber >= 1 ? true : false}
                            className="w-full h-10 outline-none px-2 text-[#212529] text-xl bg-transparent"
                          />
                        </div>
                      </div>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <div className="flex justify-center bg-[#e6f1fa] justify-between rounded-[7px] px-0.5 py-0.5">
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <DateTimePicker
                            label="Presale Start Time"
                            value={prestartTime}
                            onChange={(newValue) => setPreStartTime(newValue)}
                          />
                        </LocalizationProvider>
                      </div>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <div className="flex justify-center bg-[#e6f1fa] justify-between rounded-[7px] px-0.5 py-0.5">
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <DateTimePicker
                            label="Presale End Time"
                            value={preendTime}
                            onChange={(newValue) => setPreEndTime(newValue)}
                          />
                        </LocalizationProvider>
                      </div>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <div className="flex flex-row items-center bg-[#e6f1fa] justify-between rounded-[7px] px-0.5 py-0.5">
                        <div
                          className="w-48 h-10 px-4 py-3 flex flex-row items-center justify-between rounded-[7px] bg-[#472584] flex"
                          style={{ justifyContent: "space-evenly" }}
                        >
                          <span className="text-[#ffffff] text-sm">
                            Stage Hardcap
                          </span>
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
                            min="0"
                            value={prestagecap}
                            onChange={(e) => {
                              setPreStagecap(Number(e.target.value));
                            }}
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
                          <span className="text-[#ffffff] text-sm">
                            Next Token Price
                          </span>
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
                            min="0"
                            max="100"
                            value={preNextTokenPrice}
                            onChange={(e) => {
                              setPreNextTokenPrice(Number(e.target.value));
                            }}
                            className="w-full h-10 outline-none px-2 text-[#212529] text-xl bg-transparent"
                          />
                        </div>
                      </div>
                    </Grid>
                    <Grid item xs={12}>
                      <div className="flex flex-row items-center bg-[#e6f1fa] justify-between rounded-[7px] px-0.5 py-0.5">
                        <div
                          className="w-48 h-10 px-4 py-3 flex flex-row items-center justify-between rounded-[7px] bg-[#472584] flex"
                          style={{ justifyContent: "space-evenly" }}
                        >
                          <span className="text-[#ffffff] text-sm">
                            Token Price
                          </span>
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
                            min="0"
                            value={pretokenPrice}
                            onChange={(e) => {
                              setPreTokenPrice(Number(e.target.value));
                            }}
                            className="w-full h-10 outline-none px-2 text-[#212529] text-xl bg-transparent"
                          />
                        </div>
                      </div>
                    </Grid>
                  </Grid>
                  <Grid container spacing={2}>
                    <Grid item xs={6} md={6}>
                      <button
                        className="px-5 py-2 bg-[#4568dc] rounded-full text-[#eff3f6] text-sm w-full h-12 sale_btn"
                        onClick={
                          stageNumber >= 1 ? onNextPresale : onCreatePresale
                        }
                      >
                        {stageNumber >= 1 ? "Next Presale" : "Create Presale"}
                      </button>
                    </Grid>
                    <Grid item xs={6} md={6}>
                      <button
                        className="px-5 py-2 bg-[#4568dc] rounded-full text-[#eff3f6] text-sm w-full h-12 sale_btn"
                        onClick={onUpdatePresale}
                      >
                        Update Presale
                      </button>
                    </Grid>
                  </Grid>
                </div>
              </div>
            </TabPanel>
            <TabPanel value="2">
              <div className="flex justify-center gap-12 lg:flex-row">
                <div
                  className="w-full h-96 max-w-[700px] rounded-3xl bg-[#ffffff66] px-8 sm:px-12 py-8 flex flex-col justify-end gap-2 sm:gap-3"
                  style={{
                    backdropFilter: "blur(5px)",
                    minHeight: "270px",
                    border: "1px solid #dee2e6",
                  }}
                >
                  {/* <div className="flex flex-row items-center bg-[#e6f1fa] justify-between rounded-[7px] px-0.5 py-0.5 w-full">
                    <div
                      className="w-48 h-10 px-4 py-3 flex flex-row items-center justify-between rounded-[7px] bg-[#472584] flex"
                      style={{ justifyContent: "space-evenly" }}
                    >
                      <span className="text-[#ffffff] text-sm">Token</span>
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
                        value={depTokenAmount}
                        onChange={(e) => {
                          setDepTokenAmount(Number(e.target.value));
                        }}
                        className="w-full h-10 outline-none px-2 text-[#212529] text-xl bg-transparent"
                      />
                    </div>
                  </div> */}
                  <button
                    className="px-5 py-2 bg-[#4568dc] rounded-full text-[#eff3f6] text-sm h-12 sale_btn"
                    onClick={onDepositToken}
                  >
                    Deposit Token
                  </button>
                </div>
              </div>
            </TabPanel>
            <TabPanel value="3">
              <div className="flex justify-center gap-12 lg:flex-row">
                <div
                  className="w-full h-96 max-w-[700px] rounded-3xl bg-[#ffffff66] px-8 sm:px-12 py-8 flex flex-col justify-end gap-2 sm:gap-3"
                  style={{
                    backdropFilter: "blur(5px)",
                    minHeight: "270px",
                    border: "1px solid #dee2e6",
                  }}
                >
                  <button
                    className="px-5 py-2 bg-[#4568dc] rounded-full text-[#eff3f6] text-sm h-12 sale_btn"
                    onClick={onWithdrawSol}
                  >
                    Withdraw SOL
                  </button>
                </div>
              </div>
            </TabPanel>
          </TabContext>
        </Box>
        <StatsLayout />
      </div>
    </div>
  );
}
