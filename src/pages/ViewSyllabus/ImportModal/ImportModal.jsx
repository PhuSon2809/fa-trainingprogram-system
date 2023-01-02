import React, { useState } from "react";
import { ImportIcon } from "~/components/Icons/Icon";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/system";
import { Alert, Grid } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import SelectComponent from "./SelectComponent";
import {
  getFileDownload,
  postSyllabusModal,
} from "~/redux/actions/syllabusList";
import { useDispatch } from "react-redux";

const label = {
  inputProps: { "aria-label": "Checkbox demo" },
};

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(5),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(2),
  },
}));

const hoverImport = {
  "&:hover": {
    textDecoration: "none",
    backgroundColor: "#7B8988",
    textTransform: "none",
  },
  textTransform: "none",
  backgroundColor: "#D55B13",
  color: "#FFFFFF",
  borderRadius: "10px",
  marginRight: "10px",
};

const hoverCancel = {
  "&:hover": {
    textTransform: "none",
  },
  textTransform: "none",
  color: "#D55B13",
  borderRadius: "15px",
  marginRight: "0px",
  textDecoration: "underline",
};

const hoverImportInForm = {
  "&:hover": {
    textDecoration: "none",
    backgroundColor: "#7B8988",
    textTransform: "none",
  },
  backgroundColor: "#2D3748",
  color: "#FFFFFF",
  borderRadius: "10px",
  marginRight: "10px",
  padding: "5px 20px 5px 20px",
  textTransform: "none",
};

const BootstrapDialogTitle = (props) => {
  const { children, onClose } = props;

  return (
    <DialogTitle
      sx={{
        padding: "5px 150px 5px 150px",
        backgroundColor: "#2D3748",
        color: "#ffffff",
      }}
    >
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        ></IconButton>
      ) : null}
    </DialogTitle>
  );
};

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

