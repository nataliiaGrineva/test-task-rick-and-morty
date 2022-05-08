import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getFavorites } from "../store/actions";
import BackBtn from "./BackBtn";
import CharactersList from "./CharactersList";
import NothingHere from "./NothingHere";

const FavoritesList = () => {
  const favoritesIds = useSelector((store) => store.favorites);
  const favoritesCharacters = useSelector((store) => store.favoritesCharacters);
  const dispatch = useDispatch();
  let navigate = useNavigate();

  useEffect(() => {
    if (favoritesIds.length) {
      dispatch(getFavorites(favoritesIds));
    }
  }, [favoritesIds]);

  const handleFavoritesClick = useCallback((id) => {
    navigate(`../characters/${id}`);
  }, []);

  return (
    <>
      <BackBtn />

      {favoritesIds.length && (
        <CharactersList
          characters={favoritesCharacters}
          handleClick={handleFavoritesClick}
        />
      )}
      {favoritesIds.length === 0 && (
        <NothingHere msg="Favorites list is empty" />
      )}
    </>
  );
};

export default FavoritesList;
