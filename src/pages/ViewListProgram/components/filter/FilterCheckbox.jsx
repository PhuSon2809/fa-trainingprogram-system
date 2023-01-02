import React from "react";
import "./FilterCheckbox.scss";
const FilterCheckboxComponent = (props) => {
  const values = props.values;
  return (
    <div className="checkBox">
      <div className="checkBox_title">{props.titleName}</div>
      <div className="checkBox_box" >
        {values.map((item, index) => (
          <div key={index} >
            <input
              type="checkbox"
              // name={props.name}
              value={item}
              // checked={
              //   props.filterValue.includes(item.toLowerCase())
              // }
              // onChange={props.handleFilterChange}
            />{" "}
            <span>{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
export default FilterCheckboxComponent;
