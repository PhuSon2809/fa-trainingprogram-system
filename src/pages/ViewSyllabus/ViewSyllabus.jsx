import React, { useEffect, useState } from "react";
import styles from "./ViewSyllabus.module.scss";
import classNames from "classnames/bind";

import SyllabusSearch from "./SyllabusSearch";
import ImportModal from "./ImportModal";
import SyllabusTable from "./SyllabusTable";
import { Pagination } from "~/components/Pagination";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { getListSyllabus } from "~/redux/actions/syllabusList";

const cx = classNames.bind(styles);

function ViewSyllabus() {
  const dispatch = useDispatch();
  const { syllabusList } = useSelector((store) => store.syllabus);
  const [filter, setFilters] = useState({ page: 1, size: 10 });
  const handlePageChange = (e, page) => {
    if (page) {
      setFilters((prevFilters) => ({
        ...prevFilters,
        page: page,
      }));
    }
  };

  const handlePageSizeChange = (e, size) => {
    if (size) {
      setFilters((prevFilters) => ({ ...prevFilters, size: size.props.value }));
    }
  };

  return (
    <main className={cx("inner")}>
      <header className={cx("syllabus-header")}>
        <h2>Syllabus</h2>
      </header>
      <div className={cx("syllabus-search")}>
        <SyllabusSearch filter={filter} />
      </div>
      <div className="syllabus-table">
        <SyllabusTable
          syllabusList={syllabusList?.data}
          filter={filter}
          handlePageSizeChange={handlePageSizeChange}
        />
        <Pagination
          filter={filter}
          handlePageChange={handlePageChange}
          pagination={syllabusList?.pagination}
        />
      </div>
    </main>
  );
}

export default ViewSyllabus;
