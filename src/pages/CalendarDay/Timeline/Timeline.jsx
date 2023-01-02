import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { classData } from "~/assets/data/ClassData";
import Class from "../Class/Class";
import "./Timeline.scss";
import { useSelector } from "react-redux";

function Timeline({ timlineItem, date }) {
  const listClass = useSelector((state) => state.calendar.classList);
  const classListSearch = useSelector(
    (state) => state.calendar.classListSearch
  );

  const [key, setKey] = useState("");
  const [classList, setClassList] = useState();

  useEffect(() => {
    if (listClass) {
      for (const key in listClass) {
        setKey(key);
        setClassList(listClass[key]);
      }
    }
  }, [date]);

  console.log(classList);

  return (
    <div className="timeline">
      {timlineItem?.times?.map((time, index) => (
        <div key={index} className="line-inner">
          <div className="text-frame">
            <p>{time.show}</p>
          </div>
          {classListSearch ? (
            <div className="class-list">
              {classListSearch
                .filter((i) => i.beginTime === time.time)
                .map((classItem) => (
                  <Class key={classItem.id} classItem={classItem} />
                ))}
            </div>
          ) : null}
          {classList ? (
            <div className="class-list">
              {classList
                .filter((i) => i.beginTime === time.time)
                .map((classItem) => (
                  <Class key={classItem.id} classItem={classItem} />
                ))}
            </div>
          ) : null}
        </div>
      ))}
    </div>
  );
}

Timeline.propTypes = {
  timlineItem: PropTypes.object,
};

export default Timeline;
