/* eslint-disable react/prop-types */
import {
  Avatar,
  Divider,
  IconButton,
  ListItemText,
  Typography,
} from "@mui/material";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { Box } from "@mui/system";
import { useDispatch } from "react-redux";
import { likeCharacter } from "../store/actions";
import { memo } from "react";

const colors = {
  Alive: "ForestGreen",
  Dead: "tomato",
  unknown: "LightGray",
};

// eslint-disable-next-line react/prop-types
const Character = ({ item, last, isFavorite, handleClick }) => {
  const dispatch = useDispatch();
  const { id, image, name, status } = item;

  const handleLike = (e) => {
    e.stopPropagation();
    dispatch(likeCharacter(id));
  };

  return (
    <>
      <ListItem
        onClick={() => handleClick(id)}
        secondaryAction={
          <IconButton edge="end" aria-label="favorite" onClick={handleLike}>
            {isFavorite && <FavoriteIcon sx={{ color: "pink" }} />}
            {!isFavorite && <FavoriteBorderIcon />}
          </IconButton>
        }
      >
        <ListItemAvatar>
          <Avatar alt={name} src={image} />
        </ListItemAvatar>
        <ListItemText primary={name} sx={{ cursor: "default" }} />
        <Box
          sx={{
            minWidth: 110,
            backgroundColor: colors[status],
            height: 40,
            borderRadius: 10,
            display: "flex",
          }}
        >
          <Typography sx={{ margin: "auto", textTransform: "uppercase" }}>
            {status}
          </Typography>
        </Box>
      </ListItem>
      {!last && <Divider key={`divider${id}`} />}
    </>
  );
};

export default memo(Character);
