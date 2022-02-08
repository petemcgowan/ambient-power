import React, { useContext, useState } from "react";
import Picker from "react-mobile-picker";
import "./example.css";
import "./pickerStyle.css";
import { PickerContext } from "../contexts/PickerContext";

function generateNumberArray(begin, end) {
  let array = [];
  for (let i = begin; i <= end; i++) {
    array.push((i < 10 ? "0" : "") + i);
  }
  return array;
}

function addMinutes(date, minutes) {
  return new Date(date.getTime() + minutes * 60000);
}

const TimePicker = () => {
  const [isPickerShow, setIsPickerShow]  = useState (false);
  // option Groups are ALL the options available to select
  // const [valueGroups, setValueGroups]  = useState ({
  //   hour: "00",
  //   minute: "00",
  // });
  // Value groups is what they've currently selected
  const [optionGroups, setOptionGroups]  = useState ({
    hour: generateNumberArray(0, 23),
    minute: generateNumberArray(0, 59),
  });
  const { valueGroups, setValueGroups } = useContext(PickerContext);
  const { dateTimerIsUp, setDateTimerIsUp } = useContext(PickerContext);
  const { hourSpecified, setHourSpecified } = useContext(PickerContext);
  const { minuteSpecified, setMinuteSpecified } = useContext(PickerContext);
  const { specifiedTimeInMinutes, setSpecifiedTimeInMinutes } = useContext(PickerContext);

  // console.log("optionGroups:" + JSON.stringify(optionGroups));
  // console.log("valueGroups:" + JSON.stringify(valueGroups));

  const maskStyle = {
    display: isPickerShow ? "block" : "none",
  };
  const pickerModalClass = `picker-modal${
    isPickerShow ? " picker-modal-toggle" : ""
  }`;


  const handleChange = (name, value) => {
    console.log("handleChange, name:" + name + ", value:" + value);
    console.log("handleChange, valueGroups before:" + JSON.stringify(valueGroups));
    setValueGroups({...valueGroups, [name]: value});
    if (name === "hour" ) {
      console.log("setting hour to:" + parseInt(value));
      setHourSpecified(parseInt(value));
    }
    else if (name === "minute" ) {
      console.log("setting minute to:" + parseInt(value));
      setMinuteSpecified(parseInt(value));
    }

  };

  const togglePicker = () => {
    setIsPickerShow(!isPickerShow);
    console.log("handleChange, valueGroups after:" + JSON.stringify(valueGroups));
    console.log("handleChange, hourSpecified after:" + JSON.stringify(hourSpecified));
    console.log("handleChange, minuteSpecified after:" + JSON.stringify(minuteSpecified));

    //Figure out when the timer should stop based on now, and the specified time

    var timeInMinutes = (hourSpecified * 60) + minuteSpecified;
    console.log("timeInMinutes:" + JSON.stringify(timeInMinutes));
    // setSpecifiedTimeInMinutes(timeInMinutes);
    // console.log("handleChange, specifiedTimeInMinutes after:" + JSON.stringify(specifiedTimeInMinutes));
    // const dateToStop = addMinutes(new Date(), specifiedTimeInMinutes);
    const dateToStop = addMinutes(new Date(), timeInMinutes);
    console.log("dateToStop:" + JSON.stringify(dateToStop));

    setDateTimerIsUp(dateToStop);
    console.log("dateTimerIsUp changed:" + JSON.stringify(dateTimerIsUp));
  };


  return (

    <div className="example-container">
      {/* <div className="weui_cells_title">
        2. As a modal and bind to input field
      </div> */}
      <div className="weui_cells">
        <div className="weui_cell weui_cell_select weui_select_after">
          <div className="weui_cell_hd">Time left</div>
          <div className="weui_cell_bd weui_cell_primary">
            <input
              type="text"
              className="weui_select"
              value={
                valueGroups.hour +
                "-" +
                valueGroups.minute
              }
              readOnly
              onClick={togglePicker}
            />
          </div>
        </div>
      </div>
      <div className="picker-modal-container">
        <div
          className="picker-modal-mask"
          style={maskStyle}
          onClick={togglePicker}
        ></div>
        <div className={pickerModalClass}>
          <header>
            <div className="title">Time Left </div>
            <a href="javascript:;" onClick={togglePicker}>
              OK
            </a>
          </header>
          <Picker
            optionGroups={optionGroups}
            valueGroups={valueGroups}
            onChange={handleChange}
          />
        </div>
      </div>
    </div>
  );
}

export default TimePicker;
