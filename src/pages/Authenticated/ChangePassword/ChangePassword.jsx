import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import Button from "~/components/Button";
import {
  EastIcon,
  VisibilityIcon,
  VisibilityOffIcon
} from "~/components/Icons";
import { updatePassword } from "~/redux/actions/login";
import LayoutAuthen from "../LayoutAuthen/LayoutAuthen";
import "./ChangePassword.scss";

function ChangePassword(props) {
  const otpId = useSelector((state) => state.login.otpId);
  const dispatch = useDispatch();

  const [newPasswordError, setNewPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConFirmPassword, setShowConFirmPassword] = useState(false);
  const [inputValue, setInputValue] = useState({
    newPassword: "",
    confirmPassword: "",
  });

  const hanleShowNewPassword = () => {
    setShowNewPassword(!showNewPassword);
  };

  const hanleShowConfirmPassword = () => {
    setShowConFirmPassword(!showConFirmPassword);
  };

  const handleOnChange = (e) => {
    const name = e.target.name;
    const value = e.target.value.trim();
    const input = {
      ...inputValue,
      [name]: value,
    };
    setInputValue(input);
  };

  const handleValidation = (e) => {
    const name = e.target.name;
    const value = e.target.value.trim();

    if (name === "newPassword") {
      const minLengthPattern = /.{6,}/;

      const passwordLength = value.length;
      const minLengthPassword = minLengthPattern.test(value);

      if (passwordLength === 0) {
        setNewPasswordError("Please field password.");
      } else if (!minLengthPassword) {
        setNewPasswordError("At least minumum 6 characters.");
      } else {
        setNewPasswordError("");
      }
    }

    if (name === "confirmPassword") {
      if (value.length === 0) {
        setConfirmPasswordError("Please field confirm password.");
      } else if (inputValue.confirmPassword !== inputValue.newPassword) {
        setConfirmPasswordError("Confirm password is not matched.");
      } else {
        setConfirmPasswordError("");
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newObj = {
      newPassword: inputValue.newPassword,
      confirmPassword: inputValue.confirmPassword,
      otpId: otpId,
    };
    if (newPasswordError || confirmPasswordError) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please check the field of new or confirm password!",
      });
    } else {
      try {
        dispatch(updatePassword(newObj));
      } catch (error) {
        console.log("Failed to login: ", error);
      }
    }
  };

  return (
    <LayoutAuthen>
      <div className="change-ui">
        <div className="content">
          <div className="top">
            <Button
              to="/"
              className="action-btn"
              leftIcon={<EastIcon />}
              primary
            />
          </div>

          <div className="title">
            <p className="name">Set New Password</p>
          </div>

          <form className="form" onSubmit={handleSubmit}>
            <div className="input-item">
              <div className="input-group">
                <div className="input">
                  <input
                    required
                    type={showNewPassword ? "text" : "password"}
                    name="newPassword"
                    placeholder="New Password"
                    value={inputValue.newPassword}
                    onChange={handleOnChange}
                    onBlur={handleValidation}
                  />
                  <span className="eye-icon" onClick={hanleShowNewPassword}>
                    {showNewPassword ? (
                      <VisibilityIcon />
                    ) : (
                      <VisibilityOffIcon />
                    )}
                  </span>
                </div>
                {newPasswordError && (
                  <p className="text-error">{newPasswordError}</p>
                )}
              </div>
              <div className="input-group">
                <div className="input">
                  <input
                    required
                    type={showConFirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    placeholder="ConFirm Password"
                    value={inputValue.confirmPassword}
                    onChange={handleOnChange}
                    onBlur={handleValidation}
                  />
                  <span className="eye-icon" onClick={hanleShowConfirmPassword}>
                    {showConFirmPassword ? (
                      <VisibilityIcon />
                    ) : (
                      <VisibilityOffIcon />
                    )}
                  </span>
                </div>
                {confirmPasswordError && (
                  <p className="text-error">{confirmPasswordError}</p>
                )}
              </div>
            </div>
            <Button type="submit" className="signin-btn" primary>
              Update
            </Button>
          </form>
        </div>
      </div>
    </LayoutAuthen>
  );
}

export default ChangePassword;
