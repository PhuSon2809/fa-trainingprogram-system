import React from "react";
import classNames from "classnames/bind";
import styles from "./HeaderSyllabus.module.scss";
import LabelStatus from "../LabelStatus";
import { MoreHorizontalIcon } from "../Icons";
import SyllabusDetail from "../Poper/SyllabusDetail";

import { dateFormatter } from "~/utils/dateFormatter";

const cx = classNames.bind(styles);



function HeaderSyllabus({ detail }) {
  return (
    <div className={cx("wrapper")}>
      <div className={cx("page-header")}>
        <p className={cx("title")}>Syllabus</p>
        <div className={cx("content")}>
          <div className={cx("box")}>
            <p className={cx("name")}>
              {detail ? detail.data?.name : ""}
            </p>
            <LabelStatus deleted={(detail.data?.status==="DELETED")} active={(detail.data?.status==="ACTIVE")} inactive={(detail.data?.status==="DEACTIVE")}>
              {detail ? detail.data?.status : ""}
            </LabelStatus>
          </div>

          <SyllabusDetail>
            <div>
              <MoreHorizontalIcon className={cx("more-btn")} />
            </div>
          </SyllabusDetail>
        </div>
        <p className={cx("name-title")}>
          {detail ? detail.data?.code : ""}&nbsp;
          {detail ? detail.data?.version: ""}
        </p>
      </div>

      <div className={cx("meta-data")}>
        <div className={cx("time")}>
          <p className={cx("days")}>
            <span className={cx("number")}>
              {detail ? detail.data?.days : ""}
            </span>
            <span className={cx("day")}> days</span>
          </p>
          <p className={cx("hour")}>
            {detail ? detail.data?.hours : ""} hours
          </p>
        </div>
        <p className={cx("modifi")}>
          Modified on <i>{detail ? dateFormatter(detail.data?.updatedDate) : ""}</i>{" "}
          by <strong>{detail ? (detail.data?.updatedByUser?.fullname||detail.data?.createdByUser?.fullname) : ""}</strong>
        </p>
      </div>
    </div>
  );
}

export default HeaderSyllabus;
