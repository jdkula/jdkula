export function TimeOfDay({ date }: { date?: Date }): string {
    const hour = (date ?? new Date()).getHours();

    if (hour < 2) {
        return 'evening';
    } else if (hour < 6) {
        return 'eremorning';
    } else if (hour < 12) {
        return 'morning';
    } else if (hour < 12 + 6) {
        return 'afternoon';
    } else {
        return 'evening';
    }
}
