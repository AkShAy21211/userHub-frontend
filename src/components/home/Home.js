import React, { useEffect } from "react";
import { Container, Col, Row } from "react-bootstrap";
import "./Home.css";
import  Skleton from "../skleton/Skleton";
import {useSelector,useDispatch} from "react-redux"
import { getPost } from "../../app/features/post/postSlice";



const Blog = ({  title, content, author,image }) => {

  return (
    <Col lg={6} xl={6}>
      <div className="blog shadow  post-container d-flex flex-column p-4">
        <h2 >{title}</h2>
        <p>By: {author.name}</p>
        <p>{content}</p>
        <img className="img-responsive" src={`http://localhost:3000/images/${image.split('\\').pop()}`} alt={title} />
      </div>
    </Col>
  );
};

const Home = () => {

  const dispatch   =  useDispatch();
  const posts = useSelector((state)=>state.post.posts);


  useEffect(()=>{
    dispatch(getPost())
  },[])
console.log(posts);
  return (
    <Container className="blog-container bg-white" fluid style={{ backgroundColor: "black", height: "max-content" }}>
      <Row>
        {!posts?<Skleton count="10"/>:posts.map((blog, index) => (
          <Blog key={index} {...blog} />
        ))}
      </Row>
    </Container>
  );
};

export default Home;
