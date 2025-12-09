import React from "react";
// Import các icon mạng xã hội
import { FaFacebookF, FaInstagram, FaPinterest, FaLinkedinIn } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6"; // Logo X mới (Twitter cũ)

const EmailTemplate = () => {
  return (
    <div
      style={{
        backgroundColor: "#f3f4f6",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
      }}
    >
      {/* --- KHUNG EMAIL MÀU TRẮNG (White Frame) --- */}
      <div
        style={{
          backgroundColor: "#ffffff",
          width: "100%",
          maxWidth: "600px",
          padding: "40px",
          borderRadius: "8px",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.05)",
          textAlign: "center",
          fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        }}
      >
        {/* Tiêu đề */}
        <h2
          style={{
            color: "#1f2937",
            fontWeight: "700",
            marginBottom: "24px",
            fontSize: "24px",
          }}
        >
          You're almost there! Just confirm your email
        </h2>

        {/* Nội dung chính */}
        <p
          style={{
            color: "#6b7280",
            fontSize: "16px",
            lineHeight: "1.6",
            marginBottom: "30px",
          }}
        >
          You've successfully created a <strong>PloggVN</strong> account. To
          activate it, please click below to verify your email address.
        </p>

        {/* Nút Activate (Màu Teal giống app) */}
        <div style={{ marginBottom: "30px" }}>
          <a
            href="#"
            style={{
              backgroundColor: "#14b8a6",
              color: "#ffffff",
              padding: "12px 24px",
              borderRadius: "6px",
              textDecoration: "none",
              fontWeight: "600",
              fontSize: "15px",
              display: "inline-block",
            }}
          >
            Activate Your Account
          </a>
        </div>

        {/* Lời chào kết thúc */}
        <div
          style={{
            textAlign: "left",
            marginTop: "40px",
            color: "#6b7280",
            fontSize: "14px",
          }}
        >
          <p style={{ margin: 0 }}>Cheers,</p>
          <p style={{ margin: 0, fontWeight: "600", color: "#374151" }}>
            The PloggVN team
          </p>
        </div>

        {/* --- Footer (Social icons & Unsubscribe) --- */}
        <div
          style={{
            marginTop: "40px",
            paddingTop: "20px",
            borderTop: "1px solid #e5e7eb",
          }}
        >
          {/* Social Icons (Sử dụng React Icons) */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "15px",
              marginBottom: "15px",
            }}
          >
            {/* Facebook */}
            <a href="#" style={{ color: "#6b7280", textDecoration: "none" }}>
               <FaFacebookF size={20} />
            </a>

            {/* Twitter / X */}
            <a href="#" style={{ color: "#6b7280", textDecoration: "none" }}>
               <FaXTwitter size={20} />
            </a>

            {/* Instagram */}
            <a href="#" style={{ color: "#6b7280", textDecoration: "none" }}>
               <FaInstagram size={22} />
            </a>

            {/* Pinterest */}
            <a href="#" style={{ color: "#6b7280", textDecoration: "none" }}>
               <FaPinterest size={20} />
            </a>

            {/* LinkedIn */}
            <a href="#" style={{ color: "#6b7280", textDecoration: "none" }}>
               <FaLinkedinIn size={20} />
            </a>
          </div>

          <p style={{ fontSize: "12px", color: "#9ca3af", margin: 0 }}>
            <a href="#" style={{ color: "#14b8a6", textDecoration: "none" }}>
              Unsubscribe
            </a>
            {" • "}
            <a href="#" style={{ color: "#14b8a6", textDecoration: "none" }}>
              Unsubscribe Preferences
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default EmailTemplate;