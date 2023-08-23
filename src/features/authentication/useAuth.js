import { useMutation } from "@tanstack/react-query";
import { login as loginApi } from "../../services/apiAuth";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useAuth() {
  const navigate = useNavigate();
  const { mutate: login, isLoading } = useMutation({
    mutationFn: (credentials) => loginApi(credentials),
    onSuccess: () => {
      navigate("/dashboard");
    },

    onError: (err) => {
      toast.error("Login failed. email or password is incorrect");
      console.error(err);
    },
  });

  return { login, isLoading };
}
