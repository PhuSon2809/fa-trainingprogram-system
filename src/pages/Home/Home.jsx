import React, { useEffect, useState } from "react";
import classNames from "classnames/bind";
import { useSelector } from "react-redux";
import styles from "./Home.module.scss";

const cx = classNames.bind(styles);

function Home() {
  const account = useSelector((state) => state.account.account);
  const [className, setClassName] = useState("");

  useEffect(() => {
    if (account.role === "Super Admin") {
      setClassName("Super_Admin");
    } else if (account.role === "Class Admin") {
      setClassName("Class_Admin");
    } else if (account.role === "Student") {
      setClassName("Student");
    } else if (account.role === "Trainer") {
      setClassName("Trainer");
    }
  }, [account.role]);

  return (
    <div className={cx("home")}>
      <div className={cx("wrapper", className)}>
        <p className={cx("title")}>{account.fullname}</p>
      </div>
    </div>
  );
}

export default Home;
