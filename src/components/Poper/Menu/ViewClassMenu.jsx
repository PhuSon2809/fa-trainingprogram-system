import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames/bind";
import styles from "./ViewClassMenu.module.scss";
import HeadlessTippy from "@tippyjs/react/headless";
import Poper from "~/components/Poper";
import { PoperMenuData } from "~/assets/data/PoperTrainingClassData";
import Button from "~/components/Button";
import axios from "axios";
import { responsiveArray } from "antd/lib/_util/responsiveObserve";
import { useState } from "react";
import { useFetcher } from "react-router-dom";

const cx = classNames.bind(styles);
function ViewClassMenu({ children, data }) {
  const [classList, setClassList] = useState([]);

  const renderResult = (attrs) => (
    <div className={cx("wrapper")} tabIndex="-1" {...attrs}>
      <Poper className={cx("poper")}>
        <div className={cx("action-list")}>
          {PoperMenuData.map((item, index) => (
            <Button
              className={cx("select-button", { gray: item.color })}
              key={index}
              leftIcon={item.icon}
              onClick={async function actionClass() {
                if (item.title === "Duplicate class") {
                  console.log(data);
                  await axios
                    .post(`/training_class/classes/duplicate/${data.id}`, {
                      courseCode: data.id,
                    })
                    .then((res) => {
                      console.log("success", res.data);
                    })
                    .catch(() => {
                      console.log("err");
                    });
                }
                if (item.title === "Edit Class") {
                  console.log("edit");
                  // await axios
                  //   .put(`/training_class/classes/duplicate/${data.id}`, {
                  //     courseCode: data.id,
                  //   })
                  //   .then((res) => {
                  //     console.log("success", res.data);
                  //   })
                  //   .catch(() => {
                  //     console.log("err");
                  //   });
                }
                if (item.title === "Delete class") {
                  // console.log(data);
                  // await axios
                  //   .put(`/training_class/classes/duplicate/${data.id}`, {
                  //     courseCode: data.id,
                  //   })
                  //   .then((res) => {
                  //     console.log("success", res.data);
                  //   })
                  //   .catch(() => {
                  //     console.log("err");
                  //   });
                  console.log("delete");
                }
              }}
            >
              {item.title}
            </Button>
          ))}
        </div>
      </Poper>
    </div>
  );

  return (
    <HeadlessTippy
      interactive
      trigger="click"
      delay={[0, 0]}
      offset={[10, -3]}
      placement="bottom-end"
      hideOnClick
      render={renderResult}
    >
      {children}
    </HeadlessTippy>
  );
}

ViewClassMenu.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ViewClassMenu;
