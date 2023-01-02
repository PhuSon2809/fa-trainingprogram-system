import Tags from "./components/Tags";

import ViewClassMenu from "../../components/Poper/Menu/ViewClassMenu";

import classNames from "classnames/bind";

import styles from "../../components/HeaderSyllabus";

import { Link } from "react-router-dom";
import { MoreHorizontalIcon } from "~/components/Icons";

const cx = classNames.bind(styles);
export const columns = [
  {
    title: "Class Code",
    dataIndex: "courseCode",
    render: (text, data) => (
      <Link className="classCode_link" to={`/class/view_class/${data.id}`}>
        {text}
      </Link>
    ),
    sorter: (a, b) => a.courseCode.localeCompare(b.courseCode),
  },
  {
    title: "Training Program",
    dataIndex: "trainingProgram",
    sorter: (a, b) => a.trainingProgram.localeCompare(b.trainingProgram),
  },
  {
    title: "Start Date",
    dataIndex: "startDate",
    sorter: (a, b) => a.startDate.localeCompare(b.startDate),
  },
  {
    title: "End date",
    dataIndex: "endDate",
    sorter: (a, b) => a.endDate.localeCompare(b.endDate),
  },
  // {
  //   title: "Current Module",
  //   dataIndex: "currentModule",
  //   render: (text) => <p style={{ fontWeight: "500" }}>{text}</p>,
  //   // sorter: (a, b) => a.currentModule.localeCompare(b.currentModule),
  // },
  {
    title: "Duration",
    dataIndex: "duration",
    sorter: (a, b) => a.duration - b.duration,
    render: (day) => <p>{day} days</p>,
  },
  {
    title: "Attendee",
    dataIndex: "attendee",
    // render: (text) => {
    //   let className;
    //   switch (text.toLowerCase()) {
    //     case "intern":
    //       className = "intern";
    //       break;
    //     case "online fee-fresher":
    //       className = "ol_fresher";
    //       break;
    //     case "offline fee-fresher":
    //       className = "of_fresher";
    //       break;
    //     case "fresher":
    //       className = "fresher";
    //       break;
    //     default:
    //       break;
    //   }
    //   return <Tags className={className}>{text}</Tags>;
    // },
    sorter: (a, b) => a.attendee.localeCompare(b.attendee),
  },

  {
    title: "Location",
    dataIndex: "location",
    sorter: (a, b) => a.location.localeCompare(b.location),
  },
  {
    title: "FSU",
    dataIndex: "fsu",
    sorter: (a, b) => a.fsu.localeCompare(b.fsu),
  },
  {
    title: "",
    dataIndex: "",
    render: (data) => (
      <ViewClassMenu data={data}>
        <div>
          <MoreHorizontalIcon className={cx("more-btn")} />
        </div>
      </ViewClassMenu>
    ),
  },
];
