import { styled, alpha } from "@mui/material/styles";
import { Button, InputBase } from "@mui/material";

export const Search = styled("div")(({ theme }) => ({
  position: "relative",
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  border: "1px #000000 solid",
  borderRadius: "10px",
  marginRight: "5px",
  marginLeft: 0,
  width: "300px",
  height: "35px",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(2)
  }
}));

export const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center"
}));

export const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "black",
  "& .MuiInputBase-input": {
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "27ch"
    }
  }
}));

export const Btn = styled(Button)({
  color: "white",
  gap: "5px",
  borderRadius: "10px",
  "&:hover": {
    backgroundColor: "#7b8988",
    borderColor: "#0062cc"
  }
});
