import { useQuery } from "@tanstack/react-query";
import supabase from "../../services/supabase";
import { getUser } from "../../services/apiAuth";

export function useUser() {
  const { data, isLoading } = useQuery({
    queryFn: getUser,
    queryKey: ["user"],
    retry: false,
  });

  return { isAuthenticated: data?.user.role === "authenticated", isLoading };
}
