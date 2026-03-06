import useDoctors from "../hooks/useDoctors";
import useAppointments from "../hooks/useAppointments";
import StatCard from "../components/StatCard";
import BookAppointmentModal from "../components/BookAppointmentModal";

export default function Dashboard(){

  const { doctors } = useDoctors();
  const { appointments } = useAppointments();

  const today = new Date().toDateString();

  const todayAppointments = appointments.filter(a =>
    new Date(a.slot).toDateString() === today
  );

  return (

    <div className="container">

      <h1>Dashboard</h1>

      <div className="card-container">

        <StatCard
          title="Total Doctors"
          value={doctors.length}
        />

        <StatCard
          title="Appointments Today"
          value={todayAppointments.length}
        />

        <StatCard
          title="Upcoming Appointments"
          value={appointments.length}
        />

      </div>

      <BookAppointmentModal/>

    </div>
  );
}