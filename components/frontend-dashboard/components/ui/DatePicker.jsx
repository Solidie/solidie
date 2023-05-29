import { DatePicker } from "antd";
import React from "react";

const InputDatePicker = React.forwardRef((props, ref) => (
  <DatePicker {...props} className={"Input " + props.className} pickerRef={ref} />
));

export default InputDatePicker;
