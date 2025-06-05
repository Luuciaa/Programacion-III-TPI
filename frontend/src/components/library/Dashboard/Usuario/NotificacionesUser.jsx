import React, { useState } from "react";
import { ListGroup, Button, Badge } from "react-bootstrap";

const NotificacionUser = ({ notificaciones }) => {
  // Estado local para manejar notificaciones y su estado leídas/no leídas
  const [lista, setLista] = useState(
    notificaciones.map((texto) => ({ texto, leida: false }))
  );

  // Marca una notificación como leída
  const marcarLeida = (index) => {
    const nuevaLista = [...lista];
    nuevaLista[index].leida = true;
    setLista(nuevaLista);
  };

  return (
    <div className="mt-4">
      <h5>Notificaciones</h5>
      <ListGroup>
        {lista.length === 0 && <p>No hay notificaciones.</p>}

        {lista.map((notif, i) => (
          <ListGroup.Item
            key={i}
            className={notif.leida ? "text-muted" : "fw-bold"}
          >
            {notif.texto}

            {!notif.leida && (
              <Button
                variant="outline-primary"
                size="sm"
                className="float-end"
                onClick={() => marcarLeida(i)}
              >
                Marcar como leída
              </Button>
            )}

            {notif.leida && (
              <Badge bg="success" className="float-end">
                Leída
              </Badge>
            )}
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
};

export default NotificacionUser;
