import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
  getUserInformation,
  putUserInformation,
  putUserInformationImg,
} from "~/redux/actions/userInformation";
import { EditIcon } from "~/components/Icons";
import { Modal } from "antd";
import DatePicker from "react-datepicker";
import "./UserInfor.scss";
import CameraAltOutlinedIcon from "@mui/icons-material/CameraAltOutlined";

function UserInformation() {
  const [avatar, setAvatar] = useState("");
  const [fullName, setFullName] = useState("");
  const [gender, setGender] = useState("male");
  const [birthday, setBirthday] = useState(new Date());
  const [showImage, setShowImage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalChangeImgOpen, setIsModalChangeImgOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const setDefault = () => {
    setFullName("");
    setGender("male");
    setBirthday("");
    setIsModalChangeImgOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
    setIsModalChangeImgOpen(false);
    setDefault();
  };

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUserInformation());
  }, []);
  const userInfor = useSelector((state) => state.userInfor.userInformation);

  const obj = {
    fullname: fullName,
    birthday: birthday,
    gender: gender,
  };

  const showModalChangeImg = () => {
    setIsModalChangeImgOpen(true);
  };

  const handleChangeImg = () => {
    const imgObj = {
      avatar,
    };
    const formData = new FormData();
    formData.append("image", avatar);
    console.log(imgObj);
    dispatch(putUserInformationImg(formData));
    setDefault();
  };

  const handleSetAvatar = (e) => {
    e.preventDefault();
    const image = e.target.files[0];
    if (image) {
      setAvatar(image);
      const file = image;
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setShowImage(reader.result);
      };
    } else {
      setAvatar("");
    }
  };

  const handleSubmit = () => {
    console.log(obj);
    dispatch(putUserInformation(obj));
    setDefault();
  };

  return (
    <div className="user_infor">
      <div className="user_infor_header">
        <div className="user_infor_header_content">
          <h3>User Information</h3>
          <button className="edit_btn" onClick={showModal}>
            <EditIcon />
          </button>
          <Modal
            title="Update information"
            open={isModalOpen}
            onCancel={() => {
              setIsModalOpen(false);
            }}
          >
            <div className="user_infor_header_content_edit">
              <h5>Name: </h5>
              <input
                type="text"
                value={fullName}
                onChange={(e) => {
                  setFullName(e.target.value);
                }}
              />
            </div>
            <div className="user_infor_header_content_edit">
              <h5>Birthday: </h5>
              <DatePicker
                closeOnScroll={(e) => e.target === document}
                selected={birthday}
                onChange={(date) => setBirthday(date)}
              />
            </div>
            <div className="user_infor_header_content_edit">
              <h5>Gender: </h5>
              <select
                name="gender"
                value={gender}
                onChange={(e) => {
                  setGender(e.target.value);
                }}
              >
                <option value="male">MALE</option>
                <option value="female">FEMALE</option>
              </select>
            </div>
            <div className="user_infor_header_content_edit_btn">
              <button onClick={handleSubmit}>Update</button>
              <button onClick={handleCancel}>Cancel</button>
            </div>
          </Modal>
        </div>
      </div>
      <div className="user_infor_body">
        <div className="user_infor_body_avatar">
          <img src={userInfor?.avatar} alt="Avatar" />
          <CameraAltOutlinedIcon onClick={showModalChangeImg} />
          <Modal
            title="Update avatar"
            open={isModalChangeImgOpen}
            onCancel={() => {
              setIsModalChangeImgOpen(false);
            }}
          >
            <div className="user_infor_body_avatar_edit">
              {showImage !== null && <img src={showImage} alt="" />}
              <input
                type="file"
                id="avatar"
                name="avatar"
                accept="image/*"
                onChange={(e) => handleSetAvatar(e)}
              />
            </div>
            <div className="user_infor_header_content_edit_btn">
              <button onClick={handleChangeImg}>Update</button>
              <button onClick={handleCancel}>Cancel</button>
            </div>
          </Modal>
        </div>
        <div className="user_infor_body_content">
          <div className="user_infor_body_content_filed">
            <h5>Name: </h5>
            <p>{userInfor?.fullname}</p>
          </div>
          <div className="user_infor_body_content_filed">
            <h5>Email: </h5>
            <p>{userInfor?.email}</p>
          </div>
          <div className="user_infor_body_content_filed">
            <h5>Birthday: </h5>
            <p>{userInfor?.birthday?.slice(0, 10)}</p>
          </div>
          <div className="user_infor_body_content_filed">
            <h5>Gender: </h5>
            <p>{userInfor?.gender}</p>
          </div>
          <div className="user_infor_body_content_filed">
            <h5>Role: </h5>
            <p>{userInfor?.role?.name}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserInformation;
