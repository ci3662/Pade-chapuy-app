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
  const [fechaSeleccionada, setFechaSeleccionada] = useState("");
  const [reservas, setReservas] = useState({});

  const reservarTurno = (hora) => {
    if (!fechaSeleccionada) {
      alert("Por favor seleccioná una fecha antes de reservar.");
      return;
    }

    const nombre = prompt(`Reservar turno de ${hora} el ${fechaSeleccionada}\n\nIngrese su nombre y apellido:`);
    if (nombre) {
      const clave = `${fechaSeleccionada}_${hora}`;
      setReservas(prev => ({ ...prev, [clave]: nombre }));
      alert(`¡Turno reservado para ${nombre} el ${fechaSeleccionada} a las ${hora}!`);
      // Después podemos guardar en Firebase o enviar WhatsApp
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Reserva de Turnos - Padel Chapuy</h1>

      <div style={{ marginBottom: 20 }}>
        <label>
          Seleccionar fecha:{" "}
          <input
            type="date"
            value={fechaSeleccionada}
            onChange={(e) => setFechaSeleccionada(e.target.value)}
          />
        </label>
      </div>

      <ul style={{ listStyle: "none", padding: 0 }}>
        {horarios.map(hora => {
          const clave = `${fechaSeleccionada}_${hora}`;
          return (
            <li key={hora} style={{ margin: "10px 0" }}>
              <strong>{hora}</strong> - {reservas[clave] ? `Reservado por ${reservas[clave]}` : (
                <button onClick={() => reservarTurno(hora)}>Reservar</button>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
