import Heading from "../ui/Heading";
import Row from "../ui/Row";

import CabinTable from "../features/cabins/CabinTable";
import Button from "../ui/Button";
import { useState } from "react";
import CreateEditCabinForm from "../features/cabins/CreateUpdateCabinForm";

function Cabins() {
  const [showForm, setShowForm] = useState(false);
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All cabins</Heading>
        <p>filter / sort</p>
      </Row>
      <Row>
        <CabinTable />

        <Button onClick={() => setShowForm((showForm) => !showForm)}>
          Add New Cabin
        </Button>
        {showForm && <CreateEditCabinForm />}
      </Row>
    </>
  );
}

export default Cabins;
