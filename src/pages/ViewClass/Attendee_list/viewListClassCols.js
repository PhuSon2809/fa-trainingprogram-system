import Tags from "./Tags";

// import ViewClassMenu from "~/components/Poper/Menu/ViewClassMenu";

import classNames from "classnames/bind";

import styles from './AttendeeList.scss'

import { Link } from "react-router-dom";

import { MdSort } from "react-icons/md";

// import { MoreHorizontalIcon } from "~/components/Icons";

const cx = classNames.bind(styles);
export const columns = [
  {
    title: "ID",
    icons: <MdSort />,
    dataIndex: "ID",
    sorter: (a, b) => a.ID.localeCompare(b.ID),
  },
  {
    title: "Fullname",
    dataIndex: "trainingProgram",
    sorter: (a, b) => a.trainingProgram.localeCompare(b.trainingProgram),
    render: (text, data) => (
      <Link className="classCode_link" to={`/class/view_class/${data.id}`}>
        {text}
      </Link>
    ),
  },
  {
    title: "Attended",
    dataIndex: "duration",
    sorter: (a, b) => a.duration.localeCompare(b.duration),
  },
  
  {
    title: "Created by",
    dataIndex: "location",
    sorter: (a, b) => a.location.localeCompare(b.location),
  },
  {
    title: "Status",
    dataIndex: "attendee",
    render: (text) => {
      let className;
      switch (text.toLowerCase()) {
        case "inactive":
          className = "inactive";
          break;
        case "active":
          className = "active";
          break;
        default:
          break;
      }
      return <Tags className={className}>{text}</Tags>;
    },
    sorter: (a, b) => a.attendee.localeCompare(b.attendee),
  },
];

