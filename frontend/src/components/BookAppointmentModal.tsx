import { useState, useEffect } from "react";
import api from "../services/api";
import { generateSlots } from "../utils/slotGenerator";
import useDoctors from "../hooks/useDoctors";
import useAppointments from "../hooks/useAppointments";
import type { Doctor } from "../context/AppContext";

export default function BookAppointmentModal() {

  const { doctors } = useDoctors();
  const { fetchAppointments } = useAppointments();

  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [date, setDate] = useState("");
  const [patientName, setPatientName] = useState("");

  const [slots, setSlots] = useState<string[]>([]);
  const [selectedSlot, setSelectedSlot] = useState("");

  const [bookedSlots, setBookedSlots] = useState<string[]>([]);


  // Generate slots when doctor changes
  useEffect(() => {

    if (!selectedDoctor) return;

    const s = generateSlots(
      selectedDoctor.start_hour,
      selectedDoctor.end_hour
    );

    setSlots(s);

  }, [selectedDoctor]);


  // Fetch booked slots
  useEffect(() => {

    if (!selectedDoctor || !date) return;

    const fetchBooked = async () => {

      const res = await api.get("/appointments/");

      const filtered = res.data
        .filter((a: any) =>
          a.doctor_id === selectedDoctor.id &&
          a.slot.startsWith(date)
        )
        .map((a: any) =>
          new Date(a.slot).getHours() + ":00"
        );

      setBookedSlots(filtered);
    };

    fetchBooked();

  }, [selectedDoctor, date]);


  const handleSubmit = async () => {

    if (!selectedDoctor || !selectedSlot || !date || !patientName) {
      alert("Please fill all fields");
      return;
    }

    const hour = selectedSlot.split(":")[0];

    const slotDatetime = `${date}T${hour.padStart(2, "0")}:00:00`;

    await api.post("/appointments/", {
      doctor_id: selectedDoctor.id,
      patient_name: patientName,
      slot: slotDatetime
    });

    fetchAppointments();

    alert("Appointment booked successfully!");

    setPatientName("");
    setSelectedSlot("");
    setDate("");

  };


  return (

    <div className="booking-box">

      <h2>Book Appointment</h2>

      {/* Doctor Selector */}
      <label>Doctor</label>

      <select
        onChange={(e) => {

          const doc = doctors.find(
            d => d.id === Number(e.target.value)
          );

          setSelectedDoctor(doc || null);

        }}
      >

        <option value="">Select Doctor</option>

        {doctors.map(d => (

          <option key={d.id} value={d.id}>
            {d.name} ({d.specialization})
          </option>

        ))}

      </select>


      {/* Patient Name */}

      <label>Patient Name</label>

      <input
        placeholder="Enter patient name"
        value={patientName}
        onChange={(e) => setPatientName(e.target.value)}
      />


      {/* Date Picker */}

      <label>Select Date</label>

      <input
        type="date"
        value={date}
        min={new Date().toISOString().split("T")[0]}
        onChange={(e) => setDate(e.target.value)}
      />


      {/* Slot Selector */}

      <label>Available Slots</label>

      <div className="slot-container">

        {slots.map(slot => {

          const isBooked = bookedSlots.includes(slot);

          return (

            <button
              key={slot}
              disabled={isBooked}
              className={`slot-button
                ${selectedSlot === slot ? "selected" : ""}
                ${isBooked ? "booked" : ""}
              `}
              onClick={() => setSelectedSlot(slot)}
            >

              {slot}

            </button>

          );

        })}

      </div>


      <button
        style={{ marginTop: "15px" }}
        onClick={handleSubmit}
      >
        Book Appointment
      </button>

    </div>

  );
}