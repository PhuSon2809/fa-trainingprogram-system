import React, { useState } from 'react'
import './Attendee.scss'
import { faStar } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import ReactLogo from '../images/arrow_drop_down_circle.svg'

const data_Header = [
  {
    header_class: 'Attendee-header-title-attendee',
    title_attendee: 'Attendee',
    icon: <FontAwesomeIcon className='icon-star' icon={faStar} />
  },
  {
    header_class: 'Attendee-header-title-fresher',
    title_fresher: 'Fresher'
  },
];

const data_Container = [
  {
    container_title: 'Planned',
    container_number: 10,
    container_class: 'container-planned',
    container_class_FontWord: 'planned',
    container_class_FontNumber: 'planned-number'
  },
  {
    container_title: 'Accepted',
    container_number: 9,
    container_class: 'container-accepted',
    container_class_FontWord: 'accepted',
    container_class_FontNumber: 'accepted-number'
  },
  {
    container_title: 'Actual',
    container_number: 9,
    container_class: 'container-actual',
    container_class_FontWord: 'actual',
    container_class_FontNumber: 'actual-number'
  }
]

export default function Attendee() {

  const handleDropDown = () => {
    setShow(!show)
  };

  const [show, setShow] = useState(true);
  // const [showAttendee, setShowAttendee] = useState([]);


  const listItems_Header = data_Header.map((data_Header, index) =>
    <div key={index} className={data_Header.header_class}>
      {data_Header.title_fresher}
      {data_Header.icon}
      <p>{data_Header.title_attendee}</p>
    </div>
  );

  const listItems_Container = data_Container.map((data_Container, index) => 
    <div key={index} className={data_Container.container_class}>
      <span className={data_Container.container_class_FontWord}>{data_Container.container_title}</span>
      <p className={data_Container.container_class_FontNumber}>{data_Container.container_number}</p>
    </div>
  );

  return (
    <div className='Attendee'>
      <div className='Attendee-header'>
        <div className='Attendee-header-title'>
          {listItems_Header}
        </div>
        <img  className={ show ? '' : 'icon-dropdown' } onClick={handleDropDown} src={ReactLogo} />
      </div>

      {
        show &&
        <div className='Attendee-container'>
          {listItems_Container}
        </div>
      }
    </div>
  )
}
