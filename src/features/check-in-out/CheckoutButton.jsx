import Button from "../../ui/Button";
import { useCheckout } from "./useCheckout";

function CheckoutButton({ bookingId }) {
  const { mutate, isLoading } = useCheckout();
  return (
    <Button $variation="primary" size="small" onClick={() => mutate(bookingId)}>
      Check out
    </Button>
  );
}

export default CheckoutButton;
