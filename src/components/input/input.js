import { useEffect, useState } from "react";
import "./style.css";
export const Input = (props) => {
  const [val, setValue] = useState(props.value);

  useEffect(() => {
    setValue(props.value)
  }, [props.value]);

  return (
    <input
      onChange={(e) => {
        setValue(e.target.value);
      }}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          props.onValueChange(props.data, {
            [props?.column?.colId]: val,
          });
        }
        if (e.key == "Tab") {
          // document.querySelectorAll("[tabindex='2']")[4].focus();
        }
        // autoTab(e);
      }}
      onBlur={(e) => {
        if (props.data !== val) {
          props.onValueChange(props.data, {
            [props?.column?.colId]: val,
          });
        }
      }}
      tabIndex={props.tabIndex}
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
