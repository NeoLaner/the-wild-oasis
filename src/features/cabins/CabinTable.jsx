import CabinRow from "./CabinRow";
import Spinner from "../../ui/Spinner";
import { useCabins } from "./useCabins";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";

function CabinTable() {
  const { cabins, isLoading, error } = useCabins();

  return (
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
        <Menus>
          <Table.Body
            data={cabins}
            render={(cabin) => <CabinRow cabin={cabin} key={cabin.id} />}
          />
        </Menus>
      )}
    </Table>
  );
}

export default CabinTable;
