import React, { useEffect, useState } from "react";
import { Checkbox, DatePicker, Select } from "antd";
import Button from "~/components/Button";
import {
  ArrowDownCenterIcon,
  CalendarToDayIcon,
  ClearIcon,
} from "~/components/Icons";
import "./PopupFilter.scss";
import { useDispatch } from "react-redux";
import {
  getClassListByFilter,
  getClassLocation,
  getClassStatus,
} from "~/redux/actions/calendar";
import { useSelector } from "react-redux";
import moment from "moment";

const { Option } = Select;

const classTimeOption = ["Morning", "Noon", "Night"];
const attendeeOption = [
  "Intern",
  "Fresher",
  "Online fee-fresher",
  "Offline fee-fresher",
];

function PopupFilter({ modalOpen }) {
  const dispatch = useDispatch();

  const classLocation = useSelector((state) => state.calendar.classLocation);
  const classStatus = useSelector((state) => state.calendar.classStatus);
  const classFsu = useSelector((state) => state.calendar.classFsu);
  const classTrainer = useSelector((state) => state.calendar.classTrainer);

  const [checkClassTime, setCheckClassTime] = useState([]);
  const [checkStatus, setCheckStatus] = useState([]);
  const [checkAttendee, setCheckAttendee] = useState([]);
  const [selectFSU, setSelectFSU] = useState("");
  const [selectTrainer, setSelectTrainer] = useState("");
  const [selectLocation, setSelectLocation] = useState([]);
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");

  const onChangeCheckboxClassTime = (checkedValues) => {
    setCheckClassTime([...checkedValues]);
  };

  const onChangeCheckboxStatus = (checkedValues) => {
    setCheckStatus([...checkedValues]);
  };

  const onChangeCheckboxAttendee = (checkedValues) => {
    setCheckAttendee([...checkedValues]);
  };

  const handleSearch = () => {
    const newObj = {
      keyword: ["react"],
      location: selectLocation,
      status: checkStatus,
      attendee: checkAttendee,
      from: dateFrom ? moment(dateFrom).format("yyyy-MM-DD") : "",
      to: dateTo ? moment(dateTo).format("yyyy-MM-DD") : "",
      classTime: checkClassTime,
      fsu: selectFSU,
      trainer: selectTrainer,
    };

    console.log(newObj);

    dispatch(getClassListByFilter(newObj));
  };

  const handleClear = (e) => {
    setCheckAttendee(e.target.checked ? checkAttendee : []);
    setCheckClassTime(e.target.checked ? checkClassTime : []);
    setCheckStatus(e.target.checked ? checkStatus : []);
    setSelectFSU("");
    setSelectTrainer("");
    setSelectLocation([]);
    setDateFrom("");
    setDateTo("");
  };

  return (
    <>
      {modalOpen && (
        <div className="popupfilter">
          <div className="location-time">
            <div className="location">
              <p className="title">Class location</p>
              <Select
                mode="multiple"
                allowClear
                value={selectLocation}
                onChange={(value) => setSelectLocation(value)}
                suffixIcon={<ArrowDownCenterIcon />}
                clearIcon={<ClearIcon />}
                removeIcon=""
                showArrow="true"
              >
                {classLocation.map((location) => (
                  <Option key={location.id} value={location.name}>
                    {location.name}
                  </Option>
                ))}
              </Select>
            </div>
            <div className="time">
              <p className="title">Class time frame</p>
              <div className="from-to">
                <div className="from">
                  <p>from</p>
                  <input
                    value={dateFrom}
                    type="date"
                    placeholder="--/--/----"
                    name="StartDate"
                    onChange={(e) => setDateFrom(e.target.value)}
                  />
                </div>
                <div className="to">
                  <p>to</p>
                  <input
                    value={dateTo}
                    type="date"
                    name="endDate"
                    placeholder="--/--/----"
                    onChange={(e) => setDateTo(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="check-box">
            <div className="classtime">
              <p className="title">Class time</p>
              <Checkbox.Group
                value={checkClassTime}
                onChange={onChangeCheckboxClassTime}
              >
                {classTimeOption.map((classtime, index) => (
                  <Checkbox key={index} value={classtime}>
                    {classtime}
                  </Checkbox>
                ))}
              </Checkbox.Group>
            </div>
            <div className="status">
              <p className="title">Status</p>
              <Checkbox.Group
                value={checkStatus}
                onChange={onChangeCheckboxStatus}
              >
                {classStatus.map((status) => (
                  <Checkbox key={status.id} value={status.name}>
                    {status.name}
                  </Checkbox>
                ))}
              </Checkbox.Group>
            </div>
            <div className="attend">
              <p className="title">Attendee</p>
              <Checkbox.Group
                value={checkAttendee}
                onChange={onChangeCheckboxAttendee}
              >
                {attendeeOption.map((attendee, index) => (
                  <Checkbox key={index} value={attendee}>
                    {attendee}
                  </Checkbox>
                ))}
              </Checkbox.Group>
            </div>
          </div>

          <div className="select-list">
            <div className="FSU">
              <p className="title">FSU</p>
              <Select
                fieldNames="fsu"
                value={selectFSU}
                className="select"
                suffixIcon={<ArrowDownCenterIcon />}
                onChange={(value) => setSelectFSU(value)}
              >
                {classFsu?.map((fsu) => (
                  <Option key={fsu.id} value={fsu.name}>
                    {fsu.name}
                  </Option>
                ))}
              </Select>
            </div>
            <div className="trainer">
              <p className="title">Trainer</p>
              <Select
                fieldNames="trainer"
                value={selectTrainer}
                className="select"
                suffixIcon={<ArrowDownCenterIcon />}
                onChange={(value) => setSelectTrainer(value)}
              >
                {classTrainer?.map((trainer, index) => (
                  <Option key={index} value={trainer}>
                    {trainer}
                  </Option>
                ))}
              </Select>
            </div>
          </div>

          <div className="button">
            <Button clear onClick={handleClear}>
              Clear
            </Button>
            <Button className="search-btn" primary onClick={handleSearch}>
              Search
            </Button>
          </div>
        </div>
      )}
    </>
  );
}

export default PopupFilter;
