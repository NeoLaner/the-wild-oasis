import { useState } from "react";

import Button from "../../ui/Button";
import CreateUpdateCabinForm from "./CreateUpdateCabinForm";
import Modal from "../../ui/Modal";

function AddCabin() {
  return (
    <Modal>
      <Modal.Open open="cabins-form">
        <Button>Add New Cabin</Button>
      </Modal.Open>
      <Modal.Window name="cabins-form">
        <CreateUpdateCabinForm />
      </Modal.Window>
    </Modal>
  );
}

export default AddCabin;
