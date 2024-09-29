import React from "react";
import DatePicker from "react-multi-date-picker";

const MultiDateSelector = () => {
  const [values, setValues] = React.useState([]);

  const handleChange = (date) => {
    setValues(date);
  };

  return (
    <div>
      <DatePicker value={values} onChange={handleChange} multiple />
      <div>
        Selected Dates:{" "}
        {values.map((date) => date.format("YYYY-MM-DD")).join(", ")}
      </div>
    </div>
  );
};

export default MultiDateSelector;
