import { useContext, useEffect } from "react";
import api from "../services/api";
import { AppContext } from "../context/AppContext";

export default function useDoctors(){

  const context = useContext(AppContext);

  if(!context){
    throw new Error("useDoctors must be used inside AppProvider");
  }

  const { doctors, setDoctors } = context;

  const fetchDoctors = async () => {

    const res = await api.get("/doctors/");

    setDoctors(res.data);
  };

  useEffect(() => {
    fetchDoctors();
  }, []);   // IMPORTANT: empty dependency

  return { doctors, fetchDoctors };
}