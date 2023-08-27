import { useForm } from "react-hook-form";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";

import { useUpdateUser } from "./useUpdateUser";
import supabase from "../../services/supabase";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";

function UpdatePasswordForm() {
  const { register, handleSubmit, formState, getValues, reset } = useForm();
  const { errors } = formState;
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { updateUser, isUpdating } = useUpdateUser();

  function onSubmit({ password }) {
    // updateUser(
    //   { password },
    //   {
    //     onSuccess: () => {
    //       supabase.auth.signOut();
    //       queryClient.removeQueries();
    //       navigate("/login");
    //     },
    //   }
    // );
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow
        name="Password (min 8 characters)"
        error={errors?.password?.message}
      >
        <Input
          type="password"
          id="password"
          autoComplete="current-password"
          disabled={isUpdating}
          {...register("password", {
            required: "This field is required",
            minLength: {
              value: 8,
              message: "Password needs a minimum of 8 characters",
            },
          })}
        />
      </FormRow>

      <FormRow name="Confirm password" error={errors?.passwordConfirm?.message}>
        <Input
          type="password"
          autoComplete="new-password"
          id="passwordConfirm"
          disabled={isUpdating}
          {...register("passwordConfirm", {
            required: "This field is required",
            validate: (value) =>
              getValues().password === value || "Passwords need to match",
          })}
        />
      </FormRow>
      <FormRow>
        <Button onClick={reset} type="reset" $variation="secondary">
          Cancel
        </Button>
        <Button disabled={isUpdating}>Update password</Button>
      </FormRow>
    </Form>
  );
}

export default UpdatePasswordForm;