export default function CustomizedDialogs() {
  const [file, setFile] = useState();
  const [errorFileType, setErrorFileType] = useState(false);
  const dispatch = useDispatch();
  // const [form] = Form.useForm();

  // function handleUp(event) {
  //   setFile(event.target.files[0]);
  // }

  const [open, setOpen] = React.useState(false);
  // const check=("")
  // const duplicate=("")

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    const formData = new FormData();
    formData.append("File", file);
    // forEach((check) => {
    console.log(check);

    formData.append("Scanning", check);
    // });
    formData.append("Duplicate handle", duplicate);
    dispatch(postSyllabusModal(formData));
    setOpen(false);
  };
  // const handleOk = () => {
  //   form
  //     .validateFields()
  //     .then((values) => {
  //       form.resetFields();
  //       props.onCreate(values);
  //     })
  //     .catch((info) => {
  //       console.log("Validate Failed:", info);
  //     });
  // };

  // const [autoDefect, setAutoDefect] = React.useState("");
  // const [scanning, setScaning] = React.useState("");
  // const [duplicate, setDuplicate] = React.useState("");
  const [comma, setComma] = React.useState("");
  const [age, setAge] = React.useState("");
  const [duplicate, setDuplicate] = React.useState("");
  const [check, setCheck] = React.useState("");

  // const dataEncodingType = (event) => {
  //   setAutoDefect(event.target.value);
  //   console.log(event.target.value);
  // };
  // const dataScanning = (event) => {
  //   setScaning(event.target.value);
  //   console.log(event.target.value);
  // };
  // const dataDuplicate = (event) => {
  //   setDuplicate(event.target.value);
  //   console.log(event.target.value);
  // };

  const handleChanges = (event) => {
    setComma(event.target.value);
    console.log(event.target.value);
  };
  const handleChange = (event) => {
    setAge(event.target.value);
    console.log(event.target.value);
  };
  const Handleduplicate = (event) => {
    setDuplicate(event.target.value);
    console.log(event.target.value);
  };
  const Handlescanning = (event) => {
    setCheck(event.target.value);
    console.log(event.target.value);
  };
  // const handleDownload = async () => {
  //   let blob = await ImportModalAPI.get_file();
  //   if (blob) {
  //     const url = window.URL.createObjectURL(blob);
  //     const a = document.createElement("a");
  //     a.style.display = "none";
  //     a.href = url;
  //     // the filename you want
  //     a.download = "syllbusList.zip";
  //     document.body.appendChild(a);
  //     a.click();
  //     window.URL.revokeObjectURL(url);
  //   }
  // };

  return (
    <Box>
      <Button sx={hoverImport} onClick={handleClickOpen}>
        <ImportIcon sx={{ mr: "5px" }} />
        Import
      </Button>
      <form onSubmit={handleChange}>
        <BootstrapDialog
          onClose={handleClose}
          aria-labelledby="customized-dialog-title"
          open={open}
        >
          <BootstrapDialogTitle
            id="customized-dialog-title"
            onClose={handleClose}
          >
            <Typography
              component="span"
              align="center"
              sx={{ fontWeight: "bold", fontSize: "18px", marginLeft: "90px" }}
            >
              Import Syllabus
            </Typography>
          </BootstrapDialogTitle>

          <DialogContent sx={{ overflow: "hidden" }} dividers>
            <Grid component="span" container spacing={3}>
              <Grid component="span" item xs={5}>
                <Typography component="span" sx={{ fontWeight: "bold" }}>
                  Import Setting
                </Typography>
              </Grid>

              <Grid component="span" item xs={7}>
                <Typography component="span">
                  {errorFileType && (
                    <Alert
                      sx={{ transform: "translateY(-18px)" }}
                      severity="error"
                    >
                      File is not type of csv or xlsx
                    </Alert>
                  )}
                  File (csv)*
                  <SelectComponent
                    setError={setErrorFileType}
                    setFileImport={setFile}
                  />
                </Typography>
                <Typography component="span" sx={{ paddingTop: "18px" }}>
                  Encoding Type
                  <FormControl
                    sx={{ ml: 20, mt: -4, minWidth: 130 }}
                    size="small"
                  >
                    <InputLabel id="demo-select-small">Auto defect</InputLabel>
                    <Select
                      labelId="demo-select-small"
                      id="demo-select-small"
                      value={age}
                      label="Auto defect"
                      onChange={handleChange}
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      <MenuItem value={10}>Ten</MenuItem>
                      <MenuItem value={20}>Twenty</MenuItem>
                      <MenuItem value={30}>Thirty</MenuItem>
                    </Select>
                  </FormControl>
                </Typography>
                <Typography component="span">
                  Column Seperator
                  <FormControl
                    sx={{ ml: 20, mt: -4, minWidth: 130 }}
                    size="small"
                  >
                    <InputLabel id="demo-select-small">Comma</InputLabel>
                    <Select
                      labelId="demo-select-small"
                      id="demo-select-small"
                      value={comma}
                      label="Comma"
                      onChange={handleChanges}
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      <MenuItem value={10}>Ten</MenuItem>
                      <MenuItem value={20}>Twenty</MenuItem>
                      <MenuItem value={30}>Thirty</MenuItem>
                    </Select>
                  </FormControl>
                </Typography>
                <Typography component="span">
                  Import Template
                  <Box
                    sx={{
                      display: "block",
                      marginTop: "-22px",
                      paddingLeft: "161px",
                    }}
                  >
                    <div className="input input-download text-decoration-underline">
                      <a
                        className="text-blue"
                        onClick={() => dispatch(getFileDownload())}
                      >
                        Download
                      </a>
                    </div>
                  </Box>
                </Typography>
              </Grid>
            </Grid>
          </DialogContent>
          <DialogContent sx={{ overflow: "hidden" }} dividers>
            <Grid component="span" container spacing={3}>
              <Grid component="span" item xs={5}>
                <Typography component="span" sx={{ fontWeight: "bold" }}>
                  Duplicate Control
                </Typography>
              </Grid>

              <Grid component="span" item xs={7}>
                <Typography component="span">Scanning</Typography>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    mt: "12px",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      marginLeft: "-10px",
                    }}
                  >
                    <Checkbox
                      value="code"
                      onChange={Handlescanning}
                      {...label}
                    />
                    <Typography component="span" sx={{ paddingTop: "10px" }}>
                      Syllabus Code
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      marginLeft: "-10px",
                    }}
                  >
                    <Checkbox
                      onChange={Handlescanning}
                      value="name"
                      {...label}
                    />
                    <Typography component="span" sx={{ paddingTop: "10px" }}>
                      Syllabus Name
                    </Typography>
                  </Box>
                </Box>

                <FormControl>
                  <Typography component="span" sx={{ mt: "12px", mb: "12px" }}>
                    Duplicate Handle
                  </Typography>
                  <RadioGroup
                    onChange={Handleduplicate}
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="row-radio-buttons-group"
                  >
                    <FormControlLabel
                      value="allow"
                      control={<Radio />}
                      label="Allow"
                    />
                    <FormControlLabel
                      value="replace"
                      control={<Radio />}
                      label="Replace"
                    />
                    <FormControlLabel
                      value="skip"
                      control={<Radio />}
                      label="Skip"
                    />
                  </RadioGroup>
                </FormControl>
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button sx={hoverCancel} autoFocus onClick={handleClose}>
              Cancel
            </Button>
            <Button sx={hoverImportInForm} autoFocus onClick={handleClose}>
              Import
            </Button>
          </DialogActions>
        </BootstrapDialog>
      </form>
    </Box>
  );
}
