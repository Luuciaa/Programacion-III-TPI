import React, { useState, useEffect } from "react";
import { Card, Button } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EliminarUsuario = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [usuario, setUsuario] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsuario = async () => {
      try {
        const res = await fetch(`http://localhost:4000/api/usuarios/${id}`);
        if (res.ok) {
          const data = await res.json();
          setUsuario(data);
        } else {
          toast.error("No se pudo cargar el usuario");
        }
      } catch (error) {
        console.error("Error en la petición PUT:", error);
        toast.error("Error de conexión con el servidor");
      } finally {
        setLoading(false);
      }
    };

    fetchUsuario();
  }, [id]);

  const handleEliminar = async () => {
    if (!window.confirm("¿Estás seguro que querés eliminar este usuario?")) {
      return;
    }

    try {
      const res = await fetch(`http://localhost:4000/api/usuarios/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        toast.success("Usuario eliminado correctamente");
        setTimeout(() => navigate("/superadmin/usuarios"), 2000);
      } else {
        toast.error("Error al eliminar el usuario");
      }
    } catch (error) {
      console.error("Error en la petición PUT:", error);
      toast.error("Error de conexión con el servidor");
    }
  };

  if (loading) return <p> Cargando usuario...</p>;
  if (!usuario) return <p> No se encontró el usuario.</p>;

  return (
    <div className="container mt-4">
      <ToastContainer />
      <Card className="p-4 shadow-sm">
        <h3 className="mb-4 text-center">Eliminar Usuario</h3>
        <p>
          <strong>Nombre:</strong> {usuario.nombre}
        </p>
        <p>
          <strong>Correo:</strong> {usuario.correo}
        </p>
        <p>
          <strong>Rol:</strong> {usuario.rol}
        </p>
        <div className="d-grid">
          <Button variant="danger" onClick={handleEliminar}>
            Confirmar Eliminación
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default EliminarUsuario;
