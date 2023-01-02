import React from "react";
import { useSelector, useDispatch } from "react-redux";
import classNames from "classnames/bind";
import PropTypes from "prop-types";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { DeleteIcon } from "~/components/Icons";
import LabelStatus from "~/components/LabelStatus";
import styles from "./SyllabusCreate.scss";
import Button from "~/components/Button";
import {
  deleteSyllabusForTP,
  updateListSyllabusForTP,
} from "~/redux/actions/programSyllabus";

const cx = classNames.bind(styles);

function SyllabusCreate() {
  const listSyllabusChoose = useSelector(
    (state) => state.programSyllabus.listSyllabusChoose
  );

  const dispatch = useDispatch();

  function handleOnDragEnd(result) {
    if (!result.destination) return;
    const items = Array.from(listSyllabusChoose);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    dispatch(updateListSyllabusForTP(items));
  }

  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <Droppable droppableId="droppable">
        {(provided, snapshot) => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            {listSyllabusChoose?.map((syllabus, index) => {
              return (
                <Draggable
                  style={{ width: "70%", margin: "0 auto" }}
                  key={syllabus.id}
                  draggableId={syllabus.id}
                  index={index}
                >
                  {(provided, snapshot) => (
                    <div
                      className={cx("syllabus-1")}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      ref={provided.innerRef}
                    >
                      <div className={cx("syllabus")}>
                        <div className={cx("program-name")}>
                          <p>{syllabus.name}</p>
                          {syllabus.status === "ACTIVE" ? (
                            <LabelStatus active>Active</LabelStatus>
                          ) : (
                            <LabelStatus active>Inactive</LabelStatus>
                          )}
                        </div>
                        <div className={cx("syllabus-meta")}>
                          <span>
                            {syllabus.code} {syllabus.version}
                          </span>
                          <span>|</span>
                          <span>
                            {syllabus.days} days ({syllabus.hours} hours)
                          </span>
                          <span>|</span>
                          <span>
                            Modified on{" "}
                            <i>{syllabus.updatedOn?.slice(undefined, 10)}</i> by{" "}
                            <strong> {syllabus.nameUpdatedBy}</strong>
                          </span>
                        </div>
                      </div>
                      <Button
                        onClick={(e) =>
                          dispatch(deleteSyllabusForTP(syllabus.id))
                        }
                        className={cx("remove-buton")}
                      >
                        <DeleteIcon />
                      </Button>
                    </div>
                  )}
                </Draggable>
              );
            })}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}

SyllabusCreate.propTypes = {
  handleOnDragEnd: PropTypes.func,
  data: PropTypes.array,
};

export default SyllabusCreate;
