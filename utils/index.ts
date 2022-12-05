export function isInThePast(date:Date) {
  const today = new Date();
  
  today.setHours(0, 0, 0, 0);

  return date < today;
}