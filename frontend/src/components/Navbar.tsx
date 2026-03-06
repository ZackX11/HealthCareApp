import { Link } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {

  return (

    <div className="navbar">

      <Link to="/">Dashboard</Link>
      <Link to="/doctors">Doctors</Link>
      <Link to="/appointments">Appointments</Link>

      <div style={{ marginLeft: "auto" }}>
        <ThemeToggle />
      </div>

    </div>

  );
}