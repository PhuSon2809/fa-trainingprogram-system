import React, { useState } from "react";
import PersonIcon from "@mui/icons-material/Person";
import { blue } from "@mui/material/colors";
import {
  Box,
  Chip,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  TableSortLabel,
} from "@mui/material";
import SortIcon from "@mui/icons-material/Sort";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

import axios from "axios";
import { useEffect } from "react";
import PropTypes from "prop-types"; // ES6

import { TableRows } from "@mui/icons-material";
import axiosClient from "~/apis/axiosClient";

function getBirthdate(birthdate) {
  const date = birthdate !== null ? birthdate + "" : "no data";
  return date.slice(0, 10);
}

//sorting func sec.
function descendingComparator(a, b, orderBy) {
  if (orderBy === "role.name") {
    if (b["role"]["name"] < a["role"]["name"]) {
      return -1;
    }
    if (b["role"]["name"] > a["role"]["name"]) {
      return 1;
    }
    return 0;
  }
  if (orderBy === "birthday") {
    const bdate =
      b[orderBy] !== null ? new Date(getBirthdate(b[orderBy])) : new Date();
    const adate =
      a[orderBy] !== null ? new Date(getBirthdate(a[orderBy])) : new Date();
    if (bdate < adate) {
      return -1;
    }
    if (bdate > adate) {
      return 1;
    }
    return 0;
  }
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  {
    id: "id",
    label: "ID",
  },
  {
    id: "fullname",
    label: "Fullname",
  },
  {
    id: "email",
    label: "Email",
  },
  {
    id: "birthday",
    label: "Date of Birth",
  },
  {
    id: "gender",
    label: "Gender",
  },
  {
    id: "level",
    label: "Level",
  },
  {
    id: "role.name",
    label: "Type",
  },
  {
    id: "status",
    label: "Status",
  },
];
function EnhancedTableHead(props) {
  const { order, orderBy, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead
      sx={{
        "&.MuiTableHead-root": {
          height: "40px",
          borderRadius: "10px 10px 0px 0px",
          marginTop: "40px",
        },
        ".MuiTableRow-head th": {
          backgroundColor: "#2D3748",
          color: "white",
          fontFamily: "Inter",
          fontSize: "14px",
          fontWeight: 500,
        },
        "tr:first-child th:first-child": {
          borderTopLeftRadius: "10px",
        },
        "tr:first-child th:last-child": {
          borderTopRightRadius: "10px",
        },
      }}
    >
      <TableRow>
        {headCells.map((headCell, index) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
              hideSortIcon="false"
              IconComponent={SortIcon}
              sx={{
                color: "white!important",
                "&:hover": { color: "white" },
              }}
            >
              {headCell.label}
            </TableSortLabel>
          </TableCell>
        ))}
        <TableCell>Options</TableCell>
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
};

//source: https://codesandbox.io/s/xmp5ee?file=/demo.js:2206-2653
//source above, end

//

//presentation
const colorStatus = new Map();
colorStatus.set("ON_BOARDING", { name: "On boarding", color: "#D45B13" });
colorStatus.set("OFF_CLASS", { name: "Off class", color: "#8B8B8B" });
colorStatus.set("IN_CLASS", { name: "In class", color: "#2D3748" });
colorStatus.set("ACTIVE", { name: "Active", color: "#2D3748" });
colorStatus.set("DEACTIVE", { name: "Deactive", color: "" });

const colorRole = new Map();
colorRole.set("Student", { name: "Student", color: "#2D3748" });
colorRole.set("Officer", { name: "Officer", color: "#2D3748" });
colorRole.set("Trainer", { name: "Trainer", color: "#2D3748" });
colorRole.set("Class Admin", { name: "Class Admin", color: "#4DB848" });
colorRole.set("Admin", { name: "Admin", color: "#4DB848" });
colorRole.set("Guest", { name: "Guest", color: "#2D3748" });
colorRole.set("Super Admin", { name: "Super Admin", color: "#4DB848" });

