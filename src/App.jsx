import { useState } from "react";

const horarios = [
  "09:00",
  "10:30",
  "12:00",
  "13:30",
  "15:00",
  "16:30",
  "18:00",
  "19:30",
  "21:00"
];

export default function App() {
  const [reservas, setReservas] = useState({});

  const reservarTurno = (hora) => {
    const nombre = prompt(`Reservar turno de ${hora}\n\nIngrese su nombre y apellido:`);
    if (nombre) {
      setReservas(prev => ({ ...prev, [hora]: nombre }));
      alert(`¡Turno reservado para ${nombre} a las ${hora}!`);
      // Acá después podemos agregar envío a Firebase o WhatsApp
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Reserva de Turnos - Padel Chapuy</h1>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {horarios.map(hora => (
          <li key={hora} style={{ margin: "10px 0" }}>
            <strong>{hora}</strong> - {reservas[hora] ? `Reservado por ${reservas[hora]}` : (
              <button onClick={() => reservarTurno(hora)}>Reservar</button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
