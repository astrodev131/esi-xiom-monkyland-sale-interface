import React, { useState, useEffect, useContext } from "react";
import countStyles from "./countdown.module.css";

function CountdownCustom({ startTime, endTime, stageNumber }) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [timerHeader, setTimerHeader] = useState("");
  const calculateTimeLeft = () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks

    const utcNow = Date.now();
    // futureDate defines the date and time the countdown will taget, set it as needed
    // It will never go negative, and if countdown finished, it will stop at zero
    const futureDate = new Date("2024-09-01T00:00:00Z");
    // const difference = utcNow - futureDate.getTime();
    // const difference = endTime * 1000 - utcNow;


    var days = 0;
    var hours = 0;
    var minutes = 0;
    var seconds = 0;
    let difference = 0;
    if(utcNow < startTime * 1000) {
      difference = startTime * 1000 - utcNow;
      days = Math.floor(difference / (1000 * 60 * 60 * 24));
      hours = Math.floor(
        (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60) + 1);
      seconds = Math.floor((difference % (1000 * 60)) / 1000 + 1);
      setTimeLeft({ days, hours, minutes, seconds });
      setTimerHeader("LING seed round will start in :");
    } else if (utcNow < endTime * 1000) {
      difference = endTime * 1000 - utcNow;
      days = Math.floor(difference / (1000 * 60 * 60 * 24));
      hours = Math.floor(
        (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60) + 1);
      seconds = Math.floor((difference % (1000 * 60)) / 1000 + 1);
      setTimeLeft({ days, hours, minutes, seconds });
      setTimerHeader("Hurry up, LING seed round will end in :");
    } else {
      setTimerHeader(`Stage ${stageNumber} sale was ended`);
    }
  };

  useEffect(() => {
    calculateTimeLeft();
    const interval = setInterval(() => calculateTimeLeft(), 1000);
    return () => clearInterval(interval);
  }, [startTime, endTime, stageNumber]);
  // Uncomment .padStart(2, "0") to add a leading zero to a single digit,
  // so for example it would show "06" instead of "6"
  const formattedDays = timeLeft.days.toString().padStart(2, "0");
  const formattedHours = timeLeft.hours.toString().padStart(2, "0");
  const formattedMinutes = timeLeft.minutes.toString().padStart(2, "0");
  const formattedSeconds = timeLeft.seconds.toString().padStart(2, "0");

  return (
    <>
      <span className="text-[#000000] text-[20px] mb-4 flex justify-center">
        {timerHeader}
      </span>
      <section className={countStyles.countdownContainerCustom}>
        <div className="flex flex-row items-center ">
          <div
            className="flex flex-row items-left px-2 py-1 w-full justify-evenly"
            style={{
              background: "#ffc000",
            }}
          >
            {/* Days Box */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                marginRight: "0px",
              }}
            >
              <div className={countStyles.countdownCustom}>
                <span>
                  <b>{formattedDays}</b>
                </span>
              </div>
              <div className={countStyles.countdownCustomSub}>DAY</div>
            </div>

            {/* : Box */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                marginRight: "0px",
              }}
            >
              <div className={countStyles.countdownCustom}>
                <span>
                  <b>:</b>
                </span>
              </div>
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                marginRight: "0px",
              }}
            >
              <div className={countStyles.countdownCustom}>
                <span>
                  <b>{formattedHours}</b>
                </span>
              </div>
              <div className={countStyles.countdownCustomSub}>HRS</div>
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                marginRight: "0px",
              }}
            >
              <div className={countStyles.countdownCustom}>
                <span>
                  <b>:</b>
                </span>
              </div>
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                marginRight: "0px",
              }}
            >
              <div className={countStyles.countdownCustom}>
                <span>
                  <b>{formattedMinutes}</b>
                </span>
              </div>
              <div className={countStyles.countdownCustomSub}>MIN</div>
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                marginRight: "0px",
              }}
            >
              <div className={countStyles.countdownCustom}>
                <span>
                  <b>:</b>
                </span>
              </div>
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                marginRight: "0px",
              }}
            >
              <div className={countStyles.countdownCustom}>
                <span>
                  <b style={{ marginLeft: "-10px" }}>{formattedSeconds}</b>
                </span>
              </div>
              <div className={countStyles.countdownCustomSub}>SEC</div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default CountdownCustom;
