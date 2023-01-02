import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import Button from "~/components/Button";
import { EastIcon } from "~/components/Icons";
import config from "~/config";
import { sendOTP } from "~/redux/actions/login";
import LayoutAuthen from "../LayoutAuthen/LayoutAuthen";
import "./ForgotPassword.scss";

function ForgotPassword() {
  const error = useSelector((state) => state.login.error);
  const dispatch = useDispatch();

  const [emailError, setEmailError] = useState("");
  const [inputValue, setInputValue] = useState({
    email: "",
  });

  const handleOnChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    const input = {
      ...inputValue,
      [name]: value,
    };
    setInputValue(input);
  };

  const handleValidation = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    if (name === "email") {
      const specialEmailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

      const emailLength = value.length;
      const specialCharReg = specialEmailPattern.test(value);

      let errorEmail = "";
      if (emailLength === 0) {
        errorEmail = "Please field your email.";
      } else if (!specialCharReg) {
        errorEmail = "Your email is not in the correct format.";
      } else {
        errorEmail = "";
      }
      setEmailError(errorEmail);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (emailError) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please check your email input!",
      });
    } else {
      dispatch(sendOTP(inputValue));
    }
  };

  return (
    <LayoutAuthen>
      <div className="forgot-assword-ui">
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
            <p className="name">Reset Password</p>
            <p className="contact">
              If you don’t have the account, please contact{" "}
              <a href="https://mail.google.com/mail/u/0/?view=cm&fs=1&tf=1&to=FA.HCM%40fsoft.com.vn&cc=&bcc=&su=Create%20Account&body=Please%20fill%20out%20all%20information%20in%20order%20for%20us%20to%20create%20a%20new%20account%20for%20you.%20We%20will%20consider%20your%20account%20valid%20and%20save%20it%20on%20the%20system.%0ANote%3A%20We%20will%20use%20the%20email%20account%20you%20send%20us%20to%20create%20your%20account%20so%20make%20sure%20to%20use%20the%20email%20account%20you%20wanted.%0A%0AFull%20name%28ex%3A%20Nguy%E1%BB%85n%20V%C4%83n%20A%29%3A%20%0AGender%28ex%3A%20male%2Ffemail%29%3A%20%0ABirthday%28ex%3A%202000-11-20%29%3A%20%0A%0AThank%20you%20and%20Warmest%20Regards.">
                FA.HCM@fsoft.com.vn
              </a>
            </p>
          </div>

          <form className="form" onSubmit={handleSubmit}>
            <div className="input-group">
              <div className="input">
                <input
                  required
                  name="email"
                  placeholder="Enter Email"
                  value={inputValue.email}
                  onChange={handleOnChange}
                  onBlur={handleValidation}
                />
              </div>
              {emailError && <p className="text-error">{emailError}</p>}
            </div>
            {error === "success" ? (
              <Link to={config.routes.verificationOTP}>
                <Button type="submit" className="signin-btn" primary>
                  Send OTP
                </Button>
              </Link>
            ) : (
              <Button type="submit" className="signin-btn" primary>
                Send OTP
              </Button>
            )}
          </form>
        </div>
      </div>
    </LayoutAuthen>
  );
}

export default ForgotPassword;
