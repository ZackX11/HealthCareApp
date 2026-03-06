from pydantic import BaseModel
from datetime import datetime


class DoctorCreate(BaseModel):
    name: str
    specialization: str
    start_hour: int
    end_hour: int


class DoctorResponse(BaseModel):
    id: int
    name: str
    specialization: str
    start_hour: int
    end_hour: int

    model_config = {"from_attributes": True}


class AppointmentCreate(BaseModel):
    doctor_id: int
    patient_name: str
    slot: datetime


class AppointmentResponse(BaseModel):
    id: int
    doctor_id: int
    patient_name: str
    slot: datetime

    model_config = {"from_attributes": True}