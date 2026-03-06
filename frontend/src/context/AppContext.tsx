import { createContext, useState} from "react";
import type { ReactNode } from "react";

export interface Doctor {
  id: number;
  name: string;
  specialization: string;
  start_hour: number;
  end_hour: number;
}

export interface Appointment {
  id: number;
  doctor_id: number;
  doctor_name: string
  patient_name: string;
  slot: string;
}

interface AppContextType {
  doctors: Doctor[];
  setDoctors: (doctors: Doctor[]) => void;
  appointments: Appointment[];
  setAppointments: (appointments: Appointment[]) => void;
}

export const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {

  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  return (
    <AppContext.Provider
      value={{
        doctors,
        setDoctors,
        appointments,
        setAppointments
      }}
    >
      {children}
    </AppContext.Provider>
  );
};