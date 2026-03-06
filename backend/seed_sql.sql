INSERT INTO doctors (id, name, specialization, start_hour, end_hour)
VALUES
(1, 'Dr. Smith', 'Cardiologist', 9, 17),
(2, 'Dr. Johnson', 'Dermatologist', 10, 18),
(3, 'Dr. Patel', 'Orthopedic', 8, 16);

INSERT INTO appointments (id, doctor_id, patient_name, slot)
VALUES
(1, 1, 'John Doe', '2026-03-10 10:00:00'),
(2, 2, 'Alice Brown', '2026-03-10 11:00:00');