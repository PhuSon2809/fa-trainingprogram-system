import React, { useCallback, useState, useEffect } from "react";
import { AppBar, Box, TablePagination, Toolbar } from "@mui/material";
import Pagination from "@mui/material/Pagination";
import { DataGrid } from "@mui/x-data-grid";
import className from "classnames/bind";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import MenuPopup from "src/pages/ViewListProgram/components/Poper/MenuPopup";
import { CopyIcon, MoreHorizontalIcon } from "~/components/Icons";
import {
  AddNewIcon,
  FilterListIcon,
  ImportIcon,
  SearchIcon,
  SortIcon,
} from "~/components/Icons/Icon";
import LabelStatus from "~/components/LabelStatus";
import config from "~/config";
import { setModeCreate } from "~/redux/actions/mode";
import { clearProgramSyllabusToSaveComplete, getListProgramSyllabusDraft } from "~/redux/actions/programSyllabus";
import {
  getListTrainingProgram,
  getListTrainingProgramBySearch,
  importTP,
} from "~/redux/actions/trainingProgram";
import ImportModal from "../ImportModal/ImportModal";
import styles from "../styles/listProgram.module.scss";
import { Btn, Search } from "./mui";
import Tags from "./Tags/Tags";

const cx = className.bind(styles);

const ProgramTable = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { listTrainingProgram } = useSelector((store) => store.trainingProgram);

  const [size, setSize] = useState({ page: 1, limit: 10 });
  const [keyword, setKeyword] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    dispatch(getListTrainingProgram(size));
  }, [size]);

  useEffect(() => {
    dispatch(getListTrainingProgramBySearch({ size, keyword }));
  }, [size, keyword]);

  //==============================================Handle functions action============================================
  // Import Modal function
  const showModal = () => {
    setModalOpen(!modalOpen);
  };

  const onCreate = (values) => {
    dispatch(importTP(values));
  };

  // Search tags
  const removeTags = (indexToRemove) => {
    setKeyword([...keyword.filter((_, index) => index !== indexToRemove)]);
  };

  const addTags = (event) => {
    if (event.target.value !== "" && keyword.length < 5) {
      setKeyword([...keyword, event.target.value]);
      event.target.value = "";
    }
  };

  // Pagination function
  const handleChangePageSize = (e, data) => {
    setSize((preSize) => ({ ...preSize, page: data }));
  };

  const handleChangePagelimit = (e, data) => {
    setSize((preSize) => ({ page: 1, limit: parseInt(data.key.slice(2)) }));
  };

  const getTrainingProgramDeatail = (params) => {
    navigate(`/program/view_program/${params.row.programId}`);
  };

  //==========================================Set up Columns for data grid==========================================
  const columns = [
    { field: "id", headerName: "ID", minWidth: 70, flex: 1, marginLeft: 20 },
    {
      field: "programName",
      headerName: "Program Name",
      minWidth: 450,
      // maxWidth: 500,
      flex: 1,
      editable: false,
      renderCell: (params) => {
        return (
          <button onClick={() => getTrainingProgramDeatail(params)}>
            <b>{params.row.programName}</b>
          </button>
        );
      },
    },
    {
      field: "createdOn",
      headerName: "Created On",
      maxWidth: 170,
      editable: false,
      sortable: true,
      flex: 1,
    },
    {
      field: "createdBy",
      headerName: "Created By",
      minWidth: 200,
      editable: false,
      sortable: true,
      flex: 1,
    },
    {
      field: "duration",
      headerName: "Duration",
      editable: false,
      sortable: true,
      maxWidth: 150,
      flex: 1,
    },
    {
      field: "status",
      headerName: "Status",
      maxWidth: 150,
      editable: false,
      sortable: true,
      flex: 1,
      renderCell: (params) =>
        params.row.status === "Active" ? (
          <LabelStatus active>{params.row.status}</LabelStatus>
        ) : (
          <LabelStatus inactive>{params.row.status}</LabelStatus>
        ),
    },
    {
      field: "action",
      headerName: "",
      maxWidth: 60,
      flex: 1,
      editable: false,
      sortable: false,
      disableClickEventBubbling: true,
      renderCell: (params) => {
        // console.log(params);
        return (
          <MenuPopup program={params.row} size={size}>
            <div>
              <MoreHorizontalIcon />
            </div>
          </MenuPopup>
        );
      },
    },
  ];

  //================================================Render web page=================================================
  return (
    <div className={cx("wrapper")}>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar
          position="static"
          sx={{
            backgroundColor: " #FFFFFF",
            color: "black",
            boxShadow: "none",
          }}
        >
          <Toolbar>
            <Search>
              <span>
                <button style={{ paddingLeft: "10px", marginTop: "4px" }}>
                  <SearchIcon />
                </button>
              </span>
              <input
                style={{ paddingLeft: "20px" }}
                type="text"
                onKeyUp={(event) =>
                  event.key === "Enter" ? addTags(event) : null
                }
                placeholder="Search By ..."
              />
            </Search>
            <Btn
              sx={{ backgroundColor: "#2D3748", width: "85px", height: "38px" }}
            >
              <FilterListIcon />
              Filter
            </Btn>
            <Box sx={{ flexGrow: 1 }} />
            <Box sx={{ display: { xs: "none", md: "flex", gap: "5px" } }}>
              <Btn
                onClick={() => {
                  dispatch(getListProgramSyllabusDraft());
                  navigate(config.routes.viewListProgramSyllabusDraft);
                }}
                sx={{
                  backgroundColor: "#285d9a",
                  width: "95px",
                  height: "38px",
                }}
              >
                <CopyIcon />
                Draft
              </Btn>
              <Btn
                onClick={() => showModal()}
                sx={{
                  backgroundColor: "#D55B13",
                  width: "95px",
                  height: "38px",
                }}
              >
                <ImportIcon />
                Import
              </Btn>
              <Btn
                onClick={() => {
                  navigate(`/program/create_program_name`);
                  dispatch(setModeCreate());
                  dispatch(clearProgramSyllabusToSaveComplete());
                }}
                sx={{
                  backgroundColor: "#2D3748",
                  width: "110px",
                  height: "38px",
                }}
              >
                <AddNewIcon />
                Add New
              </Btn>
            </Box>
          </Toolbar>
        </AppBar>
      </Box>
      <div className={cx("tagg")}>
        {keyword.map((tag, index) => (
          <Tags
            className={cx("search_keyword")}
            onClick={() => removeTags(index)}
            key={index}
          >
            {tag}
            <p>&times;</p>
          </Tags>
        ))}
      </div>
      <Box
        sx={{
          height: "600px",
          width: "100%",
          ".MuiDataGrid-main": {
            fontSize: "14px",
          },
          ".MuiDataGrid-columnHeaders": {
            backgroundColor: "#2D3748",
            color: "#FFFFFF",
            fontWeight: "bold",
            fontSize: "16px",
          },
          ".MuiDataGrid-iconSeparator": {
            display: "none",
            color: "red",
          },
        }}
      >
        <DataGrid
          sx={{
            height: "578px",
            ".MuiDataGrid-iconButtonContainer": {
              visibility: "visible",
            },
          }}
          disableSelectionOnClick
          columns={columns}
          rows={listTrainingProgram?.data || []}
          components={{
            ColumnUnsortedIcon: CustomSortIcon,
            ColumnSortedAscendingIcon: CustomSortIcon,
            ColumnSortedDescendingIcon: CustomSortIcon,
          }}
          disableColumnMenu={true}
          hideFooter={true}
        />
        <Box
          className="Pagination-bar"
          sx={{
            display: "flex",
            justifyContent: "center",
            padding: "2rem",
            ".MuiTablePagination-displayedRows, .MuiTablePagination-actions": {
              display: "none",
            },
            ".MuiTablePagination-toolbar": {
              position: "absolute",
              right: 0,
            },
            ".MuiTablePagination-select": {
              fontWeight: "bold !important",
              fontSize: "medium",
              color: "#285D9A",
            },
          }}
        >
          <Pagination
            sx={{ color: "#285D9A" }}
            count={listTrainingProgram.pagination?.totalPage || 3}
            onChange={handleChangePageSize}
            showFirstButton
            showLastButton
            size="large"
            color="primary"
          />
          <TablePagination
            rowsPerPage={size.limit}
            rowsPerPageOptions={[10, 20, 30]}
            component="div"
            onRowsPerPageChange={handleChangePagelimit}
            onPageChange={() => {}}
            count={10}
            page={size.page}
          />
        </Box>
      </Box>
      <ImportModal showModal={showModal} modalOpen={modalOpen} />
    </div>
  );
};
export default ProgramTable;

function CustomSortIcon() {
  return <SortIcon />;
}
