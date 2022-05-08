/* eslint-disable react/prop-types */
import List from "@mui/material/List";
import { Paper } from "@mui/material";
import Character from "./CharacterListItem";
import { useSelector } from "react-redux";
import NothingHere from "./NothingHere";

const CharactersList = ({ characters, handleClick }) => {
  const favorites = useSelector((store) => store.favorites);
  const loadingError = useSelector((store) => store.loadingError);
  const isLoading = useSelector((store) => store.isLoading);

  return (
    <>
      {!loadingError && characters.length && !isLoading && (
        <Paper
          sx={{ flexGrow: 1, maxWidth: 600, margin: "auto", minWidth: 360 }}
        >
          <List>
            {characters.length > 0 &&
              characters.map((item, index, arr) => {
                const isFavorite = favorites.includes(item.id);
                return (
                  <Character
                    key={item.id}
                    item={item}
                    last={index === arr.length - 1}
                    isFavorite={isFavorite}
                    handleClick={handleClick}
                  />
                );
              })}
          </List>
        </Paper>
      )}
      {loadingError && <NothingHere msg="There is nothing here" />}
    </>
  );
};

export default CharactersList;
