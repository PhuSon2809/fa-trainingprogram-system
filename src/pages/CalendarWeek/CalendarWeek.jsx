import React, { useState } from "react";
import Calendar from "react-calendar";
import { TimelineWeekData } from "~/assets/data/TimelineWeekData";
import { ArrowLeftBoldIcon, ArrowRightBoldIcon } from "~/components/Icons";
import SettingCalendarLayout from "~/layouts/SettingCalendarLayout";
import TimelineInWeekList from "./TimelineInWeekList/TimelineInWeekList";
import "./CalendarWeek.scss";

function CalendarWeek() {
  const [date, setDate] = useState(new Date());

  return (
    <SettingCalendarLayout>
      <div className="wrapper-week">
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
              <span>Morning</span> <span>(8:00 - 12:00)</span>
            </p>
            {TimelineWeekData.filter((item) => item.session === "morning").map(
              (session, index) => (
                <TimelineInWeekList key={index} session={session} />
              )
            )}
          </div>
          <div className="timeline noon">
            <p className="title">
              <span>Noon</span> <span>(13:00 - 17:00)</span>
            </p>
            {TimelineWeekData.filter((item) => item.session === "noon").map(
              (session, index) => (
                <TimelineInWeekList key={index} session={session} />
              )
            )}
          </div>
          <div className="timeline night">
            <p className="title">
              <span>Night</span> <span>(18:00 - 22:00)</span>
            </p>
            {TimelineWeekData.filter((item) => item.session === "night").map(
              (session, index) => (
                <TimelineInWeekList key={index} session={session} />
              )
            )}
          </div>
        </div>
      </div>
    </SettingCalendarLayout>
  );
}

export default CalendarWeek;
