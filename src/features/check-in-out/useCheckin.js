import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useCheckin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate, isLoading, error } = useMutation({
    mutationFn: ({ bookingId, breakfast }) =>
      updateBooking(bookingId, {
        status: "checked-in",
        isPaid: true,
        ...breakfast,
      }),

    onSuccess: (data) => {
      toast.success(`Booking ${data.id} successfully checked in`);
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
      queryClient.invalidateQueries({ queryKey: ["booking"] });
      queryClient.invalidateQueries({ queryKey: ["stays"] });
      queryClient.invalidateQueries({ queryKey: ["today-activities"] });
      navigate(-1);
    },

    onError: (err) => toast.error("Failed to Checked in the booking"),
  });

  return { mutate, isLoading };
}
