import { useForm } from "react-hook-form";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";

import FormRow from "../../ui/FormRow";
import { useCreateCabin } from "./useCreateCabin";
import { useUpdateCabin } from "./useUpdateCabin";

function CreateUpdateCabinForm({ cabin = {}, onCloseModal }) {
  const { createCabin, isCreating } = useCreateCabin();
  const { updateCabin, isEditing } = useUpdateCabin();

  const { id: editId, ...editValues } = cabin;
  const isEditSession = Boolean(editId);
  const { register, handleSubmit, reset, getValues, formState } = useForm({
    defaultValues: isEditSession && editValues,
  });
  const isWorking = isEditing || isCreating;

  function onSubmit(data) {
    if (!isEditSession)
      createCabin(
        { ...data, image: data.image[0] },
        {
          onSuccess: (data) => {
            reset();
            onCloseModal?.();
          },
        }
      );

    if (isEditSession)
      updateCabin(
        {
          newCabinData: {
            ...data,
            image:
              typeof data.image === "object" ? data.image[0] : editValues.image,
          },
          id: editId,
        },
        {
          onSuccess: (data) => {
            reset();
            onCloseModal?.();
          },
        }
      );
  }

  return (
    <Form
      type={onCloseModal ? "modal" : "form"}
      onSubmit={handleSubmit(onSubmit)}
    >
      <FormRow name="Cabin name" error={formState.errors.name?.message}>
        <Input
          type="text"
          id="name"
          {...register("name", { required: "This field is required" })}
          disabled={isWorking}
        />
      </FormRow>

      <FormRow
        name="Maximum Capacity"
        error={formState.errors.maxCapacity?.message}
      >
        <Input
          type="number"
          id="maxCapacity"
          {...register("maxCapacity", {
            required: "This field is required",
            min: 0,
          })}
          disabled={isWorking}
        />
      </FormRow>

      <FormRow
        name="Regular Price"
        error={formState.errors.regularPrice?.message}
      >
        <Input
          type="number"
          id="regularPrice"
          {...register("regularPrice", {
            required: "This field is required",
            min: 0,
          })}
          disabled={isWorking}
        />
      </FormRow>

      <FormRow name="Discount" error={formState.errors.discount?.message}>
        <Input
          type="number"
          id="discount"
          defaultValue={0}
          {...register("discount", {
            required: "This field is required",
            validate: (value) =>
              +value <= +getValues().regularPrice ||
              "The discount can't be higher than price",
          })}
          disabled={isWorking}
        />
      </FormRow>

      <FormRow
        name="Description for website"
        error={formState.errors.description?.message}
      >
        <Textarea
          type="number"
          id="description"
          defaultValue=""
          {...register("description", { required: "This field is required" })}
        />
      </FormRow>

      <FormRow name="Cabin Photo" error={formState.errors.image?.message}>
        <FileInput
          id="image"
          accept="image/*"
          {...register(
            "image",
            !isEditSession && {
              required: "This field is required",
            }
          )}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button $variation="secondary" type="reset" onClick={onCloseModal}>
          Cancel
        </Button>
        <Button disabled={isWorking}>
          {isEditSession ? "Edit cabin" : "Add cabin"}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateUpdateCabinForm;
