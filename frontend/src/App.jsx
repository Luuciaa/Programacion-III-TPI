import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext/AuthContext";

// Layouts
import AdminLayout from "./components/MainLayout/AdminLayout";

// Rutas privadas
import RutaPrivadaRol from "./routes/RutaPrivadaRol";


// Estilos
import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Páginas públicas
import Home from "./pages/Home/Home";
import Login from "./components/auth/Login/Login";
import Register from "./components/auth/Register/Register";
import NotFound from "./components/ui/NotFound/NotFound";

// Páginas privadas
import AdminPage from "./pages/AdminPage";
import UserPage from "./pages/UserPage";
import SuperAdminPage from "./pages/SuperAdminPage";
import Unauthorized from "./pages/Unauthorize";

// Páginas hijas del admin
import UsuariosAdmin from "./components/library/Dashboard/Admin/UsuariosAdmin";
import PagosAdmin from "./components/library/Dashboard/Admin/PagosAdmin";
import ActividadesAdmin from "./components/library/Dashboard/Admin/ActividadesAdmin";
import ReservasAdmin from "./components/library/Dashboard/Admin/ReservasAdmin";

// Páginas hijas del superAdmin
import DashboardSuperAdmin from "./components/library/Dashboard/SuperAdmin/DashboardSuperAdmin";
import AltaUsuario from "./components/library/Dashboard/SuperAdmin/AltaUsuario";
import EditarUsuario from "./components/library/Dashboard/SuperAdmin/EditarUsuario";
import EliminarUsuario from "./components/library/Dashboard/SuperAdmin/EliminarUsuario";
import CambioRol from "./components/library/Dashboard/SuperAdmin/CambioRol";
import GestionUser from "./components/library/Dashboard/SuperAdmin/GestionUser";

const AppContent = () => {
  return (
    <>
      {/* Notificaciones globales */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

      <Routes>
        {/* Redirección raíz */}
        <Route path="/" element={<Navigate to="/home" replace />} />

        {/* Rutas públicas */}
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Ruta privada - Usuario Socio */}
        <Route
          path="/user"
          element={
            <RutaPrivadaRol rol="user">
              <UserPage />
            </RutaPrivadaRol>
          }
        />

        {/* Ruta privada - Admin con subrutas y layout */}
        <Route
          path="/admin"
          element={
            <RutaPrivadaRol rol="admin">
              <AdminLayout />
            </RutaPrivadaRol>
          }
        >
          <Route index element={<AdminPage />} />
          <Route path="usuarios" element={<UsuariosAdmin />} />
          <Route path="pagos" element={<PagosAdmin />} />
          <Route path="actividades" element={<ActividadesAdmin />} />
          <Route path="reservas" element={<ReservasAdmin />} />
          
        </Route>

        {/* Ruta privada - SuperAdmin */}
        <Route
          path="/superadmin"
          element={
            <RutaPrivadaRol rol="superAdmin">
              <SuperAdminPage />
            </RutaPrivadaRol>
          }
        >
          <Route index element={<DashboardSuperAdmin />} />
          <Route path="gestion-usuarios" element={<GestionUser />} />
          <Route path="alta-usuario" element={<AltaUsuario />} />
          <Route path="editar-usuario" element={<EditarUsuario />} />
          <Route path="eliminar-usuario" element={<EliminarUsuario />} />
          <Route path="cambio-rol" element={<CambioRol />} />
          
        </Route>

        {/* Ruta no encontrada */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;



