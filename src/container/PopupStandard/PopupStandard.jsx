import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames/bind";
import HeadlessTippy from "@tippyjs/react/headless";
import PoperHeader from "~/components/Poper/PoperHeader";
import Poper from "~/components/Poper";
import styles from "./PopupStandard.module.scss";

const cx = classNames.bind(styles);

function PopupStandard({ children, hideOnClick = false, outputStandard }) {
  const renderResult = (attrs) => (
    <div className={cx("wrapper")} tabIndex="-1" {...attrs}>
      <Poper className={cx("menu-wrapper")}>
        <PoperHeader className={cx("title")}>{outputStandard.name}</PoperHeader>
        <p className={cx("content")}>{outputStandard.description}</p>
      </Poper>
    </div>
  );

  return (
    <div>
      <HeadlessTippy
      // visible
        interactive
        delay={[0, 100]}
        hideOnClick={hideOnClick}
        render={renderResult}
      >
        {children}
      </HeadlessTippy>
    </div>
  );
}

PopupStandard.propTypes = {
  children: PropTypes.node.isRequired,
  hideOnClick: PropTypes.bool,
};

export default PopupStandard;
