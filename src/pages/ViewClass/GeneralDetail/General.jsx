import React, { useState } from 'react'
import classNames from "classnames/bind";
import styles from "./General.module.scss";
import { DropDownIcon, GeneralIcon, ClassTimeIcon, LocationIcon, LectureIcon, StartCircle, StarIcon, WarningIcon } from "~/components/Icons";
// import DropdownArrow from './arrow_drop_down_circle.svg';
// import { faStar } from '@fortawesome/free-regular-svg-icons'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import ReactLogo from '../images/arrow_drop_down_circle.svg'

const cx = classNames.bind(styles);

const generalList =
{
    classTime: [
        {
            time: '09:00 - 12:00',
        }
    ],
    locations: [
        {
            id: "1",
            location: 'Ftown2'
        },
        {
            id: "2",
            location: 'Ftown1'
        }
    ],
    trainers: [
        {
            name: 'Dinh Vu Quoc Trung',
        },
        {
            name: 'Ba Chu heo',
        },
        {
            name: 'Hu Cheo Ba',
        },
        {
            name: 'Tap The Lop',
        },
    ],
    admin: [
        {
            name: 'Ly Lien Lien Dung',
        },
        {
            name: 'Dung Lien Lien Ly',
        },
    ],
    code: [
        {
            name: 'FHM',
        },
        {
            name: 'BaCH@fsoft.com.vn',
        },
    ],
    footer_general: [{
        created: '25/03/2022 by DanPL',
        review: '30/03/2022 by TrungDVQ',
        approve: '02/04/2022 by VongNT',
    }]
};

function General() {

    const handleDropDown = () => {
        setShow(!show)
    };
    const [show, setShow] = useState(true);

    return (
        <div className={cx("layout")}>
            <div className={cx("general")}>
                <div className={cx("general-top")}>
                    <div className={cx("top-main")}>
                        <div className={cx("general-title")}>
                            <div className={cx("general-calender")}>
                                <span className={cx("general-btn")}><GeneralIcon /></span>
                            </div>
                            <p className={cx("general-font")}>General</p>
                        </div>
                        <div className="icon-drop-down">
                            <img className={show ? '' : 'icon-dropdown'} onClick={handleDropDown} src={ReactLogo} />
                        </div>
                    </div>
                </div>

                {show && (
                    <div className={cx("general-detail")}>
                        <div className={cx("detail-classTime")}>
                            {generalList.classTime.map((classTime, index) => {
                                return (
                                    <>
                                        <div className={cx("classTime")}>
                                            {index === 0 ? <div className={cx("clock-icon")}><ClassTimeIcon /></div> : <div></div>}
                                            {index === 0 ? <div className={cx("classTime-title")}>Class Time</div> : <div></div>}
                                        </div>
                                        <div className={cx("time")}>
                                            {classTime.time}
                                        </div>
                                    </>
                                )
                            })}
                        </div>

                        <div className={cx("detail-location")}>
                            {generalList.locations.map((location, index) => {
                                return (
                                    <div className={cx("location-line1")}>
                                        <div className={cx("line1-detail")}>
                                            {index === 0 ? <div className={cx("trainer-iconn")}><LocationIcon /></div> : <div></div>}
                                            {index === 0 ? <div className={cx("location-title")}>Location</div> : <div></div>}
                                        </div>
                                        <span className={cx("line1-place")}>{location.location}</span>
                                    </div>
                                )
                            })}
                        </div>

                        <div className={cx("detail-trainer")}>
                            {generalList.trainers.map((trainer, index) => {
                                return (
                                    <div className={cx("line1-trainer")}>
                                        <div className={cx("line1-detail")}>
                                            <div className={cx("layout-trainer")}>
                                                {index === 0 ? <div className={cx("trainer-icon")}><LectureIcon /></div> : <div></div>}
                                                {index === 0 ? <div className={cx("trainer-title")}>Trainer</div> : <div></div>}
                                            </div>

                                            <div className={cx("line1-name")}>
                                                <div className={cx("name-trainer")}>
                                                    {trainer.name}
                                                </div>
                                                <WarningIcon />
                                            </div>

                                        </div>
                                    </div>
                                )
                            })}
                        </div>

                        <div className={cx("detail-admin")}>
                            {generalList.admin.map((admin, index) => {
                                return (
                                    <div className={cx("line1-admin")}>
                                        <div className={cx("admin-detail")}>
                                            <div className={cx("layout-admin")}>
                                                {index === 0 ? <div className={cx("trainer-icon")}><StarIcon /></div> : <div></div>}
                                                {index === 0 ? <div className={cx("admin-title")}>Admin</div> : <div></div>}
                                            </div>
                                            <div className={cx("admin-name")}>
                                                <div className={cx("adminer")}>
                                                    {admin.name}
                                                </div>
                                                    <WarningIcon />
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>

                        <div className={cx("detail-fsu")}>
                            {generalList.code.map((code, index) => {
                                return (
                                    <div className={cx("fsu-line1")}>

                                        <div className={cx("fsu-main")}>
                                            <div className={cx("fsu-detail")}>
                                                {index === 0 ? <div className={cx("fsu-icon")}><StartCircle /></div> : <div></div>}
                                                {index === 0 ? <div className={cx("fsu-title")}>FSU</div> : <div></div>}
                                            </div>
                                            <div className={cx("line1-fhm")}>{code.name}</div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>

                        <div className={cx("create")}>
                            {generalList.footer_general.map((footer_general, index) => {
                                return (
                                    <>
                                        <div className={cx("create-detail")}>
                                            {index === 0 ? <div className={cx("create-title")}>Created</div> : <div></div>}
                                        </div>
                                    <div className={cx("create-date")}>{footer_general.created}</div>
                                    </>
                                )
                            })}
                        </div>
                        <div className={cx("create")}>
                            {generalList.footer_general.map((footer_general, index) => {
                                return (
                                    <>
                                        <div className={cx("create-detail")}>
                                            {index === 0 ? <div className={cx("create-title")}>Review</div> : <div></div>}
                                        </div>
                                    <div className={cx("create-date")}>{footer_general.review}</div>
                                    </>
                                )
                            })}
                        </div>
                        <div className={cx("create")}>
                            {generalList.footer_general.map((footer_general, index) => {
                                return (
                                    <>
                                        <div className={cx("create-detail")}>
                                            {index === 0 ? <div className={cx("create-title")}>Approve</div> : <div></div>}
                                        </div>
                                    <div className={cx("create-date")}>{footer_general.approve}</div>
                                    </>
                                )
                            })}
                        </div>
                    </div>
                )}
            </div>
        </div>

    );
};

export default General;