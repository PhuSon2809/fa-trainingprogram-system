import React from "react";

const FsuSelect = (props)=>{
  var fsuName = []
  fsuName = props.data.filter(function (item) {
    return fsuName.includes(item) ? '' : fsuName.push(item)
  })

    return(
        <div className="col_1">
          <div className={props.titleName}>{props.titleName.toUpperCase()}</div>
          <div className="box">
            <select
              name=""
              id=""
              placeholder="select"
              defaultValue=""
              onChange={props.handleFilterChange}
            >
              <option value=""></option>
              {fsuName.map((item,key)=>(<option key={key} value={item}>{item}</option>))}
            </select>
          </div>
        </div>
    )
}
export default FsuSelect;