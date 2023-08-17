import CabinRow from "./CabinRow";
import Spinner from "../../ui/Spinner";
import { useCabins } from "./useCabins";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import { useSearchParams } from "react-router-dom";

function CabinTable() {
  const { cabins, isLoading, error } = useCabins();
  const [searchParams] = useSearchParams();
  const currentFilter = searchParams.get("discount");
  let filteredData;

  switch (currentFilter) {
    case "with-discount":
      filteredData = cabins?.filter((cabin) => cabin.discount !== 0);
      break;
    case "no-discount":
      filteredData = cabins?.filter((cabin) => cabin.discount === 0);
      break;
    default:
      filteredData = cabins;
      break;
  }

  return (
    <Menus>
      <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
        <Table.Header>
          <div></div>
          <div>Cabin</div>
          <div>Capacity</div>
          <div>Price</div>
          <div>Discount</div>
          <div></div>
        </Table.Header>

        {isLoading ? (
          <Spinner />
        ) : (
          <Table.Body
            data={filteredData}
            render={(cabin) => <CabinRow cabin={cabin} key={cabin.id} />}
          />
        )}
      </Table>
    </Menus>
  );
}

export default CabinTable;
