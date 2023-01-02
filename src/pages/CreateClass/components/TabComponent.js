import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import React from "react";

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}
function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}
export default function TabComponent() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Box sx={{ width: "100%", marginTop: "30px" }}>
      <Box>
        <Tabs
          value={value}
          onChange={handleChange}
          sx={{
            "& .MuiTabs-indicator": {
              backgroundColor: "transparent",
            },
            "& .MuiTab-root": {
              border: "1px solid",
              borderRadius: "22px 22px 0px 0px",
              margin: "0px -6px",
              padding: "0px",
              minHeight: "30px",
              width: "230px",
              backgroundColor: "rgb(108, 115, 126)",
              color: "rgba(255, 255, 255, 0.7)",
            },
            "& .Mui-selected": {
              color: "rgb(255, 255, 255)",
              backgroundColor: "#6D7684",
              zIndex: 100,
              outline: "none",
            },
          }}
        >
          <Tab label="Training Program" {...a11yProps(0)} />
          <Tab label="Attendee list" {...a11yProps(1)} />
          <Tab label="Budget" {...a11yProps(2)} />
          <Tab label="Other" {...a11yProps(3)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        Item One
      </TabPanel>
      <TabPanel value={value} index={1}>
        Item Two
      </TabPanel>
      <TabPanel value={value} index={2}>
        Item Three
      </TabPanel>
      <TabPanel value={value} index={3}>
        Item Four
      </TabPanel>
    </Box>
  );
}
TabPanel.propTypes = {
  children: PropTypes.node.isRequired,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};
