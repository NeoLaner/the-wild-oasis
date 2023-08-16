import { useDeleteCabin } from "./useDeleteCabin";
import {
  HiEllipsisHorizontal,
  HiEllipsisVertical,
  HiPencil,
  HiSquare2Stack,
  HiTrash,
} from "react-icons/hi2";

import styled from "styled-components";
import { formatCurrency } from "../../utils/helpers";
import { useCreateCabin } from "./useCreateCabin";
import Modal from "../../ui/Modal";
import CreateUpdateCabinForm from "./CreateUpdateCabinForm";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Table from "../../ui/Table";

import { Menu, MenuComponent, MenuItem } from "../../ui/DropdownMenu";

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

const MenuBox = styled.div`
  display: flex;
  justify-content: flex-end;
`;

function CabinRow({ cabin }) {
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

      <MenuBox>
        {/* <Menus.Menu>
          <Menus.Toggle id={cabin.id} />
          <Menus.List id={cabin.id}>
            <Menus.Button
              onClick={handleDuplicate}
              disabled={isCreating}
              icon={<HiSquare2Stack />}
            >
              duplicate
            </Menus.Button>

            <Modal>
              <Modal.Open open="edit-form">
                <Menus.Button icon={<HiPencil />}>Edit</Menus.Button>
              </Modal.Open>
              <Modal.Window name="edit-form">
                <CreateUpdateCabinForm cabin={cabin} />
              </Modal.Window>
            </Modal>

            <Modal>
              <Modal.Open open="delete-confirm">
                <Menus.Button icon={<HiTrash />}>delete</Menus.Button>
              </Modal.Open>
              <Modal.Window name="delete-confirm">
                <ConfirmDelete
                  onConfirm={() => mutate(id)}
                  disabled={isDeleting}
                />
              </Modal.Window>
            </Modal>
          </Menus.List>
        </Menus.Menu> */}

        <Menu label={<HiEllipsisVertical />}>
          <MenuItem
            onClick={handleDuplicate}
            disabled={isCreating}
            label="Duplicate"
            icon={<HiSquare2Stack />}
          />

          <Modal>
            <Modal.Open open="edit-form">
              <MenuItem label="Edit" icon={<HiPencil />} />
            </Modal.Open>
            <Modal.Window name="edit-form">
              <CreateUpdateCabinForm cabin={cabin} />
            </Modal.Window>
          </Modal>

          <Modal>
            <Modal.Open open="delete-confirm">
              <MenuItem label="Delete" icon={<HiTrash />} />
            </Modal.Open>
            <Modal.Window name="delete-confirm">
              <ConfirmDelete
                onConfirm={() => mutate(id)}
                disabled={isDeleting}
              />
            </Modal.Window>
          </Modal>
        </Menu>
      </MenuBox>
    </Table.Row>
  );
}

export default CabinRow;
