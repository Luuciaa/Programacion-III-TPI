import React from "react";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Home.css";



const Home = () => {
  return (
    <>
      <div className="position-relative">
        
        <video autoPlay loop muted className="fondo">
          
          <source src="/fondo.mp4" type="video/mp4" />
        </video>

        <div className="container d-flex flex-column justify-content-center align-items-center text-white position-relative min-vh-100">
          <div className="home">
            <h1 className="display-2 fw-bold mb-3 text-center">
              ¡Bienvenido a GymLy!
            </h1>
            <div className="text-start mb-4">
              <h2 className="h4 fw-bold text-white mb-3 text-center">
                Nuestro Gimnasio
              </h2>
              <p className="text-white text-lg-center">
                Ofrecemos un espacio moderno y motivador, con
                <strong> equipos de última generación</strong> y entrenadores
                listos para ayudarte a alcanzar tus metas.
              </p>

              <div className="row text-center">
                <div className="col-md-6 mb-4">
                  <div className="bg-primary bg-opacity-25 p-4 rounded shadow">
                    <h3 className="h5 fw-semibold text-white mb-2"> Clases</h3>
                    <p className="text-white">
                      Ofrecemos una variedad de clases, desde cardio hasta
                      entrenamiento de alta intensidad, pensadas para mantenerte
                      motivado y en
                      <br />
                      movimiento.
                    </p>
                  </div>
                </div>

                <div className="col-md-6 mb-4">
                  <div className="bg-success bg-opacity-25 p-4 rounded shadow">
                    <h3 className="h5 fw-semibold text-white mb-2">
                      Profesores
                    </h3>
                    <p className="text-white">
                      El equipo de entrenadores altamente calificados está aquí
                      para guiarte y motivarte en tu viaje hacia un estilo de vida
                      más
                      <br />
                      saludable.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-center d-flex gap-2 mb-3 mt-4 justify-content-center">
              <Link to="/login">
                <Button variant="outline-light" size="lg">
                  Iniciar Sesión
                </Button>
              </Link>

              <Link to="/register">
                <Button variant="outline-light" size="lg">
                  Registrarse
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;






