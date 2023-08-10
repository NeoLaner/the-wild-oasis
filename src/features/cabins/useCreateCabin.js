import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditCabin } from "../../services/apiCabins";
import { toast } from "react-hot-toast";

export function useCreateCabin() {
  const queryClient = useQueryClient();

  const { mutate: createCabin, isLoading: isCreating } = useMutation({
    mutationFn: createEditCabin, //NOTE mutationFn: (cabin) => createCabin(cabin)
    onSuccess: () => {
      toast.success("New cabin was added");

      queryClient.invalidateQueries({ queryKey: ["cabins"] });
    },
    onError: () => toast.error("Can't make new cabin at this time"),
  });

  return { createCabin, isCreating };
}
