import React, { useEffect, useState, useContext } from "react";
import { PickerContext } from "../contexts/PickerContext";

//hard coding "time specified" to 1 hr 10 minutes
// const specifiedHours = 1;
// const specifiedMinutes = 10;
// var minutesDiff = specifiedHours * 60 + specifiedMinutes;

const TimerCountdown = ({isPlaying, onPlayPauseClick}) => {

  const { valueGroups, setValueGroups } = useContext(PickerContext);
  const { dateTimerIsUp, setDateTimerIsUp } = useContext(PickerContext);
  const { hourSpecified, setHourSpecified } = useContext(PickerContext);
  const { minuteSpecified, setMinuteSpecified } = useContext(PickerContext);
  // const { isPlaying, setIsPlaying } = useContext(PickerContext);

  const calculateTimeLeft = () => {
    const difference = dateTimerIsUp - new Date(); // new date is now

    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  const timesUpBuddy = () => {
    console.log ("timesUpBuddy");
  };

  useEffect(() => {
    setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    if (timerComponents.length === 0) {
      if (isPlaying) {
        console.log ("useEffect, timerComponents AND isPlaying:" + JSON.stringify(isPlaying));
        onPlayPauseClick (false);
      }
    }
  });

  const timerComponents = [];

  Object.keys(timeLeft).forEach((interval) => {
    if (!timeLeft[interval]) {
      return;
    }

    timerComponents.push(
      <span>
        {timeLeft[interval]} {interval}{" "}
      </span>
    );
  });


  return (
    <div>
        <h2>Countdown time, minutes/seconds</h2>
        <div>{hourSpecified}</div>
        <div>{minuteSpecified}</div>
        {timerComponents.length ? timerComponents : <span>Time's up!</span>}
    </div>
  );
}

export default TimerCountdown;
