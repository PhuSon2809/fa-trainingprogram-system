import React, { useState, useEffect } from "react";
import classNames from "classnames/bind";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Typography } from "@mui/material";
import Paper from "@mui/material/Paper";
import { Link } from "react-router-dom";
import { EllipsisOutlined } from "@ant-design/icons";
import TablePagination from "@mui/material/TablePagination";
import moment from "moment";
import { useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styled from "styled-components";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

import styles from "./SyllabusTable.module.scss";
import { SortIcon } from "~/components/Icons";
import Menu from "~/components/Poper/SallybusMenu";
import { sortSyllabus } from "~/redux/actions/syllabusList";
import { useSelector } from "react-redux";

const cx = classNames.bind(styles);

function SyllabusTable({ syllabusList, handlePageSizeChange, filter }) {
  const dispatch = useDispatch();
  const { searchValue, loading } = useSelector((store) => store.syllabus);

  const [optionsSort, setOptionsSort] = useState({
    isSorted: false,
    field: "name",
    type: "ASC",
  });

  const handleSort = (field) => {
    if (searchValue.length === 0) {
      setOptionsSort({
        isSorted: !optionsSort.isSorted,
        field,
        type: `${optionsSort.isSorted ? "DESC" : "ASC"} `,
      });
      dispatch(sortSyllabus(optionsSort, filter));
    } else {
      return;
    }
  };

  const OutputStandard = (outputStandard) => {
    return outputStandard.map((item) => {
      return <Label key={item?.id}>{item?.code}</Label>;
    });
  };

  return (
    <div className={cx("wrapper")}>
      <ToastContainer autoClose={2000} />
      <TableContainer
        component={Paper}
        sx={{
          ".MuiPaper-root MuiPaper-elevation MuiPaper-rounded MuiPaper-elevation1 MuiTableContainer-root css-19pghvx-MuiPaper-root-MuiTableContainer-root":
            {
              borderTopLeftRadius: "10px !important",
              borderTopRightRadius: "10px !important",
            },
        }}
      >
        <Table
          sx={{
            minWidth: 700,
            ".css-1ex1afd-MuiTableCell-root": {
              padding: "8px 26px ",
              fontSize: "14px",
              borderBottom: "0.5px solid #2D3748",
            },
            ".css-1ygcj2i-MuiTableCell-root": {
              padding: "8px 26px",
              color: "#fff",
              fontSize: "14px",
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
              <TableCell>
                Syllabus{" "}
                <span
                  style={{ cursor: "pointer" }}
                  onClick={() => handleSort("name")}
                >
                  <SortIcon />
                </span>
              </TableCell>
              <TableCell align="left">
                Code{" "}
                <span
                  style={{ cursor: "pointer" }}
                  onClick={() => handleSort("code")}
                >
                  <SortIcon />
                </span>
              </TableCell>
              <TableCell align="left">
                Created on{" "}
                <span
                  style={{ cursor: "pointer" }}
                  onClick={() => handleSort("CREATEDDATE ")}
                >
                  <SortIcon />
                </span>
              </TableCell>
              <TableCell align="left">
                Created by{" "}
                <span
                  style={{ cursor: "pointer" }}
                  onClick={() => handleSort("CREATEDBYUSER")}
                >
                  <SortIcon />
                </span>
              </TableCell>
              <TableCell align="left">
                Duration{" "}
                <span
                  style={{ cursor: "pointer" }}
                  onClick={() => handleSort("days")}
                >
                  <SortIcon />
                </span>
              </TableCell>
              <TableCell align="left">Output standard </TableCell>
              <TableCell align="left"></TableCell>
            </TableRow>
          </TableHead>
          {loading ? (
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                width: "100%",
              }}
            >
              <CircularProgress />
            </Box>
          ) : (
            <TableBody>
              {syllabusList?.map((syllabus) => (
                <TableRow
                  key={syllabus?.id}
                  sx={{
                    ".css-1ex1afd-MuiTableCell-root": {
                      padding: "8px 24px !important",
                    },
                  }}
                >
                  <TableCell>
                    <Link to={`/syllabus/view_syllabus/${syllabus.id}`}>
                      <Typography className={cx("syllabus-name")}>
                        {syllabus?.name}
                      </Typography>
                    </Link>
                  </TableCell>
                  <TableCell>{syllabus?.code}</TableCell>
                  <TableCell>
                    {moment(syllabus?.createdDate).format("DD/MM/YYYY")}
                  </TableCell>
                  <TableCell>{syllabus.createdByUser?.fullname}</TableCell>
                  <TableCell>{syllabus?.days} days</TableCell>
                  <TableCell>
                    {OutputStandard(syllabus?.outputStandardCovered)}
                  </TableCell>
                  <TableCell>
                    <Menu id={syllabus?.id} filter={filter} syllabus={syllabus}>
                      <EllipsisOutlined
                        style={{ fontSize: "34px", paddingLeft: "40px" }}
                      />
                    </Menu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          )}
        </Table>
      </TableContainer>

      {searchValue.length === 0 ? (
        <TablePagination
          rowsPerPageOptions={[10, 15, 20]}
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
              marginTop: "50px !important",
            },
            ".css-pdct74-MuiTablePagination-selectLabel": {
              fontSize: "14px",
            },
            ".css-194a1fa-MuiSelect-select-MuiInputBase-input": {
              fontSize: "14px",
              fontWeight: "bold",
            },
          }}
        />
      ) : null}
    </div>
  );
}

const Label = styled.label`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background-color: #2d3748;
  color: #fff;
  padding: 5px 12px;
  border-radius: 50px;
  width: 72px;
  height: 27px;
  margin-right: 4px;
`;

export default SyllabusTable;
