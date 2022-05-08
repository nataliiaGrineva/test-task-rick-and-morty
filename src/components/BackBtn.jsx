import { Box, IconButton, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";

const BackBtn = () => {
  let navigate = useNavigate();

  return (
    <Box
      onClick={() => navigate(-1)}
      sx={{
        display: "flex",
        maxWidth: 150,
        margin: "10px auto",
        justifyContent: "space-evenly",
        cursor: "pointer",
        backgroundColor: "green",
        borderRadius: 5,
        border: "2px solid white",
      }}
    >
      <IconButton edge="end" aria-label="favorite">
        <ArrowBackIcon sx={{ color: "white", margin: "auto" }} />
      </IconButton>
      <Typography
        gutterBottom
        variant="h5"
        component="div"
        sx={{ textAlign: "center", margin: "auto", color: "white" }}
      >
        Back
      </Typography>
    </Box>
  );
};

export default BackBtn;
