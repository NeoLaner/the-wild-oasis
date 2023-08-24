import { useMutation } from "@tanstack/react-query";
import { logOut as logOutAPi } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";

export function useLogout() {
  const navigate = useNavigate();
  const { mutate: logOut, isLoading } = useMutation({
    mutationFn: logOutAPi,
    onSuccess: () => {
      navigate("/login", { replace: true });
    },
  });

  return { logOut, isLoading };
}
