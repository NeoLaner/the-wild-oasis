import styled from "styled-components";
import { useRecentBookings } from "./useRecentBookings";
import { useRecentStays } from "./useRecentStays";
import Spinner from "../../ui/Spinner";
import Stats from "./Stats";
import { useCabins } from "../cabins/useCabins";

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;

function DashboardLayout() {
  const { bookings, bookingsLoading, numDays } = useRecentBookings();
  const { confirmedStays, staysLoading } = useRecentStays();
  const { cabins, cabinsLoading } = useCabins();

  if (bookingsLoading || staysLoading || cabinsLoading) return <Spinner />;
  console.log(confirmedStays);
  return (
    <StyledDashboardLayout>
      <Stats
        bookings={bookings}
        confirmedStays={confirmedStays}
        cabinCount={cabins.length}
        numDays={numDays}
      />
    </StyledDashboardLayout>
  );
}

export default DashboardLayout;
