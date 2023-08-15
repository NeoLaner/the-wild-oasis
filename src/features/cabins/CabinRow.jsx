import { useState } from "react";
import CreateEditCabinForm from "./CreateUpdateCabinForm";
import { useDeleteCabin } from "./useDeleteCabin";
import { HiPencil, HiSquare2Stack, HiTrash } from "react-icons/hi2";

import styled from "styled-components";
import { formatCurrency } from "../../utils/helpers";
import { useCreateCabin } from "./useCreateCabin";
import Modal from "../../ui/Modal";
import CreateUpdateCabinForm from "./CreateUpdateCabinForm";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Table from "../../ui/Table";

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
  column-gap: 2.4rem;
  align-items: center;
  padding: 1.4rem 2.4rem;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`;

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Price = styled.div`
  font-family: "Sono";
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);
`;

function CabinRow({ cabin }) {
  const [showForm, setShowForm] = useState(false);
  const { isDeleting, mutate } = useDeleteCabin();
  const { createCabin, isCreating } = useCreateCabin();
  const { id, name, regularPrice, maxCapacity, discount, image, description } =
    cabin;

  function handleDuplicate() {
    createCabin({
      name: "Copy of " + name,
      regularPrice,
      maxCapacity,
      discount,
      image,
      description,
    });
  }

  return (
    <>
      <Table.Row role="row">
        <Img src={image} />
        <Cabin>{name}</Cabin>
        <div>fits up to {maxCapacity} guests</div>
        <Price>{formatCurrency(regularPrice)}</Price>
        {discount ? (
          <Discount>{formatCurrency(discount)}</Discount>
        ) : (
          <span>&mdash;</span>
        )}

        <div>
          <button onClick={handleDuplicate} disabled={isCreating}>
            <HiSquare2Stack />
          </button>

          <Modal>
            <Modal.Open open="edit-form">
              <button onClick={() => setShowForm((show) => !show)}>
                <HiPencil />
              </button>
            </Modal.Open>
            <Modal.Window name="edit-form">
              <CreateUpdateCabinForm cabin={cabin} />
            </Modal.Window>
          </Modal>

          <Modal>
            <Modal.Open open="delete-confirm">
              <button>
                <HiTrash />
              </button>
            </Modal.Open>
            <Modal.Window name="delete-confirm">
              <ConfirmDelete
                onConfirm={() => mutate(id)}
                disabled={isDeleting}
              />
            </Modal.Window>
          </Modal>
        </div>
      </Table.Row>
      {showForm && <CreateEditCabinForm cabin={cabin} />}
    </>
  );
}

export default CabinRow;
