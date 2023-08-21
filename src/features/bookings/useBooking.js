import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";
import { RESULT_PER_PAGE } from "../../utils/constants";

export function useBooking() {
  const queryClient = useQueryClient();
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
  const curPage = Number(searchParams.get("page")) || 1;

  const {
    data: { data: bookings, count } = {},
    isLoading,
    error,
  } = useQuery({
    queryKey: ["bookings", filter, sortBy, curPage],
    queryFn: getBookings.bind(this, filter, sortBy, curPage),
  });

  //4) Prefetching
  const totalPages = Math.ceil(count / RESULT_PER_PAGE);
  console.log(curPage, totalPages);
  if (curPage < totalPages)
    queryClient.prefetchQuery({
      queryKey: ["bookings", filter, sortBy, curPage + 1],
      queryFn: getBookings.bind(this, filter, sortBy, curPage + 1),
    });

  if (curPage > 1)
    queryClient.prefetchQuery({
      queryKey: ["bookings", filter, sortBy, curPage - 1],
      queryFn: getBookings.bind(this, filter, sortBy, curPage - 1),
    });

  return { bookings, count, isLoading, error };
}
