import React, { useEffect } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Paper, IconButton, CircularProgress } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCharacter, likeCharacter } from "../store/actions";
import { Box } from "@mui/system";
import NothingHere from "./NothingHere";

const colors = {
  Alive: "ForestGreen",
  Dead: "tomato",
  unknown: "LightGray",
};

const CharacterCard = () => {
  const id = +useParams().id;
  const dispatch = useDispatch();
  const currentCharacter = useSelector((store) => store.currentCharacter);
  const currentCharactersEpisodes = useSelector(
    (store) => store.currentCharactersEpisodes
  );
  const favorites = useSelector((store) => store.favorites);
  const isLoading = useSelector((store) => store.isLoading);
  const loadingError = useSelector((store) => store.loadingError);

  useEffect(() => {
    dispatch(getCharacter(id));
  }, [id]);

  const handleLike = () => {
    dispatch(likeCharacter(id));
  };

  if (isLoading) {
    return (
      <Box sx={{ height: "70vh", display: "flex" }}>
        <CircularProgress sx={{ margin: "auto" }} size="100px" thickness={5} />
      </Box>
    );
  }

  if (loadingError) {
    return <NothingHere msg="Character not found" />;
  }

  const isFavorite = favorites.includes(id);

  return (
    currentCharacter &&
    !loadingError &&
    !isLoading && (
      <Paper sx={{ margin: "auto", maxWidth: 345 }}>
        <Card>
          <CardMedia
            component="img"
            alt={currentCharacter.name}
            height="345"
            image={currentCharacter.image}
          />
          <CardContent>
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              sx={{ textAlign: "center" }}
            >
              {currentCharacter.name}
            </Typography>
            <Box
              sx={{
                minWidth: 110,
                backgroundColor: colors[currentCharacter.status],
                height: 40,
                borderRadius: 10,
                display: "flex",
                margin: "10px",
              }}
            >
              <Typography
                sx={{
                  margin: "auto",
                  textTransform: "uppercase",
                  cursor: "default",
                }}
              >
                {currentCharacter.status}
              </Typography>
            </Box>
            <Typography variant="body2" color="text.secondary">
              Species: {currentCharacter.species}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Gender : {currentCharacter.gender}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Location: {currentCharacter.location?.name}
            </Typography>
            <Typography variant="body2" color="text.secondary" component="div">
              Episode:{" "}
              <ul>
                {currentCharactersEpisodes &&
                  currentCharactersEpisodes.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
              </ul>
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Created: {currentCharacter.created.replace(/T.*$/g, "")}
            </Typography>
          </CardContent>
          <CardActions>
            <IconButton
              edge="end"
              aria-label="like"
              sx={{ fontSize: "small" }}
              onClick={handleLike}
            >
              {isFavorite && <FavoriteIcon sx={{ color: "pink" }} />}
              {!isFavorite && <FavoriteBorderIcon />}
            </IconButton>
          </CardActions>
        </Card>
      </Paper>
    )
  );
};

export default CharacterCard;
