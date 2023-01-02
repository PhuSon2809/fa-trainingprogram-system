import React, { useEffect, useState } from "react";
import styles from "./UserPermission.module.scss";
import classNames from "classnames/bind";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import SelectUP from "./SelectUserPermission/SelectUP";
import { AddWhiteIcon } from "~/components/Icons";
import Button from "@mui/material/Button";
import { DialogActions } from "@mui/material";
import axiosClient from "~/apis/axiosClient";

const cx = classNames.bind(styles);

const ViewUserPermisson = () => {
  const [close, setClose] = useState(false)
  const [dataPermission, setDataPermission] = useState([])
  const [authData, setAuthData] = useState([])
  console.log(dataPermission); 
  // save a data with change in view and save location when call api
  const [changeData, setChangeData] = useState([])
  useEffect(() => {
    const token = axiosClient.getToken();
    if (token) {
      axiosClient.setHeaderAuth(token);
      axiosClient
        .get('/roles/permissions')
        .then(response => setDataPermission(response?.data));
      axiosClient
        .get('/authorities')
        .then(response => setAuthData(response?.data));
    }

  }, []);

  const style = {
    width: '72px',
    height: '17px',
    color: '#FFFFFF',
    fontFamily: 'Inter',
    fontStyle: 'normal',
    fontWeight: '700',
    fontSize: '14px',
    lineHeight: '17px',

  }

  const handleSave = () => {
    console.log(changeData);
    console.log(authData);
    var newData = [...dataPermission]
    if (changeData) {
      changeData.forEach(async (data) => {
        console.log(newData);
        var dataPut = []
        var roleId = newData.filter((e) => e.roleName === data[0])[0]?.roleId
        var authoried = [
          newData.filter((e) => e.roleName === data[0])[0]?.authorities[0]?.id,
          newData.filter((e) => e.roleName === data[0])[0]?.authorities[1]?.id,
          newData.filter((e) => e.roleName === data[0])[0]?.authorities[2]?.id,
          newData.filter((e) => e.roleName === data[0])[0]?.authorities[3]?.id,
          newData.filter((e) => e.roleName === data[0])[0]?.authorities[4]?.id,
        ]
        var idPerNew = authData.filter((e) => e.permission === data[2] && e.resource === data[1])[0]?.id

        switch (data[1]) {
          case 'LEARNING_MATERIAL':
            authoried[0] = idPerNew;
            break;
          case 'CLASS':
            authoried[1] = idPerNew;
            break;
          case 'USER':
            authoried[2] = idPerNew;
            break;
          case 'SYLLABUS':
            authoried[3] = idPerNew;
            break;
          case 'TRAINING_PROGRAM':
            authoried[4] = idPerNew;
            break;

          default:
            break;
        }
        dataPut = [
          {
            "roleId": roleId,
            "authoritiesId": authoried,
          }]
        await axiosClient.put2('/roles', dataPut).then(response => {
          console.log(dataPut);
        })
      })
    }
    setDataPermission(newData)
  }
  return(
    <main className={cx("inner")}>
      <header className={cx("permission-header")}>
        <h2>User Permission</h2>
        <hr />
        <Button
          sx={{
            backgroundColor: "#2D3748 !important",
            color: "#FFFFFF !important",
            borderRadius: "10px",
            display: 'flex',
            float: 'right',
            fontWeight: '700',
            fontSize: '14px',
            padding: '7px 10px',
            marginBottom: '10px'

          }}
          variant="outlined"
          autoFocus
        // onClick={handleClose}
        >
          <span className={cx("TBCell")}><AddWhiteIcon /> Add new</span>
        </Button>
      </header>



      <TableContainer
        sx={{
          width: '100%',
          overflowX: 'inherit',
        }} >
        <Table >
          <TableHead className={cx("head")}
            sx={{
              backgroundColor: '#2D3748',
              '& .MuiTableCell-sizeMedium': {
                ...style
              },
              '& .MuiTableCell-sizeMedium:first-child': {
                borderTopLeftRadius: '10px',
              },
              '& .MuiTableCell-sizeMedium:last-child': {
                borderTopRightRadius: '10px',
              },

            }}
          >
            <TableRow
              sx={{
                borderRadius: '10px',
              }}
            >
              <TableCell >Role name </TableCell>
              <TableCell >Syllabus </TableCell>
              <TableCell >Trainning program</TableCell>
              <TableCell >Class</TableCell>
              <TableCell >Learning material</TableCell>
              <TableCell >User</TableCell>
            </TableRow>
          </TableHead>

          <TableBody className={cx("body")}
            sx={{
              '& .MuiTableCell-sizeMedium': {
                ...style,
                color: '#000000',

                alignItems: 'center !important'

              },

            }}
          >

            <TableRow>
              <TableCell >Super Admin</TableCell>
              <TableCell ><SelectUP close={close} nameRow={'Super Admin'} nameCol={'SYLLABUS'} changeData={changeData} setChangeData={setChangeData} dataPermission={dataPermission} setClose={() => { }} /></TableCell>
              <TableCell ><SelectUP close={close} nameRow={'Super Admin'} nameCol={'TRAINING_PROGRAM'} changeData={changeData} setChangeData={setChangeData} dataPermission={dataPermission} setClose={() => { }} /></TableCell>
              <TableCell ><SelectUP close={close} nameRow={'Super Admin'} nameCol={'CLASS'} changeData={changeData} setChangeData={setChangeData} dataPermission={dataPermission} setClose={() => { }} /></TableCell>
              <TableCell ><SelectUP close={close} nameRow={'Super Admin'} nameCol={'LEARNING_MATERIAL'} changeData={changeData} setChangeData={setChangeData} dataPermission={dataPermission} setClose={() => { }} /></TableCell>
              <TableCell ><SelectUP close={close} nameRow={'Super Admin'} nameCol={'USER'} changeData={changeData} setChangeData={setChangeData} dataPermission={dataPermission} setClose={() => { }} /></TableCell>
            </TableRow>

            <TableRow>
              <TableCell >Class Admin</TableCell>
              <TableCell ><SelectUP close={close} nameRow={'Class Admin'} nameCol={'SYLLABUS'} changeData={changeData} setChangeData={setChangeData} dataPermission={dataPermission} setClose={() => { }} /></TableCell>
              <TableCell ><SelectUP close={close} nameRow={'Class Admin'} nameCol={'TRAINING_PROGRAM'} changeData={changeData} setChangeData={setChangeData} dataPermission={dataPermission} setClose={() => { }} /></TableCell>
              <TableCell ><SelectUP close={close} nameRow={'Class Admin'} nameCol={'CLASS'} changeData={changeData} setChangeData={setChangeData} dataPermission={dataPermission} setClose={() => { }} /></TableCell>
              <TableCell ><SelectUP close={close} nameRow={'Class Admin'} nameCol={'LEARNING_MATERIAL'} changeData={changeData} setChangeData={setChangeData} dataPermission={dataPermission} setClose={() => { }} /></TableCell>
              <TableCell ><SelectUP close={close} nameRow={'Class Admin'} nameCol={'USER'} changeData={changeData} setChangeData={setChangeData} dataPermission={dataPermission} setClose={() => { }} /></TableCell>
            </TableRow>

            <TableRow>
              <TableCell >Trainer</TableCell>
              <TableCell ><SelectUP close={close} nameRow={'Trainer'} nameCol={'SYLLABUS'} changeData={changeData} setChangeData={setChangeData} dataPermission={dataPermission} setClose={() => { }} /></TableCell>
              <TableCell ><SelectUP close={close} nameRow={'Trainer'} nameCol={'TRAINING_PROGRAM'} changeData={changeData} setChangeData={setChangeData} dataPermission={dataPermission} setClose={() => { }} /></TableCell>
              <TableCell ><SelectUP close={close} nameRow={'Trainer'} nameCol={'CLASS'} changeData={changeData} setChangeData={setChangeData} dataPermission={dataPermission} setClose={() => { }} /></TableCell>
              <TableCell ><SelectUP close={close} nameRow={'Trainer'} nameCol={'LEARNING_MATERIAL'} changeData={changeData} setChangeData={setChangeData} dataPermission={dataPermission} setClose={() => { }} /></TableCell>
              <TableCell ><SelectUP close={close} nameRow={'Trainer'} nameCol={'USER'} changeData={changeData} setChangeData={setChangeData} dataPermission={dataPermission} setClose={() => { }} /></TableCell>
            </TableRow>

            <TableRow>
              <TableCell >Student</TableCell>
              <TableCell ><SelectUP close={close} nameRow={'Student'} nameCol={'SYLLABUS'} changeData={changeData} setChangeData={setChangeData} dataPermission={dataPermission} setClose={() => { }} /></TableCell>
              <TableCell ><SelectUP close={close} nameRow={'Student'} nameCol={'TRAINING_PROGRAM'} changeData={changeData} setChangeData={setChangeData} dataPermission={dataPermission} setClose={() => { }} /></TableCell>
              <TableCell ><SelectUP close={close} nameRow={'Student'} nameCol={'CLASS'} changeData={changeData} setChangeData={setChangeData} dataPermission={dataPermission} setClose={() => { }} /></TableCell>
              <TableCell ><SelectUP close={close} nameRow={'Student'} nameCol={'LEARNING_MATERIAL'} changeData={changeData} setChangeData={setChangeData} dataPermission={dataPermission} setClose={() => { }} /></TableCell>
              <TableCell ><SelectUP close={close} setClose={setClose} nameRow={'Student'} nameCol={'USER'} changeData={changeData} setChangeData={setChangeData} dataPermission={dataPermission} /></TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      <DialogActions>
        <Button
          sx={{ textDecoration: "underline", color: "#E74A3B" }}
          autoFocus
          className="cancel"
          onClick={() => setClose(!close)}
        >
          Cancel
        </Button>
        <Button
          sx={{
            backgroundColor: "#2D3748",
            color: "#FFFFFF",
            borderRadius: "10px",
          }}
          variant="outlined"
          autoFocus
          onClick={() => handleSave()}
        >
          Save
        </Button>

      </DialogActions>
    </main >
  )
}

export default ViewUserPermisson;
