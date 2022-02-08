import React, { /*Component,*/ createContext, useState } from "react";

export const PickerContext = createContext();

const PickerContextProvider = (props) => {
// class PickerContextProvider extends Component {

  const [valueGroups, setValueGroups] = useState({
    hour: "00",
    minute: "00",
  });
  const [dateTimerIsUp, setDateTimerIsUp] = useState(new Date());
  const [hourSpecified, setHourSpecified] = useState(0);
  const [minuteSpecified, setMinuteSpecified] = useState(0);
  // const [isPlaying, setIsPlaying] = useState(false);
  const [specifiedTimeInMinutes, setSpecifiedTimeInMinutes] = useState();
  console.log("initializing minuteSpecified" + minuteSpecified);
  console.log("initializing hourSpecified" + hourSpecified);
  // state = {
  //   ,
  //   dateTimerIsUp: new Date()
  // }
  // setValueGroups = (passedValueGroups) => {
  //   console.log ("Context, setting valueGroups to:" + JSON.stringify(passedValueGroups));
  //   this.setState({...this.state,  valueGroups: passedValueGroups });
  //   console.log ("Context, state valueGroups:" + JSON.stringify(this.state.valueGroups));
  // }
  // setDateTimerIsUp = (dateTimerIsUp) => {
  //   this.setState({ dateTimerIsUp: dateTimerIsUp });
  // }

  // render() {
    return (
      <PickerContext.Provider value={{valueGroups, setValueGroups, dateTimerIsUp, setDateTimerIsUp, hourSpecified, setHourSpecified, minuteSpecified, setMinuteSpecified, specifiedTimeInMinutes, setSpecifiedTimeInMinutes}}>
      {props.children}
      </PickerContext.Provider>
    );
  }
// }

export default PickerContextProvider;
