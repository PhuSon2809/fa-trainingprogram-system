import React from "react";
import PropTypes from "prop-types";
import PageHeaderTraining from "~/layouts/components/PageHeaderTraining";

function TrainingProgramLayout({ children }) {
  return (
    <div>
      <PageHeaderTraining />
      {children}
    </div>
  );
}

TrainingProgramLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default TrainingProgramLayout;