function CustomChip(key, values) {
  return (
    <>
      <Chip
        label={values.get(key).name}
        sx={{
          color: "white",
          backgroundColor: values.get(key).color,
          fontSize: 14,
          fontFamily: "Roboto",
          fontWeight: "400",
          paddingLeft: "4px",
          paddingRight: "4px",
        }}
      ></Chip>
    </>
  );
}

function Users() {
  const [page, setPage] = useState(1);
  const [rows, setrows] = useState([]);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const emptyRows =
    page > 0 ? Math.max(0, page * rowsPerPage - rows.length) : 0;

  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("id");

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(1);
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const token = axiosClient.getToken();

  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  useEffect(() => {
    axios.get("/users?page=1&size=481", config).then((data) => {
      setrows(data.data);
    });
  }, []);
  return (
    <>
      <div>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
        />

        <TableContainer>
          <Table sx={{ marginTop: "40px" }}>
            <EnhancedTableHead
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
            />
            <TableBody>
              {stableSort(rows, getComparator(order, orderBy))
                .slice(
                  (page - 1) * rowsPerPage,
                  (page - 1) * rowsPerPage + rowsPerPage
                )
                .map((row, index) => (
                  <TableRow key={row.id}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell
                      sx={{
                        fontFamily: "inter",
                        fontWeight: "600",
                        fontSize: 14,
                      }}
                    >
                      {row.fullname}
                    </TableCell>
                    <TableCell
                      sx={{
                        fontFamily: "inter",
                        fontSize: "14px",
                        lineHeight: "17px",
                        fontWeight: 400,
                      }}
                    >
                      {row.email}
                    </TableCell>
                    <TableCell
                      sx={{
                        fontFamily: "inter",
                        fontSize: "14px",
                        lineHeight: "17px",
                        fontWeight: 400,
                      }}
                    >
                      {getBirthdate(row.birthday)}
                    </TableCell>
                    <TableCell>
                      {row.gender === "FEMALE" ? (
                        <PersonIcon
                          sx={{
                            color: "#e74a3b",
                            fontSize: 30,
                          }}
                        />
                      ) : (
                        <PersonIcon
                          sx={{
                            color: blue[900],
                            fontSize: 30,
                          }}
                        />
                      )}
                    </TableCell>
                    <TableCell>{row.level}</TableCell>
                    <TableCell>
                      {CustomChip(row.role.name, colorRole)}
                    </TableCell>
                    <TableCell>{CustomChip(row.status, colorStatus)}</TableCell>
                    <TableCell>
                      <MoreHorizIcon fontSize="medium" />
                    </TableCell>
                  </TableRow>
                ))}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: 65 * emptyRows,
                  }}
                >
                  <TableCell colSpan={9}></TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              paddingTop: "30px",
            }}
          >
            <div></div>
            <Pagination
              count={Math.ceil(rows.length / rowsPerPage)}
              page={page}
              onChange={handleChangePage}
              showFirstButton
              showLastButton
              sx={{
                fontFamily: "Inter",
                fontSize: "14px",
                fontWeight: "600",
                ".MuiButtonBase-root": {
                  backgroundColor: "#E2E8F0 !important",
                  color: "#285D9A",
                  fontFamily: "Inter!important",
                  fontSize: "12px!important",
                  fontWeight: "600!important",
                },
                ".MuiButtonBase-root.Mui-selected": {
                  backgroundColor: "#285D9A !important",
                  color: "#F7FAFB",
                },
              }}
            />

            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page - 1}
              onRowsPerPageChange={handleChangeRowsPerPage}
              onPageChange={handleChangePage}
              sx={{
                fontSize: "14px",
                ".MuiTablePagination-selectLabel": {
                  fontSize: "14px",
                },
                "p.MuiTablePagination-displayedRows": {
                  display: "none",
                },
                ".MuiTablePagination-actions": {
                  display: "none",
                },
              }}
            />
          </Box>
        </TableContainer>
      </div>
    </>
  );
}

export default Users;
