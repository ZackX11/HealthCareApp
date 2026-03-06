export function generateSlots(startHour: number, endHour: number): string[] {

  const slots: string[] = [];

  for (let hour = startHour; hour < endHour; hour++) {
    slots.push(`${hour}:00`);
  }

  return slots;
}