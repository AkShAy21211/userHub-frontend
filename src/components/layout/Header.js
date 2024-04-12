import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { CgProfile,CgPen,CgLogOut } from "react-icons/cg";
import { logout } from "../../app/features/user/userSlice";
import {useDispatch} from "react-redux";
import './Header.css'
import { Dropdown } from 'react-bootstrap';
import { Container, Col, Row, Button } from "react-bootstrap";
function Header() {
  const [user, setUser] = useState(null);

  const dispatch = useDispatch();
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user-token"));
    setUser(userData || null);
  },[]);


  
  return (
      
          <ul
            className="d-flex shadow-md bg-dark p-3 sticky-top  header-nav  justify-content-between "
            style={{ listStyle: "none" }}
          >
            <li className="h2 text-white">
                <Link style={{ textDecoration: 'none' ,color:"white"}} to="/">UserHub</Link>
            </li>
            
            <li>
             <Dropdown>
             <Dropdown.Toggle className="btn border btn-outline-white bg-dark" id="dropdown-basic">
                Account
            </Dropdown.Toggle>

            <Dropdown.Menu>
                <Dropdown.Item>
                    <Link to="/create" style={{ textDecoration: 'none', color: 'inherit' }}>
                        Create <CgPen />
                    </Link>
                </Dropdown.Item>
                <Dropdown.Item>
                    <Link to="/profile" style={{ textDecoration: 'none', color: 'inherit' }}>
                        Profile <CgProfile size="1.5rem" color="black" />
                    </Link>
                </Dropdown.Item>
                <Dropdown.Item>
                    <Link to="/login" style={{ textDecoration: 'none', color: 'inherit' }} onClick={() => dispatch(logout())}>
                        Logout <CgLogOut size="1.5rem" color="black" />
                    </Link>
                </Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
            </li>
            
          </ul>
    
  );
}

export default Header;
