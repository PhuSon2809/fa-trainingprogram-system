import React from "react";
import FilterCheckboxComponent from "./FilterCheckbox";
import FsuSelect from "./FsuSelect";
const FilterComponent = (props) => {
  const handleSearchFilter = () => {
    const filterTable = props.data.filter((o) =>
      Object.keys(o).some((k) =>
        props.filterValues.includes(String(o[k]).toLowerCase())
      )
    );
    if(filterTable.length!==0){props.handleFilterCallback([...filterTable]);}
    props.handleOpenFilter();
  };
  const handleClearFilter = () => {
    props.setFilterValues([]);
    props.handleFilterCallback([...props.dataSource]);
  };
  const handleFilterChange = (e) => {
    const val = e.target.value.toLowerCase();
    props.filterValues.includes(val)
      ? props.setFilterValues(
          props.filterValues.filter((prev) => !prev.includes(val))
        )
      : props.setFilterValues((prev) => [...prev, val]);
  };
  var fsuLocation = []
  fsuLocation = props.data.map((item)=>item.location).filter(function (item) {
    return fsuLocation.includes(item) ? '' : fsuLocation.push(item)
  })
  const handleDate = (e) =>{
    var date = ([]);
    if (e.target.name.toLowerCase() === "StartDate".toLowerCase()){
      date = (props.data.filter((o)=> new Date(o.startDate) > new Date(e.target.value)))
    }else
    if (e.target.name.toLowerCase() === "endDate".toLowerCase()){
      date = (props.data.filter((o)=> new Date(o.startDate) < new Date(e.target.value)))
    }else
      date = (props.data.filter((o)=> new Date(o.startDate) > new Date(e.target.value) && new Date(o.startDate) < new Date(e.target.value)))
    if(date.length !==0){props.handleFilterCallback([...date]);}
  }
  return (
    <div>
      <div className="filterOne">
        <div className="location">
          <div className="location_name">Class location</div>

          <div className="location_box">
            <select
              name=""
              id=""
              placeholder="select"
              onChange={handleFilterChange}
            >
              <option></option>
              {fsuLocation.map((item,key)=>(<option key={key} value={item}>{item}</option>))}
            </select>
          </div>
        </div>

        <div className="classTime">
          <div className="classTime_name">Class time frame</div>

          <div className="classTime_box">
            <div className="from">
              <p>from</p>
              <input type="date" name="StartDate" id="" onChange={handleDate} />
            </div>

            <div className="to">
              <p>to</p>
              <input type="date" name="endDate" id="" onChange={handleDate} />
            </div>
          </div>
        </div>
      </div>

      <div className="filterTwo">
        <FilterCheckboxComponent
          filterValue={props.filterValues}
          handleFilterChange={handleFilterChange}
          titleName={"ClassTime"}
          name="classTime"
          values={[]}
        />

        <FilterCheckboxComponent
          filterValue={props.filterValues}
          handleFilterChange={handleFilterChange}
          titleName={"Status"}
          name="status"
          values={props.data.map((item)=>item.status)}
        />

        <FilterCheckboxComponent
          filterValue={props.filterValues}
          handleFilterChange={handleFilterChange}
          titleName={"Attendee"}
          name="attendee"
          values={props.data.map((item)=>item.attendee)}
        />
      </div>

      <div className="filterThree">
        <FsuSelect
        data={props.data.map((item)=>item.fsu)}
        filterValue={props.filterValues}
        handleFilterChange={handleFilterChange}
        titleName="fsu"
        />
        <FsuSelect
        data={[]}
        filterValue={props.filterValues}
        handleFilterChange={handleFilterChange}
        titleName="traine"
        />
      </div>

      <div className="filterFour">
        <button className="clear" onClick={handleClearFilter}>
          Clear
        </button>
        <button className="search" onClick={handleSearchFilter}>
          Search
        </button>
      </div>
    </div>
  );
};
export default FilterComponent;
