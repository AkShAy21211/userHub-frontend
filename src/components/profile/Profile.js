import React, { useEffect, useRef, useState } from "react";
import { Container, Col, Row, Button, Form } from "react-bootstrap";
import "./Profile.css";
import Skeleton from "../skleton/Skleton";
import { useDispatch, useSelector } from "react-redux";
import { profile, updateProfile } from "../../app/features/user/profileSlice";
import { getPost,deletePost } from "../../app/features/post/postSlice";
import { CgTrash } from "react-icons/cg";
import { Link } from "react-router-dom";

function Profile() {
  const posts = useSelector((state) => state.post.posts);
  const success = useSelector((state) => state.post.success);
console.log(success);
  const dispatch = useDispatch();
  const deleteDispatch=  useDispatch()
  const [image, setImage] = useState("");
  const [userData, setUserData] = useState({
    image: "",
    name: "",
    email: "",
    phone: "",
  });
  const fileInputRef = useRef(null);
  const user = useSelector((state) => state.profile.user);

  useEffect(() => {
    dispatch(profile());
    setUserData({ ...user });
    console.log("use effct one", userData);
  }, [dispatch]);

  useEffect(() => {
    dispatch(getPost());
  }, []);

  useEffect(() => {
    if (user) {
      const imageName = user.image ? user.image.split("\\").pop() : null;
      setUserData({ ...user, image: imageName });
      console.log("useeft two", userData);
    }
  }, [user]);

  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setImage(URL.createObjectURL(file));
    setUserData({ ...userData, image: file });
  };


  const handleSubmit = () => {
    const { name, email, phone, image } = userData;
    const formDataToSend = new FormData();
    formDataToSend.append("name", name);
    formDataToSend.append("email", email);
    formDataToSend.append("phone", phone);
    formDataToSend.append("image", image);
    dispatch(updateProfile(formDataToSend));
    setImage(null);
    console.log(userData);
  };

  return (
    <Container fluid style={{ backgroundColor: "white", height: "max-content",marginBottom:"20px" }}>
      <Row className="h-100  d-flex justify-content-around align-items-center">
        <Col sm={6} md={5} lg={4} xl={3}>
          <div className="profile-card mt-5">
            <div className="profile-img">
              {image || userData.image ? (
                <img
                  src={       
                    image || `https://mern-stack-userhub-api.onrender.com/${userData.image}`
                  }
                  alt="Profile"
                />
              ) : (
                <Skeleton height={150} width={150} circle={true} />
              )}
              <Button
                variant="primary"
                size="sm"
                className="upload-button bg-white text-dark btn-outline-dark"
                onClick={handleUploadClick}
              >
                Update Image
              </Button>
            </div>
            <div className="profile-details">
              <Form.Group controlId="formName">
                <Form.Label>Name:</Form.Label>
                <Form.Control
                  type="text"
                  value={userData.name}
                  onChange={(e) =>
                    setUserData({ ...userData, name: e.target.value })
                  }
                />
              </Form.Group>
              <Form.Group controlId="formEmail">
                <Form.Label>Email:</Form.Label>
                <Form.Control
                  type="email"
                  value={userData.email}
                  onChange={(e) =>
                    setUserData({ ...userData, email: e.target.value })
                  }
                />
              </Form.Group>
              <Form.Group controlId="formPhone">
                <Form.Label>Phone:</Form.Label>
                <Form.Control
                  type="text"
                  value={userData.phone}
                  onChange={(e) =>
                    setUserData({ ...userData, phone: e.target.value })
                  }
                />
              </Form.Group>
              <Button
                className="btn-block w-100 mt-3 btn-outline-dark bg-white"
                onClick={handleSubmit}
              >
                Update profile
              </Button>
            </div>
            <input
              type="file"
              name="image"
              ref={fileInputRef}
              style={{ display: "none" }}
              onChange={handleFileChange}
            />
          </div>
        </Col>
        <Col sm={6} md={6} lg={7} xl={7}>
       {posts ? (
  <>
    <h4 className="badge fs-6 mt-5 bg-dark">Your Blogs</h4>
    {posts.map((post, index) => (
      <div key={index} className="blog-card ">
        <h6>{post.title}</h6>
        <p>{post.content.slice(0, 100)}</p>
        <CgTrash
          className="text-danger"
          onClick={() => deleteDispatch(deletePost(post._id))}
        />
      </div>
      
    ))}
  </>
) : (
null)}

        </Col>
      </Row>
    </Container>
  );
}

export default Profile;
