import React, { useState, useEffect } from "react";
import classNames from "classnames/bind";
import styles from "./ViewSyllabusDetail.module.scss";
// import Syllabus from "./Syllabus";
import SyllabusLayout from "~/layouts/SyllabusLayout";
import SyllabusTabPanels from "./syllabusTabPanels";

import { useDispatch, useSelector } from "react-redux";
import { getSyllabusByID } from "~/redux/actions/syllabusDetail";

const cx = classNames.bind(styles);

const getIDByPathname = (pathname) => {
  const paths = pathname.split("/");
  return paths[paths.length - 1];
};

function SyllabusDetail() {
  const pathnameID = getIDByPathname(window.location.pathname);
  const dispatch = useDispatch();
  const { detail } = useSelector((store) => store.syllabusDetail);

  const [isChanged, setIsChanged] = useState(false);

  useEffect(() => {
    dispatch(getSyllabusByID(pathnameID));
    setIsChanged(false)
  }, [pathnameID, dispatch, isChanged]);

  return (
    <SyllabusLayout detail={detail}>
      <div className={cx("content")}>
        <SyllabusTabPanels detail={detail} setIsChanged={setIsChanged}/>
      </div>
    </SyllabusLayout>
  );
}

export default SyllabusDetail;
