import React, { useState } from "react";
import "./viewClass.scss";
import "../../components/Icons/Icon"
import IconEdit from "./images/create.svg";
import IconChangeRole from "./images/male.svg";
import IconDeActiveUser from "./images/visibility_off.svg";
import IconDeleteUser from "./images/delete_forever.svg";
import IconSub from "./images/arrow_forward_ios.svg";

const data = [
  {
    name: "Edit User",
    icon: IconEdit,
    class: "option",
    classChild: "text-option",
    iconSub: false,
  },
  {
    name: "Change role",
    icon: IconChangeRole,
    class: "option",
    classChild: "text-option",
    iconSub: true,
  },
  {
    name: "De-activate use",
    icon: IconDeActiveUser,
    class: "option",
    classChild: "text-option",
    iconSub: false,
  },
  {
    name: "Delete user",
    icon: IconDeleteUser,
    class: "option",
    classChild: "text-option",
    iconSub: false,
  },
];
const submenu = ["Class Admin", "Trainer", "Student"];

export function UserManage() {
  const [show, setShow] = useState(false);

  const handle = () => {
    setShow(!show);
  };

  const item = data.map((data, index) => (
    <li key={index} className={data.class}>
      <img src={data.icon} alt="Icon" />
      <p className={data.classChild}>{data.name}</p>
      {data.iconSub && (
        <img
          className="icon-sub"
          src={IconSub}
          onClick={handle}
          alt="Icon-sub"
        />
      )}
    </li>
  ));

  return (
    <ul className="box">
      <p className="title">Manage</p>
      <div className="line"></div>
      {item}
      {show && <div className="submenu">{submenu.map((item,index)=> (<li className="text-sub" key={index}>{item}</li>))}</div>}
    </ul>
  );
}
