import React from "react";
import PropTypes from "prop-types";
import Footer from "../components/Footer";
import Header from "../components/Header";

function HeaderFooterOnly({ children }) {
  return (
    <div>
      <Header />
      <div className="containers">
        <div className="content">{children}</div>
      </div>
      <Footer />
    </div>
  );
}

HeaderFooterOnly.propTypes = {
  children: PropTypes.node.isRequired,
}

export default HeaderFooterOnly;
