import { styled } from "styled-components";
import Logout from "../features/authentication/Logout";
import HeaderMenu from "./HeaderMenu";
import UserAvatar from "../features/authentication/UserAvatar";

const StyledHeader = styled.header`
  background-color: var(--color-grey-0);

  padding: 1.2rem 4.8rem;
  border-bottom: 1px solid var(--color-grey-100);

  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 1rem;
`;

const Warning = styled.div`
  margin-right: auto;
`;

function Header() {
  return (
    <StyledHeader>
      <Warning>
        ⚠ Data mutations (create, update, delete) are deactivated in this demo
        app.
      </Warning>
      <UserAvatar />
      <HeaderMenu />
    </StyledHeader>
  );
}

export default Header;
