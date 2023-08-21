import { useQuery } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";

export function useBooking() {
  const [searchParams] = useSearchParams();
  const status = searchParams.get("status");

  //1) Filter
  const filter =
    !status || status === "all" ? null : { field: "status", value: status };

  //2) Sort
  const sortByRow = searchParams.get("sort") || "startDate-desc";
  const [field, value] = sortByRow.split("-");
  const sortBy = { field, value };

  //3) Pagination
  const curPage = searchParams.get("page") || 1;

  const {
    data: { data: bookings, count } = {},
    isLoading,
    error,
  } = useQuery({
    queryKey: ["bookings", filter, sortBy, curPage],
    queryFn: getBookings.bind(this, filter, sortBy, curPage),
  });

  return { bookings, count, isLoading, error };
}
