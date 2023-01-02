import React from "react";
import PropTypes from "prop-types";
import HeaderSyllabus from "~/components/HeaderSyllabus";

function SyllabusLayout({ children, detail }) {
  return (
    <div>
      <HeaderSyllabus detail={detail}/>
      {children}
    </div>
  );
}

SyllabusLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default SyllabusLayout;
