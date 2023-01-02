import React from "react";
import PropTypes from "prop-types";
import { classData } from "~/assets/data/ClassData";
import ClassInWeek from "../ClassInWeek/ClassInWeek";
import "./TimelineInWeekList.scss";

function TimelineInWeekList({ session }) {
  return (
    <table>
      <tbody>
        <tr className="timelineWeek">
          {session.ranks.map((rank, index) => (
            <td key={index} className="column">
              {classData
                .filter(
                  (i) => i.rank === rank.rank && i.session === session.session
                )
                .map((classItem, index) => (
                  <ClassInWeek key={index} classItem={classItem} />
                ))}
            </td>
          ))}
        </tr>
      </tbody>
    </table>
  );
}

TimelineInWeekList.propTypes = {
  session: PropTypes.object,
};

export default TimelineInWeekList;
