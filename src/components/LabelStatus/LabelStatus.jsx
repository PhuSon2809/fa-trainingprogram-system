import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames/bind";
import styles from "./LabelStatus.module.scss";

const cx = classNames.bind(styles);

function LabelStatus({
  active = false,
  inactive = false,
  deleted = false, 
  draft = false, 
  standard = false,
  online = false,
  offline = false,
  children,
  className,
  flagClass
}) {
  let Comp = "label";

  const classes = cx("wrapper", {
    [className]: className,
    active,
    inactive,
    deleted, 
    draft, 
    standard,
    online,
    offline,
    flagClass
  });

  return <Comp className={classes}>{children}</Comp>;
}

LabelStatus.propTypes = {
  active: PropTypes.bool,
  inactive: PropTypes.bool,
  deleted: PropTypes.bool,
  draft: PropTypes.bool,
  standard: PropTypes.bool,
  online: PropTypes.bool,
  offline: PropTypes.bool,
  children: PropTypes.node,
  className: PropTypes.string,
};

export default LabelStatus;
