import React, { useState } from 'react';
import './TimeFrame.scss';
import DropdownArrow from '../images/arrow_drop_down_circle.svg';
import CalendarIcon from './calendar_today.svg';
import Calendar from 'react-calendar';
import './Calendar.scss';
import * as moment from 'moment';
import PopupTimeFrame from './PopupTimeFrame';

export default function TimeFrame() {
  const handleDropDown1 = () => {
    // const element = document.getElementById('arrow');
    // element.classList.toggle('arrow');
    setShow(!show);
  };

  const handleClick = (value) => {
    if (value) {
      if (value.toDateString() === currentDay?.toDateString()) {
        setShowPopup(false);
        setCurrentDay(null)
      } else {
        setCurrentDay(value)
        setShowPopup(true);
      }
    } else setShowPopup(false)

  }

  const [show, setShow] = useState(true);
  const [showPopup, setShowPopup] = useState(false)
  const [currentDay, setCurrentDay] = useState(null)
  const [value, setValue] = useState(new Date());
  const [value2, setValue2] = useState(new Date());
  return (
    <div className="container">
      <div className="header">
        <div className="content">
          <div className="time-frame">
            <div className="icon-calendar">
              <img src={CalendarIcon} />
            </div>
            <p>Time frame</p>
            <div className="d-m-y" style={{ color: '#F1F1F1' }}>
              {moment(value).format('DD-MMM-YY')} to {moment(value2).format('DD-MMM-YY')}{' '}
            </div>
          </div>
          <div className="icon-drop-down">
            <img className={show ? '' : 'icon-dropdown'} onClick={handleDropDown1} src={DropdownArrow} />
          </div>
        </div>
      </div>

      {show && (
        <div className="body">
          <div className="first">
            <Calendar
              onChange={setValue}
              value={value}
              calendarType="US"
              prev2Label={null}
              next2Label={null}
              nextLabel={null}
              onClickDay={(value) => handleClick(value)}
            />
          </div>
          <div className="second">
            <Calendar
              onChange={setValue2}
              value={value2}
              calendarType="US"
              prev2Label={null}
              prevLabel={null}
              next2Label={null}
            />
          </div>
        </div>
      )
      }
      {showPopup && <div onClick={() => setShowPopup(false)}>
        <PopupTimeFrame />
        </div>}
    </div >
  );
}
