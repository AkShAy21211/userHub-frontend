import React, { useState, useEffect } from 'react';
import {Link} from "react-router-dom"
import { Container, Col, Row, Button } from 'react-bootstrap';
import Skeleton from '../skleton/Skleton';
import { CgProfile } from "react-icons/cg";
import './Home.css';

const Home = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user-token'));
    setUser(userData || null);
  }, []);

  const renderUserGreetingOrLoginButton = () => {
    if (user) {
      return (
        <h5 className="border border-white p-md-1 p-lg-2 rounded p-2 text-white">
          Welcome, {user.name}
        </h5>
      );
    } else {
      return <Button href="/login" variant="primary">Login</Button>;
    }
  };

  return (
    <Container fluid style={{ backgroundColor: 'black', height:"auto" }}>
      <Row>
        <Col lg={12} xl={12}>
      <ul className="d-flex  flex-column align-items-center flex-md-column flex-lg-row flex-xl-row  justify-content-between p-4" style={{ listStyle: 'none' }}>
            <li className="h4 p-1 text-white">UserHub</li>
            <li className='d-flex'>
              {renderUserGreetingOrLoginButton()}
            </li>
            <li className='d-flex'>
            <Link to="/profile">
            <CgProfile color='white' size="3rem"/>

            </Link>
            </li>
          </ul>
        </Col>
      </Row>
      <Row>
        <Col lg={12} xl={12}>
          <Skeleton count="10" />
        </Col>
      </Row>
       <Row>
        <Col lg={12} xl={12}>
          <Skeleton count="10" />
        </Col>
      </Row>
       <Row>
        <Col lg={12} xl={12}>
          <Skeleton count="10" />
         
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
