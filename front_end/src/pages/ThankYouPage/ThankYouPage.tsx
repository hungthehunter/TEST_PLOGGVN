import { Container, Button } from "react-bootstrap";
// Import đúng file CSS bạn muốn dùng
import "../../styles/ThankYouStyle.css";

const ThankYouPage = () => {
  return (
    <div className="w-100 position-relative">
      {/* Container áp dụng class full-screen-center */}
      <Container fluid className="full-screen-center">
        <div style={{ width: "100%", maxWidth: "450px", textAlign: "center" }}>
          {/* --- ICON CHECKMARK --- */}
          <div className="mb-4 d-flex justify-content-center">
            <svg
              width="80"
              height="80"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10.7828 2.25306C11.3653 1.25056 12.6347 1.25056 13.2172 2.25306L14.0083 3.61462C14.2662 4.05856 14.7954 4.26908 15.2758 4.11867L16.7493 3.6573C17.8344 3.31752 18.8687 4.35178 18.5289 5.43689L18.0675 6.91039C17.9171 7.39077 18.1277 7.91999 18.5716 8.17789L19.9332 8.96903C20.9357 9.5515 20.9357 10.8209 19.9332 11.4034L18.5716 12.1945C18.1277 12.4524 17.9171 12.9816 18.0675 13.462L18.5289 14.9355C18.8687 16.0206 17.8344 17.0549 16.7493 16.7151L15.2758 16.2537C14.7954 16.1033 14.2662 16.3138 14.0083 16.7578L13.2172 18.1193C12.6347 19.1218 11.3653 19.1218 10.7828 18.1193L9.99173 16.7578C9.7338 16.3138 9.2046 16.1033 8.7242 16.2537L7.2507 16.7151C6.1656 17.0549 5.13134 16.0206 5.47112 14.9355L5.93249 13.462C6.0829 12.9816 5.87238 12.4524 5.42844 12.1945L4.06688 11.4034C3.06439 10.8209 3.06439 9.5515 4.06688 8.96903L5.42844 8.17789C5.87238 7.91999 6.0829 7.39077 5.93249 6.91039L5.47112 5.43689C5.13134 4.35178 6.1656 3.31752 7.2507 3.6573L8.7242 4.11867C9.2046 4.26908 9.7338 4.05856 9.99173 3.61462L10.7828 2.25306Z"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M9 12L11 14L15 10"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          {/* Tiêu đề */}
          <h2 className="text-white mb-3 fs-3 fw-bold">Thank you!</h2>

          {/* Thông báo phụ */}
          <p className="text-secondary mb-5" style={{ fontSize: "0.95rem" }}>
            Your email address has been confirmed.
          </p>

          {/* Nút Continue */}
          <Button
            variant="primary"
            className="w-100 btn-teal py-2"
            style={{ width: "100%" }}
          >
            <span style={{ color: "white" }}>Continue with account creation</span>
          </Button>
        </div>
      </Container>
    </div>
  );
};

export default ThankYouPage;
