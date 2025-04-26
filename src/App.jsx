import { db } from './firebase';

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

const reservarTurno = async (hora) => {
  if (!fechaSeleccionada) {
    alert("Por favor seleccioná una fecha antes de reservar.");
    return;
  }

  const nombre = prompt(
    `Reservar turno de ${hora} el ${fechaSeleccionada}\n\nIngrese su nombre y apellido:`
  );
  if (nombre) {
    const clave = `${fechaSeleccionada}_${hora}`;
    const nuevaReserva = { ...reservas, [clave]: nombre };

    // Guardar en Firestore
    await db.collection("reservas").doc(fechaSeleccionada).set(nuevaReserva);

    setReservas(nuevaReserva);
    alert(`¡Turno reservado para ${nombre} el ${fechaSeleccionada} a las ${hora}!`);

    // Plantilla formal para WhatsApp
    const mensaje = `Hola, mi nombre es ${nombre}. He realizado una reserva para jugar al pádel el día ${fechaSeleccionada} a las ${hora} hs. ¡Muchas gracias!`;
    const url = `https://wa.me/5493476608590?text=${encodeURIComponent(mensaje)}`;

    // Redirigir a WhatsApp
    window.open(url, "_blank");
  }
};
