import FormData from "form-data";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Modal } from "reactstrap";
import Button from "~/components/Button";
import { importNewProgramSyllabus } from "~/redux/actions/programSyllabus";
import { getFileDownload } from "~/redux/actions/trainingProgram";
import "./ImportModal.scss";

function ImportModal({ modalOpen, showModal }) {
  const dispatch = useDispatch();

  const [selectedFile, setSelectedFile] = useState("");

  const handleImport = () => {
    const newObj = {
      file: selectedFile,
    };
    const formData = new FormData();
    // formData.append("file", selectedFile);
    for (var key in newObj) {
      formData.append(key, newObj[key]);
    }
    dispatch(importNewProgramSyllabus(formData));
    showModal();
  };

  return (
    <>
      <Modal
        contentClassName="import shadow"
        centered
        backdrop="static"
        isOpen={modalOpen}
        toggle={showModal}
      >
        <div className="headerrr">
          <p>Import Training Programs</p>
        </div>
        <div className="content-import">
          <div className="top">
            <div className="right">
              <p className="fw-bolder">Import setting</p>
            </div>
            <div className="left">
              <div className="inner file">
                <div className="title">
                  <p>File (xlsx)*</p>
                </div>
                <Button type="button" primary className="upload-btn">
                  <p>Select</p>
                  <input
                    type="file"
                    name="file"
                    accept=".xlsx"
                    onChange={(e) => setSelectedFile(e.target.files[0])}
                  />
                </Button>
              </div>

              <div className="inner">
                <div className="title">
                  <p>Import template</p>
                </div>
                <a onClick={() => dispatch(getFileDownload())}>Download</a>
              </div>
            </div>
          </div>
          <div className="line"></div>
          <div className="action-btn">
            <Button cancle onClick={showModal} className="cancle-btn">
              Cancel
            </Button>
            <Button primary onClick={() => handleImport()}>
              Import
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default ImportModal;
