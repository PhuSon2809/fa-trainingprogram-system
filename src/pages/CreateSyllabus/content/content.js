import React, { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import { NewTab, NewTabContext, NewTabList } from "./styleContent";
import TabPanel from "@mui/lab/TabPanel";
import "quill/dist/quill.snow.css";
import "./content.scss";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import { Input } from "antd";
import TimeAllocation from "./timeAllocation/timeAllocation";
import { useDispatch, useSelector } from "react-redux";
import {
  getDelivery,
  getLevel,
  getOutputStandard,
} from "~/redux/actions/createSyllabus";
import PieChart from "./timeAllocation/PieChart";
import { VerifiedUserIcon } from "../../../components/Icons/Icon";

var tabArr = [];
var unitArr = [];

var Days = [];

function Content(props) {
  const dispatch = useDispatch();
  const { tabs, handleSubmit, handleSaveAsDraft, click } = props;

  const [name, setSyllabusName] = useState("");
  const [code, setCode] = useState("");
  const version = "1.0";
  const [syllabusLevel, setSyllabusLevel] = useState(
    "1d69a686-936e-4004-96f1-c22770cb6b4c"
  );
  const [attendeeNumber, setAttendeeNumber] = useState(0);
  const [technicalRequirement, setTechnicalReq] = useState("");
  const [courseObjective, setCourseObj] = useState({
    courseObjective: "",
    name: "courseObjective",
  });
  const [TabArray, setTabArray] = useState(swapDataToTabarr(Days));
  const [UnitArray, setUnitArray] = useState(swapDataToUnitarr(Days));
  const [syllabusDays, setSyllabusDays] = useState(
    swapData(Days, TabArray, UnitArray)
  );
  const [type, setType] = useState("Test/Quiz");
  const [Model, setModel] = useState(<div class={`model hidden`}></div>);
  const [quiz, setQuiz] = useState("0%");
  const [assignment, setAssignment] = useState("0%");
  const [final, setFinal] = useState("0%");
  const [finalTheory, setFinalTheory] = useState("0%");
  const [finalPractice, setFinalPractice] = useState("0%");
  const [GPA, setGPA] = useState("0%");
  const [errors, setErrors] = useState({ name: "", value: "", error: "" });
  const [trainees, setTrainees] = useState("");
  const [trainer, setTrainer] = useState("");
  const [training, setTraining] = useState("");
  const [re_test, setRe_test] = useState("");
  const [marking, setMarking] = useState("");
  const [waiverCriteria, setWaiverCriteria] = useState("");
  const [others, setOthers] = useState("");
  const modules = {
    toolbar: [
      [{ font: [] }],
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ color: [] }, { background: [] }],
      ["blockquote", "code-block"],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ indent: "-1" }, { indent: "+1" }, { align: [] }],
      ["link", "image", "video"],
      ["clean"],
    ],
  };

  useEffect(() => {
    dispatch(getLevel());
    dispatch(getDelivery());
    dispatch(getOutputStandard());
  }, []);
  const listLevel = useSelector((state) => state.syllabus.level);
  const listDelivery = useSelector((state) => state.syllabus.delivery);
  const listOutputStandard = useSelector(
    (state) => state.syllabus.outputStandard
  );
  const handleCrouseObjChange = (html) => {
    setCourseObj({ courseObjective: html, name: "courseObjective" });
  };

  const handleTraineesChange = (html) => {
    setTrainees({
      trainees: html,
      name: "trainees",
    });
  };
  const handleTrainerChange = (html) => {
    setTrainer({
      trainer: html,
      name: "trainer",
    });
  };
  const handleTrainingChange = (html) => {
    setTraining({
      training: html,
      name: "training",
    });
  };
  const handleRe_testChange = (html) => {
    setRe_test({
      re_test: html,
      name: "re_test",
    });
  };
  const handleMarkingChange = (html) => {
    setMarking({
      marking: html,
      name: "marking",
    });
  };
  const handleWaiverCriteriaChange = (html) => {
    setWaiverCriteria({
      waiverCriteria: html,
      name: "waiverCriteria",
    });
  };
  const handleOthersChange = (html) => {
    setOthers({
      others: html,
      name: "others",
    });
  };
  const newQuiz = quiz.slice(0, quiz.lastIndexOf());
  const newAssignment = assignment.slice(0, assignment.lastIndexOf());
  const newFinal = final.slice(0, final.lastIndexOf());
  const newFinalTheory = finalTheory.slice(0, finalTheory.lastIndexOf());
  const newFinalPractice = finalPractice.slice(0, finalPractice.lastIndexOf());
  const newGPA = GPA.slice(0, GPA.lastIndexOf());

  const newObj = {
    name: name,
    code: code,
    version: version,
    attendeeNumber: attendeeNumber,
    technicalRequirement: technicalRequirement,
    courseObjective: `${courseObjective.courseObjective}`,
    days: "0",
    hours: "0",
    status: 0,
    template: "true",
    createdBy: "",
    createdDate: "",
    updatedBy: "",
    updatedDate: "",
    assessmentScheme: {
      quiz: newQuiz,
      assignment: newAssignment,
      finalPoint: newFinal,
      finalTheory: newFinalTheory,
      finalPractice: newFinalPractice,
      gpa: newGPA,
    },
    syllabusLevel: {
      id: syllabusLevel,
      name: "",
    },
    deliveryPrinciple: {
      trainees: `${trainees.trainees}`,
      trainer: `${trainer.trainer}`,
      training: `${training.training}`,
      re_test: `${re_test.re_test}`,
      marking: `${marking.marking}`,
      waiverCriteria: `${waiverCriteria.waiverCriteria}`,
      others: `${others.others}`,
    },
    syllabusDays: syllabusDays,
  };

  const handleValidation = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    const error = { name: name, value: value, error: "" };
    setErrors(error);
    // console.log(error);
    // console.log(value);
    switch (name) {
      case "name":
        if (!value.length > 0) {
          setErrors({
            name: name,
            value: value,
            error: "Please input name of syllabus",
          });
        } else {
          setErrors("");
        }
        break;
      case "technicalRequirement":
        if (!value.length > 0) {
          setErrors({
            name: name,
            value: value,
            error: "Please input technical requirement",
          });
        } else {
          setErrors("");
        }
        break;
      case "quiz":
        if (value === "%") {
          setErrors({
            name: name,
            value: value,
            error: "Please input quiz percent",
          });
        } else {
          setErrors("");
        }
        break;
      case "assignment":
        if (value === "%") {
          setErrors({
            name: name,
            value: value,
            error: "Please input assignment percent",
          });
        } else {
          setErrors("");
        }
        break;
      case "final":
        if (value === "%") {
          setErrors({
            name: name,
            value: value,
            error: "Please input final percent",
          });
        } else {
          setErrors("");
        }
        break;
      case "finalTheory":
        if (value === "%") {
          setErrors({
            name: name,
            value: value,
            error: "Please input finalTheory percent",
          });
        } else {
          setErrors("");
        }
        break;
      case "finalPractice":
        if (value === "%") {
          setErrors({
            name: name,
            value: value,
            error: "Please input finalPractice percent",
          });
        } else {
          setErrors("");
        }
        break;
      case "GPA":
        if (value === "%") {
          setErrors({
            name: name,
            value: value,
            error: "Please input GPA percent",
          });
        } else {
          setErrors("");
        }
        break;
      default:
        break;
    }
  };

  function swapDataToTabarr(arr) {
    let newArray = [];

    arr.forEach((day) => {
      if (day.syllabusUnits.length === 0) {
        newArray.push({
          day: day.dayNo,
          tabDisplay: "default",
        });
      } else {
        day.syllabusUnits.forEach((unit) => {
          let tabNumber = 1;
          unit.syllabusUnitChapters.forEach((tab) => {
            newArray.push({
              day: day.dayNo,
              unit: unit.unitNo,
              tab: tabNumber++,
              tabName: tab.name,
              tabTime: tab.duration,
              tabStatus: tab.online,
              tabType: tab.deliveryType.id,
              tabDisplay: "default",
              outputStandard: tab.outputStandard.id,
            });
          });
        });
      }
    });

    return newArray;
  }

  function swapDataToUnitarr(arr) {
    let newArray = [];

    arr.forEach((day) => {
      day.syllabusUnits.forEach((unit) => {
        newArray.push({
          day: day.dayNo,
          unit: unit.unitNo,
          name: unit.name,
          unitDisplay: "default",
        });
      });
    });

    return newArray;
  }

  function RenderDay(
    arr1,
    arr2,
    type,
    setTabArray,
    setUnitArray,
    setType,
    setModel
  ) {
    const tmpArr = [];
    arr1.forEach((element) => {
      if (!tmpArr.includes(element.day)) tmpArr.push(element.day);
    });
    return (
      <div className="Outline_container_dayPack">
        {tmpArr.map((day, index) => {
          return React.createElement(
            "div",
            {
              class: "Outline_container_dayPack_day",
            },
            React.createElement(
              "div",
              {
                class: `dayPack_day_header `,
                onClick: () => displayHidden(day),
              },
              React.createElement(
                "div",
                {
                  class: `dayPack_day_header_content`,
                },
                "Day " + day,
                React.createElement(
                  "div",
                  {
                    class: `dayPack_day_header_content_delDay dayPack_day_header_content_delDay_${day}`,
                    onClick: () =>
                      setModel(
                        delDayModel(
                          setModel,
                          arr1,
                          arr2,
                          day,
                          setTabArray,
                          setUnitArray
                        )
                      ),
                    // delDay(arr1, arr2, day, setTabArray, setUnitArray)
                  },
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                  >
                    <path
                      d="M5 9V11H15V9H5ZM10 0C4.48 0 0 4.48 0 10C0 15.52 4.48 20 10 20C15.52 20 20 15.52 20 10C20 4.48 15.52 0 10 0ZM10 18C5.59 18 2 14.41 2 10C2 5.59 5.59 2 10 2C14.41 2 18 5.59 18 10C18 14.41 14.41 18 10 18Z"
                      fill="#E74A3B"
                    />
                  </svg>
                )
              )
            ),
            renderUnit(
              arr1,
              arr2,
              day,
              setTabArray,
              setUnitArray,
              type,
              setType,
              setModel
            ),
            React.createElement(
              "div",
              {
                class: `dayPack_day_addButton day_${day} hidden`,
                onClick: () => {
                  setTabArray(addUnit(arr1, arr2, day, setUnitArray));
                },
              },
              <div class="dayPack_day_addButton-content">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <g clip-path="url(#clip0_20_148)">
                    <path
                      d="M13 7H11V11H7V13H11V17H13V13H17V11H13V7ZM12 2C6.49 2 2 6.49 2 12C2 17.51 6.49 22 12 22C17.51 22 22 17.51 22 12C22 6.49 17.51 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20Z"
                      fill="#285D9A"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_20_148">
                      <rect width="24" height="24" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
                Add unit
              </div>
            )
          );
        })}
      </div>
    );
  }

  function renderUnit(
    arr1,
    arr2,
    day,
    setTabArray,
    setUnitArray,
    type,
    setType,
    setModel
  ) {
    const tmpArr = [];
    const tmpArr2 = [];
    const tmpArr3 = [];

    arr1.forEach((element) => {
      if (typeof element.unit != "undefined" && element.day === day) {
        if (!tmpArr3.includes(element.unit)) {
          tmpArr.push({ day: element.day, unit: element.unit });
          tmpArr3.push(element.unit);
        }
      }
    });

    return arr1.map((element, index) => {
      if (element.day === day && !tmpArr2.includes(element.day)) {
        if (!tmpArr2.includes(element.day)) {
          tmpArr2.push(element.day);
        }
        return React.createElement(
          "div",
          {
            class: `daypack_day_unit day_${day} hidden`,
          },
          tmpArr.map((unit, index) => {
            return (
              <div class="daypack_day_border">
                {React.createElement(
                  "div",
                  {
                    class: `unit_header`,
                  },
                  React.createElement(
                    "div",
                    {
                      class: `unit_header_number unit_${unit.unit}`,
                    },
                    React.createElement(
                      "p",
                      {
                        class: "headerUnitNumber",
                      },
                      "Unit" + unit.unit
                    )
                  ),
                  React.createElement(
                    "div",
                    {
                      class: `unit_header_infor unit_header_infor_day_${unit.day}_unit_${unit.unit}`,
                    },
                    renderUnitHeader(arr1, arr2, day, unit.unit, setUnitArray)
                  )
                )}
                {RenderTab(
                  arr1,
                  unit.day,
                  unit.unit,
                  setTabArray,
                  type,
                  setType,
                  setModel
                )}
                {React.createElement(
                  "div",
                  {
                    class: `infor_tab_addButton day_${unit.day}_unit_${unit.unit}`,
                  },
                  React.createElement(
                    "div",
                    {
                      class: `infor_tab_addButton_content addButton_content_day_${unit.day}_unit_${unit.unit}`,
                      onClick: () =>
                        setTabArray(addTab(arr1, unit.day, unit.unit)),
                    },
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="28"
                      height="28"
                      viewBox="0 0 28 28"
                      fill="none"
                    >
                      <rect width="28" height="28" rx="14" fill="#2D3748" />
                      <g clip-path="url(#clip0_1173_19783)">
                        <path
                          d="M15 9H13V13H9V15H13V19H15V15H19V13H15V9ZM14 4C8.49 4 4 8.49 4 14C4 19.51 8.49 24 14 24C19.51 24 24 19.51 24 14C24 8.49 19.51 4 14 4ZM14 22C9.59 22 6 18.41 6 14C6 9.59 9.59 6 14 6C18.41 6 22 9.59 22 14C22 18.41 18.41 22 14 22Z"
                          fill="#F1F1F1"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_1173_19783">
                          <rect
                            width="24"
                            height="24"
                            fill="white"
                            transform="translate(2 2)"
                          />
                        </clipPath>
                      </defs>
                    </svg>
                  )
                )}
              </div>
            );
          })
        );
      }
    });
  }

  function handleDeliverySelect(e) {
    let text = e.target.options[e.target.selectedIndex].text;
    // let value = e.target.value;
    setType(text);
  }

  function RenderTab(array, day, unit, setTabArray, type, setType, setModel) {
    return array.map((tab, index) => {
      if (
        tab.day === day &&
        tab.unit === unit &&
        tab.tabDisplay === "default"
      ) {
        return React.createElement(
          "div",
          {
            className: `infor_tab_unit day_${day}_unit_${unit}`,
          },
          React.createElement(
            "div",
            {
              className: "infor_tab_unit_name",
            },
            tab.tabName
          ),
          React.createElement(
            "div",
            {
              className: "infor_tab_unit_outputStandard",
            },
            swapStandardIdtoValue(listOutputStandard, tab.outputStandard)
          ),
          React.createElement(
            "div",
            {
              className: "infor_tab_unit_time",
            },
            tab.tabTime + "mins"
          ),
          React.createElement(
            "div",
            {
              className: "infor_tab_unit_status",
            },
            checkStatus(tab.tabStatus)
          ),
          React.createElement(
            "div",
            {
              className: "infor_tab_unit_type",
            },
            checkType(tab.tabType)
          ),
          React.createElement(
            "div",
            {
              className: "infor_tab_unit_popup",
              onClick: () =>
                setModel(
                  tabPopupModel(tab.day, tab.unit, tab.tabName, setModel)
                ),
            },
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <g clip-path="url(#clip0_19_137)">
                  <path
                    d="M20 6H12L10 4H4C2.9 4 2.01 4.9 2.01 6L2 18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V8C22 6.9 21.1 6 20 6ZM20 18H4V6H9.17L11.17 8H20V18ZM17.5 12.12V15.5H14.5V10.5H15.88L17.5 12.12ZM13 9V17H19V11.5L16.5 9H13Z"
                    fill="#285D9A"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_19_137">
                    <rect width="24" height="24" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </div>,
            React.createElement(
              "div",
              {
                class: `tab_popup tab_popup_day_${tab.day}_unit_${tab.unit}_tab_${tab.tab} hidden model`,
              },
              React.createElement(
                "div",
                {
                  class: `tab_popup_content`,
                },
                React.createElement(
                  "div",
                  {
                    class: `tab_popup_header`,
                  },
                  React.createElement(
                    "div",
                    {
                      class: `tab_popup_header_name`,
                    },
                    "Day " + tab.day
                  ),
                  React.createElement(
                    "div",
                    {
                      class: `tab_popup_header_x tab_popup_header_x_day_${tab.day}_unit_${tab.unit}_tab_${tab.tab}`,
                    },
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <g clip-path="url(#clip0_126636_12948)">
                        <path
                          d="M12 2C6.47 2 2 6.47 2 12C2 17.53 6.47 22 12 22C17.53 22 22 17.53 22 12C22 6.47 17.53 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20ZM15.59 7L12 10.59L8.41 7L7 8.41L10.59 12L7 15.59L8.41 17L12 13.41L15.59 17L17 15.59L13.41 12L17 8.41L15.59 7Z"
                          fill="white"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_126636_12948">
                          <rect width="24" height="24" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                  )
                ),
                React.createElement(
                  "div",
                  {
                    class: `tab_popup_body`,
                  },
                  React.createElement(
                    "div",
                    {
                      class: `tab_popup_body_header`,
                    },
                    React.createElement(
                      "div",
                      {
                        class: `tab_popup_body_header_unit`,
                      },
                      "Unit" + tab.unit
                    ),
                    React.createElement(
                      "div",
                      {
                        class: `tab_popup_body_header_name`,
                      },
                      tab.tabName
                    )
                  ),
                  React.createElement("div", {
                    class: `tab_popup_body_content`,
                  })
                ),
                React.createElement(
                  "div",
                  {
                    class: `tab_popup_footer`,
                  },
                  React.createElement(
                    "div",
                    {
                      class: `tab_popup_footer_content`,
                    },
                    "Upload new"
                  )
                )
              )
            )
          )
        );
      } else if (
        tab.day === day &&
        tab.unit === unit &&
        tab.tabDisplay === "creating"
      ) {
        return (
          <div class="infor_tab_unit">
            <div class="infor_tab_unit_name-creating">
              <input
                type="text"
                class={`unit_name_input unit_name_input_${tab.day}_${tab.unit}_${tab.tab}`}
                placeholder="name"
              ></input>
            </div>
            <div class="infor_tab_unit_standard-creating">
              <select
                class={`infor_tab_unit_standard_select-creating infor_tab_unit_standard_select-creating_${tab.day}_${tab.unit}_${tab.tab}`}
                name=""
                id=""
              >
                {listOutputStandard?.map((item, index) => (
                  <option key={index} value={item.id}>
                    {item.code}
                  </option>
                ))}
              </select>
            </div>
            <div class="infor_tab_unit_time-creating">
              <input
                type="text"
                class={`unit_time_input unit_time_input_${tab.day}_${tab.unit}_${tab.tab}`}
                pattern="[0-9]"
                placeholder="minus"
              ></input>
            </div>
            <div class="infor_tab_unit_status-creating">
              <div
                class={`status_online-creating status-creating_${tab.day}_${tab.unit}_${tab.tab}`}
                onClick={() => changeStatus("status_online-creating")}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="59"
                  height="20"
                  viewBox="0 0 59 20"
                  fill="none"
                >
                  <rect width="59" height="20" rx="10" fill="#D55B13" />
                  <circle cx="10" cy="10" r="8" fill="#2D3748" />
                  <path
                    d="M29.2988 9.2207V9.66992C29.2988 10.2038 29.2321 10.6823 29.0986 11.1055C28.9652 11.5286 28.7731 11.8883 28.5225 12.1846C28.2718 12.4808 27.9707 12.707 27.6191 12.8633C27.2708 13.0195 26.8802 13.0977 26.4473 13.0977C26.0273 13.0977 25.6416 13.0195 25.29 12.8633C24.9417 12.707 24.639 12.4808 24.3818 12.1846C24.1279 11.8883 23.931 11.5286 23.791 11.1055C23.651 10.6823 23.5811 10.2038 23.5811 9.66992V9.2207C23.5811 8.68685 23.6494 8.20996 23.7861 7.79004C23.9261 7.36686 24.123 7.00716 24.377 6.71094C24.6309 6.41146 24.932 6.18359 25.2803 6.02734C25.6318 5.87109 26.0176 5.79297 26.4375 5.79297C26.8704 5.79297 27.2611 5.87109 27.6094 6.02734C27.9609 6.18359 28.262 6.41146 28.5127 6.71094C28.7666 7.00716 28.9603 7.36686 29.0938 7.79004C29.2305 8.20996 29.2988 8.68685 29.2988 9.2207ZM28.3662 9.66992V9.21094C28.3662 8.78776 28.3223 8.41341 28.2344 8.08789C28.1497 7.76237 28.0244 7.48893 27.8584 7.26758C27.6924 7.04622 27.4889 6.87858 27.248 6.76465C27.0104 6.65072 26.7402 6.59375 26.4375 6.59375C26.1445 6.59375 25.8792 6.65072 25.6416 6.76465C25.4072 6.87858 25.2054 7.04622 25.0361 7.26758C24.8701 7.48893 24.7415 7.76237 24.6504 8.08789C24.5592 8.41341 24.5137 8.78776 24.5137 9.21094V9.66992C24.5137 10.0964 24.5592 10.474 24.6504 10.8027C24.7415 11.1283 24.8717 11.4033 25.041 11.6279C25.2135 11.8493 25.417 12.0169 25.6514 12.1309C25.889 12.2448 26.1543 12.3018 26.4473 12.3018C26.7533 12.3018 27.0251 12.2448 27.2627 12.1309C27.5003 12.0169 27.7005 11.8493 27.8633 11.6279C28.0293 11.4033 28.1546 11.1283 28.2393 10.8027C28.3239 10.474 28.3662 10.0964 28.3662 9.66992ZM31.4766 8.84473V13H30.5732V7.7168H31.4277L31.4766 8.84473ZM31.2617 10.1582L30.8857 10.1436C30.889 9.78223 30.9427 9.44857 31.0469 9.14258C31.151 8.83333 31.2975 8.56478 31.4863 8.33691C31.6751 8.10905 31.8997 7.93327 32.1602 7.80957C32.4238 7.68262 32.7152 7.61914 33.0342 7.61914C33.2946 7.61914 33.529 7.65495 33.7373 7.72656C33.9456 7.79492 34.123 7.9056 34.2695 8.05859C34.4193 8.21159 34.5332 8.41016 34.6113 8.6543C34.6895 8.89518 34.7285 9.18978 34.7285 9.53809V13H33.8203V9.52832C33.8203 9.25163 33.7796 9.03027 33.6982 8.86426C33.6169 8.69499 33.498 8.57292 33.3418 8.49805C33.1855 8.41992 32.9935 8.38086 32.7656 8.38086C32.541 8.38086 32.3359 8.42806 32.1504 8.52246C31.9681 8.61686 31.8102 8.74707 31.6768 8.91309C31.5465 9.0791 31.444 9.26953 31.3691 9.48438C31.2975 9.69596 31.2617 9.92057 31.2617 10.1582ZM37.082 5.5V13H36.1738V5.5H37.082ZM39.5137 7.7168V13H38.6055V7.7168H39.5137ZM38.5371 6.31543C38.5371 6.16895 38.5811 6.04525 38.6689 5.94434C38.7601 5.84342 38.8936 5.79297 39.0693 5.79297C39.2419 5.79297 39.3737 5.84342 39.4648 5.94434C39.5592 6.04525 39.6064 6.16895 39.6064 6.31543C39.6064 6.4554 39.5592 6.57585 39.4648 6.67676C39.3737 6.77441 39.2419 6.82324 39.0693 6.82324C38.8936 6.82324 38.7601 6.77441 38.6689 6.67676C38.5811 6.57585 38.5371 6.4554 38.5371 6.31543ZM41.8672 8.84473V13H40.9639V7.7168H41.8184L41.8672 8.84473ZM41.6523 10.1582L41.2764 10.1436C41.2796 9.78223 41.3333 9.44857 41.4375 9.14258C41.5417 8.83333 41.6882 8.56478 41.877 8.33691C42.0658 8.10905 42.2904 7.93327 42.5508 7.80957C42.8145 7.68262 43.1058 7.61914 43.4248 7.61914C43.6852 7.61914 43.9196 7.65495 44.1279 7.72656C44.3363 7.79492 44.5137 7.9056 44.6602 8.05859C44.8099 8.21159 44.9238 8.41016 45.002 8.6543C45.0801 8.89518 45.1191 9.18978 45.1191 9.53809V13H44.2109V9.52832C44.2109 9.25163 44.1702 9.03027 44.0889 8.86426C44.0075 8.69499 43.8887 8.57292 43.7324 8.49805C43.5762 8.41992 43.3841 8.38086 43.1562 8.38086C42.9316 8.38086 42.7266 8.42806 42.541 8.52246C42.3587 8.61686 42.2008 8.74707 42.0674 8.91309C41.9372 9.0791 41.8346 9.26953 41.7598 9.48438C41.6882 9.69596 41.6523 9.92057 41.6523 10.1582ZM48.6836 13.0977C48.3158 13.0977 47.9821 13.0358 47.6826 12.9121C47.3864 12.7852 47.1309 12.6077 46.916 12.3799C46.7044 12.152 46.5417 11.8818 46.4277 11.5693C46.3138 11.2568 46.2568 10.915 46.2568 10.5439V10.3389C46.2568 9.90918 46.3203 9.52669 46.4473 9.19141C46.5742 8.85286 46.7467 8.56641 46.9648 8.33203C47.1829 8.09766 47.4303 7.92025 47.707 7.7998C47.9837 7.67936 48.2702 7.61914 48.5664 7.61914C48.944 7.61914 49.2695 7.68424 49.543 7.81445C49.8197 7.94466 50.0459 8.12695 50.2217 8.36133C50.3975 8.59245 50.5277 8.86589 50.6123 9.18164C50.6969 9.49414 50.7393 9.83594 50.7393 10.207V10.6123H46.7939V9.875H49.8359V9.80664C49.8229 9.57227 49.7741 9.3444 49.6895 9.12305C49.6081 8.90169 49.4779 8.7194 49.2988 8.57617C49.1198 8.43294 48.8757 8.36133 48.5664 8.36133C48.3613 8.36133 48.1725 8.40527 48 8.49316C47.8275 8.5778 47.6794 8.70475 47.5557 8.87402C47.432 9.04329 47.3359 9.25 47.2676 9.49414C47.1992 9.73828 47.165 10.0199 47.165 10.3389V10.5439C47.165 10.7946 47.1992 11.0306 47.2676 11.252C47.3392 11.4701 47.4417 11.6621 47.5752 11.8281C47.7119 11.9941 47.8763 12.1243 48.0684 12.2188C48.2637 12.3132 48.485 12.3604 48.7324 12.3604C49.0514 12.3604 49.3216 12.2952 49.543 12.165C49.7643 12.0348 49.958 11.8607 50.124 11.6426L50.6709 12.0771C50.557 12.2497 50.4121 12.4141 50.2363 12.5703C50.0605 12.7266 49.8441 12.8535 49.5869 12.9512C49.333 13.0488 49.0319 13.0977 48.6836 13.0977Z"
                    fill="white"
                  />
                </svg>
              </div>
              <div
                class={`status_offline-creating status-creating_${tab.day}_${tab.unit}_${tab.tab} hidden`}
                onClick={() => changeStatus("status_offline-creating")}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="59"
                  height="20"
                  viewBox="0 0 59 20"
                  fill="none"
                >
                  <rect width="59" height="20" rx="10" fill="#2D3748" />
                  <path
                    d="M13.2988 9.2207V9.66992C13.2988 10.2038 13.2321 10.6823 13.0986 11.1055C12.9652 11.5286 12.7731 11.8883 12.5225 12.1846C12.2718 12.4808 11.9707 12.707 11.6191 12.8633C11.2708 13.0195 10.8802 13.0977 10.4473 13.0977C10.0273 13.0977 9.6416 13.0195 9.29004 12.8633C8.94173 12.707 8.639 12.4808 8.38184 12.1846C8.12793 11.8883 7.93099 11.5286 7.79102 11.1055C7.65104 10.6823 7.58105 10.2038 7.58105 9.66992V9.2207C7.58105 8.68685 7.64941 8.20996 7.78613 7.79004C7.92611 7.36686 8.12305 7.00716 8.37695 6.71094C8.63086 6.41146 8.93197 6.18359 9.28027 6.02734C9.63184 5.87109 10.0176 5.79297 10.4375 5.79297C10.8704 5.79297 11.2611 5.87109 11.6094 6.02734C11.9609 6.18359 12.262 6.41146 12.5127 6.71094C12.7666 7.00716 12.9603 7.36686 13.0938 7.79004C13.2305 8.20996 13.2988 8.68685 13.2988 9.2207ZM12.3662 9.66992V9.21094C12.3662 8.78776 12.3223 8.41341 12.2344 8.08789C12.1497 7.76237 12.0244 7.48893 11.8584 7.26758C11.6924 7.04622 11.4889 6.87858 11.248 6.76465C11.0104 6.65072 10.7402 6.59375 10.4375 6.59375C10.1445 6.59375 9.87923 6.65072 9.6416 6.76465C9.40723 6.87858 9.2054 7.04622 9.03613 7.26758C8.87012 7.48893 8.74154 7.76237 8.65039 8.08789C8.55924 8.41341 8.51367 8.78776 8.51367 9.21094V9.66992C8.51367 10.0964 8.55924 10.474 8.65039 10.8027C8.74154 11.1283 8.87174 11.4033 9.04102 11.6279C9.21354 11.8493 9.41699 12.0169 9.65137 12.1309C9.889 12.2448 10.1543 12.3018 10.4473 12.3018C10.7533 12.3018 11.0251 12.2448 11.2627 12.1309C11.5003 12.0169 11.7005 11.8493 11.8633 11.6279C12.0293 11.4033 12.1546 11.1283 12.2393 10.8027C12.3239 10.474 12.3662 10.0964 12.3662 9.66992ZM15.9209 13H15.0176V7.16016C15.0176 6.7793 15.0859 6.45866 15.2227 6.19824C15.3626 5.93457 15.5628 5.736 15.8232 5.60254C16.0837 5.46582 16.3929 5.39746 16.751 5.39746C16.8551 5.39746 16.9593 5.40397 17.0635 5.41699C17.1709 5.43001 17.2751 5.44954 17.376 5.47559L17.3271 6.21289C17.2588 6.19661 17.1807 6.18522 17.0928 6.17871C17.0081 6.1722 16.9235 6.16895 16.8389 6.16895C16.6468 6.16895 16.4808 6.20801 16.3408 6.28613C16.2041 6.361 16.0999 6.47168 16.0283 6.61816C15.9567 6.76465 15.9209 6.94531 15.9209 7.16016V13ZM17.0977 7.7168V8.41016H14.1826V7.7168H17.0977ZM18.7773 13H17.874V7.16016C17.874 6.7793 17.944 6.45866 18.084 6.19824C18.2272 5.93457 18.4323 5.736 18.6992 5.60254C18.9694 5.46582 19.2965 5.39746 19.6807 5.39746C19.8239 5.39746 20.0029 5.41211 20.2178 5.44141C20.4359 5.4707 20.667 5.50814 20.9111 5.55371C21.1585 5.59928 21.3994 5.64648 21.6338 5.69531L21.2139 6.34961C20.9046 6.29102 20.6263 6.24707 20.3789 6.21777C20.1315 6.18522 19.9215 6.16895 19.749 6.16895C19.5374 6.16895 19.3584 6.20801 19.2119 6.28613C19.0687 6.361 18.9596 6.47168 18.8848 6.61816C18.8132 6.76465 18.7773 6.94531 18.7773 7.16016V13ZM20.7305 13V5.69531H21.6338V13H20.7305ZM19.9004 7.7168V8.41016H17.0391V7.7168H19.9004ZM24.0898 7.7168V13H23.1816V7.7168H24.0898ZM23.1133 6.31543C23.1133 6.16895 23.1572 6.04525 23.2451 5.94434C23.3363 5.84342 23.4697 5.79297 23.6455 5.79297C23.818 5.79297 23.9499 5.84342 24.041 5.94434C24.1354 6.04525 24.1826 6.16895 24.1826 6.31543C24.1826 6.4554 24.1354 6.57585 24.041 6.67676C23.9499 6.77441 23.818 6.82324 23.6455 6.82324C23.4697 6.82324 23.3363 6.77441 23.2451 6.67676C23.1572 6.57585 23.1133 6.4554 23.1133 6.31543ZM26.4434 8.84473V13H25.54V7.7168H26.3945L26.4434 8.84473ZM26.2285 10.1582L25.8525 10.1436C25.8558 9.78223 25.9095 9.44857 26.0137 9.14258C26.1178 8.83333 26.2643 8.56478 26.4531 8.33691C26.6419 8.10905 26.8665 7.93327 27.127 7.80957C27.3906 7.68262 27.682 7.61914 28.001 7.61914C28.2614 7.61914 28.4958 7.65495 28.7041 7.72656C28.9124 7.79492 29.0898 7.9056 29.2363 8.05859C29.3861 8.21159 29.5 8.41016 29.5781 8.6543C29.6562 8.89518 29.6953 9.18978 29.6953 9.53809V13H28.7871V9.52832C28.7871 9.25163 28.7464 9.03027 28.665 8.86426C28.5837 8.69499 28.4648 8.57292 28.3086 8.49805C28.1523 8.41992 27.9603 8.38086 27.7324 8.38086C27.5078 8.38086 27.3027 8.42806 27.1172 8.52246C26.9349 8.61686 26.777 8.74707 26.6436 8.91309C26.5133 9.0791 26.4108 9.26953 26.3359 9.48438C26.2643 9.69596 26.2285 9.92057 26.2285 10.1582ZM33.2598 13.0977C32.8919 13.0977 32.5583 13.0358 32.2588 12.9121C31.9626 12.7852 31.707 12.6077 31.4922 12.3799C31.2806 12.152 31.1178 11.8818 31.0039 11.5693C30.89 11.2568 30.833 10.915 30.833 10.5439V10.3389C30.833 9.90918 30.8965 9.52669 31.0234 9.19141C31.1504 8.85286 31.3229 8.56641 31.541 8.33203C31.7591 8.09766 32.0065 7.92025 32.2832 7.7998C32.5599 7.67936 32.8464 7.61914 33.1426 7.61914C33.5202 7.61914 33.8457 7.68424 34.1191 7.81445C34.3958 7.94466 34.6221 8.12695 34.7979 8.36133C34.9736 8.59245 35.1038 8.86589 35.1885 9.18164C35.2731 9.49414 35.3154 9.83594 35.3154 10.207V10.6123H31.3701V9.875H34.4121V9.80664C34.3991 9.57227 34.3503 9.3444 34.2656 9.12305C34.1842 8.90169 34.054 8.7194 33.875 8.57617C33.696 8.43294 33.4518 8.36133 33.1426 8.36133C32.9375 8.36133 32.7487 8.40527 32.5762 8.49316C32.4036 8.5778 32.2555 8.70475 32.1318 8.87402C32.0081 9.04329 31.9121 9.25 31.8438 9.49414C31.7754 9.73828 31.7412 10.0199 31.7412 10.3389V10.5439C31.7412 10.7946 31.7754 11.0306 31.8438 11.252C31.9154 11.4701 32.0179 11.6621 32.1514 11.8281C32.2881 11.9941 32.4525 12.1243 32.6445 12.2188C32.8398 12.3132 33.0612 12.3604 33.3086 12.3604C33.6276 12.3604 33.8978 12.2952 34.1191 12.165C34.3405 12.0348 34.5342 11.8607 34.7002 11.6426L35.2471 12.0771C35.1331 12.2497 34.9883 12.4141 34.8125 12.5703C34.6367 12.7266 34.4202 12.8535 34.1631 12.9512C33.9092 13.0488 33.6081 13.0977 33.2598 13.0977Z"
                    fill="white"
                  />
                  <circle cx="49" cy="10" r="8" fill="#D55B13" />
                </svg>
              </div>
            </div>
            <div class="infor_tab_unit_type-creating noselect">
              <select name="deliveryType" onChange={handleDeliverySelect}>
                {listDelivery?.map((item, index) => (
                  <option key={index} name={item.name} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>
            <div
              class="infor_tab_unit_popup-creating"
              onClick={() =>
                saveTabInfor(
                  array,
                  tab.day,
                  tab.unit,
                  tab.tab,
                  type,
                  setTabArray,
                  setType,
                  setSyllabusDays
                )
              }
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <g clip-path="url(#clip0_1173_19763)">
                  <path
                    d="M20 6H12L10 4H4C2.9 4 2.01 4.9 2.01 6L2 18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V8C22 6.9 21.1 6 20 6ZM20 18H4V6H9.17L11.17 8H20V18ZM17.5 12.12V15.5H14.5V10.5H15.88L17.5 12.12ZM13 9V17H19V11.5L16.5 9H13Z"
                    fill="#285D9A"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_1173_19763">
                    <rect width="24" height="24" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </div>
          </div>
        );
      } else {
        return "";
      }
    });
  }

  function renderUnitHeader(arr1, arr2, day, unit, setUnitArray) {
    let target = "default";

    for (let i = 0; i < arr2.length; i++) {
      if (arr2[i].day === day && arr2[i].unit === unit) {
        target = arr2[i].unitDisplay;
        if (arr2[i].name === "") {
          target = "creating";
          break;
        }
        break;
      }
    }

    if (target === "default") {
      return React.createElement(
        "div",
        {
          class: `infor_header infor_header_day_${day}_unit_${unit}`,
        },
        React.createElement(
          "div",
          {
            class: `infor_header_name`,
          },
          React.createElement(
            "p",
            {
              class: "unit_name",
            },
            getUnitName(arr2, day, unit)
          ),
          React.createElement(
            "p",
            {
              class: "unit_time",
            },
            getUnitTime(arr1, day, unit)
          )
        ),
        React.createElement(
          "div",
          {
            class: "infor_header_editButton",
            onClick: () => setUnitArray(changeUnitHeader(arr2, day, unit)),
          },
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <g clip-path="url(#clip0_1173_19230)">
              <path
                d="M3 17.25V21H6.75L17.81 9.94L14.06 6.19L3 17.25ZM5.92 19H5V18.08L14.06 9.02L14.98 9.94L5.92 19ZM20.71 5.63L18.37 3.29C18.17 3.09 17.92 3 17.66 3C17.4 3 17.15 3.1 16.96 3.29L15.13 5.12L18.88 8.87L20.71 7.04C21.1 6.65 21.1 6.02 20.71 5.63Z"
                fill="#F1F1F1"
              />
            </g>
            <defs>
              <clipPath id="clip0_1173_19230">
                <rect width="24" height="24" fill="white" />
              </clipPath>
            </defs>
          </svg>
        ),
        React.createElement(
          "div",
          {
            class: "infor_header_dropDown",
            onClick: () => unitDropdown(day, unit),
          },
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <g clip-path="url(#clip0_20_154)">
              <path
                d="M12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4ZM12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 15L8 11H16L12 15Z"
                fill="#285D9A"
              />
            </g>
            <defs>
              <clipPath id="clip0_20_154">
                <rect width="24" height="24" fill="white" />
              </clipPath>
            </defs>
          </svg>
        )
      );
    } else if (target === "creating") {
      return (
        <div class="infor_header">
          <div class="infor_header_form">
            <div class="infor_header_form_name">Unit name</div>
            <div class="infor_header_form_input">
              <input
                type="text"
                class={`infor_header_form_input_area form_input_area_${day}_${unit}`}
                placeholder="Type unit name"
              ></input>
              <div
                class="infor_header_form_input_button"
                onClick={() =>
                  setUnitArray(saveUnitInfor(arr2, day, unit, setSyllabusDays))
                }
              >
                Create
              </div>
            </div>
          </div>
          <div
            class="infor_header_dropdown infor_header_dropdown-creating"
            onClick={() => unitDropdown(day, unit)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <g clip-path="url(#clip0_20_154)">
                <path
                  d="M12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4ZM12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 15L8 11H16L12 15Z"
                  fill="#285D9A"
                />
              </g>
              <defs>
                <clipPath id="clip0_20_154">
                  <rect width="24" height="24" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </div>
        </div>
      );
    }
  }

  function delDay(arr1, arr2, day, setTabArray, setUnitArray) {
    let tmpArr1 = [...arr1];
    let tmpArr2 = [...arr2];

    for (let i = 0; i < tmpArr1.length; i++) {
      if (tmpArr1[i].day === day) {
        delete tmpArr1[i];
      }
    }

    for (let i = 0; i < tmpArr2.length; i++) {
      if (tmpArr2[i].day === day) {
        delete tmpArr2[i];
      }
    }

    tmpArr1 = clearArray(tmpArr1);
    tmpArr2 = clearArray(tmpArr2);

    setTabArray(tmpArr1);
    setUnitArray(tmpArr2);
  }

  function addDay(arr) {
    const tmpArr = [0];

    arr.map((element) => {
      if (!tmpArr.includes(element.day)) {
        tmpArr.push(element.day);
      }
    });

    const newArr = [...arr];

    tmpArr.sort(compareNumbers);
    newArr.push({
      day: tmpArr[tmpArr.length - 1] + 1,
    });

    return newArr;
  }

  function addUnit(arr1, arr2, day, setUnitArray) {
    let tmpArr = [];
    let newArr = [...arr1];
    let newUnitArr = [...arr2];

    arr1.map((element) => {
      if (element.day === day) {
        if (!tmpArr.includes(element.unit)) {
          tmpArr.push(element.unit);
        }
      }
    });

    if (typeof tmpArr[0] === "undefined") {
      newArr = clearArray(clearDay(newArr, day));
      tmpArr[0] = 0;
    }

    tmpArr = clearArray(tmpArr.sort(compareNumbers));

    let newUnit = {
      day: day,
      unit: tmpArr[tmpArr.length - 1] + 1,
      tabName: "",

      tab: null,
      tabTime: 0,
      outputStandard: null,
      tabStatus: null,
      tabType: null,
    };

    newUnitArr.push({
      day: day,
      unit: tmpArr[tmpArr.length - 1] + 1,
      name: "",
      unitDisplay: "creating",
    });

    newArr.push({
      ...newUnit,
    });

    setUnitArray(newUnitArr);

    return newArr;
  }

  function addTab(arr1, day, unit) {
    let newArr = [...arr1];
    let tmpArr = [];

    newArr.map((element, index) => {
      if ((element.day === day, element.unit === unit)) {
        tmpArr.push(element.tab);
      }
    });
    tmpArr.sort(compareNumbers);

    if (tmpArr.length === 1) {
      if (typeof tmpArr[0] === "undefined") {
        tmpArr[0] = 0;
      }
    } else {
      if (typeof tmpArr[tmpArr.length - 1] === "undefined") {
        tmpArr[tmpArr.length - 1] = tmpArr[tmpArr.length - 2];
      }
    }

    tmpArr.sort(compareNumbers);

    newArr.push({
      day: day,
      unit: unit,
      tab: tmpArr[tmpArr.length - 1] + 1,
      tabTime: 0,
      tabDisplay: "creating",

      tabName: null,
      outputStandard: null,
      tabStatus: null,
      tabType: null,
    });

    return newArr;
  }

  function changeUnitHeader(arr2, day, unit) {
    let newUnitArr = [...arr2];

    for (let i = 0; i < arr2.length; i++) {
      if (arr2[i].day === day && arr2[i].unit === unit) {
        newUnitArr[i].unitDisplay = "creating";
        break;
      }
    }

    return newUnitArr;
  }

  function saveUnitInfor(arr2, day, unit, setSyllabusDays) {
    let target = document.querySelector(`.form_input_area_${day}_${unit}`);
    let newArr = [...arr2];

    for (let i = 0; i < arr2.length; i++) {
      if (arr2[i].day === day && arr2[i].unit === unit) {
        if (target.value !== "") {
          newArr[i].name = target.value;
          newArr[i].unitDisplay = "default";
          break;
        } else {
          alert("Unit name can not empty");
        }
      }
    }

    setSyllabusDays(swapData(TabArray, newArr));
    return newArr;
  }

  function saveTabInfor(
    arr1,
    day,
    unit,
    tab,
    type,
    setTabArray,
    setType,
    setSyllabusDays
  ) {
    let nameInput = document.querySelector(
      `.unit_name_input_${day}_${unit}_${tab}`
    );
    let standardIpnut = document.querySelector(
      `.infor_tab_unit_standard_select-creating_${day}_${unit}_${tab}`
    );
    let statusInput = document.querySelectorAll(
      `.status-creating_${day}_${unit}_${tab}`
    );
    let timeInput = document.querySelector(
      `.unit_time_input_${day}_${unit}_${tab}`
    );

    let tabName = nameInput.value;
    let tabStandard = standardIpnut.value;
    let tabStatus = true;
    let tabTime = timeInput.value;

    let newArr = [...arr1];

    statusInput.forEach((element) => {
      if (element.classList.contains("hidden")) {
        if (element.classList.contains("status_online-creating")) {
          tabStatus = false;
        } else if (element.classList.contains("status_offline-creating")) {
          tabStatus = true;
        }
      }
    });

    let tabType = type;

    arr1.map((element, index) => {
      if (element.day === day && element.unit === unit && element.tab === tab) {
        if (
          tabName === "" ||
          tabStandard === "Output standard" ||
          Number.isInteger(tabTime) ||
          Number(tabTime) === 0 ||
          tabType === ""
        ) {
          alert("Wrong input data");
          return "";
        } else {
          newArr[index] = {
            ...newArr[index],
            tabName: tabName,
            outputStandard: tabStandard,
            tabTime: Number(tabTime),
            tabStatus: tabStatus,
            tabType: changeTypeToID(listDelivery, tabType),
            tabDisplay: "default",
          };
        }
      }
    });

    setType("");
    setTabArray(newArr);
    setSyllabusDays(swapData(newArr, UnitArray));
  }

  function delDayModel(setModel, arr1, arr2, day, setTabArray, setUnitArray) {
    return (
      <div class="model">
        <div class="delete_popup">
          <div class="delete_popup_header">
            <div class="delete_popup_header_icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <g clip-path="url(#clip0_1173_16682)">
                  <path
                    d="M12 5.99L19.53 19H4.47L12 5.99ZM12 2L1 21H23L12 2ZM13 16H11V18H13V16ZM13 10H11V14H13V10Z"
                    fill="#E74A3B"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_1173_16682">
                    <rect width="24" height="24" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </div>
            <div class="delete_popup_header_text">Delete Day</div>
          </div>

          <div class="delete_popup_content">
            <div class="delete_popup_content_text">
              Delete all content of the Day?
            </div>
          </div>

          <div class="delete_popup_choice">
            <div action="" class="delete_popup_choice_form">
              <div
                class="popup_choice_form_cancel form_choice"
                onClick={() =>
                  delDayChoice(
                    setModel,
                    "cancel",
                    arr1,
                    arr2,
                    day,
                    setTabArray,
                    setUnitArray
                  )
                }
              >
                Cancel
              </div>
              <div
                class="popup_choice_form_delete form_choice"
                onClick={() =>
                  delDayChoice(
                    setModel,
                    "delete",
                    arr1,
                    arr2,
                    day,
                    setTabArray,
                    setUnitArray
                  )
                }
              >
                Delete
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  function delDayChoice(
    setModel,
    value,
    arr1,
    arr2,
    day,
    setTabArray,
    setUnitArray
  ) {
    if (value === "cancel") {
      setModel("");
    } else if (value === "delete") {
      delDay(arr1, arr2, day, setTabArray, setUnitArray);
      setModel("");
    }
  }

  function tabPopupModel(day, unit, tabName, setModel) {
    return (
      <div class="model">
        <div class="tab_popup">
          <div class="tab_popup_header">
            <div class="tab_popup_header_name">Day {day}</div>
            <div class="tab_popup_header_x" onClick={() => setModel("")}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <g clip-path="url(#clip0_126636_12948)">
                  <path
                    d="M12 2C6.47 2 2 6.47 2 12C2 17.53 6.47 22 12 22C17.53 22 22 17.53 22 12C22 6.47 17.53 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20ZM15.59 7L12 10.59L8.41 7L7 8.41L10.59 12L7 15.59L8.41 17L12 13.41L15.59 17L17 15.59L13.41 12L17 8.41L15.59 7Z"
                    fill="white"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_126636_12948">
                    <rect width="24" height="24" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </div>
          </div>

          <div class="tab_popup_body">
            <div class="tab_popup_body_header">
              <div class="tab_popup_body_header_unit">Unit {unit}</div>
              <div class="tab_popup_body_header_name">{tabName}</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  function changeStatus(status) {
    let online = document.querySelector(`.status_online-creating`);
    let offline = document.querySelector(`.status_offline-creating`);

    if (status === "status_online-creating") {
      online.classList.add("hidden");
      offline.classList.remove("hidden");
    } else if (status === "status_offline-creating") {
      offline.classList.add("hidden");
      online.classList.remove("hidden");
    }
  }

  function compareNumbers(a, b) {
    return a - b;
  }

  function displayHidden(day) {
    document.querySelectorAll(`.day_${day}`).forEach((e) => {
      if (e.classList.contains("hidden")) {
        e.classList.remove("hidden");
      } else {
        e.classList.add("hidden");
      }
    });
  }

  function unitDropdown(day, unit) {
    document.querySelectorAll(`.day_${day}_unit_${unit}`).forEach((e) => {
      if (e.classList.contains("hidden")) {
        e.classList.remove("hidden");
      } else {
        e.classList.add("hidden");
      }
    });
  }

  function clearArray(arr) {
    let tmpArr = [...arr];

    for (var i = arr.length - 1; i >= 0; i--) {
      if (typeof tmpArr[i] === "undefined") {
        tmpArr.splice(i, 1);
      }
    }

    return tmpArr;
  }

  function clearDay(arr1, day) {
    let arr = [...arr1];

    for (let i = arr.length - 1; i >= 0; i--) {
      if (arr.day === day && typeof arr.unit === "undefined") {
        delete arr[i];
      }
    }

    return clearArray(arr);
  }

  function checkStatus(check) {
    if (check) {
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="59"
          height="22"
          viewBox="0 0 59 22"
          fill="none"
        >
          <path
            d="M21.2988 10.2207V10.6699C21.2988 11.2038 21.2321 11.6823 21.0986 12.1055C20.9652 12.5286 20.7731 12.8883 20.5225 13.1846C20.2718 13.4808 19.9707 13.707 19.6191 13.8633C19.2708 14.0195 18.8802 14.0977 18.4473 14.0977C18.0273 14.0977 17.6416 14.0195 17.29 13.8633C16.9417 13.707 16.639 13.4808 16.3818 13.1846C16.1279 12.8883 15.931 12.5286 15.791 12.1055C15.651 11.6823 15.5811 11.2038 15.5811 10.6699V10.2207C15.5811 9.68685 15.6494 9.20996 15.7861 8.79004C15.9261 8.36686 16.123 8.00716 16.377 7.71094C16.6309 7.41146 16.932 7.18359 17.2803 7.02734C17.6318 6.87109 18.0176 6.79297 18.4375 6.79297C18.8704 6.79297 19.2611 6.87109 19.6094 7.02734C19.9609 7.18359 20.262 7.41146 20.5127 7.71094C20.7666 8.00716 20.9603 8.36686 21.0938 8.79004C21.2305 9.20996 21.2988 9.68685 21.2988 10.2207ZM20.3662 10.6699V10.2109C20.3662 9.78776 20.3223 9.41341 20.2344 9.08789C20.1497 8.76237 20.0244 8.48893 19.8584 8.26758C19.6924 8.04622 19.4889 7.87858 19.248 7.76465C19.0104 7.65072 18.7402 7.59375 18.4375 7.59375C18.1445 7.59375 17.8792 7.65072 17.6416 7.76465C17.4072 7.87858 17.2054 8.04622 17.0361 8.26758C16.8701 8.48893 16.7415 8.76237 16.6504 9.08789C16.5592 9.41341 16.5137 9.78776 16.5137 10.2109V10.6699C16.5137 11.0964 16.5592 11.474 16.6504 11.8027C16.7415 12.1283 16.8717 12.4033 17.041 12.6279C17.2135 12.8493 17.417 13.0169 17.6514 13.1309C17.889 13.2448 18.1543 13.3018 18.4473 13.3018C18.7533 13.3018 19.0251 13.2448 19.2627 13.1309C19.5003 13.0169 19.7005 12.8493 19.8633 12.6279C20.0293 12.4033 20.1546 12.1283 20.2393 11.8027C20.3239 11.474 20.3662 11.0964 20.3662 10.6699ZM23.4766 9.84473V14H22.5732V8.7168H23.4277L23.4766 9.84473ZM23.2617 11.1582L22.8857 11.1436C22.889 10.7822 22.9427 10.4486 23.0469 10.1426C23.151 9.83333 23.2975 9.56478 23.4863 9.33691C23.6751 9.10905 23.8997 8.93327 24.1602 8.80957C24.4238 8.68262 24.7152 8.61914 25.0342 8.61914C25.2946 8.61914 25.529 8.65495 25.7373 8.72656C25.9456 8.79492 26.123 8.9056 26.2695 9.05859C26.4193 9.21159 26.5332 9.41016 26.6113 9.6543C26.6895 9.89518 26.7285 10.1898 26.7285 10.5381V14H25.8203V10.5283C25.8203 10.2516 25.7796 10.0303 25.6982 9.86426C25.6169 9.69499 25.498 9.57292 25.3418 9.49805C25.1855 9.41992 24.9935 9.38086 24.7656 9.38086C24.541 9.38086 24.3359 9.42806 24.1504 9.52246C23.9681 9.61686 23.8102 9.74707 23.6768 9.91309C23.5465 10.0791 23.444 10.2695 23.3691 10.4844C23.2975 10.696 23.2617 10.9206 23.2617 11.1582ZM29.082 6.5V14H28.1738V6.5H29.082ZM31.5137 8.7168V14H30.6055V8.7168H31.5137ZM30.5371 7.31543C30.5371 7.16895 30.5811 7.04525 30.6689 6.94434C30.7601 6.84342 30.8936 6.79297 31.0693 6.79297C31.2419 6.79297 31.3737 6.84342 31.4648 6.94434C31.5592 7.04525 31.6064 7.16895 31.6064 7.31543C31.6064 7.4554 31.5592 7.57585 31.4648 7.67676C31.3737 7.77441 31.2419 7.82324 31.0693 7.82324C30.8936 7.82324 30.7601 7.77441 30.6689 7.67676C30.5811 7.57585 30.5371 7.4554 30.5371 7.31543ZM33.8672 9.84473V14H32.9639V8.7168H33.8184L33.8672 9.84473ZM33.6523 11.1582L33.2764 11.1436C33.2796 10.7822 33.3333 10.4486 33.4375 10.1426C33.5417 9.83333 33.6882 9.56478 33.877 9.33691C34.0658 9.10905 34.2904 8.93327 34.5508 8.80957C34.8145 8.68262 35.1058 8.61914 35.4248 8.61914C35.6852 8.61914 35.9196 8.65495 36.1279 8.72656C36.3363 8.79492 36.5137 8.9056 36.6602 9.05859C36.8099 9.21159 36.9238 9.41016 37.002 9.6543C37.0801 9.89518 37.1191 10.1898 37.1191 10.5381V14H36.2109V10.5283C36.2109 10.2516 36.1702 10.0303 36.0889 9.86426C36.0075 9.69499 35.8887 9.57292 35.7324 9.49805C35.5762 9.41992 35.3841 9.38086 35.1562 9.38086C34.9316 9.38086 34.7266 9.42806 34.541 9.52246C34.3587 9.61686 34.2008 9.74707 34.0674 9.91309C33.9372 10.0791 33.8346 10.2695 33.7598 10.4844C33.6882 10.696 33.6523 10.9206 33.6523 11.1582ZM40.6836 14.0977C40.3158 14.0977 39.9821 14.0358 39.6826 13.9121C39.3864 13.7852 39.1309 13.6077 38.916 13.3799C38.7044 13.152 38.5417 12.8818 38.4277 12.5693C38.3138 12.2568 38.2568 11.915 38.2568 11.5439V11.3389C38.2568 10.9092 38.3203 10.5267 38.4473 10.1914C38.5742 9.85286 38.7467 9.56641 38.9648 9.33203C39.1829 9.09766 39.4303 8.92025 39.707 8.7998C39.9837 8.67936 40.2702 8.61914 40.5664 8.61914C40.944 8.61914 41.2695 8.68424 41.543 8.81445C41.8197 8.94466 42.0459 9.12695 42.2217 9.36133C42.3975 9.59245 42.5277 9.86589 42.6123 10.1816C42.6969 10.4941 42.7393 10.8359 42.7393 11.207V11.6123H38.7939V10.875H41.8359V10.8066C41.8229 10.5723 41.7741 10.3444 41.6895 10.123C41.6081 9.90169 41.4779 9.7194 41.2988 9.57617C41.1198 9.43294 40.8757 9.36133 40.5664 9.36133C40.3613 9.36133 40.1725 9.40527 40 9.49316C39.8275 9.5778 39.6794 9.70475 39.5557 9.87402C39.432 10.0433 39.3359 10.25 39.2676 10.4941C39.1992 10.7383 39.165 11.0199 39.165 11.3389V11.5439C39.165 11.7946 39.1992 12.0306 39.2676 12.252C39.3392 12.4701 39.4417 12.6621 39.5752 12.8281C39.7119 12.9941 39.8763 13.1243 40.0684 13.2188C40.2637 13.3132 40.485 13.3604 40.7324 13.3604C41.0514 13.3604 41.3216 13.2952 41.543 13.165C41.7643 13.0348 41.958 12.8607 42.124 12.6426L42.6709 13.0771C42.557 13.2497 42.4121 13.4141 42.2363 13.5703C42.0605 13.7266 41.8441 13.8535 41.5869 13.9512C41.333 14.0488 41.0319 14.0977 40.6836 14.0977Z"
            fill="#D55B13"
          />
          <rect
            x="0.5"
            y="0.5"
            width="58"
            height="21"
            rx="10.5"
            stroke="#D55B13"
          />
        </svg>
      );
    } else {
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="59"
          height="22"
          viewBox="0 0 59 22"
          fill="none"
        >
          <rect width="59" height="22" rx="11" fill="#2D3748" />
          <path
            d="M21.2988 10.2207V10.6699C21.2988 11.2038 21.2321 11.6823 21.0986 12.1055C20.9652 12.5286 20.7731 12.8883 20.5225 13.1846C20.2718 13.4808 19.9707 13.707 19.6191 13.8633C19.2708 14.0195 18.8802 14.0977 18.4473 14.0977C18.0273 14.0977 17.6416 14.0195 17.29 13.8633C16.9417 13.707 16.639 13.4808 16.3818 13.1846C16.1279 12.8883 15.931 12.5286 15.791 12.1055C15.651 11.6823 15.5811 11.2038 15.5811 10.6699V10.2207C15.5811 9.68685 15.6494 9.20996 15.7861 8.79004C15.9261 8.36686 16.123 8.00716 16.377 7.71094C16.6309 7.41146 16.932 7.18359 17.2803 7.02734C17.6318 6.87109 18.0176 6.79297 18.4375 6.79297C18.8704 6.79297 19.2611 6.87109 19.6094 7.02734C19.9609 7.18359 20.262 7.41146 20.5127 7.71094C20.7666 8.00716 20.9603 8.36686 21.0938 8.79004C21.2305 9.20996 21.2988 9.68685 21.2988 10.2207ZM20.3662 10.6699V10.2109C20.3662 9.78776 20.3223 9.41341 20.2344 9.08789C20.1497 8.76237 20.0244 8.48893 19.8584 8.26758C19.6924 8.04622 19.4889 7.87858 19.248 7.76465C19.0104 7.65072 18.7402 7.59375 18.4375 7.59375C18.1445 7.59375 17.8792 7.65072 17.6416 7.76465C17.4072 7.87858 17.2054 8.04622 17.0361 8.26758C16.8701 8.48893 16.7415 8.76237 16.6504 9.08789C16.5592 9.41341 16.5137 9.78776 16.5137 10.2109V10.6699C16.5137 11.0964 16.5592 11.474 16.6504 11.8027C16.7415 12.1283 16.8717 12.4033 17.041 12.6279C17.2135 12.8493 17.417 13.0169 17.6514 13.1309C17.889 13.2448 18.1543 13.3018 18.4473 13.3018C18.7533 13.3018 19.0251 13.2448 19.2627 13.1309C19.5003 13.0169 19.7005 12.8493 19.8633 12.6279C20.0293 12.4033 20.1546 12.1283 20.2393 11.8027C20.3239 11.474 20.3662 11.0964 20.3662 10.6699ZM23.9209 14H23.0176V8.16016C23.0176 7.7793 23.0859 7.45866 23.2227 7.19824C23.3626 6.93457 23.5628 6.736 23.8232 6.60254C24.0837 6.46582 24.3929 6.39746 24.751 6.39746C24.8551 6.39746 24.9593 6.40397 25.0635 6.41699C25.1709 6.43001 25.2751 6.44954 25.376 6.47559L25.3271 7.21289C25.2588 7.19661 25.1807 7.18522 25.0928 7.17871C25.0081 7.1722 24.9235 7.16895 24.8389 7.16895C24.6468 7.16895 24.4808 7.20801 24.3408 7.28613C24.2041 7.361 24.0999 7.47168 24.0283 7.61816C23.9567 7.76465 23.9209 7.94531 23.9209 8.16016V14ZM25.0977 8.7168V9.41016H22.1826V8.7168H25.0977ZM26.7773 14H25.874V8.16016C25.874 7.7793 25.944 7.45866 26.084 7.19824C26.2272 6.93457 26.4323 6.736 26.6992 6.60254C26.9694 6.46582 27.2965 6.39746 27.6807 6.39746C27.8239 6.39746 28.0029 6.41211 28.2178 6.44141C28.4359 6.4707 28.667 6.50814 28.9111 6.55371C29.1585 6.59928 29.3994 6.64648 29.6338 6.69531L29.2139 7.34961C28.9046 7.29102 28.6263 7.24707 28.3789 7.21777C28.1315 7.18522 27.9215 7.16895 27.749 7.16895C27.5374 7.16895 27.3584 7.20801 27.2119 7.28613C27.0687 7.361 26.9596 7.47168 26.8848 7.61816C26.8132 7.76465 26.7773 7.94531 26.7773 8.16016V14ZM28.7305 14V6.69531H29.6338V14H28.7305ZM27.9004 8.7168V9.41016H25.0391V8.7168H27.9004ZM32.0898 8.7168V14H31.1816V8.7168H32.0898ZM31.1133 7.31543C31.1133 7.16895 31.1572 7.04525 31.2451 6.94434C31.3363 6.84342 31.4697 6.79297 31.6455 6.79297C31.818 6.79297 31.9499 6.84342 32.041 6.94434C32.1354 7.04525 32.1826 7.16895 32.1826 7.31543C32.1826 7.4554 32.1354 7.57585 32.041 7.67676C31.9499 7.77441 31.818 7.82324 31.6455 7.82324C31.4697 7.82324 31.3363 7.77441 31.2451 7.67676C31.1572 7.57585 31.1133 7.4554 31.1133 7.31543ZM34.4434 9.84473V14H33.54V8.7168H34.3945L34.4434 9.84473ZM34.2285 11.1582L33.8525 11.1436C33.8558 10.7822 33.9095 10.4486 34.0137 10.1426C34.1178 9.83333 34.2643 9.56478 34.4531 9.33691C34.6419 9.10905 34.8665 8.93327 35.127 8.80957C35.3906 8.68262 35.682 8.61914 36.001 8.61914C36.2614 8.61914 36.4958 8.65495 36.7041 8.72656C36.9124 8.79492 37.0898 8.9056 37.2363 9.05859C37.3861 9.21159 37.5 9.41016 37.5781 9.6543C37.6562 9.89518 37.6953 10.1898 37.6953 10.5381V14H36.7871V10.5283C36.7871 10.2516 36.7464 10.0303 36.665 9.86426C36.5837 9.69499 36.4648 9.57292 36.3086 9.49805C36.1523 9.41992 35.9603 9.38086 35.7324 9.38086C35.5078 9.38086 35.3027 9.42806 35.1172 9.52246C34.9349 9.61686 34.777 9.74707 34.6436 9.91309C34.5133 10.0791 34.4108 10.2695 34.3359 10.4844C34.2643 10.696 34.2285 10.9206 34.2285 11.1582ZM41.2598 14.0977C40.8919 14.0977 40.5583 14.0358 40.2588 13.9121C39.9626 13.7852 39.707 13.6077 39.4922 13.3799C39.2806 13.152 39.1178 12.8818 39.0039 12.5693C38.89 12.2568 38.833 11.915 38.833 11.5439V11.3389C38.833 10.9092 38.8965 10.5267 39.0234 10.1914C39.1504 9.85286 39.3229 9.56641 39.541 9.33203C39.7591 9.09766 40.0065 8.92025 40.2832 8.7998C40.5599 8.67936 40.8464 8.61914 41.1426 8.61914C41.5202 8.61914 41.8457 8.68424 42.1191 8.81445C42.3958 8.94466 42.6221 9.12695 42.7979 9.36133C42.9736 9.59245 43.1038 9.86589 43.1885 10.1816C43.2731 10.4941 43.3154 10.8359 43.3154 11.207V11.6123H39.3701V10.875H42.4121V10.8066C42.3991 10.5723 42.3503 10.3444 42.2656 10.123C42.1842 9.90169 42.054 9.7194 41.875 9.57617C41.696 9.43294 41.4518 9.36133 41.1426 9.36133C40.9375 9.36133 40.7487 9.40527 40.5762 9.49316C40.4036 9.5778 40.2555 9.70475 40.1318 9.87402C40.0081 10.0433 39.9121 10.25 39.8438 10.4941C39.7754 10.7383 39.7412 11.0199 39.7412 11.3389V11.5439C39.7412 11.7946 39.7754 12.0306 39.8438 12.252C39.9154 12.4701 40.0179 12.6621 40.1514 12.8281C40.2881 12.9941 40.4525 13.1243 40.6445 13.2188C40.8398 13.3132 41.0612 13.3604 41.3086 13.3604C41.6276 13.3604 41.8978 13.2952 42.1191 13.165C42.3405 13.0348 42.5342 12.8607 42.7002 12.6426L43.2471 13.0771C43.1331 13.2497 42.9883 13.4141 42.8125 13.5703C42.6367 13.7266 42.4202 13.8535 42.1631 13.9512C41.9092 14.0488 41.6081 14.0977 41.2598 14.0977Z"
            fill="white"
          />
        </svg>
      );
    }
  }

  function checkType(check) {
    switch (check) {
      // Assignment/Lab
      case "9a226b15-038b-42ca-9a4d-ebf2f13a479a": {
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <g clip-path="url(#clip0_21_271)">
              <path
                d="M18 2H6C4.9 2 4 2.9 4 4V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V4C20 2.9 19.1 2 18 2ZM9 4H11V9L10 8.25L9 9V4ZM18 20H6V4H7V13L10 10.75L13 13V4H18V20Z"
                fill="#285D9A"
              />
            </g>
            <defs>
              <clipPath id="clip0_21_271">
                <rect width="24" height="24" fill="white" />
              </clipPath>
            </defs>
          </svg>
        );
      }
      // Concept/Lecture
      case "bdd335ee-d8ae-4024-b01d-ed49d14aae9c": {
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <g clip-path="url(#clip0_21_274)">
              <path
                d="M9 13C11.21 13 13 11.21 13 9C13 6.79 11.21 5 9 5C6.79 5 5 6.79 5 9C5 11.21 6.79 13 9 13ZM9 7C10.1 7 11 7.9 11 9C11 10.1 10.1 11 9 11C7.9 11 7 10.1 7 9C7 7.9 7.9 7 9 7ZM9 15C6.33 15 1 16.34 1 19V21H17V19C17 16.34 11.67 15 9 15ZM3 19C3.22 18.28 6.31 17 9 17C11.7 17 14.8 18.29 15 19H3ZM15.08 7.05C15.92 8.23 15.92 9.76 15.08 10.94L16.76 12.63C18.78 10.61 18.78 7.56 16.76 5.36L15.08 7.05ZM20.07 2L18.44 3.63C21.21 6.65 21.21 11.19 18.44 14.37L20.07 16C23.97 12.11 23.98 6.05 20.07 2Z"
                fill="#285D9A"
              />
            </g>
            <defs>
              <clipPath id="clip0_21_274">
                <rect width="24" height="24" fill="white" />
              </clipPath>
            </defs>
          </svg>
        );
      }
      // Guide/Review
      case "e447bbe0-e681-4805-8486-924da7e2e40d": {
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="23"
            height="24"
            viewBox="0 0 23 24"
            fill="none"
          >
            <g clip-path="url(#clip0_21_278)">
              <path
                d="M17.25 23.5H10.9729C9.93792 23.5 8.92209 23.0687 8.20334 22.3212L1.2075 15.0283L3.19125 13.2746C3.78542 12.7475 4.6575 12.6421 5.35709 13.0158L7.66667 14.2425V5.09042C7.66667 3.76792 8.74 2.69458 10.0625 2.69458C10.2254 2.69458 10.3883 2.71375 10.5513 2.7425C10.6375 1.49667 11.6725 0.509583 12.9375 0.509583C13.7617 0.509583 14.4804 0.921666 14.9117 1.55417C15.1896 1.43917 15.4963 1.38167 15.8125 1.38167C17.135 1.38167 18.2083 2.455 18.2083 3.7775V4.04583C18.3617 4.01708 18.5246 3.99792 18.6875 3.99792C20.01 3.99792 21.0833 5.07125 21.0833 6.39375V19.6667C21.0833 21.7846 19.3679 23.5 17.25 23.5ZM3.9675 15.1433L9.58334 20.9892C9.9475 21.3629 10.4458 21.5833 10.9633 21.5833H17.25C18.3042 21.5833 19.1667 20.7208 19.1667 19.6667V6.39375C19.1667 6.12542 18.9558 5.91458 18.6875 5.91458C18.4192 5.91458 18.2083 6.12542 18.2083 6.39375V12H16.2917V3.7775C16.2917 3.50917 16.0808 3.29833 15.8125 3.29833C15.5442 3.29833 15.3333 3.50917 15.3333 3.7775V12H13.4167V2.90542C13.4167 2.63708 13.2058 2.42625 12.9375 2.42625C12.6692 2.42625 12.4583 2.63708 12.4583 2.90542V12H10.5417V5.09042C10.5417 4.82208 10.3308 4.61125 10.0625 4.61125C9.79417 4.61125 9.58334 4.83167 9.58334 5.09042V17.4242L4.45625 14.7121L3.9675 15.1433Z"
                fill="#285D9A"
              />
            </g>
            <defs>
              <clipPath id="clip0_21_278">
                <rect
                  width="23"
                  height="23"
                  fill="white"
                  transform="translate(0 0.5)"
                />
              </clipPath>
            </defs>
          </svg>
        );
      }
      // Test/Quiz
      case "08e635bd-3a1d-40cc-b890-b723e4228ddf": {
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <g clip-path="url(#clip0_21_281)">
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M20 3H4C2.9 3 2 3.9 2 5V19C2 20.1 2.9 21 4 21H20C21.1 21 22 20.1 22 19V5C22 3.9 21.1 3 20 3ZM20 19H4V5H20V19Z"
                fill="#285D9A"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M19.41 10.42L17.99 9L14.82 12.17L13.41 10.75L12 12.16L14.82 15L19.41 10.42Z"
                fill="#285D9A"
              />
              <path d="M10 7H5V9H10V7Z" fill="#285D9A" />
              <path d="M10 11H5V13H10V11Z" fill="#285D9A" />
              <path d="M10 15H5V17H10V15Z" fill="#285D9A" />
            </g>
            <defs>
              <clipPath id="clip0_21_281">
                <rect width="24" height="24" fill="white" />
              </clipPath>
            </defs>
          </svg>
        );
      }
      // Exam
      case "e3786dd5-4e73-41f8-bc97-1d7cffe8a313": {
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <g clip-path="url(#clip0_22_291)">
              <path
                d="M12.45 16H14.54L9.43 3H7.57L2.46 16H4.55L5.67 13H11.31L12.45 16ZM6.43 11L8.5 5.48L10.57 11H6.43ZM21.59 11.59L13.5 19.68L9.83 16L8.42 17.41L13.51 22.5L23 13L21.59 11.59Z"
                fill="#285D9A"
              />
            </g>
            <defs>
              <clipPath id="clip0_22_291">
                <rect width="24" height="24" fill="white" />
              </clipPath>
            </defs>
          </svg>
        );
      }
      // Seminar/Workshop
      case "af835041-2072-49e2-951b-f43b985573d5": {
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <g clip-path="url(#clip0_22_294)">
              <path
                d="M12 5C8.13 5 5 8.13 5 12H7C7 9.24 9.24 7 12 7C14.76 7 17 9.24 17 12H19C19 8.13 15.87 5 12 5ZM13 14.29C13.88 13.9 14.5 13.03 14.5 12C14.5 10.62 13.38 9.5 12 9.5C10.62 9.5 9.5 10.62 9.5 12C9.5 13.02 10.12 13.9 11 14.29V17.59L7.59 21L9 22.41L12 19.41L15 22.41L16.41 21L13 17.59V14.29ZM12 1C5.93 1 1 5.93 1 12H3C3 7.03 7.03 3 12 3C16.97 3 21 7.03 21 12H23C23 5.93 18.07 1 12 1Z"
                fill="#285D9A"
              />
            </g>
            <defs>
              <clipPath id="clip0_22_294">
                <rect width="24" height="24" fill="white" />
              </clipPath>
            </defs>
          </svg>
        );
      }
      default: {
        return;
      }
    }
  }

  function changeTypeToID(typeArr, type) {
    for (let i = 0; i < typeArr.length; i++) {
      if (type === typeArr[i].name) {
        return typeArr[i].id;
      }
    }
  }

  function getUnitName(array, day, unit) {
    for (let i = 0; i < array.length; i++) {
      if (array[i].day === day && array[i].unit === unit) {
        return array[i].name;
      }
    }
  }

  function getUnitTime(array, day, unit) {
    let time = 0;
    for (let i = 0; i < array.length; i++) {
      if (
        array[i].day === day &&
        array[i].unit === unit &&
        typeof array[i].tabTime !== "undefined"
      ) {
        time += array[i].tabTime;
      }
    }
    if (time === 0) {
      return 0;
    } else if (Number.isInteger(time / 60)) {
      return time / 60;
    } else {
      return (time / 60).toFixed(1);
    }
  }

  function swapStandardIdtoValue(standardArray, id) {
    for (let i = 0; i < standardArray.length; i++) {
      if (id === standardArray[i].id) {
        return standardArray[i].code;
      }
    }
  }

  function swapValuetoStandardId(value) {
    switch (value) {
      case "K1SD": {
        return "25adde40-2f90-4592-b984-b1d995a23254";
      }
      case "H4SD": {
        return "2f2d2e36-07c5-4392-a098-1a901bedebc5";
      }
      case "H7SD": {
        return "e25bffec-60cd-4f1a-818d-79370d2cd88a";
      }
      default: {
        return value;
      }
    }
  }

  function swapData(arr1, arr2) {
    let syllabusDays = [];
    let tmpTabArr = [];

    arr1.forEach((element) => {
      if (element.day !== "" && element.unit !== "") {
        tmpTabArr.push(element);
      }
    });

    let dayArr = [];
    tmpTabArr.forEach((element) => {
      if (!dayArr.includes(element.day)) dayArr.push(element.day);
    });
    dayArr.sort(compareNumbers);

    dayArr.forEach((element) => {
      syllabusDays.push({
        dayNo: element,
        status: null,
        syllabusUnits: getUnitInfor(arr1, arr2, element),
      });
    });

    return syllabusDays;
  }

  function getUnitInfor(arr1, arr2, day) {
    let tmpArr = [];

    arr2.forEach((element) => {
      let duration = parseInt(getUnitTime(arr1, element.day, element.unit));
      if (element.day === day) {
        tmpArr.push({
          unitNo: element.unit,
          name: element.name,
          duration: duration,
          syllabusUnitChapters: getTabInfor(arr1, arr2, day, element.unit),
        });
      }
    });
    return tmpArr;
  }

  function getTabInfor(arr1, arr2, day, unit) {
    let tmpArr = [];

    arr1.forEach((element) => {
      if (
        element.day === day &&
        element.unit === unit &&
        element.tabName !== ""
      ) {
        tmpArr.push({
          name: element.tabName,
          duration: element.tabTime,
          online: element.tabStatus,
          materials: [
            // {
            //   // name: "Materials",
            //   // url: "Some url",
            //   // createdBy: "94b14ba2-575d-11ed-9b6a-0242ac120002",
            //   // createdDate: "2022-10-29T18:25:43.511Z",
            //   // updatedBy: "94b14ba2-575d-11ed-9b6a-0242ac120002",
            //   // updatedDate: "2022-10-29T18:25:43.511Z",
            //   // type: "string",
            //   // materialStatus: 0,
            // },
          ],
          outputStandard: {
            id: swapValuetoStandardId(element.outputStandard),
            code: "",
            name: "",
            description: "",
          },
          deliveryType: {
            id: "08e635bd-3a1d-40cc-b890-b723e4228ddf",
          },
        });
      }
    });
    return tmpArr;
  }

  function setPieChartInfor(arr1) {
    let piechartData = [0, 0, 0, 0, 0, 0];
    let totalTime = 0;

    for (let i = 0; i < arr1.length; i++) {
      if (typeof arr1[i].tabTime !== "undefined") {
        switch (arr1[i].tabType) {
          case "9a226b15-038b-42ca-9a4d-ebf2f13a479a":
            // Assignment/Lab
            piechartData[0] += piechartData[0] + arr1[i].tabTime;
            break;

          case "bdd335ee-d8ae-4024-b01d-ed49d14aae9c":
            // concept
            piechartData[1] += piechartData[1] + arr1[i].tabTime;
            break;

          case "e447bbe0-e681-4805-8486-924da7e2e40d":
            // guide
            piechartData[2] += piechartData[2] + arr1[i].tabTime;
            break;

          case "08e635bd-3a1d-40cc-b890-b723e4228ddf":
            // test/quiz
            piechartData[3] += piechartData[3] + arr1[i].tabTime;
            break;

          case "e3786dd5-4e73-41f8-bc97-1d7cffe8a313":
            // exam
            piechartData[4] += piechartData[4] + arr1[i].tabTime;
            break;

          case "af835041-2072-49e2-951b-f43b985573d5":
            // seminar
            piechartData[5] += piechartData[5] + arr1[i].tabTime;
            break;

          default:
            break;
        }
      }
    }

    for (let i = 0; i < piechartData.length; i++) {
      totalTime += piechartData[i];
    }

    for (let i = 0; i < piechartData.length; i++) {
      let tmp = (piechartData[i] / totalTime) * 100;
      piechartData[i] = tmp.toFixed(1);
    }
    return piechartData;
  }

  if (click === "save") {
    handleSubmit(newObj);
  }
  if (click === "saveAsDraft") {
    handleSaveAsDraft(newObj);
  }

  return (
    <>
      <div className="syllabus_details_content">
        <div
          className={
            tabs === "Outline"
              ? "syllabus_details_content_header_outline"
              : tabs === "Others"
              ? "syllabus_details_content_header_others"
              : "syllabus_details_content_header"
          }
        >
          <div className="syllabus_details_content_header_class_name">
            <p className="syllabus_details_content_header_class_name_title">
              Syllabus Name*{" "}
            </p>
            <div className="syllabus_details_content_header_class_name_input">
              <input
                type="text"
                placeholder="Class name"
                className="class_name"
                name="name"
                value={name}
                onChange={(e) => setSyllabusName(e.target.value)}
                onBlur={(e) => handleValidation(e)}
                onFocus={() => setErrors("")}
              />
              {errors.name === "name" && (
                <p className="syllabus_input_errors">{errors.error}</p>
              )}
            </div>
          </div>

          <div className="syllabus_details_content_header_class_name_code">
            <p className="syllabus_details_content_header_class_name_title">
              Code:
            </p>
            <input
              type="text"
              className="syllabus_details_content_header_class_name_content"
              value={code}
              onChange={(e) => {
                setCode(e.target.value);
              }}
            />
          </div>
          <div className="syllabus_details_content_header_class_name_code">
            <p className="syllabus_details_content_header_class_name_title">
              Version:
            </p>
            <p className="syllabus_details_content_header_class_name_content">
              {version}
            </p>
          </div>
        </div>
        <div
          className={
            tabs === "Outline"
              ? "syllabus_details_content_body_outline"
              : tabs === "Others"
              ? "syllabus_details_content_body_others"
              : "syllabus_details_content_body"
          }
        >
          <NewTabContext value={tabs}>
            <NewTabList>
              <NewTab label="General" value="General" />
              <NewTab label="Outline" value="Outline" />
              <NewTab label="Others" value="Others" />
            </NewTabList>
            <TabPanel value="General">
              <div className="General_content">
                <div className="General_content_item_container">
                  <div className="General_content_item_body">
                    <div className="General_content_header">
                      <div className="General_content_item">
                        <h5 className="General_content_text">Level</h5>
                        <select
                          className="General_content_select"
                          name=""
                          id=""
                          value={syllabusLevel}
                          onChange={(e) => setSyllabusLevel(e.target.value)}
                        >
                          {listLevel.map((item, index) => (
                            <option key={index} value={item.id}>
                              {item.name}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="General_content_item">
                        <h5 className="General_content_text">
                          Attendee number
                        </h5>
                        <input
                          className="General_content_input"
                          type="number"
                          min="0"
                          value={attendeeNumber}
                          onChange={(e) => setAttendeeNumber(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="General_content_textarea">
                      <h4 className="General_content_text">
                        Technical Requirement(s)
                      </h4>
                      <textarea
                        className="General_content_textarea_Technical"
                        name="technicalRequirement"
                        value={technicalRequirement}
                        onChange={(e) => setTechnicalReq(e.target.value)}
                        onBlur={(e) => handleValidation(e)}
                        onFocus={() => setErrors("")}
                      ></textarea>
                      {errors.name === "technicalRequirement" && (
                        <p className="syllabus_input_errors">{errors.error}</p>
                      )}
                    </div>
                    <div className="General_content_textarea">
                      <h4 className="General_content_text">
                        Course Objectives
                      </h4>
                      <div id="editor">
                        <ReactQuill
                          theme="snow"
                          modules={modules}
                          value={courseObjective.courseObjective}
                          onChange={handleCrouseObjChange}
                        />
                      </div>
                      {errors.name === "courseObjective" && (
                        <p className="syllabus_input_errors">{errors.error}</p>
                      )}
                    </div>
                  </div>
                </div>
                <div>
                  <div className="timeallocation">
                    <div className="timeallocation_header">
                      <h3 className="timeallocation_header_text">
                        Time allocation
                      </h3>
                    </div>
                    <div className="timeallocation_content">
                      <ul className="timeallocation_content_items">
                        <li className="A_Lab">
                          <span>
                            Assignment/Lab ({setPieChartInfor(TabArray)[0]}
                            %)
                          </span>
                        </li>
                        <li className="C_Lec">
                          <span>
                            Concept/Lecture ({setPieChartInfor(TabArray)[1]}
                            %)
                          </span>
                        </li>
                        <li className="G_Rev">
                          <span>
                            Guide/Review ({setPieChartInfor(TabArray)[2]}%)
                          </span>
                        </li>
                        <li className="T_Qui">
                          <span>
                            Test/Quiz ({setPieChartInfor(TabArray)[3]}%)
                          </span>
                        </li>
                        <li className="Exam">
                          <span>Exam ({setPieChartInfor(TabArray)[4]}%)</span>
                        </li>
                        <li className="Semi">
                          <span>
                            Semiar/Workshop ({setPieChartInfor(TabArray)[5]}
                            %)
                          </span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </TabPanel>

            <TabPanel value="Outline">
              <div class="Outline">
                <div class="Outline_container">
                  <div class="Outline_contaier_content">
                    <div class="Outline_container_dayPack">
                      {RenderDay(
                        TabArray,
                        UnitArray,
                        type,
                        setTabArray,
                        setUnitArray,
                        setType,
                        setModel
                      )}
                    </div>
                    <div class="Outline_container_addDay">
                      <div
                        class="Outline_container_addDay_button"
                        onClick={() => setTabArray(addDay(TabArray))}
                      >
                        <div class="Outline_container_addDay_button-content">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                          >
                            <g clip-path="url(#clip0_20_148)">
                              <path
                                d="M13 7H11V11H7V13H11V17H13V13H17V11H13V7ZM12 2C6.49 2 2 6.49 2 12C2 17.51 6.49 22 12 22C17.51 22 22 17.51 22 12C22 6.49 17.51 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20Z"
                                fill="#285D9A"
                              />
                            </g>
                            <defs>
                              <clipPath id="clip0_20_148">
                                <rect width="24" height="24" fill="white" />
                              </clipPath>
                            </defs>
                          </svg>
                          Add day
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="Outline_container_footer"></div>
                </div>
                <div class="time_allocation">
                  <div className="TimeAllocation_OutLine">
                    <div className="TimeAllocation_card_OutLine">
                      <div className="TimeAllocation_card_OutLine_header">
                        Time Allocation
                      </div>
                      <div className="TimeAllocation_OutLine_PieChart">
                        <div className="PieChart">
                          <PieChart dataOfTime={setPieChartInfor(TabArray)} />
                        </div>
                        <div className="PieChart_OutLine_list">
                          <ul className="timeallocation_content_items">
                            <li className="A_Lab">
                              <span>
                                Assignment/Lab ({setPieChartInfor(TabArray)[0]}
                                %)
                              </span>
                            </li>
                            <li className="C_Lec">
                              <span>
                                Concept/Lecture ({setPieChartInfor(TabArray)[1]}
                                %)
                              </span>
                            </li>
                            <li className="G_Rev">
                              <span>
                                Guide/Review ({setPieChartInfor(TabArray)[2]}%)
                              </span>
                            </li>
                            <li className="T_Qui">
                              <span>
                                Test/Quiz ({setPieChartInfor(TabArray)[3]}%)
                              </span>
                            </li>
                            <li className="Exam">
                              <span>
                                Exam ({setPieChartInfor(TabArray)[4]}%)
                              </span>
                            </li>
                            <li className="Semi">
                              <span>
                                Semiar/Workshop ({setPieChartInfor(TabArray)[5]}
                                %)
                              </span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {Model}
              </div>
            </TabPanel>
            <TabPanel value="Others">
              <div className="other">
                <div className="item">
                  <div className="frame113">
                    <div>
                      <TimeAllocation dataOfTime={setPieChartInfor(TabArray)} />
                    </div>
                    <Card
                      className="AssessmentScheme_card"
                      style={{
                        borderRadius: "10px",
                        boxShadow: "0px 20px 40px rgba(0, 0, 0, 0.16)",
                      }}
                    >
                      <CardHeader
                        className="AssessmentScheme_card_header"
                        titleTypographyProps={{
                          fontWeight: 700,
                        }}
                        title="Assessment scheme"
                      />
                      <CardContent className="AssessmentScheme_card_content">
                        <div className="AssessmentScheme_container_1">
                          <div className="AssessmentScheme_block">
                            <div className="AssessmentScheme_block_content">
                              <p className="AssessmentScheme_text">Quiz *</p>
                              <Input
                                className="AssessmentScheme_textBox"
                                defaultValue="15%"
                                name="quiz"
                                value={quiz}
                                onChange={(e) => setQuiz(e.target.value)}
                                onBlur={(e) => handleValidation(e)}
                                onFocus={() => setErrors("")}
                              />
                            </div>
                            {errors.name === "quiz" && (
                              <p className="syllabus_input_errors">
                                {errors.error}
                              </p>
                            )}
                          </div>
                          <div className="AssessmentScheme_block">
                            <div className="AssessmentScheme_block_content">
                              <p className="AssessmentScheme_text">
                                Assignment *
                              </p>
                              <Input
                                className="AssessmentScheme_textBox"
                                name="assignment"
                                value={assignment}
                                onChange={(e) => setAssignment(e.target.value)}
                                onBlur={(e) => handleValidation(e)}
                                onFocus={() => setErrors("")}
                              />
                            </div>
                            {errors.name === "assignment" && (
                              <p className="syllabus_input_errors">
                                {errors.error}
                              </p>
                            )}
                          </div>
                          <div className="AssessmentScheme_block">
                            <div className="AssessmentScheme_block_content">
                              <p className="AssessmentScheme_text">Final *</p>
                              <Input
                                className="AssessmentScheme_textBox"
                                name="final"
                                value={final}
                                onChange={(e) => setFinal(e.target.value)}
                                onBlur={(e) => handleValidation(e)}
                                onFocus={() => setErrors("")}
                              />
                            </div>
                            {errors.name === "final" && (
                              <p className="syllabus_input_errors">
                                {errors.error}
                              </p>
                            )}
                          </div>
                        </div>
                        <div className="AssessmentScheme_container_2">
                          <div className="AssessmentScheme_block">
                            <div className="AssessmentScheme_block_content">
                              <p className="AssessmentScheme_text">
                                Final theory *
                              </p>
                              <Input
                                className="AssessmentScheme_textBox"
                                name="finalTheory"
                                value={finalTheory}
                                onChange={(e) => setFinalTheory(e.target.value)}
                                onBlur={(e) => handleValidation(e)}
                                onFocus={() => setErrors("")}
                              />
                            </div>
                            {errors.name === "finalTheory" && (
                              <p className="syllabus_input_errors">
                                {errors.error}
                              </p>
                            )}
                          </div>
                          <div className="AssessmentScheme_block">
                            <div className="AssessmentScheme_block_content">
                              <p className="AssessmentScheme_text">
                                Final practice *
                              </p>
                              <Input
                                className="AssessmentScheme_textBox"
                                name="finalPractice"
                                value={finalPractice}
                                onChange={(e) =>
                                  setFinalPractice(e.target.value)
                                }
                                onBlur={(e) => handleValidation(e)}
                                onFocus={() => setErrors("")}
                              />
                            </div>
                            {errors.name === "finalPractice" && (
                              <p className="syllabus_input_errors">
                                {errors.error}
                              </p>
                            )}
                          </div>
                        </div>
                        <div className="AssessmentScheme_container_3">
                          <p className="AssessmentScheme_b_text">
                            Passing criteria
                          </p>
                          <div className="AssessmentScheme_block">
                            <div className="AssessmentScheme_block_content">
                              <p className="AssessmentScheme_text">GPA *</p>
                              <Input
                                className="AssessmentScheme_textBox"
                                name="GPA"
                                value={GPA}
                                onChange={(e) => setGPA(e.target.value)}
                                onBlur={(e) => handleValidation(e)}
                                onFocus={() => setErrors("")}
                              />
                            </div>
                            {errors.name === "GPA" && (
                              <p className="syllabus_input_errors">
                                {errors.error}
                              </p>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                  <Card
                    className="TrainingDeliveryPrinciple_card"
                    style={{
                      borderRadius: "10px",
                      boxShadow: "0px 20px 40px rgba(0, 0, 0, 0.16)",
                    }}
                  >
                    <CardHeader
                      className="TrainingDeliveryPrinciple_card_header"
                      titleTypographyProps={{
                        fontWeight: 700,
                      }}
                      title="Training Delivery Principle"
                    />
                    <div className="trainingDeli">
                      <div className="trainingDeli_editor">
                        <div className="trainingDeli_editor_header">
                          <h3>
                            <VerifiedUserIcon />
                            Trainees
                          </h3>
                        </div>
                        <div id="text-editor">
                          <ReactQuill
                            theme="snow"
                            modules={modules}
                            value={trainees.trainees}
                            onChange={handleTraineesChange}
                          />
                        </div>
                      </div>
                      <div className="trainingDeli_editor">
                        <div className="trainingDeli_editor_header">
                          <h3>
                            <VerifiedUserIcon />
                            Trainer
                          </h3>
                        </div>
                        <div id="text-editor">
                          <ReactQuill
                            theme="snow"
                            modules={modules}
                            value={trainer.trainer}
                            onChange={handleTrainerChange}
                          />
                        </div>
                      </div>
                      <div className="trainingDeli_editor">
                        <div className="trainingDeli_editor_header">
                          <h3>
                            <VerifiedUserIcon />
                            Training
                          </h3>
                        </div>
                        <div id="text-editor">
                          <ReactQuill
                            theme="snow"
                            modules={modules}
                            value={training.training}
                            onChange={handleTrainingChange}
                          />
                        </div>
                      </div>
                      <div className="trainingDeli_editor">
                        <div className="trainingDeli_editor_header">
                          <h3>
                            <VerifiedUserIcon />
                            Re_test
                          </h3>
                        </div>
                        <div id="text-editor">
                          <ReactQuill
                            theme="snow"
                            modules={modules}
                            value={re_test.re_test}
                            onChange={handleRe_testChange}
                          />
                        </div>
                      </div>
                      <div className="trainingDeli_editor">
                        <div className="trainingDeli_editor_header">
                          <h3>
                            <VerifiedUserIcon />
                            Marking
                          </h3>
                        </div>
                        <div id="text-editor">
                          <ReactQuill
                            theme="snow"
                            modules={modules}
                            value={marking.marking}
                            onChange={handleMarkingChange}
                          />
                        </div>
                      </div>
                      <div className="trainingDeli_editor">
                        <div className="trainingDeli_editor_header">
                          <h3>
                            <VerifiedUserIcon />
                            WaiverCriteria
                          </h3>
                        </div>
                        <div id="text-editor">
                          <ReactQuill
                            theme="snow"
                            modules={modules}
                            value={waiverCriteria.waiverCriteria}
                            onChange={handleWaiverCriteriaChange}
                          />
                        </div>
                      </div>
                      <div className="trainingDeli_editor">
                        <div className="trainingDeli_editor_header">
                          <h3>
                            <VerifiedUserIcon />
                            Others
                          </h3>
                        </div>
                        <div id="text-editor">
                          <ReactQuill
                            theme="snow"
                            modules={modules}
                            value={others.others}
                            onChange={handleOthersChange}
                          />
                        </div>
                      </div>
                    </div>
                    <CardContent className="TrainingDeliveryPrinciple_card_content">
                      <div className="TrainingDeliveryPrinciple_menubar"></div>
                      <div className="frame1205">
                        <div className="frame1204"></div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabPanel>
          </NewTabContext>
        </div>
      </div>
    </>
  );
}
export default Content;
