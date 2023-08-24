import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logOut as logOutAPi } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";

export function useLogout() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate: logOut, isLoading } = useMutation({
    mutationFn: logOutAPi,
    onSuccess: () => {
      navigate("/login", { replace: true });
      queryClient.removeQueries();
    },
  });

  return { logOut, isLoading };
}
