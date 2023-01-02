import React, { useEffect, useRef, useState } from "react";
import classNames from "classnames/bind";
import { usePopper } from "react-popper";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import {
  ClearIcon,
  FilterListIcon,
  SearchIcon,
  WarningIcon,
} from "~/components/Icons";
import config from "~/config";
import PopupFilter from "~/container/PopupFilter";
import {
  getClassCalendarByKeyword,
  getClassFSU,
  getClassLocation,
  getClassStatus,
  getClassTrainer,
  setClassList,
  setClassListByKeyword,
  setSearchValueKey,
} from "~/redux/actions/calendar";
import styles from "./PageHeaderCalendar.module.scss";
import useDebounce from "~/hooks/useDebounce";

const cx = classNames.bind(styles);

function PageHeaderCalendar() {
  const dispatch = useDispatch();

  const popupRef = useRef();
  const filterButtonRef = useRef();

  const { styles, attributes } = usePopper(
    filterButtonRef.current,
    popupRef.current,
    {
      placement: "bottom-start",
    }
  );

  const [modalOpen, setModalOpen] = useState(false);

  const showModal = () => {
    setModalOpen(!modalOpen);
    dispatch(getClassLocation());
    dispatch(getClassStatus());
    dispatch(getClassFSU());
    dispatch(getClassTrainer());
  };

  const [searchValue, setSearchValue] = useState("");

  const debounceValue = useDebounce(searchValue, 500);

  useEffect(() => {
    if (!debounceValue.trim()) {
      dispatch(setClassListByKeyword([]));
      return;
    }
    dispatch(getClassCalendarByKeyword(debounceValue));
  }, [debounceValue]);

  const handleChange = (e) => {
    const searchValue = e.target.value;
    if (!searchValue.startsWith(" ")) {
      setSearchValue(searchValue);
      dispatch(setSearchValueKey(searchValue))
    }
  };

  return (
    <div className={cx("wrapper")}>
      <div className={cx("page-header")}>
        <div className={cx("inner")}>
          <p className={cx("title")}>Training Calendar</p>
          <WarningIcon />
        </div>
      </div>
      <div className={cx("search-box")}>
        <div className={cx("search-input")}>
          <span
            className={cx("search-btn")}
            onMouseDown={(e) => e.preventDefault()}
          >
            <SearchIcon />
          </span>
          <input
            placeholder="Search by..."
            value={searchValue}
            spellCheck={false}
            onChange={handleChange}
          />
        </div>
        <div className={cx("filter-wrapper")}>
          <button
            ref={filterButtonRef}
            className={cx("filter-btn")}
            onClick={showModal}
          >
            <FilterListIcon />
            Filter
          </button>
          <div
            className={cx("popup", { "popup-hide": !modalOpen })}
            ref={popupRef}
            style={styles.popper}
            {...attributes.popper}
          >
            <PopupFilter modalOpen={modalOpen} showModal={showModal} />
          </div>
        </div>
      </div>

      <div className={cx("search-tag")}>
        <div className={cx("tag-name")}>
          <p>Ho Chi Minh</p>
          <ClearIcon />
        </div>
        <div className={cx("tag-name")}>
          <p>Ho Chi Minh</p>
          <ClearIcon />
        </div>
      </div>

      <div className={cx("nav-tab")}>
        <div className={cx("inner")}>
          <NavLink
            className={(nav) => cx("tab", { active: nav.isActive })}
            to={config.routes.calendarDay}
          >
            Day
          </NavLink>
          <NavLink
            className={(nav) => cx("tab", { active: nav.isActive })}
            to={config.routes.calendarWeek}
          >
            Week
          </NavLink>
          <NavLink
            className={(nav) => cx("tab", "hide", { active: nav.isActive })}
            to={config.routes.calendarWeek}
          >
            Month
          </NavLink>
          <NavLink
            className={(nav) => cx("tab", "hide", { active: nav.isActive })}
            to={config.routes.calendarWeek}
          >
            Year
          </NavLink>
        </div>
      </div>
    </div>
  );
}

export default PageHeaderCalendar;
