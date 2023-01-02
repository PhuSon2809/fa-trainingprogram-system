import { useState } from "react";
import { ArrowDownIcon } from "~/components/Icons";
import { Modal, Select, Upload, Checkbox, Radio, Divider } from "antd";
import { Button }  from '../Button';
import "./viewClass.scss"; 
import IconImport from "../images/publish.svg";

const { Option } = Select;

function ImportUserModal() {

  const [importValue, setImportValue] = useState({
    encodeType: '',
    columnSeparator: '',
    duplicateHandle :'',
    scans: [

    ],
  })
  console.log(importValue)

  const optionsEncodingType = [
    { value: "0", label: "Auto detect" },
    { value: "1", label: "1" },
    { value: "2", label: "2" },
  ];
  const optionsColumnSeperator = [
    { value: "0", label: "Comma" },
    { value: "1", label: "1" },
    { value: "2", label: "2" },
  ];

  const renderEncodingType = () => {
    return (
      <Select
        defaultValue="0"
        style={{ width: 120 }}
        onChange={handleEncodingTypeChange}
        suffixIcon={<ArrowDownIcon />}
      >
        {optionsEncodingType.map((option, index) => {
          return (
            <Option key={index} value={option.value}>
              {option.label}
            </Option>
          );
        })}
      </Select>
    );
  };

  const renderColumnSeperator = () => {
    return (
      <Select
        defaultValue="0"
        style={{ width: 120 }}
        onChange={handleColumnSeperatorChange}
        suffixIcon={<ArrowDownIcon />}
      >
        {optionsColumnSeperator.map((option, index) => {
          return (
            <Option key={index} value={option.value}>
              {option.label}
            </Option>
          );
        })}
      </Select>
    );
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };
  //Modal
  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  //File

  //Encoding Type
  const handleEncodingTypeChange = (encodeType) => {
    setImportValue({
      ...importValue,
      encodeType
    })
  };

  //Column seperator
  const handleColumnSeperatorChange = (columnSeparator) => {
    // console.log(`selected ${value}`);
    setImportValue({
      ...importValue,
      columnSeparator
    })
  };

  //Import template

  //Scanning
  const onScanningChange = (scans) => {
    // console.log(`checked = ${scans.target.checked}`);
    // if(scans.target.checked){
    // setImportValue({
    //   ...importValue,
    //   scans: []
    // })}
    console.log(scans.target.checked)
  };

  //duplicate handle
  const [value, setValue] = useState(1);

  const onDuplicateChange = (e,duplicateHandle) => {
    console.log("radio checked", duplicateHandle.target.value);
    setValue(e.target.value);
  };

  return (
    <>
      <Button className="btn-orange" onclick={showModal}>
        <img className="icon-btn" src={IconImport} alt="" />
        <p className="content-btn">Import</p>
      </Button>
      <Modal
        title="Import Users"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        closable={false}
        width={500}
        okText={"Import"}
      >
        <div className="row modal-import-content">
          <div className="col-4">
            <p className="fw-bolder">Import setting</p>
          </div>
          <div className="col-4 p-0 ">
            <p>File (csv)<span style={{color: "red"}}>*</span></p>
            <p>Encoding type</p>
            <p>Column seperator</p>
            <p>Import template</p>
          </div>
          <div className="col-4 p-0">
            <div className="input input-file">
              <Upload
                action={"http://localhost:3000/"}
                accept=".pdf"
                multiple
                showUploadList={{ showRemoveIcon: false }}
              >
                <Button className="btn-blue select" onclick={showModal}>
                  <p className="content-btn" style={{paddingTop: "14px"}}>
                    Select
                  </p>
                </Button>
              </Upload>
            </div>
            <div className="input input-select">{renderEncodingType()}</div>
            <div className="input input-select">{renderColumnSeperator()}</div>
            <div className="input input-download text-decoration-underline">
              <a href="/images/myw3schoolsimage.jpg" download>
                Download
              </a>
            </div>
          </div>
          <Divider />
          <div className="col-4">
            <p className="fw-bolder">Duplicate control</p>
          </div>
          <div className="col-8">
            <div className="scanning">
              <p>Scanning</p>
              <div className="input checkBox">
                <Checkbox name="fullname" onChange={onScanningChange}>Full name</Checkbox>
                <Checkbox name="email" onChange={onScanningChange}>User email</Checkbox>
              </div>
            </div>
            <div className="duplicate-handle">
              <p>Duplicate handle</p>
              <div className=" input radio">
                <Radio.Group onChange={onDuplicateChange} value={value}>
                  <Radio value={1}>Allow</Radio>
                  <Radio value={2}>Replace</Radio>
                  <Radio value={3}>Skip</Radio>
                </Radio.Group>
              </div>
            </div>
          </div>
        </div>
        <Divider />
      </Modal>
    </>
  );
}

export default ImportUserModal;
