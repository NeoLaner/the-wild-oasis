import { useQuery } from "@tanstack/react-query";
import { getUser } from "../../services/apiAuth";

export function useUser() {
  const { data, isLoading } = useQuery({
    queryFn: getUser,
    queryKey: ["user"],
    retry: false,
  });

  return {
    user: data?.user,
    isAuthenticated: data?.user.role === "authenticated",
    isLoading,
  };
}
