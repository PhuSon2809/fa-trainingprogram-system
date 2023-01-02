import React from "react";
import PropTypes from "prop-types";
import PageHeaderCalendar from "../components/PageHeaderCalendar";

function SettingCalendarLayout({ children }) {
  return (
    <div>
      <PageHeaderCalendar />
      {children}
    </div>
  );
}

SettingCalendarLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default SettingCalendarLayout;
