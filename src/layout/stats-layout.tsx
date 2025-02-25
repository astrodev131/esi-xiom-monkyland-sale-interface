import React, { useState, useEffect } from "react";
import {
  TOKEN_DECIMAL
} from "@/constants/constants";
import usePresale from "@/hooks/usePresale";

export default function StatsLayout() {
  const { totalBuyAmount, entireBuyAmount, stage_hardcap, stageNumber, totalHardCap } = usePresale();
  const [stageLabel, setStageLabel] = useState("Stage 1 Progress");
  useEffect(() => {
    if (stageNumber === 1) {
      setStageLabel("Stage 1 Progress");
    }
    else if (stageNumber === 2) {
      setStageLabel("Stage 2 Progress");
    }
    else if (stageNumber === 3) {
      setStageLabel("Stage 3 Progress");
    }
    else if (stageNumber === 4) {
      setStageLabel("Stage 4 Progress");
    }
    else if (stageNumber > 4) {
      setStageLabel("Presale Finished");
    }
  }, [stageNumber]);
  return (
    <div className="flex flex-col items-center gap-8 rounded-3xl flex flex-col gap-3 sm:gap-5">
      <div className="flex flex-col items-center justify-between w-full gap-5 sm:flex-col sm:gap-12">
        <div />
        {Number(totalBuyAmount) > 0 && stageNumber < 5 && (
          <ProcessBarStage
            label={stageLabel}
            value={Math.floor(
              ((totalBuyAmount / 10 ** TOKEN_DECIMAL) * 100) /
              stage_hardcap
            )}
          />
        )}
        {Number(totalBuyAmount) > 0 && stageNumber == 5 && (
          <ProcessBarStage
            label={stageLabel}
            value={Math.floor(
              ((totalBuyAmount / 10 ** TOKEN_DECIMAL) * 100) /
              totalHardCap
            )}
          />
        )}
        {Number(totalBuyAmount) === 0 && (
          <ProcessBarStage
            label={stageLabel}
            value={0}
          />
        )}
        <ProcessBarTotal
          label="Total Purchased Amount"
          value={Math.floor(
            ((entireBuyAmount) * 100) / 25000  //25000
          )}
        />
        <div />
      </div>
    </div>
  );
}

interface ProcessBarProps {
  label: string;
  value: number;
}

const ProcessBarStage: React.FC<ProcessBarProps> = ({ label, value }) => {
  return (
    <div className="flex bg-[#070a29b3] flex-row items-center gap-8 rounded-[5px] py-2 px-10 flex flex-row gap-3 sm:gap-5 PercentBox" style={{ justifyContent: 'space-between', backdropFilter: 'blur(5px)' }}>
      <span className="mt-4 text-base sm:text-xl text-[#ffffff] whitespace-nowrap">
        {label} &nbsp;
      </span>
      <div className="relative flex flex-col items-center w-[60%]" style={{ alignItems: 'flex-start', fontFamily: 'system-ui', fontSize: '14px' }}>
        <div className="min-w-11 min-h-11 rounded-full flex flex-row items-center justify-center">
          <span className="text-base text-[#ffffff]" style={{ whiteSpace: "nowrap" }}>{value}% Completed</span>
        </div>
        <div className="w-full h-5 sm:h-3 rounded-full bg-[#494A7D] overflow-hidden">
          <div
            className="h-full bg-[#4568dc]"
            style={{
              width: `${value}%`,
            }}
          ></div>
        </div>

        <div className="w-full flex flex-row items-end justify-between text-base text-[#908FAA] text-[11px]">
          <div className="flex flex-col items-center w-1">
            <div className="w-1 h-1" />
            <span>0%</span>
          </div>
          <div className="flex flex-col items-center w-1">
            <div className="w-1 h-1" />
            <span>25%</span>
          </div>
          <div className="flex flex-col items-center w-1">
            <div className="w-1 h-1" />
            <span>50%</span>
          </div>
          <div className="flex flex-col items-center w-1">
            <div className="w-1 h-1" />
            <span>75%</span>
          </div>
          <div className="flex flex-col items-center w-1">
            <div className="w-1 h-1" />
            <span>100%</span>
          </div>
        </div>
      </div>
    </div>

  );
};

const ProcessBarTotal: React.FC<ProcessBarProps> = ({ label, value }) => {
  return (
    <div className="flex bg-[#070a29b3] flex-row items-center gap-8 rounded-[5px] py-2 px-10 flex flex-row gap-3 sm:gap-5 PercentBox" style={{ justifyContent: 'space-between', backdropFilter: 'blur(5px)' }}>
      <span className="mt-4 text-base sm:text-xl text-[#ffffff] whitespace-nowrap">
        {label} &nbsp;
      </span>
      <div className="relative flex flex-col items-center w-[60%]" style={{ alignItems: 'flex-start', fontFamily: 'system-ui', fontSize: '14px' }}>
        <div className="min-w-11 min-h-11 rounded-full flex flex-row items-center justify-center">
          <span className="text-base text-[#ffffff]" style={{ whiteSpace: "nowrap" }}>{value}% Completed</span>
        </div>
        <div className="w-full h-5 sm:h-3 rounded-full bg-[#494A7D] overflow-hidden">
          <div
            className="h-full bg-[#4568dc]"
            style={{
              width: `${value}%`,
            }}
          ></div>
        </div>

        <div className="w-full flex flex-row items-end justify-between   text-base text-[#908FAA] text-[11px]" style={{ paddingRight: '10px' }}>
          <div className="flex flex-col items-center w-1">
            <div className="w-1 h-1" />
            <span className="whitespace-nowrap">0</span>
          </div>
          <div className="flex flex-col items-center w-1">
            <div className="w-1 h-1" />
            <span className="whitespace-nowrap">5000</span>
          </div>
          <div className="flex flex-col items-center w-1"></div>
          <div className="flex flex-col items-center w-1">
            <div className="w-1 h-1" />
            <span className="whitespace-nowrap">10000</span>
          </div>
          <div className="flex flex-col items-center w-1"></div>
          <div className="flex flex-col items-center w-1">
            <div className="w-1 h-1" />
            <span className="whitespace-nowrap">15000</span>
          </div>
          <div className="flex flex-col items-center w-1"></div>
          <div className="flex flex-col items-center w-1">
            <div className="w-1 h-1" />
            <span className="whitespace-nowrap">20000</span>
          </div>
          <div className="flex flex-col items-center w-1"></div>
          <div className="flex flex-col items-center w-1">
            <div className="w-1 h-1" />
            <span className="whitespace-nowrap">25000</span>
          </div>
        </div>
      </div>
    </div>
  );
};
