import React, { Fragment, useState, useEffect } from "react";

import { datas } from "./datas";
import { Table } from "antd";
// import "antd/dist/antd.css";
import { FilterIcon, CreateIcon } from "~/components/Icons";
import FilterComponent from "./filter/FilterComponents";
import useClickOutSide from "~/hooks/useClickOutside";
import Button from "~/components/Button";
import { columns } from "./viewListClassCols";
import Tags from "./components/Tags";
import axios from "axios";

import { useNavigate } from "react-router-dom";
import config from "~/config";
import "./viewClass.scss";

function ViewClass() {
  const [value, setValue] = useState("");
  const [data, setData] = useState([]);
  const [tableFilter, setTableFilter] = useState(data);
  const [searchTable, setSearchTable] = useState(data);

  // const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    if (data) {
      setSearchTable(data);
      setTableFilter(data);
    }
  }, [data]);
  const {
    show: openFilter,
    setShow: setOpenFilter,
    nodeRef: filterRef,
  } = useClickOutSide();
  useEffect(() => {
    async function fetchData() {
      const response = await axios.get("/training_class/viewClass");
      if (response.data) {
        setData(response.data);
      }
    }
    fetchData();
  }, []);
  // console.log(data);
  useEffect(() => {
    setSearchTable(tableFilter);
  }, [tableFilter]);

  const handleSearch = (e) => {
    setValue(e.target.value);
    if (e.target.value !== "") {
      setValue(e.target.value);
      const filterTable = data.filter((o) =>
        Object.keys(o).some((k) =>
          String(o[k]).toLowerCase().includes(e.target.value.toLowerCase())
        )
      );
      setTableFilter([...filterTable]);
    } else {
      setValue(e.target.value);
      setData([...data]);
    }
  };
  const [filterValues, setFilterValues] = useState([]);

  const handleRemoveTag = (e) => {
    const filter = filterValues.filter((o) => o !== e);
    setFilterValues(filter);
    const filterTable = searchTable.filter((o) =>
      Object.keys(o).some((k) => filter.includes(String(o[k]).toLowerCase()))
    );
    if (filterTable.length === 0) {
      setSearchTable([...data]);
    } else {
      setSearchTable([...filterTable]);
    }
  };

  const handleOpenFilter = () => {
    setOpenFilter(!openFilter);
  };
  return (
    <Fragment>
      <div className="header">Training Class</div>
      <section className="action">
        <div className="search_filter">
          <input
            type="text"
            value={value}
            onChange={handleSearch}
            placeholder="Search by..."
          />
          <div className="filterWrapper" ref={filterRef}>
            <Button onClick={handleOpenFilter} leftIcon={<FilterIcon />}>
              Filter
            </Button>
            {openFilter && (
              <div className="filterPopip">
                <FilterComponent
                  data={data}
                  dataSource={data}
                  handleFilterCallback={setSearchTable}
                  handleOpenFilter={handleOpenFilter}
                  filterValues={filterValues}
                  setFilterValues={setFilterValues}
                />
              </div>
            )}
          </div>
        </div>

        <Button
          className={"btn-create"}
          leftIcon={<CreateIcon />}
          onClick={() => navigate(config.routes.creatClass)}
        >
          Create Class
        </Button>
      </section>
      <div className="tag">
        {filterValues.map((o, i) => (
          <Tags
            onClick={() => {
              handleRemoveTag(o);
            }}
            className="search_keyword"
            key={i}
          >
            {o} <p>&times;</p>{" "}
          </Tags>
        ))}
      </div>

      <div className="table-container">
        <Table
          rowKey={"id"}
          columns={columns}
          dataSource={searchTable}
          pagination={
            value.length > 0
              ? false
              : {
                  defaultPageSize: 10,
                  showSizeChanger: true,
                  pageSizeOptions: ["10", "20", "30"],
                  position: ["bottomCenter"],
                }
          }
          showSorterTooltip={true}
        />
      </div>
    </Fragment>
  );
}

export default ViewClass;
