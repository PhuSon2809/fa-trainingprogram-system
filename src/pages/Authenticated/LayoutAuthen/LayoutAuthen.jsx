import React from "react";
import PropTypes from "prop-types";
import { HeaderFooterOnly } from "~/layouts";
import "./LayoutAuthen.scss";

function LayoutAuthen({ children }) {
  return (
    <HeaderFooterOnly>
      <div className="layoutAuthen-ui">{children}</div>
    </HeaderFooterOnly>
  );
}

LayoutAuthen.propTypes = {
  children: PropTypes.node.isRequired,
};

export default LayoutAuthen;
