import React, { useEffect, useRef, useState } from "react";
import { Container, Col, Row, Button, Form } from "react-bootstrap";
import "./Profile.css";
import Skeleton from "../skleton/Skleton";
import { useDispatch, useSelector } from "react-redux";
import { profile,updateProfile } from "../../app/features/user/userSlice";

function Profile() {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.auth.user);
  const fileInputRef = useRef(null);
  const [user, setUser] = useState({
    image:'',
    name:"",
    email:"",
    phone:""
  });

  useEffect(() => {
    dispatch(profile());
    const {user} = userData;
    setUser({...user,...user});
  }, []);

  console.log(user);
  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setUser({ ...user, image: URL.createObjectURL(file) });
  };
 const handleSubmit = ()=>{

  dispatch(updateProfile(user))
 }

  return (
    <Container fluid style={{ backgroundColor: "black", height: "100vh" }}>
      <Row className="h-100  d-flex justify-content-center align-items-center">
        <Col sm={12} md={5} lg={4} xl={3}>
          <div className="profile-card">
            <div className="profile-img">
              {user.image ? (
                <img src={user.image} alt="Profile" />
              ) : (
                <Skeleton height={150} width={150} circle={true} />
              )}
              <Button
                variant="primary"
                size="sm"
                className="upload-button "
                onClick={handleUploadClick}
              >
                Upload Image
              </Button>
            </div>
            <div className="profile-details">
              <Form.Group controlId="formName">
                <Form.Label>Name:</Form.Label>
                <Form.Control
                  type="text"
                  defaultValue={user?user.name:""}
                  onChange={(e) => setUser({ ...user, name: e.target.value })} // Add onChange handler
                />
              </Form.Group>
              <Form.Group controlId="formEmail">
                <Form.Label>Email:</Form.Label>
                <Form.Control
                  type="email"
                  defaultValue={user?user.email:""}
                    onChange={(e) => setUser({ ...user, email: e.target.value })} // Add onChange handler

                />
              </Form.Group>
              <Form.Group controlId="formPhone">
                <Form.Label>Phone:</Form.Label>
                <Form.Control
                  type="text"
                  defaultValue={user?user.phone:""}
                 onChange={(e) => setUser({ ...user, phone: e.target.value })} // Add onChange handler

                />
              </Form.Group>
             <Button className="btn-block w-100 mt-3" onClick={handleSubmit}>Update profile</Button>
            </div>
            <input
              type="file"
              ref={fileInputRef}
              style={{ display: "none" }}
              onChange={handleFileChange}
            />
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default Profile;
