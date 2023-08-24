import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login as loginApi } from "../../services/apiAuth";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useLogin() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate: login, isLoading } = useMutation({
    mutationFn: (credentials) => loginApi(credentials),

    onSuccess: (data) => {
      navigate("/dashboard");
      queryClient.setQueryData(["user"], { user: data.user });
    },

    onError: (err) => {
      toast.error("Login failed. email or password is incorrect");
      console.error(err);
    },
  });
  return { login, isLoading };
}
