import { useState } from "react";
import api from "../services/api";
import useDoctors from "../hooks/useDoctors";

export default function Doctors() {

  const { doctors, fetchDoctors } = useDoctors();

  const [form, setForm] = useState({
    name: "",
    specialization: "",
    start_hour: 0,
    end_hour: 0
  });

  const handleSubmit = async (e: React.FormEvent) => {

    e.preventDefault();

    await api.post("/doctors/", form);

    fetchDoctors();

    setForm({
      name: "",
      specialization: "",
      start_hour: 0,
      end_hour: 0
    });
  };

  return (

    <div className="container">

      <h1>Doctors</h1>

      {/* Add Doctor Form */}

      <div className="form-card">

        <h2>Add Doctor</h2>

        <form className="doctor-form" onSubmit={handleSubmit}>

          <input
            placeholder="Doctor Name"
            value={form.name}
            onChange={(e)=>setForm({...form,name:e.target.value})}
          />

          <input
            placeholder="Specialization"
            value={form.specialization}
            onChange={(e)=>setForm({...form,specialization:e.target.value})}
          />

          <input
            type="number"
            placeholder="Start Hour (e.g. 9)"
            value={form.start_hour}
            onChange={(e)=>setForm({...form,start_hour:Number(e.target.value)})}
          />

          <input
            type="number"
            placeholder="End Hour (e.g. 17)"
            value={form.end_hour}
            onChange={(e)=>setForm({...form,end_hour:Number(e.target.value)})}
          />

          <button type="submit">
            Add Doctor
          </button>

        </form>

      </div>


      {/* Doctors List */}

      <div className="table-card">

        <h2>Doctors List</h2>

        <table>

          <thead>
            <tr>
              <th>Name</th>
              <th>Specialization</th>
              <th>Working Hours</th>
            </tr>
          </thead>

          <tbody>

            {doctors.map((d) => (

              <tr key={d.id}>
                <td>{d.name}</td>
                <td>{d.specialization}</td>
                <td>{d.start_hour}:00 - {d.end_hour}:00</td>
              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}