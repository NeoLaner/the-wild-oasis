import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteBooking } from "../../services/apiBookings";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function useDeletingBooking() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate, isLoading } = useMutation({
    mutationFn: (id) => deleteBooking(id),
    onSuccess: () => {
      toast.success("Booking is successfully deleted.");
      queryClient.invalidateQueries(["bookings"]);
      navigate("/bookings");
    },
    onError: () => toast.error("Failed to delete the book"),
  });

  return {
    mutate,
    isLoading,
  };
}

export default useDeletingBooking;
