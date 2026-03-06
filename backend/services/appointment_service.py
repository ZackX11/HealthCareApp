from fastapi import HTTPException
from datetime import datetime
import models


def validate_appointment(db, doctor_id, slot):

    doctor = db.query(models.Doctor).filter(
        models.Doctor.id == doctor_id
    ).first()

    if not doctor:
        raise HTTPException(status_code=404, detail="Doctor not found")

    # Check working hours
    hour = slot.hour
    if hour < doctor.start_hour or hour >= doctor.end_hour:
        raise HTTPException(
            status_code=400,
            detail="Slot outside doctor's working hours"
        )

    # Check past date
    if slot < datetime.now():
        raise HTTPException(
            status_code=400,
            detail="Cannot book past appointment"
        )

    # Prevent double booking
    existing = db.query(models.Appointment).filter(
        models.Appointment.doctor_id == doctor_id,
        models.Appointment.slot == slot
    ).first()

    if existing:
        raise HTTPException(
            status_code=400,
            detail="Slot already booked"
        )

    return doctor