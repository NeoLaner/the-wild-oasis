import styled from "styled-components";
import BookingDataBox from "../../features/bookings/BookingDataBox";

import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";

import { useMoveBack } from "../../hooks/useMoveBack";
import { useBooking } from "../bookings/useBooking";
import Spinner from "../../ui/Spinner";
import Checkbox from "../../ui/Checkbox";
import { formatCurrency } from "../../utils/helpers";
import { useEffect, useState } from "react";
import { useCheckin } from "./useCheckin";
import { useSettings } from "../settings/useSettings";

const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`;

function CheckinBooking() {
  const moveBack = useMoveBack();
  const [isPaidState, setIsPaidState] = useState(false);
  const [disabledPaid, setDisabledPaid] = useState(false);
  const [addBreakfast, setAddBreakfast] = useState(false);
  const { booking, isLoading } = useBooking() || {};
  const { mutate: checkedIn, isLoading: isLoadingCheckin } = useCheckin();
  const { settings, isLoading: isLoadingSettings } = useSettings();

  useEffect(
    function () {
      setIsPaidState(booking?.isPaid);
      setDisabledPaid(booking?.isPaid);
    },
    [booking?.isPaid]
  );

  if (isLoading || isLoadingSettings) return <Spinner />;

  const {
    id: bookingId,
    guests,
    totalPrice,
    numGuests,
    hasBreakfast,
    numNights,
    isPaid,
  } = booking;

  const breakfastPrice = numGuests * numNights * settings.breakfastPrice;

  function handleCheckin() {
    if (addBreakfast)
      checkedIn({
        bookingId,
        breakfast: {
          hasBreakfast: true,
          extrasPrice: breakfastPrice,
          totalPrice: totalPrice + breakfastPrice,
        },
      });
    else checkedIn({ bookingId, breakfast: {} });

    setAddBreakfast(false);
  }

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Check in booking #{bookingId}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>
      <BookingDataBox booking={booking} />

      {!hasBreakfast && (
        <Box>
          <Checkbox
            id="add-breakfast"
            checked={addBreakfast}
            onChange={() => {
              setAddBreakfast((breakfast) => !breakfast);
              // setDisabledPaid((disabled) => !disabled);
            }}
          >
            Want to add breakfast for {formatCurrency(breakfastPrice)}?
          </Checkbox>
        </Box>
      )}

      <Box>
        <Checkbox
          id="confirm"
          checked={isPaidState}
          disabled={disabledPaid && !addBreakfast}
          onChange={() => setIsPaidState((isPaid) => !isPaid)}
        >
          I confirm that {guests.fullName} has paid the total amount of{" "}
          {!addBreakfast ? (
            formatCurrency(totalPrice)
          ) : (
            <>
              {formatCurrency(totalPrice + breakfastPrice)} (
              {formatCurrency(totalPrice)} + {formatCurrency(breakfastPrice)})
            </>
          )}
        </Checkbox>
      </Box>

      <ButtonGroup>
        <Button onClick={handleCheckin} disabled={!isPaidState}>
          Check in booking #{bookingId}
        </Button>
        <Button $variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default CheckinBooking;
