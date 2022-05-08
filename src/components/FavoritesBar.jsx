import { IconButton, Paper, Typography } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useNavigate } from "react-router-dom";

const FavoritesBar = () => {
  let navigate = useNavigate();

  const handleFavorites = () => {
    navigate("../favorites");
  };

  return (
    <Paper
      onClick={handleFavorites}
      sx={{
        display: "flex",
        maxWidth: 600,
        margin: "auto",
        justifyContent: "center",
        cursor: "pointer",
      }}
    >
      <Typography
        gutterBottom
        variant="h5"
        component="div"
        sx={{ textAlign: "center" }}
      >
        Show My Favorites List
      </Typography>
      <IconButton edge="end" aria-label="like" sx={{ fontSize: "small" }}>
        <FavoriteIcon sx={{ color: "pink" }} />
      </IconButton>
    </Paper>
  );
};

export default FavoritesBar;
