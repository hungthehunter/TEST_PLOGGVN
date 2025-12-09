import React from "react";
import { Container, Button } from "react-bootstrap";
import "../../styles/ConfirmEmailStyle.css"; // Dùng chung CSS với Login/Register

const ConfirmEmailPage = () => {
  // Giả lập email người dùng vừa đăng ký
  const userEmail = "aleduc+323232@gmail.com";

  return (
    <div className="w-100 position-relative">
      
      {/* Nút Back to Login (Giữ nguyên vị trí cố định góc trái) */}
      <div style={{ position: 'fixed', top: '20px', left: '20px', zIndex: 10 }}>
        <a href="/login" className="btn-back">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
            <path fillRule="evenodd" d="M12 8a.5.5 0 0 1-.5.5H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5a.5.5 0 0 1 .5.5z"/>
          </svg>
          Back to Login
        </a>
      </div>

      {/* Container chính */}
      <Container fluid>
        <div className="w-100 d-flex justify-content-center px-3">
          
          {/* Giới hạn chiều rộng nội dung */}
          <div style={{ width: "100%", maxWidth: "550px", marginTop: "10vh"}}>
            <div style={{display:"flex", justifyContent:"center",width:"100%"}}>
            <h2 className="text-white text-center mb-4 fs-4 fw-bold">
              Please confirm your email address
            </h2>
            </div>

            {/* Khối chứa danh sách hướng dẫn */}
            {/* Sử dụng text-start để căn lề trái cho các dòng text, nhưng khối div được căn giữa nhờ cha */}
            <div className="mb-5 px-md-4">
              <ul className="confirm-list">
                <li className="mb-1">
                  We have sent a confirmation link to: <span className="text-white fw-bold">{userEmail}</span>
                </li>
                <li className="mb-1">
                  Confirmation email may take up to 5 minutes to appear in your inbox
                </li>
                <li className="mb-1">
                  Please confirm through the link in the email to create your account
                </li>
              </ul>
            </div>

            {/* Nút Resend Email */}
            <Button
              variant="primary"
              className="w-100 btn-teal py-2"
              style={{ width: "100%" }}
            >
             <span style={{color:"white"}}>Resend email</span> 
            </Button>

          </div>
        </div>
      </Container>
    </div>
  );
};

export default ConfirmEmailPage;