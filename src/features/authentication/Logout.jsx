import { HiArrowLeftOnRectangle } from "react-icons/hi2";
import ButtonIcon from "../../ui/ButtonIcon";
import { useLogout } from "./useLogout";
import SpinnerMini from "../../ui/SpinnerMini";

function Logout() {
  const { logOut, isLoading } = useLogout();

  return (
    <ButtonIcon onClick={logOut} disabled={isLoading}>
      {isLoading ? <SpinnerMini /> : <HiArrowLeftOnRectangle />}
    </ButtonIcon>
  );
}

export default Logout;
