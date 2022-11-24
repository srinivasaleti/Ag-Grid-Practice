import { useState } from "react";
import "./style.css";
export const Input = (props) => {
  const [val, setValue] = useState(props.value);

  return (
    <input
      onChange={(e) => {
        setValue(e.target.value);
      }}
      // onKeyDown={(e) => {
      //   if (e.key === "Enter") {
      //     props.onValueChange(carContext.data, props.data, {
      //       [props?.column?.colId]: val,
      //     });
      //   }
      // }}
      onBlur={(e) => {
        props.onValueChange(props.data, {
          [props?.column?.colId]: val,
        });
      }}
      placeholder={props.placeholder}
      style={{
        width: "inherit",
        height: "inherit",
        border: "0px",
        outline: "none",
      }}
      type={props.type}
      value={val}
    />
  );
};
