import React from "react";
import classNames from "classnames/bind";

import styles from "./SearchValueItem.module.scss";

const cx = classNames.bind(styles);

function SearchValueWrapper({ item, removeSearchTag }) {
  return (
    <main className={cx("Wrapper")}>
      <span className={cx("tag-value")}>
        {item}
        <span className={cx("icon")} onClick={() => removeSearchTag(item)}>
          &times;
        </span>
      </span>
    </main>
  );
}

export default SearchValueWrapper;
