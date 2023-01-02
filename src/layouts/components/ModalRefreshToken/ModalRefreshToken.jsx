import React from "react";
import { Modal } from "reactstrap";
import Button from "~/components/Button";
import CableIcon from "@mui/icons-material/Cable";
import "./ModalRefreshToken.scss";
import { useDispatch } from "react-redux";
import { refreshTokenToReset } from "~/redux/actions/login";
import { useSelector } from "react-redux";

function ModalRefreshToken({ modalOpen, showModal }) {
  const dispatch = useDispatch();

  const refreshToken = useSelector((state) => state.login.refreshToken);

  const handleRefreshToken = () => {
    const refreshTokenObj = {
      refreshToken: refreshToken,
    };
    dispatch(refreshTokenToReset(refreshTokenObj));
    showModal();
  };

  return (
    <Modal
      contentClassName="token shadow"
      centered
      backdrop="static"
      isOpen={modalOpen}
      toggle={showModal}
    >
      <div className="modal-title">
        <div className="name">
          <p>NOTIFICATION</p>
        </div>
      </div>

      <div className="content">
        <div className="icon">
          <CableIcon sx={{ fontSize: "90px" }} />
        </div>

        <div className="notifica">
          <p>Your login session has expired!</p>
          <p>
            Please press the <span>button</span> to log back in.
          </p>
        </div>
      </div>

      <div className="footer">
        <Button className="action-btn" onClick={() => handleRefreshToken()}>
          Refresh
        </Button>
      </div>
    </Modal>
  );
}

export default ModalRefreshToken;
