from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

import models, schemas
from dependencies import get_db

router = APIRouter(prefix="/doctors", tags=["Doctors"])


@router.post("/", response_model=schemas.DoctorResponse)
def create_doctor(doctor: schemas.DoctorCreate, db: Session = Depends(get_db)):
    db_doctor = models.Doctor(**doctor.dict())
    db.add(db_doctor)
    db.commit()
    db.refresh(db_doctor)
    return db_doctor


@router.get("/", response_model=list[schemas.DoctorResponse])
def get_doctors(db: Session = Depends(get_db)):
    return db.query(models.Doctor).all()