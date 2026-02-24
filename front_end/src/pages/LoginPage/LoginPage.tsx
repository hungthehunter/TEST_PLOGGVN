import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom"; 
import * as UserService from "../../services/ModalService"; 
import "../../styles/LoginStyle.css";

const LoginPage: React.FC = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [email, setEmail] = useState<string>(""); 
  const [password, setPassword] = useState<string>(""); 
  const [loading, setLoading] = useState<boolean>(false); 
  
  const navigator = useNavigate(); 

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); 
    setLoading(true);
    
    try {
      const res = await UserService.loginUser({ email, password });
      if (res?.status === "OK" || res?.access_token) { 
        if (res.access_token) {
          localStorage.setItem("access_token", res.access_token);
        }
        if (res.data) {
          localStorage.setItem("user", JSON.stringify(res.data));
        } else if (res.access_token) {
  
        }
        alert("Login successful!");
      } else {
        alert(res?.message || "Login failed");
      }
    } catch (error: any) {
      console.error("Login error:", error);
      alert("Something went wrong. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container fluid className="py-5 d-flex justify-content-center">
      <Row className="w-100" style={{ maxWidth: "450px" }}>
        <Col>
          <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
            <h2 className="text-white text-center mb-4 fs-4 fw-bold">Log in</h2>
          </div>
          
          <Form className="w-100" style={{ width: "500px", maxWidth: "1000px" }} onSubmit={handleLogin}>
            {/* Email */}
            <Form.Group className="mb-3" controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="name@example.com"
                className="dark-input shadow-none"
                value={email}
                onChange={(e) => setEmail(e.target.value)} 
                required
              />
            </Form.Group>

            {/* Password */}
            <Form.Group className="mb-3" controlId="formPassword" style={{ position: "relative" }}>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                className="dark-input shadow-none"
                style={{ paddingRight: "40px" }}
                value={password}
                onChange={(e) => setPassword(e.target.value)} 
                required
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                style={{ position: "absolute", right: "10px", top: "38px", cursor: "pointer", color: "#aaa" }}
              >
                {showPassword ? (
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z" />
                    <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7.028 7.028 0 0 0-2.79.588l.77.771A5.944 5.944 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.134 13.134 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755-.165.165-.337.328-.517.486l.708.709z" />
                    <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829l.822.822zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829z" />
                    <path d="M3.35 5.47c-.18.16-.353.322-.518.487A13.134 13.134 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7.029 7.029 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12-.708.708z" />
                  </svg>
                )}
              </span>
            </Form.Group>

            <div className="mb-4">
              <a href="/forgot-password" className="forgot-link">Forgot your password?</a>
            </div>

            <Button type="submit" className="w-100 btn-teal py-2" style={{ width: "100%" }}  disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </Button>

            <div className="mt-4 text-center">
              <div className="text-secondary" style={{ fontSize: "0.9rem", display: "flex", justifyContent: "center" }}>
                Don't have an account?{" "}
              </div>
              <div style={{ display: "flex", justifyContent: "center" }} >
                <span onClick={() => navigator("/signUp")} className="teal-link" style={{cursor: 'pointer'}}>
                  Sign up
                </span>
              </div>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginPage;