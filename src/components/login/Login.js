import React, { useEffect, useState } from "react";
import {
  Button,
  Form,
  Container,
  Row,
  Col,
  FormControl,
  InputGroup,
} from "react-bootstrap";
import { Eye, EyeSlash } from "react-bootstrap-icons";
import { PropagateLoader } from "react-spinners";
import { emailValidator, passwordValidator } from "../../helper/validator";
import Alert from "../toast/Alert";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../app/features/user/userSlice";
import { useNavigate } from "react-router-dom";
import "./Login.css"; // Import the CSS file

function Login() {

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState({
    emailError: "",
    passwordError: "",
  });
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.auth.isLoading);
  const errors = useSelector((state) => state.auth.errors);
  const success = useSelector((state) => state.auth.success);
  const navigate = useNavigate();

  const onChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setError((prev) => ({
      ...prev,
      emailError: emailValidator(formData.email),
      passwordError: passwordValidator(formData.password),
    }));

    if (!error.emailError && !error.passwordError) {
      dispatch(login(formData));
      console.log(formData);
      if (success) {
        setFormData({ email: "", password: "" });

        if(success){
          navigate("/")
        }
      }
    }
  };

  return (
    
    <Container
    fluid
      className="d-flex justify-content-center align-items-center bg-black"
      style={{ minHeight: "100vh" }}
    >
      <Row className="login-container">

        <Col lg={12} xl={12}>
          <div className="text-danger d-flex justify-content-center mb-3">
            {errors ? <Alert error={errors} /> : null}
            {success ? <Alert success={success} /> : null}
          </div>
          <Form onSubmit={onSubmit}>
            <Form.Group className="mb-3 " controlId="formBasicEmail">
              <Form.Control
                className="bg-secondary"
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
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <InputGroup>
                <FormControl
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  name="password"
                  value={formData.password}
                  onChange={onChange}
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
              {!isLoading ? "Login" : ""}{" "}
              <PropagateLoader
                loading={isLoading}
                cssOverride={{ marginBottom: "10px" }}
                size={8}
                color="white"
              />
            </Button>
          </Form>
          <p className="text-primary mt-3">
            Dont have an acount? <Link to="/register">Register</Link>
          </p>
        </Col>
      </Row>
    </Container>
  );
}

export default Login;
