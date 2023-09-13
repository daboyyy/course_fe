import { Autocomplete, Container, TextField } from "@mui/material";

const SearchInput = ({
  isLessThanMd,
  handleOptionChange,
  handleInputChange,
  searchOptions,
}) => {
  return (
    <Container>
      <Autocomplete
        freeSolo
        options={searchOptions.map((option) => option.title)}
        onChange={handleOptionChange}
        onInputChange={handleInputChange}
        renderInput={(params) => <TextField {...params} label="Search" />}
        sx={{ my: isLessThanMd ? 3 : 5 }}
      />
    </Container>
  );
};

export default SearchInput;
