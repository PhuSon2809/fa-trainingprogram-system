import React from "react";
import classNames from "classnames/bind";
import { Link } from "react-router-dom";
import styles from "./TrainingProgram.module.scss";
import LabelStatus from "~/components/LabelStatus";
import config from "~/config";

const cx = classNames.bind(styles);

const programList = [
  {
    name: 'Linux',
    code: 'LIN v2.0',
    length: '4 days (12 hours)',
    day: '23/07/2022',
    creater: 'Johny Deep',
    status: true
  },
  {
    name: 'AWS Basic',
    code: 'AWB v1.0',
    length: '7 days (21 hours)',
    day: '23/07/2022',
    creater: 'Warrior Tran',
    status: true
  },
  {
    name: 'Docker',
    code: 'DOC v1.5',
    length: '3 days (12 hours)',
    day: '23/07/2022',
    creater: 'Warrior Tran',
    status: true
  },
  {
    name: 'Kubernetes',
    code: 'KUB v1.5',
    length: '6 days (18 hours)',
    day: '23/07/2022',
    creater: 'Ba Chu Heo',
    status: true
  },
  {
    name: 'DevOps_ CICD',
    code: 'DEC v2',
    length: '8 days (24 hours)',
    day: '23/07/2022',
    creater: 'Ba Chu Heo',
    status: true
  },
  {
    name: 'Mock Project',
    code: 'MOC v2.5',
    length: '3 days (12 hours)',
    day: '23/07/2022',
    creater: 'Ba Chu Heo',
    status: false
  },
  {
    name: 'Field Trip',
    code: '    ',
    length: '1 day (5 hours)',
    day: '23/07/2022',
    creater: 'Ba Chu Heo',
    status: true
  },

  
];

function TrainingProgram() {
  return (
    <div>
      <Link to={config.routes.viewProgramDetail} className={cx("training-program")}>
        <div className={cx("training-program-title")}>
          <p>DevOps Foundation</p>
        </div>
        <div className={cx("training-program-meta")}>
          <span>31 days (97 hours)</span>
          <span>|</span>
          <span>
            Modified on <i>23/07/2022</i> by Warrior Tran
          </span>
        </div>
      </Link>
      {programList.map(program => (
              <Link to={config.routes.viewProgramDetail} className={cx("syllabus")}>
              <div className={cx("program-mem")}>
                <img src="https://scontent.fsgn2-1.fna.fbcdn.net/v/t1.6435-9/116445398_1234730980214996_1849654018096645042_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=174925&_nc_ohc=6itNAjC8fggAX9BCzoL&_nc_ht=scontent.fsgn2-1.fna&oh=00_AfBwy-sRiT_BVsy3lUPV0itJXakbvssdsL8K-DzSdJwTpw&oe=63994B0B" />
                <img src="https://scontent.fsgn2-1.fna.fbcdn.net/v/t1.6435-1/107824245_1724392601052843_761700661131380499_n.jpg?stp=dst-jpg_p480x480&_nc_cat=107&ccb=1-7&_nc_sid=7206a8&_nc_ohc=HEBNiu2nuuUAX_HkBIT&_nc_ht=scontent.fsgn2-1.fna&oh=00_AT9o12oYsNHmcpAk4YxdqODVE8sRYdGiq1lPbQ5oEv2V-A&oe=637B965B" />
              </div>
              <div className={cx("program-content")}>
                <div className={cx("program-name")}>
                  <p>{program.name}</p>
                  
                  {program.status ? <LabelStatus active >Active</LabelStatus> : <LabelStatus inactive >Inactive</LabelStatus> }
                </div>
                <div className={cx("syllabus-meta")}>
                  <span>{program.code}</span>
                  <span>|</span>
                  <span>{program.length}</span>
                  <span>|</span>
                  <span>
                    Modified on <i>{program.day}</i> by {program.creater}
                  </span>
                </div>
              </div>
      
            </Link>
      ))}
    </div>

  );
}

export default TrainingProgram;