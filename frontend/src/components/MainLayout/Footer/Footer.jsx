import React from "react";
import { Container } from "react-bootstrap";

const Footer = () => {
  return (
    <footer className="bg-light text-center py-2 border-top">
      <Container>
        <div className="small text-muted mb-0">
          © {new Date().getFullYear()} Gimnasio Ly
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
