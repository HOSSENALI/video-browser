import React, { useEffect, useState } from "react";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";

import {
  signOutUser,
} from "../utils/firebase/firebase.utils";

import {
  Container,
  Wrapper,
  Search,
  Input,
  NavLinks,
  NavLink,
} from "./navbar.styles";

const Navbar = () => {
  const [currentUser, setCurrentUser] = useState(false);

  useEffect(() => {
    // @ts-ignore
    const userData = JSON.parse(localStorage.getItem("userData")) || undefined;
    // console.log(userData);
    if (typeof userData != undefined) {
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
