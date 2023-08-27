import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getStaysTodayActivity } from "../../services/apiBookings";

export function useTodayActivity() {
  const { data: activities, isLoading } = useQuery({
    queryFn: getStaysTodayActivity,
    queryKey: ["today-activities"],
  });

  return { activities, isLoading };
}
