import React from "react";
import Pagination from "@mui/material/Pagination";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 50px;
`;

function PaginationButtons({ pagination, filter, handlePageChange }) {
  return (
    <Wrapper>
      <Pagination
        count={pagination?.totalPage || 10}
        onChange={handlePageChange}
        page={filter.page}
        showFirstButton
        showLastButton
        sx={{
          ".css-yuzg60-MuiButtonBase-root-MuiPaginationItem-root": {
            fontSize: "12px !important",
            fontWeight: "700",
            color: "#285D9A !important",
          },
          ".css-g2z002-MuiSvgIcon-root-MuiPaginationItem-icon": {
            fontSize: "20px !important",
            fontWeight: "700",
            color: "#285D9A !important",
          },
          ".Mui-selected": {
            backgroundColor: "#E2E8F0 !important",
            color: "#F7FAFC !important",
          },
        }}
      />
    </Wrapper>
  );
}

export default PaginationButtons;
