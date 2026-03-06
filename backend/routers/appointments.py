from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

import models, schemas
from dependencies import get_db
from services.appointment_service import validate_appointment

router = APIRouter(prefix="/appointments", tags=["Appointments"])


@router.post("/", response_model=schemas.AppointmentResponse)
def create_appointment(data: schemas.AppointmentCreate, db: Session = Depends(get_db)):

    validate_appointment(db, data.doctor_id, data.slot)

    appointment = models.Appointment(**data.dict())

    db.add(appointment)
    db.commit()
    db.refresh(appointment)

    return appointment


@router.delete("/{id}")
def cancel_appointment(id: int, db: Session = Depends(get_db)):

    appointment = db.query(models.Appointment).filter(
        models.Appointment.id == id
    ).first()

    if not appointment:
        return {"error": "Appointment not found"}

    db.delete(appointment)
    db.commit()

    return {"message": "Appointment cancelled"}

@router.get("/", response_model=list[schemas.AppointmentResponse])
def get_appointments(db: Session = Depends(get_db)):

    appointments = (
        db.query(
            models.Appointment.id,
            models.Appointment.patient_name,
            models.Appointment.slot,
            models.Appointment.doctor_id,
            models.Doctor.name.label("doctor_name")
        )
        .join(models.Doctor)
        .all()
    )

    return appointments