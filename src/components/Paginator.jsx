import { Pagination, Paper } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPage } from "../store/actions";

const Paginator = () => {
  const dispatch = useDispatch();
  const pages = useSelector((store) => store.pages);
  const loadingError = useSelector((store) => store.loadingError);
  const currentPage = useSelector((store) => store.currentPage);
  const isLoading = useSelector((store) => store.isLoading);

  const handleChangePage = (e, value) => {
    if (value !== currentPage) {
      dispatch(setPage(value));
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  if (pages && pages !== 1 && !loadingError && !isLoading) {
    return (
      <Paper
        sx={{
          maxWidth: 600,
          margin: "auto",
          padding: "10px",
          boxSizing: "border-box",
          display: "flex",
        }}
      >
        <Pagination
          count={pages}
          page={currentPage}
          onChange={handleChangePage}
          sx={{ margin: "auto" }}
        />
      </Paper>
    );
  }

  return null;
};

export default Paginator;
