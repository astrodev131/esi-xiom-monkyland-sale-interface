import React, { useState, useEffect } from "react";
import {
  useAnchorWallet,
} from "@solana/wallet-adapter-react";
import Countdown from "react-countdown";
import usePresale from "@/hooks/usePresale";
import { TOKEN_DECIMAL } from "@/constants/constants";
import WalletMultiButtonDynamic from './WalletMultiButtonDynamic'
export default function TimerLayout() {
  const { startTime, endTime, totalBuyAmount, stage_hardcap, stageNumber } = usePresale();
  const [startFormattedDate, setStartFormattedDate] = useState("");
  const [endFormattedDate, setEndFormattedDate] = useState("");
  const anchorWallet = useAnchorWallet();
  useEffect(() => {
    setStartFormattedDate(changeTimeStyle(startTime));
    setEndFormattedDate(changeTimeStyle(endTime));
  }, [startTime, endTime, totalBuyAmount]);

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
    <div className="w-full h-144 sm:h-96 max-w-[700px] rounded-3xl bg-[#ffffff66] px-8 sm:px-12 py-8 flex flex-col gap-3 sm:gap-5" style={{ backdropFilter: 'blur(5px)', minHeight: '270px', border: '1px solid #dee2e6' }}>
      <span className="text-[#000000] text-[15px]">
        {Date.now() < startTime * 1000 && "Presale will start in"}
        {Date.now() >= startTime * 1000 &&
          Date.now() < endTime * 1000 && (totalBuyAmount / (10 ** TOKEN_DECIMAL)) < stage_hardcap &&
          "Presale will end in"}
        {(Date.now() > endTime * 1000 || (totalBuyAmount / (10 ** TOKEN_DECIMAL)) >= stage_hardcap) && stageNumber > 4 && "Successfully Stage Sale has ended!"}
        {/* {(Date.now() > endTime * 1000 || (totalBuyAmount / (10 ** TOKEN_DECIMAL)) >= stage_hardcap) && stageNumber === 0 && anchorWallet && "Presale has not started yet."} */}
        {/* {anchorWallet === undefined && "Please connect wallet first"} */}
      </span>
      <div className="w-[70%] rounded-[20px] bg-[#e6f1fa] py-4 shadow-[0_0_50px_0_#00000010] flex flex-row justify-center" style={{ margin: 'auto', textAlign: 'center' }}>
        {Date.now() < endTime * 1000 && (totalBuyAmount / (10 ** TOKEN_DECIMAL)) < stage_hardcap ? (
          <Countdown
            date={
              Date.now() < startTime * 1000 ? startTime * 1000 : endTime * 1000
            }
            renderer={renderer}
          />
        ) : (
          <div>
            {stageNumber !== 0 && stageNumber < 5 && (
              <span className="text-2xl text-[#070a29]">
                Stage {stageNumber} Completed.
              </span>
            )}
            {stageNumber === 0 && anchorWallet && (
              <span className="text-2xl text-[#070a29]">
                Presale has not started yet
              </span>
            )}
            {anchorWallet === undefined && (
              <>
                <span className="text-2xl text-[#070a29]">
                  Please connect wallet first
                </span>
              </>
            )}
            {stageNumber === 5 && anchorWallet && (
              <span className="text-2xl text-[#070a29]">
                Presale has completed
              </span>
            )}
          </div>
        )}
      </div>
      {anchorWallet === undefined && (
        <div className="w-[100%] top-0 flex flex-row items-center h-full right-5" style={{ margin: 'auto', display: 'flex', height: '10%', justifyContent: 'center' }}>
          <WalletMultiButtonDynamic />
        </div>
      )}

      {Number(startTime) !== 0 && (
        <div className="flex flex-row items-start justify-between my-5 sm:my-8">
          <div className="font-normal text-[#000000] flex flex-col items-start">
            <span className="text-xs sm:text-sm">Stage {stageNumber} Start Time:</span>
            <span className="text-xs sm:text-base">{startFormattedDate}</span>
          </div>
          <div className="font-normal text-[#000000] flex flex-col items-start">
            <span className="text-xs sm:text-sm">Stage {stageNumber} End Time:</span>
            <span className="text-xs sm:text-base">{endFormattedDate}</span>
          </div>
        </div>
      )}
    </div>
  );
}

const Completionist = () => (
  <span className="text-3xl text-[#070a29]">You are good to go!</span>
);

interface renderProps {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  completed: boolean;
}

const renderer: React.FC<renderProps> = ({
  days,
  hours,
  minutes,
  seconds,
  completed,
}) => {
  if (completed) {
    // Render a completed state
    return <Completionist />;
  } else {
    // Render a countdown
    return (
      <div className="flex flex-row items-center justify-between w-full">
        <div />
        <CounterItem label="Days" value={days} />
        <CounterItem label="Hours" value={hours} />
        <CounterItem label="Minutes" value={minutes} />
        <CounterItem label="Seconds" value={seconds} />
        <div />
      </div>
    );
  }
};

interface CounterItemProps {
  label: string;
  value: number;
}

const CounterItem: React.FC<CounterItemProps> = ({ label, value }) => {
  return (
    <div className="flex flex-col items-center w-16 gap-1   sm:gap-2  ">
      <span className="text-[#070a29] text-2xl sm:text-4xl">
        {String(value).padStart(2, "0")}
      </span>
      <span className="text-[#000000] text-xs sm:text-base">{label}</span>
    </div>
  );
};
