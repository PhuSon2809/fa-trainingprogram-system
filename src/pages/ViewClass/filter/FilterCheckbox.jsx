import React from "react";
import "./FilterCheckbox.scss";
const FilterCheckboxComponent = (props) => {
  var fsuName = []
  fsuName = props.values.filter(function (item) {
    return fsuName.includes(item) ? '' : fsuName.push(item)
  })
  return (
    <div className="check_box">
      <div className="title">{props.titleName}</div>

      <div className="select_class">
        {fsuName.map((item, index) => (
          <div key={index} className="select_class_input">
            <input
              type="checkbox"
              name={props.name}
              value={item}
              checked={
                props.filterValue.includes(item.toLowerCase())
              }
              onChange={props.handleFilterChange}
            />{" "}
            <span>{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
export default FilterCheckboxComponent;
