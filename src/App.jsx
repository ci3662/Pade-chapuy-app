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

  const nombre = prompt(`Reservar turno de ${hora} el ${fechaSeleccionada}\n\nIngrese su nombre y apellido:`);

  if (nombre) {
    const clave = `${fechaSeleccionada}_${hora}`;

    try {
      // Traer reservas existentes
      const reservaDoc = await db.collection("reservas").doc(fechaSeleccionada).get();
      let reservasExistentes = {};

      if (reservaDoc.exists) {
        reservasExistentes = reservaDoc.data();
      }

      // Agregar la nueva reserva
      reservasExistentes[clave] = nombre;

      // Guardar en Firestore
      await db.collection("reservas").doc(fechaSeleccionada).set(reservasExistentes);

      setReservas(reservasExistentes);

      alert(`¡Turno reservado para ${nombre} el ${fechaSeleccionada} a las ${hora}!`);

      // Enviar WhatsApp
      const mensaje = `Hola, mi nombre es ${nombre}. He realizado una reserva para jugar al pádel el día ${fechaSeleccionada} a las ${hora} hs. ¡Muchas gracias!`;
      const url =https://wa.me/5493476608590?text=Reserva%20de%20turno%20-%20Nombre%20y%20Apellido:%20[Nombre%20que%20puso] ;

      window.open(url, "_blank");

    } catch (error) {
      console.error("Error reservando turno:", error);
      alert("Hubo un error, por favor intentá de nuevo.");
    }
  }
};
useEffect(() => {
  if (fechaSeleccionada) {
    const fetchReservas = async () => {
      const doc = await db.collection("reservas").doc(fechaSeleccionada).get();
      if (doc.exists) {
        setReservas(doc.data());
      } else {
        setReservas({});
      }
    };
    fetchReservas();
  }
}, [fechaSeleccionada]);
