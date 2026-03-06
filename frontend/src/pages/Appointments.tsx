import api from "../services/api";
import useAppointments from "../hooks/useAppointments";

export default function Appointments() {

  const { appointments, fetchAppointments } = useAppointments();

  const cancelAppointment = async (id: number) => {

    const confirmCancel = confirm("Cancel this appointment?");

    if (!confirmCancel) return;

    await api.delete(`/appointments/${id}`);

    fetchAppointments();
  };

  return (

    <div className="container">

      <h1>Appointments</h1>

      <div className="table-card">

        <table>

          <thead>
            <tr>
              <th>Patient</th>
              <th>Doctor</th>
              <th>Time</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>

            {appointments.map((a) => (

              <tr key={a.id}>

                <td>{a.patient_name}</td>

                <td>{a.doctor_name}</td>

                <td>
                  {new Date(a.slot).toLocaleDateString()} {" "}
                  {new Date(a.slot).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </td>

                <td>

                  <button
                    className="danger-button"
                    onClick={() => cancelAppointment(a.id)}
                  >
                    Cancel
                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>

  );
}