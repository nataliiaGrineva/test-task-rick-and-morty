import { Autocomplete, Paper, TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  getCharacters,
  setSelectedItem,
  setName,
  setPage,
} from "../store/actions";

const SearchBar = () => {
  const name = useSelector((store) => store.name);
  const suggestions = useSelector((store) => store.suggestions);
  const selectedItem = useSelector((store) => store.selectedItem);
  const currentPage = useSelector((store) => store.currentPage);
  const dispatch = useDispatch();
  let navigate = useNavigate();

  const defaultProps = {
    options: suggestions,
    getOptionLabel: (option) => option.label,
  };

  const changeInputValue = (inputValue) => {
    if (selectedItem !== null) {
      dispatch(setSelectedItem(null));
    }
    if (currentPage !== 1) {
      dispatch(setPage(1));
    }
    if (inputValue !== undefined) {
      dispatch(setName(inputValue));
      dispatch(getCharacters(1, inputValue));
    }
  };

  const selectValue = (newValue) => {
    if (newValue !== null) {
      dispatch(setSelectedItem(newValue));
      dispatch(setName(newValue.label));
      dispatch(getCharacters(1, newValue.label));
      navigate(`${newValue.id}`);
    }
  };

  return (
    <Paper
      sx={{
        flexGrow: 1,
        maxWidth: 600,
        margin: "auto",
        padding: "10px",
        boxSizing: "border-box",
      }}
    >
      <Autocomplete
        disablePortal
        id="combo-box-demo"
        clearOnBlur={false}
        {...defaultProps}
        isOptionEqualToValue={(option, value) => option.label === value.label}
        getOptionLabel={(option) => option.label || ""}
        value={selectedItem}
        onChange={(event, newValue) => {
          selectValue(newValue);
        }}
        inputValue={name}
        onInputChange={(event, newInputValue) => {
          changeInputValue(newInputValue);
        }}
        renderOption={(props, option) => {
          return (
            <li {...props} key={option.id}>
              {option.label || ""}
            </li>
          );
        }}
        renderInput={(params) => <TextField {...params} label="Characters" />}
      />
    </Paper>
  );
};

export default SearchBar;
