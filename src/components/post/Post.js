import React, { useCallback, useState } from "react";
import "./Post.css"; // Import CSS file for styling
import { Container } from "react-bootstrap";
import {useSelector,useDispatch} from "react-redux"
import { postValidator } from "../../helper/validator";
import { createPost } from "../../app/features/post/postSlice";
import Alert from "../toast/Alert";
import {useNavigate} from "react-router-dom"

function Post() {

  const dispatch  = useDispatch();
  const [error,setEror] = useState({
    title:"",
    content:"",
  })
const navigate = useNavigate()



  const [formData, setFormData] = useState({
    title: "",
    content: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: name === 'image'?e.target.files[0]:value,

    });
  }
  


  const handleSubmit = (e) => {
    e.preventDefault();

    const error = postValidator(formData.title,formData.content);
    setEror({...error,...error})
    if(!error.content && !error.title){
    const {title,content,image} = formData;
    const formDataToSend = new FormData();
    formDataToSend.append('title',title);
    formDataToSend.append('content',content)
    formDataToSend.append('image',image)
    dispatch(createPost(formDataToSend))
    navigate('/')
    }
    

  };
  return (

    <Container  className="bg-white mt-5 mb-5 d-flex justify-content-center"  >
      <div className="post-form-container col-lg-8">
        <form onSubmit={handleSubmit} className="mt-5">
          <div className="form-group">
            <label htmlFor="title">Title:</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              
            />
            <p className="text-danger">{error.title?error.title:null}</p>
          </div>
          <div className="form-group">
            <label htmlFor="content">Content:</label>
            <textarea
              id="content"
              name="content"
              value={formData.content}
              onChange={handleChange}
              rows="4"
          
            ></textarea>
             <p className="text-danger">{error.content?error.content:null}</p>

          </div>
          <div className="form-group">
      

            <label htmlFor="author">Image:</label>

            <input
              type="file"
              name="image"
              onChange={handleChange}
            
            />
          </div>
          <button className="btn w-100 border border-black" type="submit">Submit</button>
        </form>
      </div>
    </Container>
  );
}

export default Post;
