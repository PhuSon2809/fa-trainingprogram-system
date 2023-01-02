import React from "react";
import PropTypes from "prop-types";
import PageHeader from "~/components/PageHeaderClass";

function ViewClassLayout({ children }) {
  return (
    <div>
      <PageHeader name="View Class"/>
      {children}
    </div>
  );
}

ViewClassLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ViewClassLayout;
