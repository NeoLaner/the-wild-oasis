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

  // const [showForm, setShowForm] = useState(false);

  // return (
  //   <div>
  //     <Button onClick={() => setShowForm((showForm) => !showForm)}>
  //       Add New Cabin
  //     </Button>
  //     {showForm && (
  //       <Modal onClose={() => setShowForm(false)}>
  //         <CreateUpdateCabinForm
  //           type="modal"
  //           onClose={() => setShowForm(false)}
  //         />
  //       </Modal>
  //     )}
  //   </div>
  // );
}

export default AddCabin;
