import { useMutation } from "@tanstack/react-query";
import { signup as signupApi } from "../../services/apiAuth";
import { toast } from "react-hot-toast";

export function useSignup() {
  const { mutate: signup, isLoading } = useMutation({
    mutationFn: signupApi,
    onSuccess: () => toast.success("The user successfully created"),
    onError: () => toast.error("Failed to create user."),
  });

  return { signup, isLoading };
}
