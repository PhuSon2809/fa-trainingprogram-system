import React, { useState, useEffect, useRef } from "react";
import HeadlessTippy from "@tippyjs/react/headless";
import classNames from "classnames/bind";
import { useDispatch, useSelector } from "react-redux";
import { SearchIcon } from "~/components/Icons";
import useDebounce from "~/hooks/useDebounce";
import {
  addSyllabusForTP,
  getSyllabusByKeyword,
  setSyllabuses,
} from "~/redux/actions/programSyllabus";
import styles from "./Combobox.scss";

const cx = classNames.bind(styles);

function Combobox() {
  const dispatch = useDispatch();

  const listSyllabus = useSelector((state) => state.programSyllabus.syllabuses);
  const listSyllabusChoose = useSelector(
    (state) => state.programSyllabus.listSyllabusChoose
  );

  console.log(listSyllabus);

  const [searchValue, setSearchValue] = useState("");
  const [showResult, setShowResult] = useState(false);

  const debounceValue = useDebounce(searchValue, 500);

  const inputRef = useRef(null);

  useEffect(() => {
    if (!debounceValue.trim()) {
      dispatch(setSyllabuses([]));
      return;
    }
    dispatch(getSyllabusByKeyword(debounceValue));
  }, [debounceValue]);

  const handleAddSyllabus = (objSyllabus) => {
    let listId = listSyllabusChoose?.map(function (e) {
      return e.id;
    });
    if (!listId.includes(objSyllabus.id)) {
      dispatch(addSyllabusForTP(objSyllabus));
    }
    setSearchValue("");
    inputRef.current.focus();
  };

  const handleHideResult = () => {
    setShowResult(false);
  };

  const handleChange = (e) => {
    const searchValue = e.target.value;
    if (!searchValue.startsWith(" ")) {
      setSearchValue(searchValue);
    }
  };

  return (
    <div>
      <HeadlessTippy
        interactive
        placement="bottom"
        appendTo={() => document.body}
        visible={showResult && listSyllabus?.length > 0}
        render={(attrs) => (
          <div className={cx("search-result")} tabIndex="-1" {...attrs}>
            <div className={cx("box-result")}>
              {listSyllabus?.map((syllabus) => (
                <div key={syllabus.id}>
                  {syllabus.status === "ACTIVE" && (
                    <div
                      className={cx("syllabus-choosen")}
                      onClick={() => handleAddSyllabus(syllabus)}
                    >
                      <span className={cx("syllabus-name")}>
                        {syllabus.name}
                      </span>
                      <div className={cx("syllabus-detail")}>
                        <span>{syllabus.hours}hrs</span>
                        <span>
                          {syllabus.updatedOn?.slice(undefined, 10)} by{" "}
                          <b>{syllabus.nameUpdatedBy}</b>
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
        onClickOutside={handleHideResult}
      >
        <div className={cx("box-select")}>
          <SearchIcon className={cx("search-icon")} />
          <input
            ref={inputRef}
            value={searchValue}
            spellCheck={false}
            onChange={handleChange}
            onFocus={(e) => setShowResult(true)}
            className={cx("input-box")}
            placeholder="Type syllabus"
          />
        </div>
      </HeadlessTippy>
    </div>
  );
}

export default Combobox;
