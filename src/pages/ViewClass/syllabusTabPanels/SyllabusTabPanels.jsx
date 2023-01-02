import React, { useState } from "react";

import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import styled from "styled-components";
import "./SyllabusTabPanels.scss";
import TrainingProgram from "../TrainingProgram/TrainingProgram";

import { datas } from '../Attendee_list/datas';
import { columns } from '../Attendee_list/viewListClassCols'
import { Table } from "antd"

import { columns_Attendance } from "../Attendance/viewListClassCols"
import { datas_Attendance } from "../Attendance/datas"


function SyllabusTabPanels({ detail }) {
  const [tabs, setTab] = useState("General");

  const changleTabHandler = (event, newTab) => {
    setTab(newTab);
  };

  // const { tabs } = props;
  const NewTabContext = styled(TabContext)`
    width: 811px;
    max-height: 30px !important;
  `;
  const NewTabList = styled(TabList)`
    width: 811px;
    max-height: 30px !important;
    min-height: 30px !important;
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  `;
  const NewTab = styled(Tab)`
    width: 200px;
    max-height: 30px;
    padding: 0 !important;

    font-family: "Inter" !important;
    font-style: normal !important;
    color: #ffffff !important;
    text-transform: capitalize !important;
    font-size: 16px !important;
  `;

  return (
    <NewTabContext value={tabs}>
      <NewTabList onChange={changleTabHandler} aria-label="nav tabs example">
        <NewTab className="general" label="Training Progame" value="General" />
        <NewTab className="outline" label="Attendee list" value="Outline" />
        <NewTab className="orthers" label="Budget" value="Others" />
        <NewTab className="xxx" label="Attendance" value="xxx" />

      </NewTabList>
      <TabPanel value="General">
        <TrainingProgram />
      </TabPanel>
      <TabPanel value="Outline">

      <div className="table-container" >
        <Table
          rowKey={"id"}
          columns={columns}
          dataSource={datas}
          pagination={true}
          showSorterTooltip={false}
        />
      </div>

      </TabPanel>
      <TabPanel value="Others">
        <a href="">a</a>
      </TabPanel>

      <TabPanel value="xxx">
      <div className="table-container-attendance" >
        <Table
          rowKey={"id"}
          columns={columns_Attendance}
          dataSource={datas_Attendance}
          pagination={true}
          showSorterTooltip={false}
          
        />
      </div>
      </TabPanel>
    
    </NewTabContext>
  );
}
export default SyllabusTabPanels;
