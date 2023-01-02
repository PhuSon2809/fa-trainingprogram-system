import React from "react";
import FilterCheckboxComponent from "./FilterCheckbox";
// import { datas } from '../../../../assets/data/TrainingProgramData'
import "./FilterCheckbox.scss";

const FilterComponent = (props) => {
  // const handleSearchFilter = () => {
  //     const filterTable = props.data.filter((o) =>
  //         Object.keys(o).some((k) =>
  //             props.filterValues.includes(String(o[k]).toLowerCase())
  //         )
  //     );
  //     props.handleFilterCallback([...filterTable]);
  //     // props.handleOpenFilter();
  // };

  // const handleClearFilter = () => {
  //     props.setFilterValues([]);
  //     props.handleFilterCallback([...props.dataSource]);
  // };

  const handleFilterChange = (e) => {
    const val = e.target.value.toLowerCase();
    props.filterValues.includes(val)
      ? props.setFilterValues(
          props.filterValues.filter((prev) => !prev.includes(val))
        )
      : props.setFilterValues((prev) => [...prev, val]);
  };

  return (
    <>
      <div style={{ display: "flex", gap: "20px" }}>
        <FilterCheckboxComponent
          filterValue={props.filterValues}
          handleFilterChange={handleFilterChange}
          titleName={"Status"}
          // name="status"
          values={["Active", "Inactive"]}
        />
      </div>
      <div className="savingBtn">
        <button
          className="clear"
          // onClick={handleClearFilter}
        >
          Clear
        </button>
        <button
          className="search"
          // onClick={handleSearchFilter}
        >
          Search
        </button>
      </div>
    </>
  );
};
export default FilterComponent;
