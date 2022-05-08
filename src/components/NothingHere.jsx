import { Box, Typography } from "@mui/material";

// eslint-disable-next-line react/prop-types
const NothingHere = ({ msg }) => {
  return (
    <Box
      sx={{
        display: "flex",
        margin: "40px auto",
        width: 300,
        height: 100,
        textAlign: "center",
        backgroundColor: "tomato",
        borderRadius: 5,
        border: "2px solid white",
      }}
    >
      <Typography
        sx={{ margin: "auto", textTransform: "uppercase", color: "white" }}
      >
        {msg}
      </Typography>
    </Box>
  );
};

export default NothingHere;
