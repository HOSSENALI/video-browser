import React, { useEffect, useState } from "react";

import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";

import {
  onAuthStateChangedListener,
  signOutUser,
} from "../utils/firebase/firebase.utils";

import {
  Container,
  Wrapper,
  Search,
  Input,
  Button,
  NavLinks,
  NavLink,
} from "./navbar.styles";

const Navbar = () => {
  const [currentUser, setCurrentUser] = useState(false);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("userData")) || undefined;
    if (typeof userData != "undefined") {
      setCurrentUser(true);
    }
  }, [currentUser]);

  return (
    <Container>
      <Wrapper>
        <Search>
          <Input placeholder="Search" />
          <SearchOutlinedIcon />
        </Search>
        <NavLinks>
          {currentUser ? (
            <NavLink as="span" onClick={signOutUser}>
              SIGN OUT
            </NavLink>
          ) : (
            <NavLink to="/auth">SIGN IN</NavLink>
          )}
          {/* <CartIcon /> */}
        </NavLinks>
      </Wrapper>
    </Container>
  );
};

export default Navbar;
