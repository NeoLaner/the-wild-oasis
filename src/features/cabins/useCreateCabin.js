import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createUpdateCabin } from "../../services/apiCabins";
import { toast } from "react-hot-toast";

export function useCreateCabin() {
  const queryClient = useQueryClient();

  const { mutate: createCabin, isLoading: isCreating } = useMutation({
    mutationFn: createUpdateCabin, //NOTE mutationFn: (cabin) => createCabin(cabin)
    onSuccess: () => {
      toast.success("New cabin was added");

      queryClient.invalidateQueries({ queryKey: ["cabins"] });
    },
    onError: (err) => toast.error(err),
  });

  return { createCabin, isCreating };
}