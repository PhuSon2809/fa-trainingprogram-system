import React, { useState } from "react";
import SyllabusOutline from "../syllabusOutline";
import SyllabusGeneral from "../syllabusGeneral/SyllabusGeneral";
import SyllabusOthers from "../syllabusOthers/SyllabusOthers";

import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import styled from "styled-components";
import "./SyllabusTabPanels.scss";

function SyllabusTabPanels({ detail, setIsChanged }) {
  const [tabs, setTab] = useState("General");

  const changleTabHandler = (event, newTab) => {
    setTab(newTab);
  };

  // const { tabs } = props;
  const NewTabContext = styled(TabContext)`
    width: 600px;
    max-height: 30px !important;
  `;
  const NewTabList = styled(TabList)`
    width: 600px;
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
        <NewTab className="general" label="General" value="General" />
        <NewTab className="outline" label="Outline" value="Outline" />
        <NewTab className="orthers" label="Others" value="Others" />
      </NewTabList>
      <TabPanel value="General">
        <SyllabusGeneral detail={detail} />
      </TabPanel>
      <TabPanel value="Outline">
        <SyllabusOutline detail={detail} setIsChanged={setIsChanged}/>
      </TabPanel>
      <TabPanel value="Others">
        <SyllabusOthers detail={detail} />
      </TabPanel>
    </NewTabContext>
  );
}
export default SyllabusTabPanels;
