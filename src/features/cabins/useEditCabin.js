import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditCabin } from "../../services/apiCabins";
import { toast } from "react-hot-toast";

export function useEditButton() {
  const queryClient = useQueryClient();
  const { mutate: editCabin, isLoading: isEditing } = useMutation({
    mutationFn: ({ newCabinData, id }) => createEditCabin(newCabinData, id),
    onSuccess: () => {
      toast.success("Cabin is successfully edited");
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
    },
    onError: () => toast.error("Can't edit cabin at this time"),
  });

  return { editCabin, isEditing };
}
