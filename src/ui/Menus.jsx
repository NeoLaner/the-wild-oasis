import {
  autoUpdate,
  flip,
  offset,
  shift,
  useFloating,
} from "@floating-ui/react-dom";
import { createContext, useContext, useState } from "react";
import { createPortal } from "react-dom";
import { HiEllipsisVertical } from "react-icons/hi2";
import styled from "styled-components";
import { useOutsideClick } from "../hooks/useOutsideClick";

const StyledMenu = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const StyledToggle = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-700);
  }
`;

const StyledList = styled.ul`
  position: absolute;

  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-md);
  border-radius: var(--border-radius-md);
`;
/* right: ${(props) => props.position.x}px;
  top: ${(props) => props.position.y}px; */

const StyledButton = styled.button`
  width: 100%;
  text-align: left;
  background: none;
  border: none;
  padding: 1.2rem 2.4rem;
  font-size: 1.4rem;
  transition: all 0.2s;

  display: flex;
  align-items: center;
  gap: 1.6rem;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 1.6rem;
    height: 1.6rem;
    color: var(--color-grey-400);
    transition: all 0.3s;
  }
`;

const MenusContext = createContext();

function Menus({ children }) {
  const [anchor, setAnchor] = useState(null);
  const [openId, setOpenId] = useState("");

  const close = () => setOpenId("");

  const open = setOpenId;

  return (
    <MenusContext.Provider value={{ openId, close, open, anchor, setAnchor }}>
      {children}
    </MenusContext.Provider>
  );
}

function Toggle({ id }) {
  const { open: openList, setAnchor, openId, close } = useContext(MenusContext);

  function handleClick() {
    // openList((curStateId) => (curStateId === id ? null : id));
    console.log(id, openId);
    openId === "" || openId !== id ? openList(id) : close();
  }

  if (id === openId)
    return (
      <StyledToggle ref={setAnchor} onClick={handleClick}>
        <HiEllipsisVertical />
      </StyledToggle>
    );
  else
    return (
      <StyledToggle onClick={handleClick}>
        <HiEllipsisVertical />
      </StyledToggle>
    );
}

function List({ children, id }) {
  const { openId, anchor, close } = useContext(MenusContext);

  const offsetOptions = {
    mainAxis: 5,
    crossAxis: 0,
    alignmentAxis: 0,
  }; // can be just a number

  const { refs, floatingStyles } = useFloating({
    elements: { reference: anchor },
    whileElementsMounted: autoUpdate,
    placement: "bottom-start",
    middleware: [offset(offsetOptions), flip(), shift()], // flip makes that go around when no space exist
  });

  if (id !== openId) return null;

  return createPortal(
    <StyledList ref={refs.setFloating} style={floatingStyles}>
      {children}
    </StyledList>,
    document.body
  );
}

function Button({ icon, children, onClick }) {
  const { close } = useContext(MenusContext);

  function handleClick() {
    onClick?.();
    close();
  }

  return (
    <li>
      <StyledButton onClick={handleClick}>
        {icon}
        <span>{children}</span>
      </StyledButton>
    </li>
  );
}

function Menu({ children }) {
  const ref = useOutsideClick(close);

  return <StyledMenu ref={ref}>{children}</StyledMenu>;
}

Menus.Menu = Menu;
Menus.Toggle = Toggle;
Menus.List = List;
Menus.Button = Button;

export default Menus;
