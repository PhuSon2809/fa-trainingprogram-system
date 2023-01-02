import React, { useEffect, useState } from "react";
import moment from "moment";
import Calendar from "react-calendar";
import { useDispatch } from "react-redux";
import { TimelineDayData } from "~/assets/data/TimelineDayData";
import { ArrowLeftBoldIcon, ArrowRightBoldIcon } from "~/components/Icons";
import SettingCalendarLayout from "~/layouts/SettingCalendarLayout";
import { getClassListByDate } from "~/redux/actions/calendar";
import "./CalendarDay.scss";
import Timeline from "./Timeline/Timeline";

function CalendarDay() {
  const dispatch = useDispatch();

  const [date, setDate] = useState(new Date());
  const dateFormat = moment(date).format("yyyy-MM-DD 00:00:00");

  useEffect(() => {
    dispatch(getClassListByDate(dateFormat));
  }, [date]);

  return (
    <SettingCalendarLayout>
      <div className="wrapper-day">
        <div className="inner">
          <Calendar
            calendarType="US"
            prevLabel={<ArrowLeftBoldIcon />}
            nextLabel={<ArrowRightBoldIcon />}
            onChange={setDate}
            value={date}
          />

          <div className="timeline morning">
            <p className="title">
              <span>Morning</span> <span>(7:00 - 12:00)</span>
            </p>
            {TimelineDayData.filter((item) => item.session === "morning").map(
              (timlineItem, index) => (
                <Timeline key={index} date={date} timlineItem={timlineItem} />
              )
            )}
          </div>
          <div className="timeline noon">
            <p className="title">
              <span>Noon</span> <span>(13:00 - 17:00)</span>
            </p>
            {TimelineDayData.filter((item) => item.session === "noon").map(
              (timlineItem, index) => (
                <Timeline key={index} date={date} timlineItem={timlineItem} />
              )
            )}
          </div>
          <div className="timeline night">
            <p className="title">
              <span>Night</span> <span>(18:00 - 22:00)</span>
            </p>
            {TimelineDayData.filter((item) => item.session === "night").map(
              (timlineItem, index) => (
                <Timeline key={index} date={date} timlineItem={timlineItem} />
              )
            )}
          </div>
        </div>
      </div>
    </SettingCalendarLayout>
  );
}

export default CalendarDay;
