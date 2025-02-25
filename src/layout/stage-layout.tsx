import React, { useState, useEffect } from "react";
import {
  TOKEN_DECIMAL
} from "@/constants/constants";
import usePresale from "@/hooks/usePresale";

export default function StageLayout() {
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
    <div className="flex flex-col items-center gap-8">
      <div className="flex flex-col items-center justify-between w-full gap-5 sm:flex-row sm:gap-12">
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
    <div className="relative flex flex-col items-center w-full  ">
      <div className="w-full flex flex-row items-end justify-between   text-base text-[#000000] text-[11px]">
        <div />
        <div className="flex flex-col items-center w-1">
          <span>25%</span>
          <div className="w-1 h-4 bg-[#000000]" />
        </div>
        <div className="flex flex-col items-center w-1">
          <span>50%</span>
          <div className="w-1 h-4 bg-[#000000]" />
        </div>
        <div className="flex flex-col items-center w-1">
          <span>75%</span>
          <div className="w-1 h-4 bg-[#000000]" />
        </div>
        <div />
      </div>
      <div className="w-full h-5 sm:h-7 rounded-full bg-[#cccccc] overflow-hidden">
        <div
          className="h-full bg-[#4568dc]"
          style={{
            width: `${value}%`,
          }}
        ></div>
      </div>
      <div
        className="absolute w-0.5 h-0.5 flex flex-row items-center justify-center top-8"
        style={{
          left: `${value}%`,
        }}
      >
        <div className="min-w-11 min-h-11 rounded-full bg-[#4568dc] flex flex-row items-center justify-center">
          <span className="  text-base text-[#ffffff]">{value}%</span>
        </div>
      </div>
      <span className="mt-4   text-base sm:text-xl text-[#000000] whitespace-nowrap">
        {label}
      </span>
    </div>
  );
};