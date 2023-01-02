import React, { useState } from "react";
import Tippy from "@tippyjs/react";
import classNames from "classnames/bind";
import PropTypes from "prop-types";
import "tippy.js/dist/tippy.css";
import Button from "~/components/Button";
import { DragIndicatorIcon, FolderIcon, LectureIcon } from "~/components/Icons";
import LabelStatus from "~/components/LabelStatus";
import PopupMaterial from "../PopupMaterial";
import PopupStandard from "../PopupStandard";
import styles from "./MaterialDetail.module.scss";

const cx = classNames.bind(styles);

function MaterialDetail({ lesson }) {
  const [modalOpen, setModalOpen] = useState(false);

  const showModal = () => {
    setModalOpen(!modalOpen);
  };

  return (
    <div className={cx("wrapper")}>
      <div className={cx("inner")}>
        <div className={cx("drag")}>
          <DragIndicatorIcon />
        </div>
        <div className={cx("list-lesson")}>
          <div className={cx("lesson")}>
            <p className={cx("name")}>MVC architectural pattern overview</p>
            <div className={cx("infor")}>
              <PopupStandard>
                <div>
                  <LabelStatus standard>K6SD</LabelStatus>
                </div>
              </PopupStandard>
              <p className={cx("time")}>10mins</p>
              <LabelStatus online>Online</LabelStatus>
              <Tippy content="Senior/Workshop">
                <span className={cx("icon-hover")}>
                  <LectureIcon />
                </span>
              </Tippy>
              <Button
                onClick={showModal}
                className={cx("icon-popup")}
                leftIcon={<FolderIcon />}
              />
            </div>
          </div>

          <div className={cx("lesson")}>
            <p className={cx("name")}>MVC architectural pattern overview</p>
            <div className={cx("infor")}>
              <LabelStatus standard>K6SD</LabelStatus>
              <p className={cx("time")}>10mins</p>
              <LabelStatus online>Online</LabelStatus>
              <Tippy content="Senior/Workshop">
                <span className={cx("icon-hover")}>
                  <LectureIcon />
                </span>
              </Tippy>
              <Button
                className={cx("icon-popup")}
                leftIcon={<FolderIcon />}
              ></Button>
            </div>
          </div>

          <div className={cx("lesson")}>
            <p className={cx("name")}>MVC architectural pattern overview</p>
            <div className={cx("infor")}>
              <LabelStatus standard>K6SD</LabelStatus>
              <p className={cx("time")}>10mins</p>
              <LabelStatus online>Offline</LabelStatus>
              <Tippy content="Senior/Workshop">
                <span className={cx("icon-hover")}>
                  <LectureIcon />
                </span>
              </Tippy>
              <Button className={cx("icon-popup")} leftIcon={<FolderIcon />} />
            </div>
          </div>

          <div className={cx("lesson")}>
            <p className={cx("name")}>MVC architectural pattern overview</p>
            <div className={cx("infor")}>
              <LabelStatus standard>K6SD</LabelStatus>
              <p className={cx("time")}>10mins</p>
              <LabelStatus offline>Offline</LabelStatus>
              <Tippy content="Senior/Workshop">
                <span className={cx("icon-hover")}>
                  <LectureIcon />
                </span>
              </Tippy>
              <Button
                className={cx("icon-popup")}
                leftIcon={<FolderIcon />}
              ></Button>
            </div>
          </div>
        </div>
        <PopupMaterial modalOpen={modalOpen} showModal={showModal} />
      </div>
    </div>
  );
}

MaterialDetail.propTypes = {
  lesson: PropTypes.object,
};

export default MaterialDetail;
