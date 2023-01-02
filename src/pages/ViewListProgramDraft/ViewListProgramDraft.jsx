import React, { useEffect, useState } from "react";
import { EllipsisOutlined } from "@ant-design/icons";
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import classNames from "classnames/bind";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { clearProgramSyllabusToSaveComplete, getListProgramSyllabusDraft } from "~/redux/actions/programSyllabus";
import styles from "./ViewListProgramDraft.module.scss";
import { Btn } from "./mui";
import { AddNewIcon } from "~/components/Icons";
import LabelStatus from "~/components/LabelStatus";
import MenuProgramDraft from "~/components/Poper/MenuProgramDraft";
import { setModeCreate } from "~/redux/actions/mode";

const cx = classNames.bind(styles);

function ViewListProgramDraft() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const listProgramDraft = useSelector(
    (state) => state.programSyllabus.listProgramSyllabusDraft
  );

  useEffect(() => {
    dispatch(getListProgramSyllabusDraft());
  }, []);

  const [filter, setFilters] = useState({ page: 1, size: 5 });
  const handlePageSizeChange = (e, size) => {
    setFilters((prevFilters) => ({ ...prevFilters, size: size.props.value }));
  };

  return (
    <div className={cx("wrapper")}>
      <div className={cx("page-header")}>
        <p className={cx("title")}>Training program</p>
      </div>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          paddingRight: "30px",
          paddingLeft: "30px",
        }}
      >
        <p className={cx("list-title")}>List Draft</p>
        <Btn
          onClick={() => {
            navigate(`/program/create_program_name`);
            dispatch(setModeCreate());
            dispatch(clearProgramSyllabusToSaveComplete());
          }}
          sx={{
            backgroundColor: "#285d9a",
            width: "fit-content",
            height: "38px",
          }}
        >
          <AddNewIcon />
          Add New Draft
        </Btn>
      </Box>

      <div style={{ padding: "0px 30px" }}>
        <TableContainer component={Paper}>
          <Table
            sx={{
              minWidth: 700,
              "css-1ndpvdd-MuiTableCell-root": {
                padding: "4px 26px",
              },
              ".css-1ex1afd-MuiTableCell-root": {
                padding: "4px 26px ",
                fontSize: "14px",
                borderBottom: "0.5px solid #2D3748",
              },
              ".css-1ygcj2i-MuiTableCell-root": {
                padding: "8px 26px",
                color: "#fff",
                fontSize: "16px",
                fontWeight: "700",
              },
              ".css-15wwp11-MuiTableHead-root": {
                backgroundColor: "#2D3748 ",
              },
              ".css-ahj2mt-MuiTypography-root": {
                fontSize: "14px",
                fontWeight: "700",
              },
              ".css-11xur9t-MuiPaper-root-MuiTableContainer-root": {
                borderRadius: "10px",
              },
              ".css-1hnv1ct-MuiTable-root": {
                position: "relative",
              },
            }}
            aria-label="customized table"
          >
            <TableHead>
              <TableRow>
                <TableCell align="left" width={100}>
                  ID
                </TableCell>
                <TableCell align="left" width={500}>
                  Program name
                </TableCell>
                <TableCell align="left">Created on</TableCell>
                <TableCell align="left">Created by</TableCell>
                <TableCell align="left">Duration</TableCell>
                <TableCell align="left">Status</TableCell>
                <TableCell align="right"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {listProgramDraft.map((program, index) => (
                <TableRow key={program.id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>
                    <Link to={`/program/view_program/${program.id}`}>
                      <Typography className={cx("program-name")}>
                        {program.name}
                      </Typography>
                    </Link>
                  </TableCell>
                  <TableCell>
                    {moment(program.createdOn).format("DD/MM/YYYY")}
                  </TableCell>
                  <TableCell>{program.nameCreatedBy}</TableCell>
                  <TableCell>{program.days} days</TableCell>
                  <TableCell>
                    <LabelStatus draft>{program.status}</LabelStatus>
                  </TableCell>
                  <TableCell
                    sx={{
                      textAlign: "end",
                      padding: "4px 26px",
                      borderBottom: "0.5px solid #2D3748",
                    }}
                  >
                    <MenuProgramDraft
                      programDraftId={program.id}
                      programDraft={program}
                      filter={filter}
                    >
                      <EllipsisOutlined
                        style={{
                          fontSize: "34px",
                          fontWeight: "bold",
                          paddingLeft: "40px",
                          color: "#285d9a",
                        }}
                      />
                    </MenuProgramDraft>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <TablePagination
          rowsPerPageOptions={[5, 10, 15]}
          component="div"
          rowsPerPage={filter.size}
          onRowsPerPageChange={handlePageSizeChange}
          sx={{
            ".css-levciy-MuiTablePagination-displayedRows": {
              display: "none",
            },
            ".MuiTablePagination-actions": {
              display: "none",
            },
            ".css-n5xlqt-MuiTablePagination-root": {
              display: "inline-block",
              float: "right",
            },
            ".css-78c6dr-MuiToolbar-root-MuiTablePagination-toolbar": {
              fontSize: "16px !important",
            },
            "p.MuiTablePagination-selectLabel": {
              fontSize: "16px !important",
              color: "black",
            },
          }}
        />
      </div>
    </div>
  );
}

export default ViewListProgramDraft;
