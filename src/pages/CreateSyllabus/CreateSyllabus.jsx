import React, { useState, useEffect } from "react";
import ProgressBar from "./progressBar/progressBar";
import Content from "./content/content";
import Button from "@mui/material/Button";
import "./createSyllabus.scss";
import { useDispatch } from "react-redux";
import {
  addDraft,
  addSyllabus,
  getDraft,
} from "~/redux/actions/createSyllabus";
import Swal from "sweetalert2";
import { Badge } from "reactstrap";
import { Modal } from "@mui/material";
import { NewCard } from "./CreateSyllabusStyle";
import { useSelector } from "react-redux";
import { DeleteIcon, CopyIcon, EditIcon } from "~/components/Icons";
import { deleteDraft } from "~/redux/actions/createSyllabus";

function CreateSyllabus() {
  const [value, setValue] = useState(0);
  const [color, setColor] = useState("");
  const [tabs, setTabs] = useState("General");
  const [click, setClick] = useState("");
  const [isModalOpened, setIsModalOpened] = useState(false);

  const dispatch = useDispatch();
  console.log(click);

  useEffect(() => {
    dispatch(getDraft());
  }, []);
  const listDraft = useSelector((state) => state.syllabus.draft);
  console.log(listDraft);

  useEffect(() => {
    if (value === 0) {
      setColor("#2D3748");
      setTabs("General");
    } else if (value <= 40) {
      setColor("#285D9A");
      setTabs("Outline");
    } else if (value <= 64) {
      setColor("#D55B13");
      setTabs("Others");
    }
  }, [value]);

  const handleSubmit = (obj) => {
    console.log(obj);
    if (
      obj.name === "" ||
      obj.technicalRequirement === "" ||
      obj.courseObjective === "" ||
      obj.code === ""
    ) {
      Swal.fire({ title: "Please check our input!", icon: "warning" });
      setClick("");
    } else {
      Swal.fire({
        title: "Do you want to save the changes?",
        icon: "info",
        showCancelButton: true,
        confirmButtonColor: "#285D9A",
        cancelButtonColor: "#e74a3b",
        confirmButtonText: "Yes, save it!",
        background: "white",
      }).then((result) => {
        if (result.isConfirmed) {
          dispatch(addSyllabus(obj)).then(() => {
            // setColor("#4BB543");
            // setValue(100);
            // setClick("save");
          });
        } else if (result.dismiss) {
          setClick("");
          setValue(value);
        }
      });
    }
  };
  const handleSaveAsDraft = (obj) => {
    console.log(obj);
    if (obj.name === "") {
      Swal.fire({ title: "Syllabus Name can not null!", icon: "warning" });
      setClick("");
    } else {
      Swal.fire({
        title: "Do you want to save as draft?",
        icon: "info",
        showCancelButton: true,
        confirmButtonColor: "#285D9A",
        cancelButtonColor: "#e74a3b",
        confirmButtonText: "Yes, save it!",
        background: "#fff",
      }).then((result) => {
        if (result.isConfirmed) {
          dispatch(addDraft(obj));
        } else if (result.dismiss) {
          setClick("");
          setValue(value);
        }
      });
    }
  };
  const handleDraftOpen = () => {
    setIsModalOpened(true);
  };
  const handleDeleteDraft = (id) => {
    dispatch(deleteDraft(id));
  };

  return (
    <>
      <div className="syllabus">
        <div className="syllabus_header">
          <div className="syllabus_header_progressBar">
            <ProgressBar value={value} color={color} />
          </div>
          <div className="syllabus_header_draft">
            <Button
              className="syllabus_header_draft_button"
              onClick={handleDraftOpen}
            >
              <CopyIcon />
              Draft
            </Button>
            <Badge className="syllabus_header_draft_badge">
              {listDraft.length}
            </Badge>
          </div>
          <div className="syllabus_draft_list">
            <Modal
              open={isModalOpened}
              onClose={() => {
                setIsModalOpened(false);
              }}
            >
              <NewCard>
                <h4 className="syllabus_draft_list_header">Draft list</h4>
                {listDraft.map((item, index) => (
                  <div className="syllabus_draft_list_body">
                    <p>{index + 1}. </p>
                    <div className="syllabus_draft_list_body_content">
                      <p>{item.name}</p>
                      <p className="syllabus_draft_list_body_content_code">
                        {item.code}
                      </p>
                    </div>
                    <div className="syllabus_draft_list_body_action">
                      <a className="edit" href="">
                        <EditIcon />
                      </a>
                      <p
                        className="delete"
                        onClick={() => handleDeleteDraft(item.id)}
                      >
                        <DeleteIcon />
                      </p>
                    </div>
                  </div>
                ))}
              </NewCard>
            </Modal>
          </div>
        </div>
        <div className="syllabus_body">
          <Content
            handleSubmit={handleSubmit}
            handleSaveAsDraft={handleSaveAsDraft}
            click={click}
            tabs={tabs}
          />
        </div>
        <div className="action_button">
          <div className="action_button_left">
            {value > 0 ? (
              <Button
                className="previous"
                onClick={() => setValue(value > 0 ? value - 24 : value)}
              >
                Pervious
              </Button>
            ) : (
              ""
            )}
          </div>
          <div className="action_button_right">
            <Button className="cancel" onClick={() => setValue(0)}>
              Cancel
            </Button>
            <Button
              className="save_as_draft"
              onClick={() => setClick("saveAsDraft")}
            >
              Save as draft
            </Button>
            {value < 40 ? (
              <Button className="next" onClick={() => setValue(value + 24)}>
                Next
              </Button>
            ) : (
              <Button className="next" onClick={() => setClick("save")}>
                Save
              </Button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default CreateSyllabus;
