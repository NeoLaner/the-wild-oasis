import Filter from "../../ui/Filter";
import Sort from "../../ui/SortBy";
import TableOperations from "../../ui/TableOperations";

function CabinTableOperations() {
  return (
    <TableOperations>
      <Filter
        filterField="discount"
        options={[
          { value: "all", label: "All" },
          { value: "no-discount", label: "No discount" },
          { value: "with-discount", label: "With discount" },
        ]}
      />
      <Sort
        options={[
          { value: "created_at-asc", label: "Sort by add Date (soon first)" },
          { value: "created_at-desc", label: "Sort by add Date (late first)" },
          { value: "name-asc", label: "Sort by name (A-Z)" },
          { value: "name-desc", label: "Sort by name (Z-A)" },
          { value: "regularPrice-desc", label: "Sort by price (low first)" },
          { value: "regularPrice-asc", label: "Sort by price (high first)" },
          { value: "maxCapacity-desc", label: "Sort by capacity (low first)" },
          { value: "maxCapacity-asc", label: "Sort by capacity (high first)" },
        ]}
      />
    </TableOperations>
  );
}

export default CabinTableOperations;
