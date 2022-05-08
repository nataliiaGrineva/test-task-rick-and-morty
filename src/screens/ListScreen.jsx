import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CharactersList from "../components/CharactersList";
import FavoritesBar from "../components/FavoritesBar";
import Paginator from "../components/Paginator";
import SearchBar from "../components/SearchBar";
import { getCharacters } from "../store/actions";

const ListScreen = () => {
  const dispatch = useDispatch();

  const name = useSelector((store) => store.name);
  const currentPage = useSelector((store) => store.currentPage);
  const characters = useSelector((store) => store.characters);
  let navigate = useNavigate();

  useEffect(() => {
    dispatch(getCharacters(currentPage, name));
  }, [currentPage]);

  const handleItemClick = useCallback((id) => {
    navigate(`${id}`);
  }, []);

  return (
    <>
      <FavoritesBar />
      <SearchBar />
      <CharactersList characters={characters} handleClick={handleItemClick} />
      <Paginator />
    </>
  );
};

export default ListScreen;
