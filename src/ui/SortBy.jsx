import { useSearchParams } from "react-router-dom";
import Select from "./Select";

function Sort({ options }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const sortBy = searchParams.get("sort") || "";

  function handleOnChange(e) {
    searchParams.set("sort", e.target.value);
    setSearchParams(searchParams);
  }

  return (
    <Select
      value={sortBy}
      type="white"
      options={options}
      onChange={handleOnChange}
    >
      sort
    </Select>
  );
}

export default Sort;
