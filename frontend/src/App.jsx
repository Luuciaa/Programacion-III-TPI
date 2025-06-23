import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext/AuthContext";

// Layouts
import UserLayout from "./components/MainLayout/UserLayout";
import AdminLayout from "./components/MainLayout/AdminLayout";
import SuperAdminLayout from "./components/MainLayout/SuperAdminLayout";
import AuthLayout from "./layout/AuthLayout/AuthLayout";

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
//import SuperAdminPage from "./pages/SuperAdminPage";
import Unauthorized from "./pages/Unauthorize";


import EstadoCuota from "./components/library/Dashboard/Usuario/EstadoCuota";
import HistorialAsistencias from "./components/library/Dashboard/Usuario/HistorialAsistencias";
import ListaClases from "./components/library/Dashboard/Usuario/ListaClases";
import MisReservas from "./components/library/Dashboard/Usuario/MisReservas";
import NotificacionesUser from "./components/library/Dashboard/Usuario/NotificacionesUser";
import PerfilUser from "./components/library/Dashboard/Usuario/PerfilUser";


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
        <Route path="/user" element={<AuthLayout allowedRoles={["socio"]} />}>
          <Route element={<UserLayout />}>
            <Route index element={<UserPage />} />
            <Route path="perfil" element={<PerfilUser />} />
            <Route path="estado-cuota" element={<EstadoCuota />} />
            <Route path="mis-reservas" element={<MisReservas />} />
            <Route path="lista-clases" element={<ListaClases />} />
            <Route path="notificaciones" element={<NotificacionesUser />} />
            <Route path="historial-asistencias" element={<HistorialAsistencias />} />
            
          </Route>
        </Route>
        

         {/* Ruta privada - Admin con layout */}
        <Route path="/admin" element={<AuthLayout allowedRoles={["admin"]} />}>
          <Route element={<AdminLayout />}>
            <Route index element={<AdminPage />} />
            <Route path="usuarios" element={<UsuariosAdmin />} />
            <Route path="pagos" element={<PagosAdmin />} />
            <Route path="actividades" element={<ActividadesAdmin />} />
            <Route path="reservas" element={<ReservasAdmin />} />
          </Route>
        </Route>

       {/* Ruta privada - SuperAdmin */}
        <Route path="/superadmin" element={<AuthLayout allowedRoles={["superadmin"]} />}>
          <Route element={<SuperAdminLayout />}>
            <Route index element={<DashboardSuperAdmin />} />
            <Route path="gestion-usuarios" element={<GestionUser />} />
            <Route path="alta-usuario" element={<AltaUsuario />} />
            <Route path="editar-usuario" element={<EditarUsuario />} />
            <Route path="eliminar-usuario" element={<EliminarUsuario />} />
            <Route path="cambio-rol" element={<CambioRol />} />
          </Route>
        </Route>

        {/* Ruta para acceso no autorizado */}
        <Route path="/unauthorized" element={<Unauthorized />} />

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



