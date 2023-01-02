import React from "react";
import Box from "@mui/material/Box";
import ProgramTable from "./components/programTable";

function ViewListProgram() {
  return (
    <div>
      <Box
        style={{
          width: "100%",
          height: "60px",
          backgroundColor: "#2D3748",
          color: "#FFFFFF",
          padding: "15px 30px",
          borderTop: "1px solid #FFFFFF",
          fontFamily: "Inter",
          fontStyle: "normal",
          fontSize: "32px",
          lineHeight: "29px",
          letterSpacing: "0.2em",
        }}
      >
        Training Program
      </Box>
      <ProgramTable />
    </div>
  );
}

export default ViewListProgram;
