import { useQuery } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";

export function useBooking() {
  const [searchParams] = useSearchParams();
  const status = searchParams.get("status");

  const filter =
    status === undefined || status === "all"
      ? null
      : { field: "status", value: status };

  const {
    data: bookings,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["bookings", filter],
    queryFn: getBookings.bind(this, filter),
  });

  return { bookings, isLoading, error };
}
