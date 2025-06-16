import { useRef, useState} from "react";
import { useNavigate} from "react-router-dom";
import { Link } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { jwtDecode } from "jwt-decode";
import {Form, FormGroup, Button, FormControl, Container } from "react-bootstrap";
import { toast } from "react-toastify";




const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [area, setArea] = useState("");
  const [errors, setErrors] = useState({
    email: false,
    password: false,
    area: false,
  });
  const [loginError /*setLoginError*/] = useState("");
  const navigate = useNavigate();


  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    setErrors({ ...errors, email: false });
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    setErrors({ ...errors, password: false });
  };

  const handleAreaChange = (event) => {
    setArea(event.target.value);
    setErrors({ ...errors, area: false });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    //Validación de campos vacios
    if (!emailRef.current.value.length) {
      setErrors({ ...errors, email: true });
      toast.error("¡Email Vacio!");
      emailRef.current.focus();
      return;
    }

    //Validación formato email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErrors({ ...errors, email: true });
      toast.error("Por favor ingresa un correo electrónico válido");
      emailRef.current.focus();
      return;
    }

    //Validación <- Contraseña vacía o menor a 8 caracteres
    if (!password.length || password.length < 8) {
      setErrors({ ...errors, password: true });
      toast.error("¡Password vacío o menor a 8 caracteres!");
      passwordRef.current.focus();
      return;
    }

    //Validación <- Área no seleccionada
    if (!area) {
      setErrors({ ...errors, area: true });
      toast.error("Por favor seleccioná un área");
      return;
    }

    //Si todo esta bien, resetea errores
    setErrors({ email: false, password: false, area: false });

    try {
      const res = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, area }),
      });

      const data = await res.json();
      
      if (res.ok) {
        const token = data.token;

        // Decodifica el token
        const decoded = jwtDecode(token);
        const { rol } = decoded;
        toast.success("¡Inicio de sesión exitoso!");

        

        // Guarda el token en localStorage
        localStorage.setItem("token", token);

        //Redirecciono según el rol
        if (rol === "superadmin") {
          navigate("/superadmin");
        } else if (rol === "admin") {
          navigate("/admin");
        } else if (rol === "socio") {
          navigate("/usuario");
        } else {
          toast.error("Rol no reconocido");
        }
      } else {
        toast.error(data.message || "Error al iniciar sesión");
      }
    } catch (err) {
      console.log(err);
      toast.error("Error al iniciar sesión. Verifique sus datos.");
    }
  };

  return (
    <Container
      fluid
      className="vh-100 d-flex justify-content-center align-items-center bg-while"
    >
      <div className="login-box p-4 shadow-sm bg-light rounded">
        <Form onSubmit={handleSubmit}>
          <h2 className="mb-4 text-center">Iniciar Sesión</h2>

          <div>
            <FormGroup className="mb-3">
              <FormControl
                type="email"
                ref={emailRef}
                placeholder="Ingresa correo"
                value={email}
                onChange={handleEmailChange}
                isInvalid={errors.email}
              />
              {errors.email && (
                <p className="text-danger mt-2 mb-0">
                  Por favor ingresa un correo válido
                </p>
              )}
            </FormGroup>
          </div>

          <div>
            <FormGroup className="mb-3">
              <FormControl
                type="password"
                ref={passwordRef}
                placeholder="Ingresa password"
                value={password}
                onChange={handlePasswordChange}
                isInvalid={errors.password}
              />
              {errors.password && (
                <p className="text-danger mt-2 mb-0">
                  La contraseña debe tener 8 caracteres.
                </p>
              )}
            </FormGroup>
          </div>

          <div>
            <FormGroup className="mb-3">
              <FormControl
                as="select"
                value={area}
                onChange={handleAreaChange}
                isInvalid={errors.area}
              >
                <option value=""> Seleccionar Área</option>
                <option value="admin">Admin</option>
                <option value="usuario">Usuario</option>
                <option value="superAdmin">Super-Admin</option>
              </FormControl>
              {errors.area && (
                <p className="text-danger mt-2 mb-0">
                  Por favor seleccionar un área
                </p>
              )}
            </FormGroup>
          </div>

          <div className="d-grid mb-3">
            <Button type="submit" variant="outline-secondary" className="w-100">
              Iniciar Sesión
            </Button>
          </div>

          <div className="d-grid mb-3">
            <Button
              variant="outline-secondary"
              className="w-100"
              onClick={() => navigate("/")}
            >
              <i className="bi bi-box-arrow-in-right"></i> Volver a Inicio
            </Button>
          </div>

          {loginError && (
            <p className="text-danger text-center mt-2">{loginError}</p>
          )}

          <div className="text-center mt-1">
            <Link to="/recuperar-contraseña">¿Olvidaste tu contraseña?</Link>
          </div>

          <div className="text-center mt-3">
            <span>¿No tenés cuenta? </span>
            <Link to="/register">Registrate aqui</Link>
          </div>
        </Form>
      </div>
    </Container>
  );
};

export default Login;


