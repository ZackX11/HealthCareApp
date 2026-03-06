import { useContext, useEffect } from "react";
import api from "../services/api";
import { AppContext } from "../context/AppContext";

export default function useAppointments() {

  const context = useContext(AppContext);

  if (!context) {
    throw new Error("useAppointments must be used inside AppProvider");
  }

  const { appointments, setAppointments } = context;

  const fetchAppointments = async () => {

    const res = await api.get("/appointments/");

    setAppointments(res.data);
  };

  useEffect(() => {
    fetchAppointments();

    const interval = setInterval(fetchAppointments, 20000);

    return () => clearInterval(interval);
  }, []);

  return { appointments, fetchAppointments };
}