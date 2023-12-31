import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { updateUser as UpdateUserApi } from "../../services/apiAuth";
import supabase from "../../services/supabase";

export function useUpdateUser() {
  const queryClient = useQueryClient();
  const { mutate: updateUser, isLoading: isUpdating } = useMutation({
    mutationFn: UpdateUserApi,

    onSuccess: () => {
      toast.success("The user details is successfully updated");
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },

    onError: (err) => toast.error(err.message),
  });

  return { updateUser, isUpdating };
}
