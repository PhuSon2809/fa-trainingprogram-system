import React, { useState, useRef, useEffect, useCallback } from "react";
import classNames from "classnames/bind";
import {
  SearchOutlined,
  CalendarTwoTone,
  PlusCircleOutlined,
} from "@ant-design/icons";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./datepicker.scss";

import styles from "./SyllabusSearch.module.scss";
import ImportModal from "../ImportModal";
import { useDispatch, useSelector } from "react-redux";
import {
  getListSyllabus,
  getListSyllabusDate,
  getListSyllabusSearch,
  getListSyllabusSuggest,
  setSearchValueSyllabus,
} from "~/redux/actions/syllabusList";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import config from "~/config";
import { Publish } from "@mui/icons-material";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import CircularProgress from "@mui/material/CircularProgress";

const cx = classNames.bind(styles);

function SyllabusSearch({ filter }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Calendar
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();

  // Search
  const [searchValue, setSearchValue] = useState([]);
  const [searchValueSuggest, setSearchValueSuggest] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const { listSuggestSyllabus, syllabusList } = useSelector(
    (store) => store.syllabus
  );
  const [open, setOpen] = useState(false);
  const loading = open && searchValueSuggest.length === 0;

  const onChangeDateHandler = (value) => {
    setStartDate(value[0]);
    setEndDate(value[1]);
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleChange = useCallback(
    () => setIsModalOpen(!isModalOpen),
    [isModalOpen]
  );

  useEffect(() => {
    dispatch(getListSyllabusSuggest("c#"));
  }, []);

  function sleep(delay = 0) {
    return new Promise((resolve) => {
      setTimeout(resolve, delay);
    });
  }

  useEffect(() => {
    let active = true;

    if (!loading) {
      return undefined;
    }

    (async () => {
      await sleep(1e3); // For demo purposes.

      if (active) {
        setSearchValueSuggest(listSuggestSyllabus.data);
      }
    })();

    return () => {
      active = false;
    };
  }, [loading]);

  useEffect(() => {
    if (!open) {
      setSearchValueSuggest([]);
    }
  }, [open]);

  const fetchRequest = async () => {
    if (inputValue) {
      await dispatch(getListSyllabusSuggest(inputValue));
      await setSearchValueSuggest(listSuggestSyllabus.data);
    }
  };

  useEffect(() => {
    fetchRequest(inputValue);
  }, [inputValue]);

  useEffect(() => {
    if (searchValue) {
      dispatch(getListSyllabusSearch(filter, searchValue));
      dispatch(setSearchValueSyllabus(searchValue));
    }
  }, [searchValue]);

  useEffect(() => {
    const start = moment(startDate).format("DD/MM/YYYY");
    const end = moment(endDate).format("DD/MM/YYYY");
    console.log(start, end, filter);
    if (startDate && endDate) {
      dispatch(getListSyllabusDate(filter, start, end));
      return;
    } else {
      dispatch(getListSyllabus(filter));
      return;
    }
  }, [startDate, endDate, filter]);

  return (
    <div className={cx("Wrapper")}>
      <div className={cx("search")}>
        <div>
          <Autocomplete
            multiple
            limitTags={1}
            id="multiple-limit-tags"
            size="small"
            open={open}
            onInputChange={(event, newValue) => {
              setInputValue(newValue);
            }}
            onChange={(event, newValue) => {
              setSearchValue(newValue);
            }}
            loading={loading}
            onOpen={() => {
              setOpen(true);
            }}
            onClose={() => {
              setOpen(false);
            }}
            options={searchValueSuggest}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Search by..."
                InputProps={{
                  ...params.InputProps,
                  endAdornment: (
                    <React.Fragment>
                      {loading ? (
                        <CircularProgress color="inherit" size={20} />
                      ) : null}
                      {params.InputProps.endAdornment}
                    </React.Fragment>
                  ),
                }}
              />
            )}
            sx={{
              width: "300px",
              marginRight: "6px",
              ".css-qzbt6i-MuiButtonBase-root-MuiIconButton-root-MuiAutocomplete-popupIndicator":
                {
                  display: "none",
                },
              ".css-154xyx0-MuiInputBase-root-MuiOutlinedInput-root": {
                borderRadius: "10px",
                padding: "4px",
                paddingLeft: "30px",
              },
              ".css-14s5rfu-MuiFormLabel-root-MuiInputLabel-root": {
                fontSize: "12px",
                marginLeft: "18px",
              },
              ".css-1d3z3hw-MuiOutlinedInput-notchedOutline": {
                borderColor: "rgba(0, 0, 0, 1) ",
              },
              ".css-113ntv0-MuiButtonBase-root-MuiIconButton-root-MuiAutocomplete-popupIndicator":
                {
                  display: "none",
                },
              ".css-1gywuxd-MuiInputBase-root-MuiOutlinedInput-root": {
                paddingRight: "0 !important",
                padding: "4px",
                borderRadius: "10px",
              },
              ".css-1kp1dnc-MuiButtonBase-root-MuiChip-root": {
                marginLeft: "24px",
              },
              ".css-19qh8xo-MuiInputBase-input-MuiOutlinedInput-input": {
                marginLeft: "24px",
              },
              ".css-1pysi21-MuiFormLabel-root-MuiInputLabel-root": {
                paddingLeft: "20px",
              },
            }}
          />
          <span className={cx("search-input-icon")}>
            <SearchOutlined />
          </span>
        </div>

        <div className={cx("calendar")}>
          <DatePicker
            className={cx("datepicker")}
            selectsRange={true}
            startDate={startDate}
            endDate={endDate}
            onChange={onChangeDateHandler}
            dateFormat="dd/MM/yyyy"
            openToDate={new Date()}
            placeholderText="Created date"
            shouldCloseOnSelect={false}
          />
          <CalendarTwoTone
            twoToneColor="#285D9A"
            className={cx("calendar-icon")}
          />
        </div>
      </div>
      <div className={cx("actions-btn")}>
        <ImportModal
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
        />
        <button
          className={cx("add-btn")}
          onClick={() => navigate(config.routes.createSyllabus)}
        >
          <PlusCircleOutlined className={cx("add-icon")} />
          <span>Add Syllabus</span>
        </button>
      </div>
    </div>
  );
}

export default SyllabusSearch;
