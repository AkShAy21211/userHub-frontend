import React, { useState } from "react";
import {
  Button,
  Form,
  Container,
  Row,
  Col,
  FormControl,
  InputGroup,
} from "react-bootstrap";
import "./Register.css";
import { Eye, EyeSlash } from "react-bootstrap-icons";
import { PropagateLoader } from "react-spinners";
import {
  nameValidator,
  emailValidator,
  phoneValidator,
  passwordValidator,
} from "../../helper/validator";
import {useRegister} from "../../hooks/useRegister";
import Alert from "../toast/Alert";
import { Link } from "react-router-dom";
function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState({
    nameError: "",
    emailError: "",
    phoneError: "",
    passwordError: "",
  });
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });
  const {register,errors,loader} = useRegister()

  const onChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setError((prevState) => ({
      ...prevState,
      nameError: nameValidator(formData.name),
      emailError: emailValidator(formData.email),
      phoneError: phoneValidator(formData.phone),
      passwordError: passwordValidator(formData.password),
    }));

    // Check if all fields are valid before submitting the form
    if (
      !error.nameError &&
      !error.emailError &&
      !error.phoneError &&
      !error.passwordError
    ) {
      
     await register(formData)
   
    }
  };

  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh" }}>
      <Row className="login-container">
        <Col lg={12} xl={12}>
        {errors!==''?<Alert data={errors}/>:null}
          <Form onSubmit={onSubmit}>
            <Form.Group className="mb-3 " controlId="formBasicName">
              <Form.Control
                className="bg-secondary text-white"
                type="text"
                name="name"
                value={formData.name}
                onChange={onChange}
                placeholder="Enter Name"
              />
              {error.nameError && (
                <p className="text-danger">{error.nameError}</p>
              )}
            </Form.Group>
            <Form.Group className="mb-3 " controlId="formBasicEmail">
              <Form.Control
                className="bg-secondary text-white"
                type="email"
                name="email"
                value={formData.email}
                onChange={onChange}
                placeholder="Enter email"
              />
              {error.emailError && (
                <p className="text-danger">{error.emailError}</p>
              )}
            </Form.Group>
            <Form.Group className="mb-3 " controlId="formBasicPhone">
              <Form.Control
                className=" bg-secondary text-white"
                type="text"
                name="phone"
                value={formData.phone}
                onChange={onChange}
                placeholder="Enter Phone"
              />
              {error.phoneError && (
                <p className="text-danger">{error.phoneError}</p>
              )}
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <InputGroup>
                <FormControl
                  name="password"
                  value={formData.password}
                  onChange={onChange}
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  className="bg-secondary text-white"
                />
                <Button
                  className="mx-1"
                  size="sm"
                  variant="secondary"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? <EyeSlash /> : <Eye />}
                </Button>
              </InputGroup>
              {error.passwordError && (
                <p className="text-danger">{error.passwordError}</p>
              )}
            </Form.Group>
        
            <Button
              className="w-100 btn-outline-white border border-2 text-white"
              variant="primary"
              type="submit"
            >
              {!loader ? "Register" : ""}{" "}
              <PropagateLoader
                loading={loader}
                cssOverride={{ marginBottom: "10px" }}
                size={8}
                color="white"
              />
            </Button>
          </Form>
          <p className="text-primary mt-3">Already have an account? <Link to='/login'>Login</Link></p>
        </Col>
      </Row>
    </Container>
  );
}

export default Register;
