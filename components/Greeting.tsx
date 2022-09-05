export function Greeting({ date }: { date?: Date }): string {
  const hour = (date ?? new Date()).getHours();

  if (hour < 2) {
    return 'Good evening';
  } else if (hour < 6) {
    return 'Happy small hours';
  } else if (hour < 12) {
    return 'Good morning';
  } else if (hour < 12 + 6) {
    return 'Good afternoon';
  } else {
    return 'Good evening';
  }
}
