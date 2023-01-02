import { MailOutlined } from "@ant-design/icons";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import Button from "~/components/Button";
import { EastIcon } from "~/components/Icons";
import config from "~/config";
import { verificationOTP } from "~/redux/actions/login";
import LayoutAuthen from "../LayoutAuthen/LayoutAuthen";
import "./VerificationOTP.scss";

function VerificationOTP() {
  const otpId = useSelector((state) => state.login.otpId);
  const emailOTP = useSelector((state) => state.login.emailOTP);
  const error = useSelector((state) => state.login.error);
  const dispatch = useDispatch();

  const [otpError, setOtpError] = useState("");
  const [otp, setOtp] = useState("");

  const handleValidation = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    if (name === "otp") {
      const emailLength = value.length;

      let errorEmail = "";
      if (emailLength === 0) {
        errorEmail = "Please field your otp.";
      } else {
        errorEmail = "";
      }
      setOtpError(errorEmail);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const otpObj = {
      otp: otp,
      otpId: otpId,
    };
    if (otpError) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please check your OTP input!",
      });
    } else {
      dispatch(verificationOTP(otpObj));
      console.log("Successfully submitted");
    }
  };

  return (
    <LayoutAuthen>
      <div className="verification-otp-ui">
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
            <p className="name">Verification OTP</p>
            <MailOutlined style={{ fontSize: "100px", color: "#2d3748" }} />
            <div className="contact">
              <p>Verification code has been sent to email address</p>
              <span>{emailOTP}</span>
              <p>Please check</p>
            </div>
          </div>

          <form className="form" onSubmit={handleSubmit}>
            <div className="input-group">
              <div className="input">
                <input
                  required
                  name="otp"
                  placeholder="Enter OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  onBlur={handleValidation}
                />
              </div>
              {otpError && <p className="text-error">{otpError}</p>}
            </div>
            {error === "success" ? (
              <Link to={config.routes.changePasswod}>
                <Button type="submit" className="signin-btn" primary>
                  Confirm
                </Button>
              </Link>
            ) : (
              <Button type="submit" className="signin-btn" primary>
                Confirm
              </Button>
            )}
          </form>
        </div>
      </div>
    </LayoutAuthen>
  );
}

export default VerificationOTP;
