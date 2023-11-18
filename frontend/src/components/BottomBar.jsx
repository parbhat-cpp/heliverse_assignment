import { Box, IconButton, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { ChevronRight, ChevronLeft } from "@mui/icons-material";
import { nextPage, prevPage } from "../redux/actions/paginationActions";

const BottomBar = () => {
  const dispatch = useDispatch();
  const page = useSelector((state) => state.page);

  const onClickNext = () => {
    dispatch(nextPage(Number(page)));
  };

  const onClickPrev = () => {
    dispatch(prevPage(Number(page)));
  };

  return (
    <>
      <Box
        sx={{
          position: "fixed",
          bottom: "0",
          background: "#303030",
          width: "100%",
          display: "flex",
          color: "#00e5ff",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            margin: "0 7px 0 auto",
          }}
        >
          <IconButton onClick={onClickPrev} disabled={page == 1 ? true : false}>
            <ChevronLeft style={{ color: "#00bfa5" }} />
          </IconButton>
          <Typography>{page}</Typography>
          <IconButton onClick={onClickNext}>
            <ChevronRight style={{ color: "#00bfa5" }} />
          </IconButton>
        </Box>
      </Box>
    </>
  );
};

export default BottomBar;
